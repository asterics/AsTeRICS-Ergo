angular.module(asterics.appComponents)
    .component('hardwareHelpMenu', {
        bindings: {
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', '$stateParams', function (utilService, $state, envControlHelpDataService, $stateParams) {
            var thiz = this;
            thiz.hardwareId = $stateParams.hardwareId;
            thiz.hardwareList = envControlHelpDataService.getHardwareWithHelp();
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];

            thiz.goToHelp = function (hardware) {
                var stateName = 'home.envControl.help/controls/' + hardware;
                if(!$state.get(stateName)) {
                    return;
                }
                $state.go(stateName);
            };
        }],
        templateUrl: "angular/envControl/component/help/hardware/hardwareHelpMenu.html"
    });