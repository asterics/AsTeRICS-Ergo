angular.module(asterics.appComponents)
    .component('envControlHelpIrtrans', {
        bindings: {},
        controller: ['utilService', '$stateParams', '$state', function (utilService, $stateParams, $state) {
            var thiz = this;
            var uriStateParams = decodeURI($stateParams.backStateParams);
            var backStateParams;
            if (uriStateParams) {
                backStateParams = angular.fromJson(uriStateParams);
            }
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack($stateParams.backState, backStateParams)];

            thiz.goToInstall = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_IRTRANS_USB, {
                    backState: $state.current.name,
                    backStateParams: uriStateParams
                });
            };
        }],
        templateUrl: "angular/envControl/component/help/controls/envControlHelpIrtrans.html"
    });