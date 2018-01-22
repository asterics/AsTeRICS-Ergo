angular.module(asterics.appComponents)
    .component('envControlNeededHardware', {
        bindings: {
            registerListener: '&',
            deviceSelectionMap: '<'
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', 'envControlUtilService', 'stateUtilService', function (utilService, $state, envControlHelpDataService, envControlUtilService, stateUtilService) {
            var thiz = this;
            thiz.neededHardware = [];
            thiz.neededHardwareAmounts = {};
            thiz.alternativeHardare = {};
            thiz.alternativeHardwareForDevices = [];

            thiz.getNeededHardware = function (device) {
                return envControlHelpDataService.getNeededHardware([device]);
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware);
            };

            thiz.getNeededAccessoires = function (hardwareName) {
                return envControlHelpDataService.getNeededAccessories(hardwareName);
            };

            thiz.replaceDeviceHardware = function (device) {
                envControlHelpDataService.replaceDeviceHardware(device);
                refreshNeededHardware();
            };

            thiz.replaceAlternativeHardware = function (alternative) {
                envControlHelpDataService.replaceAlternativeHardware(alternative);
                refreshNeededHardware();
            };

            thiz.resetAlternatives = function () {
                envControlHelpDataService.resetData();
                refreshNeededHardware();
            };

            thiz.isOriginalState = function () {
                return envControlHelpDataService.isOriginalState();
            };

            thiz.$onInit = function () {
                thiz.deviceSelectionMap = envControlHelpDataService.getDeviceSelectionMap();
                thiz.registerListener({fn: refreshNeededHardware});
                refreshNeededHardware();
            };

            function refreshNeededHardware(deviceChanged, keepNumbers) {
                if (!keepNumbers && thiz.deviceSelectionMap[deviceChanged]) {
                    if (thiz.deviceSelectionMap[deviceChanged].chosen) {
                        thiz.deviceSelectionMap[deviceChanged].amount = 1;
                    } else {
                        thiz.deviceSelectionMap[deviceChanged].amount = undefined;
                    }
                }
                thiz.neededHardwareAmounts = envControlHelpDataService.getNeededHardwareAmounts(thiz.deviceSelectionMap);
                thiz.selectedCount = countSelected();
                thiz.neededHardware = Object.keys(thiz.neededHardwareAmounts);
                thiz.hardwareAlternatives = envControlHelpDataService.getHardwareAlternatives(thiz.neededHardware);
                thiz.alternativeHardare = envControlHelpDataService.getAlternatives(thiz.deviceSelectionMap);
                thiz.alternativeHardwareForDevices = Object.keys(thiz.alternativeHardare);
                thiz.showAlternatives = shouldShowAlternatives();
                if (!_.isEmpty(thiz.neededHardware) && stateUtilService.hasStateChangedSinceLastCall()) {
                    envControlUtilService.scrollToEnd();
                }
            }

            function shouldShowAlternatives() {
                return (thiz.hardwareAlternatives && thiz.hardwareAlternatives.length > 0) ||
                    (thiz.alternativeHardare && thiz.alternativeHardare.length > 0);
            }

            function countSelected() {
                var keys = Object.keys(thiz.deviceSelectionMap);
                var count = 0;
                keys.forEach(function (key) {
                    if(thiz.deviceSelectionMap[key].chosen) {
                        count += thiz.deviceSelectionMap[key].amount;
                    }
                });
                return count;
            }
        }],
        templateUrl: "angular/envControl/component/help/assistant/envControlNeededHardware.html"
    })
;