angular.module(asterics.appServices)
    .service('envControlDataService', ['areSaveService', 'utilService', 'envControlUtilService', 'stateUtilService', '$q' , 'hardwareService', function (areSaveService, utilService, envControlUtilService, stateUtilService, $q, hardwareService) {
        var thiz = this;
        var _dataFilename = "ecdata";
        var _saveTimestamp = -1;
        var _initDeferred = $q.defer();

        var _cellBoards = {};
        _cellBoards[asterics.envControl.STATE_MAIN] = [];
        var _cellBoardDeviceMapping = {};
        var _dynamicCellBoardIds = [];
        var _additionalDeviceData = {};
        var _clipBoard = {};
        var _undoCellBoards = {};
        var _deletedElements = []; //stores recently deleted elements that will be used to call a possible delete handler
        var _callbackToCallOnNewData = null;

        thiz.getCellBoard = function (cellBoardName) {
            processDeleteHandlers();
            var def = $q.defer();
            _initDeferred.promise.then(function () {
                def.resolve(_cellBoards[cellBoardName]);
            });
            return def.promise;
        };

        thiz.addCellBoardElementPlug = function (title, faIcon, code, cellBoard, plugHardware) {
            if (!cellBoard) {
                cellBoard = asterics.envControl.STATE_MAIN;
            }
            var element = envControlUtilService.createCellBoardItemPlugDevice(title, faIcon, code, plugHardware);
            _cellBoards[cellBoard].push(element);
        };

        thiz.getAdditionalDeviceData = function (hardwareId) {
            return _additionalDeviceData[hardwareId];
        };

        thiz.setAdditionalDeviceData = function(data, hardwareId) {
            if(!hardwareId) {
                return;
            }
            _additionalDeviceData[hardwareId] = data;
        };

        thiz.addCellBoardElementIr = function (title, faIcon, code, cellBoard, irHardware) {
            if (!cellBoard) {
                cellBoard = asterics.envControl.STATE_MAIN;
            }
            var element = envControlUtilService.createCellBoardItemIrDevice(title, faIcon, code, irHardware);
            _cellBoards[cellBoard].push(element);
        };

        thiz.removeCellBoardElement = function (cellBoardName, element) {
            processDeleteHandlers();
            _deletedElements = [element];
            _undoCellBoards = angular.copy(_cellBoards);
            _cellBoards[cellBoardName] = _.without(_cellBoards[cellBoardName], element);
            if (element.type === asterics.const.CB_TYPE_SUBCB && element.toState) {
                _deletedElements = _deletedElements.concat(_cellBoards[element.toState]);
                _cellBoards[element.toState] = []; //delete items of sub-cellboard
                delete _cellBoards[element.toState];
                _.pull(_dynamicCellBoardIds, element.toState);
            } else if (element.type === asterics.envControl.HW_FS20_PCSENDER && element.code) {
                _.pull(_additionalDeviceData[element.type], element.code);
            }
            thiz.saveData();
            return _cellBoards[cellBoardName];
        };

        thiz.undoRemove = function () {
            _cellBoards = _undoCellBoards;
            _deletedElements = [];
            thiz.saveData();
        };

        thiz.addSubCellboard = function (title, faIcon, parentCellBoardState, deviceType) {
            title = title.replace(/\./g, ' ').replace(/\//g, ' ').replace(/\s\s+/g, ' '); // remove slashes and dots with whitespaces in order to not interfere with states and paths
            var newStateName = stateUtilService.getNewSubStateName(parentCellBoardState, title);
            var navToCbElement = utilService.createCellBoardItemSubCb(title, faIcon, newStateName);
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
            if(!label) {
                return false;
            }
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
            data._additionalDeviceData = _additionalDeviceData;
            _saveTimestamp = areSaveService.saveData(_dataFilename, data);
        };

        thiz.hasData = function() {
            return _cellBoards[asterics.envControl.STATE_MAIN].length > 0;
        };

        /**
         * processes possible previously deleted items to call their delete handlers
         * is not called directly in delete thiz.removeCellBoardElement because it is possible that the deletion is undone
         */
        function processDeleteHandlers() {
            if(!_.isEmpty(_deletedElements)) {
                _deletedElements.forEach(function (element) {
                    if(_.includes(asterics.envControl.COMPUTER_HARDWARE, element.type)) {
                        hardwareService.handleDelete(element.type, element);
                    }
                });
                _deletedElements = [];
            }
        }

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
            areSaveService.getSavedData(_dataFilename).then(function (response) {
                if (response) {
                    setNewData(response);
                } else {
                    thiz.saveData(); // save (empty) data, if nothing existing
                }
                promise1.resolve();
            }, function error() {
                thiz.saveData(); // save (empty) data, if nothing existing
                promise1.resolve();
            });
            areSaveService.getLastModificationDate(_dataFilename).then(function (response) {
                _saveTimestamp = response;
                promise2.resolve();
            });
            areSaveService.registerForUpdates(_dataFilename, setNewData, function () {
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
                _additionalDeviceData = data._additionalDeviceData || _additionalDeviceData;
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