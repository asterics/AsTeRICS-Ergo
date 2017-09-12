angular.module(asterics.appServices)
    .service('envControlDataService', ['areSaveService', 'utilService', 'envControlUtilService', 'stateUtilService', 'envControlFsService', '$q', function (areSaveService, utilService, envControlUtilService, stateUtilService, envControlFsService, $q) {
        var thiz = this;
        var _dataFilename = "ecdata";
        var _saveTimestamp = -1;
        var _initDeferred = $q.defer();

        var _cellBoards = {};
        _cellBoards[asterics.envControl.STATE_MAIN] = [];
        var _cellBoardDeviceMapping = {};
        var _dynamicCellBoardIds = [];
        var _fs20Codes = [];
        var _clipBoard = {};
        var _undoCellBoards = {};
        var _callbackToCallOnNewData = null;

        thiz.getCellBoard = function (cellBoardName) {
            var def = $q.defer();
            _initDeferred.promise.then(function () {
                def.resolve(_cellBoards[cellBoardName]);
            });
            return def.promise;
        };

        thiz.addCellBoardElementFs20 = function (title, faIcon, code, cellBoard) {
            if (!cellBoard) {
                cellBoard = asterics.envControl.STATE_MAIN;
            }
            var element = envControlUtilService.createCellBoardItemFs20(title, faIcon, code);
            _cellBoards[cellBoard].push(element);
            _fs20Codes.push(code);
        };

        thiz.addCellBoardElementIrTrans = function (title, faIcon, code, cellBoard) {
            if (!cellBoard) {
                cellBoard = asterics.envControl.STATE_MAIN;
            }
            var element = envControlUtilService.createCellBoardItemIrTrans(title, faIcon, code);
            _cellBoards[cellBoard].push(element);
        };

        thiz.removeCellBoardElement = function (cellBoardName, element) {
            _undoCellBoards = angular.copy(_cellBoards);
            _cellBoards[cellBoardName] = _.without(_cellBoards[cellBoardName], element);
            if (element.type === asterics.const.CB_TYPE_SUBCB && element.toState) {
                _cellBoards[element.toState] = []; //delete items of sub-cellboard
                _.pull(_dynamicCellBoardIds, element.toState);
            } else if (element.type === asterics.envControl.CB_TYPE_FS20 && element.code) {
                _.pull(_fs20Codes, element.code);
            }
            thiz.saveData();
            return _cellBoards[cellBoardName];
        };

        thiz.undoRemove = function () {
            _cellBoards = _undoCellBoards;
            thiz.saveData();
        };

        thiz.addSubCellboard = function (title, faIcon, parentCellBoardState, deviceType) {
            title = title.replace(/\./g, ' ').replace(/\//g, ' ').replace(/\s\s+/g, ' '); // remove slashes and dots with whitespaces in order to not interfere with states and paths
            var newStateName = stateUtilService.getNewSubStateName(parentCellBoardState, title);
            var navToCbElement = envControlUtilService.createCellBoardItemNavSubcellboard(title, faIcon, newStateName);
            _cellBoardDeviceMapping[newStateName] = deviceType;
            addCellBoardElement(parentCellBoardState, navToCbElement);
            initCellBoard(newStateName);
            stateUtilService.addState(newStateName, getStateConfig(newStateName));
            _dynamicCellBoardIds.push(newStateName);
            return newStateName;
        };

        thiz.pasteCellBoardItem = function (cellBoardName) {
            if (thiz.hasClipboardData()) {
                _clipBoard.element.disabled = false;
                thiz.removeCellBoardElement(_clipBoard.cellBoardName, _clipBoard.element);
                addCellBoardElement(cellBoardName, _clipBoard.element);
                _clipBoard = {};
                thiz.saveData();
            }
        };

        thiz.prepareCellBoardElementMove = function (cellBoardName, element) {
            if (thiz.hasClipboardData()) {
                _clipBoard.element.disabled = false;
            }
            _clipBoard.element = element;
            _clipBoard.cellBoardName = cellBoardName;
        };

        thiz.hasClipboardData = function () {
            return _clipBoard.element && _clipBoard.cellBoardName;
        };

        thiz.getClipboardData = function () {
            return _clipBoard;
        };

        thiz.clearClipboard = function () {
            _clipBoard = {};
        };

        thiz.getNewFs20Code = function () {
            return envControlFsService.getNewFs20Code(_fs20Codes);
        };

        thiz.getNonConflictingLabel = function (label, parentState) {
            var newLabel = label;
            var count = 1;
            while (thiz.existsLabel(newLabel, parentState)) {
                newLabel = label + ' (' + count.toString() + ')';
                count++;
            }
            return newLabel;
        };

        thiz.existsLabel = function (label, parentState) {
            return _.includes(getCbButtonLabels(parentState, true), label.toString().trim().toLowerCase());
        };

        thiz.getNumberOfElements = function (cellBoard) {
            return _cellBoards[cellBoard].length;
        };

        thiz.getDeviceType = function (cellBoardName) {
            return _cellBoardDeviceMapping[cellBoardName];
        };

        thiz.registerForNewDataNotify = function (callbackToCall) {
            _callbackToCallOnNewData = callbackToCall;
        };

        thiz.deregisterNewDataCallback = function () {
            _callbackToCallOnNewData = null;
        };

        thiz.saveData = function saveData() {
            var data = {};
            data._cellBoards = _cellBoards;
            data._cellBoardDeviceMapping = _cellBoardDeviceMapping;
            data._dynamicCellBoardIds = _dynamicCellBoardIds;
            data._fs20Codes = _fs20Codes;
            _saveTimestamp = areSaveService.saveData(asterics.envControl.SAVE_FOLDER, _dataFilename, data);
        };

        function addCellBoardElement(cellBoardName, element) {
            initCellBoard(cellBoardName);
            _cellBoards[cellBoardName].unshift(element);
        }

        function initCellBoard(cellBoardName) {
            if (!_cellBoards[cellBoardName]) {
                _cellBoards[cellBoardName] = [];
            }
        }

        function getCbButtonLabels(parentState, lowercase) {
            var labels = [];
            var cb = _cellBoards[parentState];
            angular.forEach(cb, function (item) {
                var label = lowercase ? item.title.toLowerCase() : item.title;
                labels.push(label);
            });
            return labels;
        }

        function getAllCellBoardElements() {
            var list = [];
            _.forOwn(_cellBoards, function (values) {
                list = list.concat(values);
            });
            return list;
        }

        init();

        function init() {
            var promise1 = $q.defer();
            var promise2 = $q.defer();
            areSaveService.getSavedData(asterics.envControl.SAVE_FOLDER, _dataFilename).then(function (response) {
                if (response) {
                    setNewData(response);
                } else {
                    saveData(); // save (empty) data, if nothing existing
                }
                promise1.resolve();
            }, function error() {
                saveData(); // save (empty) data, if nothing existing
                promise1.resolve();
            });
            areSaveService.getLastModificationDate(asterics.envControl.SAVE_FOLDER, _dataFilename).then(function (response) {
                _saveTimestamp = response;
                promise2.resolve();
            });
            areSaveService.registerForUpdates(asterics.envControl.SAVE_FOLDER, _dataFilename, setNewData, function () {
                return _saveTimestamp
            });
            $q.all([promise1, promise2]).then(function () {
                _initDeferred.resolve();
            }, function () {
                _initDeferred.resolve();
            });
        }

        function setNewData(data, newTimestamp) {
            if (data) {
                _cellBoards = data._cellBoards || _cellBoards;
                _cellBoardDeviceMapping = data._cellBoardDeviceMapping || _cellBoardDeviceMapping;
                _dynamicCellBoardIds = data._dynamicCellBoardIds || _dynamicCellBoardIds;
                _fs20Codes = data._fs20Codes || _fs20Codes;
                reinitCellBoards();
            }
            if (newTimestamp) {
                _saveTimestamp = newTimestamp;
            }
            if (_.isFunction(_callbackToCallOnNewData)) {
                _callbackToCallOnNewData();
            }
        }

        //recreates function-mappings of cellBoards after loading data from server
        function reinitCellBoards() {
            angular.forEach(_cellBoards, function (values, key) {
                if (!stateUtilService.existsState(key)) {
                    stateUtilService.addState(key, getStateConfig(key));
                }
                _cellBoards[key] = envControlUtilService.reinitCellBoardItems(values);
            });
        }

        function getStateConfig(stateName) {
            return {
                url: '/cb/' + stateUtilService.getSubState(stateName),
                template: '<env-control/>'
            }
        }
    }]);