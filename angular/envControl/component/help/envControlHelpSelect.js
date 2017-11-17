angular.module(asterics.appComponents)
    .component('envControlHelpSelect', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', 'envControlUtilService', 'stateUtilService', '$stateParams', function (utilService, $state, envControlHelpDataService, envControlUtilService, stateUtilService, $stateParams) {
            var thiz = this;
            thiz.singlePageMode = !!$stateParams.singlePageMode;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.devices = asterics.envControl.DEVICES;
            thiz.deviceSelectionMap = {};
            thiz.neededHardware = [];
            thiz.neededHardwareAmounts = {};
            thiz.alternativeHardare = {};
            thiz.alternativeHardwareDevices = [];

            thiz.selectedDevicesChanged = function (deviceChanged) {
                refreshNeededHardware(deviceChanged);
                if (!_.isEmpty(thiz.neededHardware) && stateUtilService.hasStateChangedSinceLastCall()) {
                    envControlUtilService.scrollToEnd();
                }
            };

            thiz.onAmountBlur = function (deviceChanged) {
                if (thiz.deviceSelectionMap[deviceChanged] && !thiz.deviceSelectionMap[deviceChanged].amount) {
                    thiz.deviceSelectionMap[deviceChanged].amount = 1;
                    thiz.selectedDevicesChanged(deviceChanged);
                }
            };

            thiz.getNeededHardware = function (device) {
                return envControlHelpDataService.getNeededHardware([device]);
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware);
            };

            thiz.isDeviceWithAdditionalInfo = function (device) {
                return _.includes([asterics.envControl.DEVICE_IR_GENERIC, asterics.envControl.DEVICE_PLUG_GENERIC], device);
            };

            thiz.getNeededAccessoires = function (hardwareName) {
                return envControlHelpDataService.getNeededAccessories(hardwareName);
            };

            init();

            function init() {
                thiz.deviceSelectionMap = envControlHelpDataService.getDeviceSelectionMap();
                refreshNeededHardware();
            }

            function refreshNeededHardware(deviceChanged) {
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
            }
        }],
        templateUrl: "angular/envControl/component/help/envControlHelpSelect.html"
    })
;