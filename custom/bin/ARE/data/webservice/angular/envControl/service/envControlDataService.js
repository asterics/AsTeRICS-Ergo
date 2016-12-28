angular.module(asterics.appServices)
    .service('envControlDataService', ['areService', 'envControlUtilService', function (areService, envControlUtilService) {
        var thiz = this;
        var _cellBoardElements = [];
        var houseCode = '11111111';

        thiz.getCellBoardElements = function() {
            return _cellBoardElements;
        };

        thiz.addCellBoardElement = function(title, faIcon, code) {
            var element = envControlUtilService.createCellBoardItemFs20(title, faIcon, code);
            _cellBoardElements.push(element);
        };

        thiz.removeCellBoardElement = function(element) {
            _cellBoardElements = _.without(_cellBoardElements, element);
            return _cellBoardElements;
        };

        thiz.getNewFs20Code = function() {
            if(_cellBoardElements.length > 0) {
                var codesString = _.map(_cellBoardElements, 'code');
                var codes = _.map(codesString, function(elem) {return parseInt(elem.substr(-4))});
                housecode = codesString[0].split('_')[0];
                var max = _.max(codes);
                return housecode + '_' + (max+1);
            }
            return houseCode + '_1111';
        };
    }]);