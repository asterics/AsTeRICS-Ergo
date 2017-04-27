angular.module(asterics.appComponents)
    .component('envControlHelpSelect', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', function (utilService, $state, envControlHelpDataService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.devices = asterics.envControl.DEVICES;
            thiz.deviceSelectionMap = {};
            thiz.neededHardware = [];
            thiz.neededHardwareAmounts = {};
            thiz.alternativeHardare = {};
            thiz.alternativeHardwareDevices = [];

            thiz.refreshNeededHardware = function (deviceChanged) {
                if (deviceChanged && thiz.deviceSelectionMap[deviceChanged]) {
                    if (thiz.deviceSelectionMap[deviceChanged].chosen) {
                        thiz.deviceSelectionMap[deviceChanged].amount = 1;
                    } else {
                        thiz.deviceSelectionMap[deviceChanged].amount = undefined;
                    }
                }
                thiz.neededHardwareAmounts = envControlHelpDataService.getNeededHardwareAmounts(thiz.deviceSelectionMap);
                thiz.neededHardware = Object.keys(thiz.neededHardwareAmounts);
                thiz.alternativeHardare = envControlHelpDataService.getAlternatives(thiz.deviceSelectionMap);
                thiz.alternativeHardwareDevices = Object.keys(thiz.alternativeHardare);
                envControlHelpDataService.setDeviceSelectionMap(thiz.deviceSelectionMap);
            };

            thiz.onAmountBlur = function (deviceChanged) {
                if (thiz.deviceSelectionMap[deviceChanged] && !thiz.deviceSelectionMap[deviceChanged].amount) {
                    thiz.deviceSelectionMap[deviceChanged].amount = 1;
                    thiz.refreshNeededHardware();
                }
            };

            thiz.getNeededHardware = function (device) {
                return envControlHelpDataService.getNeededHardware([device]);
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware);
            };

            init();
            function init() {
                thiz.deviceSelectionMap = envControlHelpDataService.getDeviceSelectionMap();
                thiz.refreshNeededHardware();
            }
        }],
        templateUrl: "angular/envControl/component/help/envControlHelpSelect.html"
    });