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
            thiz.neededHardwareTooltips = {};
            thiz.listeners = [];

            thiz.selectedDevicesChanged = function (deviceChanged, keepnumbers) {
                thiz.listeners.forEach(function (listener) {
                    if(_.isFunction(listener)) {
                        listener(deviceChanged, keepnumbers);
                    }
                });
                getTooltipLines();
            };

            thiz.onAmountBlur = function (deviceChanged) {
                if (thiz.deviceSelectionMap[deviceChanged] && !thiz.deviceSelectionMap[deviceChanged].amount) {
                    thiz.deviceSelectionMap[deviceChanged].amount = 1;
                    thiz.selectedDevicesChanged(deviceChanged);
                }
            };

            thiz.isDeviceWithAdditionalInfo = function (device) {
                return _.includes([asterics.envControl.DEVICE_IR_GENERIC, asterics.envControl.DEVICE_PLUG_GENERIC], device);
            };

            thiz.registerListener = function(fn) {
                thiz.listeners.push(fn);
            };

            init();
            function init() {
                thiz.deviceSelectionMap = envControlHelpDataService.getDeviceSelectionMap();
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
            }
        }],
        templateUrl: "angular/envControl/component/help/assistant/envControlHelpSelect.html"
    })
;