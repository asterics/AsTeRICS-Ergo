angular.module(asterics.appComponents)
    .component('envControlAddMore', {

        bindings: {},
        controller: ['utilService', 'envControlUtilService', function (utilService, envControlUtilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_ADD)];
            thiz.cellBoardChoose = [
                getNavItem(asterics.envControl.DEVICE_PLUG_GENERIC, false),
                getNavItem(asterics.envControl.DEVICE_IR_CMD_GENERIC, true),
                getNavItem(asterics.envControl.DEVICE_IR_GENERIC, true)
            ];

            function getNavItem(device, hasTooltip) {
                var stateParams = getStateParams(device);
                var icon = envControlUtilService.getIcon(device);
                var label = 'i18n_ec_' + device;
                var item = utilService.createCellBoardItemNav(label, icon, asterics.envControl.STATE_CONNECTION_CHECK, stateParams);
                if(hasTooltip) {
                    item.tooltip = 'i18n_ec_' + device + '_tooltip';
                }
                return item;
            }

            function getStateParams(device) {
                return {
                    deviceId: device
                }
            }
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddMore.html"
    });