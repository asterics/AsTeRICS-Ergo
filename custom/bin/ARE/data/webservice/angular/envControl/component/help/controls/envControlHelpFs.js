angular.module(asterics.appComponents)
    .component('envControlHelpFs', {
        bindings: {},
        controller: ['utilService', '$stateParams', '$state', function (utilService, $stateParams, $state) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.fs20senderLinks = asterics.envControl.LINKS[asterics.envControl.HW_FS20_PCSENDER];
            thiz.fs20plugLinks = asterics.envControl.LINKS[asterics.envControl.HW_FS20_PLUG];

            thiz.goToInstall = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_FS20_PCSENDER);
            };
        }],
        templateUrl: "angular/envControl/component/help/controls/envControlHelpFs.html"
    });