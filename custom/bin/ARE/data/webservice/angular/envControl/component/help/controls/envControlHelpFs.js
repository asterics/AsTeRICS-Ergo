angular.module(asterics.appComponents)
    .component('envControlHelpFs', {
        bindings: {},
        controller: ['utilService', '$stateParams', function (utilService, $stateParams) {
            var thiz = this;
            var uriStateParams = decodeURI($stateParams.backStateParams);
            var backStateParams;
            if (uriStateParams) {
                backStateParams = angular.fromJson(uriStateParams);
            }
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack($stateParams.backState, backStateParams)];
        }],
        templateUrl: "angular/envControl/component/help/controls/envControlHelpFs.html"
    });