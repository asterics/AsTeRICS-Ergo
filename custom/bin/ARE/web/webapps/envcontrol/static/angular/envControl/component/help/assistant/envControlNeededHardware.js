angular.module(asterics.appComponents)
    .component('envControlNeededHardware', {
        bindings: {
            registerListener: '&',
            updateFunction: '&',
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
                envControlUtilService.goToHelp(hardware);
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
                if(_.isFunction(thiz.registerListener)) {
                    thiz.registerListener({fn: refreshNeededHardware});
                }
                refreshNeededHardware();
            };

            function refreshNeededHardware() {
                thiz.neededHardwareAmounts = envControlHelpDataService.getNeededHardwareAmounts(thiz.deviceSelectionMap);
                thiz.selectedCount = countSelected();
                thiz.neededHardware = Object.keys(thiz.neededHardwareAmounts);
                thiz.hardwareAlternatives = envControlHelpDataService.getHardwareAlternatives(thiz.neededHardware);
                thiz.alternativeHardare = envControlHelpDataService.getAlternatives(thiz.deviceSelectionMap);
                thiz.alternativeHardwareForDevices = Object.keys(thiz.alternativeHardare);
                thiz.showAlternatives = shouldShowAlternatives();
                var accessoires = envControlHelpDataService.getNeededAccessoriesForList(thiz.neededHardware);
                thiz.neededHardware = thiz.neededHardware.concat(accessoires);
                accessoires.forEach(function (accessoire) {
                    thiz.neededHardwareAmounts[accessoire] = 1;
                });
                if (!_.isEmpty(thiz.neededHardware) && stateUtilService.hasStateChangedSinceLastCall()) {
                    envControlUtilService.scrollToEnd();
                }
                if(_.isFunction(thiz.updateFunction)) {
                    thiz.updateFunction();
                }
            }

            function shouldShowAlternatives() {
                return (thiz.hardwareAlternatives && thiz.hardwareAlternatives.length > 0) ||
                    (thiz.alternativeHardare && Object.keys(thiz.alternativeHardare).length > 0);
            }

            function countSelected() {
                var keys = Object.keys(thiz.deviceSelectionMap);
                var count = 0;
                keys.forEach(function (key) {
                    if (thiz.deviceSelectionMap[key].chosen) {
                        count += thiz.deviceSelectionMap[key].amount;
                    }
                });
                return count;
            }
        }],
        templateUrl: "angular/envControl/component/help/assistant/envControlNeededHardware.html"
    })
;