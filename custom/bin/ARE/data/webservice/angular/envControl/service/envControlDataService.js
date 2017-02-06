angular.module(asterics.appServices)
    .service('envControlDataService', ['areService', 'utilService', 'envControlUtilService', 'stateUtilService', 'envControlFsService', function (areService, utilService, envControlUtilService, stateUtilService, envControlFsService) {
        var thiz = this;
        var _cellBoards = {};
        _cellBoards[asterics.envControl.STATE_MAIN] = [];
        var _dynamicCellBoardIds = [];
        var _fs20Codes = [];
        var _clipBoard = {};

        thiz.getCellBoard = function (cellBoardName) {
            return _cellBoards[cellBoardName];
        };

        thiz.addCellBoardElement = function (cellBoardName, element) {
            initCellBoard(cellBoardName);
            _cellBoards[cellBoardName].unshift(element);
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
            _cellBoards[cellBoardName] = _.without(_cellBoards[cellBoardName], element);
            if (element.type === asterics.const.CB_TYPE_NAV && element.toState) {
                _cellBoards[element.toState] = []; //delete items of sub-cellboard
                _.pull(_dynamicCellBoardIds, element.toState);
            } else if (element.type === asterics.envControl.CB_TYPE_FS20 && element.code) {
                _.pull(_fs20Codes, element.code);
            }
            return _cellBoards[cellBoardName];
        };

        thiz.prepareCellBoardElementMove = function (cellBoardName, element) {
            if (thiz.hasClipboardData()) {
                _clipBoard.element.disabled = false;
            }
            _clipBoard.element = element;
            _clipBoard.cellBoardName = cellBoardName;
        };

        thiz.pasteCellBoardItem = function (cellBoardName) {
            if (thiz.hasClipboardData()) {
                _clipBoard.element.disabled = false;
                thiz.removeCellBoardElement(_clipBoard.cellBoardName, _clipBoard.element);
                thiz.addCellBoardElement(cellBoardName, _clipBoard.element);
                _clipBoard = {};
            }
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

        thiz.addSubCellboard = function (title, faIcon, parentCellBoardState) {
            title = title.replace(/\./g, ' ').replace(/\//g, ' ').replace(/\s\s+/g, ' '); // remove slashes and dots with whitespaces in order to not interfere with states and paths
            var newStateName = stateUtilService.getNewSubStateName(parentCellBoardState, title);
            var navToCbElement = envControlUtilService.createCellBoardItemNavSubcellboard(title, faIcon, newStateName);
            thiz.addCellBoardElement(parentCellBoardState, navToCbElement);
            initCellBoard(newStateName);
            stateUtilService.addState(newStateName, {
                url: '/cb/' + stateUtilService.getSubState(newStateName),
                template: '<env-control/>'
            });
            _dynamicCellBoardIds.push(newStateName);
            return newStateName;
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
            return _.includes(getAllSubCellBoardNames(parentState, true), label.toString().trim().toLowerCase());
        };

        thiz.getNumberOfElements = function (cellBoard) {
            return _cellBoards[cellBoard].length;
        };

        function initCellBoard(cellBoardName) {
            if (!_cellBoards[cellBoardName]) {
                _cellBoards[cellBoardName] = [];
            }
        }

        function getAllSubCellBoardNames(parentState, lowercase) {
            if (_dynamicCellBoardIds.length > 0) {
                var names = _.map(_dynamicCellBoardIds, function (state) {
                    var name = state.substring(parentState.length + 1);
                    if (lowercase) {
                        return name.toLowerCase();
                    } else {
                        return name;
                    }
                });
                return names;
            }
            return [];
        }

        function getAllCellBoardElements() {
            var list = [];
            _.forOwn(_cellBoards, function (values) {
                list = list.concat(values);
            });
            return list;
        }
    }]);