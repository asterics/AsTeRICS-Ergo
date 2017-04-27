angular.module(asterics.appComponents)
    .component('envControlHelpIrtrans', {
        bindings: {},
        controller: ['utilService', '$stateParams', '$state', function (utilService, $stateParams, $state) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];

            thiz.goToInstall = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_IRTRANS_USB);
            };
        }],
        templateUrl: "angular/envControl/component/help/controls/envControlHelpIrtrans.html"
    });