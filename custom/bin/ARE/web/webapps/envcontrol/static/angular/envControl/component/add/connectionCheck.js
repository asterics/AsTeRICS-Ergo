angular.module(asterics.appComponents)
    .component('connectionCheck', {
        bindings: {},
        controller: ['$stateParams', 'utilService', 'envControlHelpDataService', '$translate', '$state', 'ecDeviceService', '$timeout', function ($stateParams, utilService, envControlHelpDataService, $translate, $state, ecDeviceService, $timeout) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_ADD)];
            thiz.connectedHardware = null;
            thiz.notConnected = {};
            thiz.deviceId = $stateParams.deviceId;
            thiz.headerI18n = 'i18n_ec_irmass_header_' + thiz.deviceId;
            var _somethingNotified = false;

            thiz.$onInit = function () {
                thiz.i18nArgDevice = {
                    device: $translate.instant('i18n_ec_' + thiz.deviceId)
                };
                thiz.possibleHardware = envControlHelpDataService.getComputerConfiguredHardwarePossibilities(thiz.deviceId);
                ecDeviceService.getOneConnectedHardware(thiz.possibleHardware).then(function (response) {
                    if(response) {
                        thiz.connectedHardware = response;
                        thiz.notConnected[thiz.connectedHardware.getName()] = false;
                        var timeout = _somethingNotified ? 500 : 0;
                        $timeout(function () {
                            var params = {
                                headerI18n: thiz.headerI18n,
                                device: thiz.deviceId,
                                hardware: thiz.connectedHardware
                            };
                            $state.go(asterics.envControl.STATE_ADD + '.' + thiz.deviceId, params);
                        }, timeout);
                    } else {
                        $timeout(function () {
                            $state.go(asterics.envControl.STATE_NO_HARDWARE_FOUND, {
                                headerI18n: thiz.headerI18n,
                                device: thiz.deviceId
                            });
                        }, 500);
                    }
                }, function error () {

                }, function notifiy (hardware) {
                    _somethingNotified = true;
                    thiz.notConnected[hardware] = true;
                });
            };
        }],
        templateUrl: "angular/envControl/component/add/connectionCheck.html"
    });