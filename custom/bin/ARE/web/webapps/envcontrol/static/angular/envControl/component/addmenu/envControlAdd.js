angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', 'envControlUtilService', function (utilService, envControlUtilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_MAIN)];
            thiz.cellBoardChoose = [
                getNavItem(asterics.envControl.DEVICE_AMB_LAMP),
                getNavItem(asterics.envControl.DEVICE_TABLELAMP),
                getNavItem(asterics.envControl.DEVICE_TV),
                getNavItem(asterics.envControl.DEVICE_DVD),
                getNavItem(asterics.envControl.DEVICE_HIFI),
                utilService.createCellBoardItemNav('i18n_ec_more', 'plus', asterics.envControl.STATE_ADDMORE)
            ];

            function getNavItem(device) {
                var stateParams = getStateParams(device);
                var icon = envControlUtilService.getIcon(device);
                return utilService.createCellBoardItemNav('i18n_ec_' + device, icon, asterics.envControl.STATE_CONNECTION_CHECK, stateParams);
            }

            function getStateParams(device) {
                return {
                    deviceId: device
                }
            }
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAdd.html"
    });