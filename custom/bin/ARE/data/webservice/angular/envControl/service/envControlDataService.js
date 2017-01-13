angular.module(asterics.appServices)
    .service('envControlDataService', ['areService', 'utilService', 'envControlUtilService', 'stateUtilService', function (areService, utilService, envControlUtilService, stateUtilService) {
        var thiz = this;
        var _cellBoards = {};
        _cellBoards[asterics.envControl.STATE_MAIN] = [];
        var houseCode = '11111111';

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
            if(element.type === asterics.const.CB_TYPE_NAV && element.toState) {
                _cellBoards[element.toState] = []; //delete items of sub-cellboard
            }
            return _cellBoards[cellBoardName];
        };

        thiz.addSubCellboard = function (title, faIcon, parentCellBoardState) {
            title = title.replace(/\./g, ' ').replace(/\//g, ' ').replace(/\s\s+/g, ' '); // remove slashes and dots in order to not interfere with states and paths
            if (!parentCellBoardState) {
                parentCellBoardState = asterics.envControl.STATE_MAIN;
            }
            var newStateName = stateUtilService.addSubState(parentCellBoardState, title);
            var navToCbElement = utilService.createCellBoardItemNav(title, faIcon, newStateName);
            navToCbElement.toState = newStateName;
            thiz.addCellBoardElement(parentCellBoardState, navToCbElement);
            initCellBoard(newStateName);
            stateUtilService.addState(newStateName, {
                url: '/cb/' + stateUtilService.getSubState(newStateName),
                template: '<env-control/>'
            });
            return newStateName;
        };

        thiz.getNewFs20Code = function () {
            var cellBoardElements = getAllCellBoardElements();
            if (_.filter(cellBoardElements, {type: asterics.envControl.CB_TYPE_FS20}).length > 0) {
                var codesString = _.map(cellBoardElements, 'code');
                var codes = _.map(codesString, function (elem) {
                    return parseInt(elem.substr(-4))
                });
                housecode = codesString[0].split('_')[0];
                var max = _.max(codes);
                return housecode + '_' + (max + 1);
            }
            return houseCode + '_1111';
        };

        function initCellBoard(cellBoardName) {
            if (!_cellBoards[cellBoardName]) {
                _cellBoards[cellBoardName] = [];
            }
        }

        function getAllCellBoardElements() {
            var list = [];
            _.forOwn(_cellBoards, function (values) {
                list = list.concat(values);
            });
            return list;
        }
    }]);