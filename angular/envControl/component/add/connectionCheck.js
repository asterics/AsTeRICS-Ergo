angular.module(asterics.appComponents)
    .component('connectionCheck', {
        bindings: {},
        controller: ['$stateParams', 'utilService', 'envControlHelpDataService', '$translate', '$state', 'hardwareService', '$timeout', function ($stateParams, utilService, envControlHelpDataService, $translate, $state, hardwareService, $timeout) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_ADD)];
            thiz.connectedHardware = null;
            thiz.notConnected = {};
            thiz.deviceId = $stateParams.device;
            thiz.headerI18n = $stateParams.headerI18n || 'i18n_ec_irmass_header_' + thiz.deviceId;
            thiz.headerI18nParams = {device: $stateParams.cellBoardName};
            var _somethingNotified = false;

            thiz.$onInit = function () {
                thiz.i18nArgDevice = {
                    device: $translate.instant('i18n_ec_' + thiz.deviceId)
                };
                thiz.possibleHardware = envControlHelpDataService.getComputerConfiguredHardwarePossibilities(thiz.deviceId);

                //TODO: remove this
                //only temporary solution to make table-lamp working as always
                //-> needs implementation to also allow to configure a table lamp e.g. with IRTrans or Flipmouse.
                if (thiz.deviceId == asterics.envControl.DEVICE_TABLELAMP || thiz.deviceId == asterics.envControl.DEVICE_PLUG_GENERIC) {
                    thiz.possibleHardware = _.without(thiz.possibleHardware, asterics.envControl.HW_IR_FLIPMOUSE, asterics.envControl.HW_IRTRANS_USB);
                }

                hardwareService.getOneConnectedHardware(thiz.possibleHardware).then(function (response) {
                    if (response) {
                        thiz.connectedHardware = response;
                        thiz.notConnected[thiz.connectedHardware.getName()] = false;
                        var timeout = _somethingNotified ? 500 : 0;
                        var params = angular.copy($stateParams);
                        params.headerI18n = thiz.headerI18n;
                        $timeout(function () {
                            params.hardware = thiz.connectedHardware;
                            $state.go(asterics.envControl.STATE_ADD + '.' + thiz.deviceId, params);
                        }, timeout);
                    } else {
                        $timeout(function () {
                            $state.go(asterics.envControl.STATE_NO_HARDWARE_FOUND, params);
                        }, 500);
                    }
                }, function error() {

                }, function notifiy(hardware) {
                    _somethingNotified = true;
                    thiz.notConnected[hardware] = true;
                });
            };
        }],
        templateUrl: "angular/envControl/component/add/connectionCheck.html"
    });