angular.module(asterics.appServices)
    .service('envControlDataService', ['areService', 'envControlUtilService', function (areService, envControlUtilService) {
        var thiz = this;
        var _cellBoardElements = [envControlUtilService.createCellBoardItemFs20('Lampe1', 'lightbulb-o', '11111111_1111')];

        thiz.getCellBoardElements = function() {
            return _cellBoardElements;
        };

        thiz.addCellBoardElement = function(title, faIcon, code) {
            var element = envControlUtilService.createCellBoardItemFs20(title, faIcon, code);
            _cellBoardElements.push(element);
        };

        thiz.getNewFs20Code = function() {
            var codesString = _.map(_cellBoardElements, 'code');
            var codes = _.map(codesString, function(elem) {return parseInt(elem.substr(-4))});
            var housecode = codesString[0].split('_')[0];
            var max = _.max(codes);
            return housecode + '_' + (max+1);
        };
    }]);