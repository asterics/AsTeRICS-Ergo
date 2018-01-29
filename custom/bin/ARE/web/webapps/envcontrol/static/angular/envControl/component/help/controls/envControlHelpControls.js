angular.module(asterics.appComponents)
    .component('envControlHelpControls', {
        bindings: {
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', function (utilService, $state, envControlHelpDataService) {
            var thiz = this;
            thiz.currentState = encodeURI($state.current.name);
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
        templateUrl: "angular/envControl/component/help/controls/envControlHelpControls.html"
    });