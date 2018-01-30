angular.module(asterics.appComponents)
    .component('envControlHelpIrtrans', {
        bindings: {},
        controller: ['utilService', '$stateParams', '$state', function (utilService, $stateParams, $state) {
            var thiz = this;
            thiz.singlePageMode = !!$stateParams.singlePageMode;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.irtransLinks = asterics.envControl.LINKS[asterics.envControl.HW_IRTRANS_USB];
            thiz.usbcableLinks = asterics.envControl.LINKS[asterics.envControl.HW_USB_CABLE_AB];

            thiz.goToInstall = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_IRTRANS_USB);
            };
        }],
        templateUrl: "angular/envControl/component/help/hardware/pages/HW_IRTRANS_USB.html"
    });