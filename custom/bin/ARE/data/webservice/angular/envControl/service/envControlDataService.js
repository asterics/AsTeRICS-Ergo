angular.module(asterics.appServices)
    .service('envControlDataService', ['areService', 'utilService', 'envControlUtilService', function (areService, utilService, envControlUtilService) {
        var thiz = this;
        var _cellBoardElements = {};
        _cellBoardElements[asterics.envControl.STATE_MAIN] = [];
        var houseCode = '11111111';

        thiz.addCellBoardElementFs20 = function (title, faIcon, code, cellBoard) {
            if (!cellBoard) {
                cellBoard = envControlUtilService.getLastStateNoAdd();
            }
            var element = envControlUtilService.createCellBoardItemFs20(title, faIcon, code);
            _cellBoardElements[cellBoard].push(element);
        };

        thiz.addCellBoardElementIrTrans = function (title, faIcon, code, cellBoard) {
            if (!cellBoard) {
                cellBoard = envControlUtilService.getLastStateNoAdd();
            }
            var element = envControlUtilService.createCellBoardItemIrTrans(title, faIcon, code);
            _cellBoardElements[cellBoard].push(element);
        };

        thiz.getCellBoard = function (state) {
            return _cellBoardElements[state];
        };

        thiz.addSubCellboard = function (title, faIcon) {
            var parentCellBoardState = envControlUtilService.getLastStateNoAdd();
            var cellBoardName = parentCellBoardState + '.' + title.toLowerCase();
            var navToCbElement = utilService.createCellBoardItemNav(title, faIcon, cellBoardName);
            var backElement = utilService.createCellBoardItemBack(parentCellBoardState);
            _cellBoardElements[parentCellBoardState].unshift(navToCbElement);
            if (!_cellBoardElements[cellBoardName]) _cellBoardElements[cellBoardName] = [];
            _cellBoardElements[cellBoardName].unshift(backElement);
            asterics.$stateProvider.state(cellBoardName, {
                url: '/' + title.toLowerCase(),
                template: '<env-control/>'
            });
            return cellBoardName;
        };

        thiz.removeCellBoardElement = function (state, element) {
            _cellBoardElements[state] = _.without(_cellBoardElements[state], element);
            return _cellBoardElements[state];
        };

        //TODO
        thiz.getNewFs20Code = function () {
            if (_.filter(_cellBoardElements, {type: asterics.envControl.CB_TYPE_FS20}).length > 0) {
                var codesString = _.map(_cellBoardElements, 'code');
                var codes = _.map(codesString, function (elem) {
                    return parseInt(elem.substr(-4))
                });
                housecode = codesString[0].split('_')[0];
                var max = _.max(codes);
                return housecode + '_' + (max + 1);
            }
            return houseCode + '_1111';
        };
    }]);