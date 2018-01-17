angular.module(asterics.appComponents)
    .component('envControlHelpSelect', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', 'envControlUtilService', 'stateUtilService', '$stateParams', '$translate', function (utilService, $state, envControlHelpDataService, envControlUtilService, stateUtilService, $stateParams, $translate) {
            var thiz = this;
            thiz.singlePageMode = !!$stateParams.singlePageMode;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.devices = asterics.envControl.DEVICES;
            thiz.deviceSelectionMap = {};
            thiz.neededHardware = [];
            thiz.neededHardwareAmounts = {};
            thiz.neededHardwareTooltips = {};
            thiz.alternativeHardare = {};
            thiz.alternativeHardwareForDevices = [];

            thiz.selectedDevicesChanged = function (deviceChanged, keepnumbers) {
                refreshNeededHardware(deviceChanged, keepnumbers);
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

            init();

            function init() {
                thiz.deviceSelectionMap = envControlHelpDataService.getDeviceSelectionMap();
                refreshNeededHardware();
            }

            function refreshNeededHardware(deviceChanged, keepNumbers) {
                if (!keepNumbers && thiz.deviceSelectionMap[deviceChanged]) {
                    if (thiz.deviceSelectionMap[deviceChanged].chosen) {
                        thiz.deviceSelectionMap[deviceChanged].amount = 1;
                    } else {
                        thiz.deviceSelectionMap[deviceChanged].amount = undefined;
                    }
                }
                thiz.neededHardwareAmounts = envControlHelpDataService.getNeededHardwareAmounts(thiz.deviceSelectionMap);
                getTooltipLines();
                thiz.neededHardware = Object.keys(thiz.neededHardwareAmounts);
                thiz.hardwareAlternatives = envControlHelpDataService.getHardwareAlternatives(thiz.neededHardware);
                thiz.alternativeHardare = envControlHelpDataService.getAlternatives(thiz.deviceSelectionMap);
                thiz.alternativeHardwareForDevices = Object.keys(thiz.alternativeHardare);
                envControlHelpDataService.setDeviceSelectionMap(thiz.deviceSelectionMap);
                thiz.showAlternatives = shouldShowAlternatives();
            }

            function shouldShowAlternatives() {
                return (thiz.hardwareAlternatives && thiz.hardwareAlternatives.length > 0) ||
                    (thiz.alternativeHardare && thiz.alternativeHardare.length > 0);
            }

            function getTooltipLines() {
                var devices = Object.keys(thiz.deviceSelectionMap);
                for (var i = 0; i < devices.length; i++) {
                    var device = devices[i];
                    var singleHardwareAmounts = envControlHelpDataService.getNeededHardwareAmounts(thiz.deviceSelectionMap, device);
                    if (_.isEmpty(singleHardwareAmounts)) {
                        thiz.neededHardwareTooltips[device] = '';
                    } else {
                        var deviceTranslated = $translate.instant('i18n_ec_' + device);
                        var str = $translate.instant('i18n_ec_tooltip_device_assistant', {
                            "amount": thiz.deviceSelectionMap[device].amount,
                            "device": deviceTranslated
                        });
                        var keys = Object.keys(singleHardwareAmounts);
                        for (var j = 0; j < keys.length; j++) {
                            var hwNameTranslated = $translate.instant('i18n_ec_' + keys[j]);
                            var deviceAmount = singleHardwareAmounts[keys[j]];
                            str += ' ' + deviceAmount + 'x ' + hwNameTranslated;
                            if (j != keys.length - 1) {
                                str += ",";
                            }
                        }
                        thiz.neededHardwareTooltips[device] = str;
                    }

                }
            };
        }],
        templateUrl: "angular/envControl/component/help/envControlHelpSelect.html"
    })
;