angular.module(asterics.appServices)
    .service('envControlUtilService', ['hardwareService', 'utilService', '$timeout', '$anchorScroll', function (hardwareService, utilService, $timeout, $anchorScroll) {
        var thiz = this;

        thiz.createCellBoardItemPlugDevice = function (title, faIcon, code, hardwareDevice) {
            var element = utilService.createCellBoardItem(title, faIcon, hardwareDevice, function () {
                hardwareService.sendToHardware(code, hardwareDevice);
            });
            element.code = code;
            element.tooltip = 'i18n_ec_tooltip_click_fs20';
            element.tooltipParams = {device: title};
            element.class = 'action-button';
            return element;
        };

        thiz.createCellBoardItemIrDevice = function (title, faIcon, code, hardwareDevice) {
            var element = utilService.createCellBoardItem(title, faIcon, hardwareDevice, function () {
                hardwareService.sendToHardware(code, hardwareDevice);
            });
            element.code = code;
            element.class = 'action-button';
            return element;
        };

        thiz.createCellBoardItemAdd = function (device, hasTooltip, stateParams) {
            stateParams = stateParams || {};
            stateParams.device = device;
            var icon = thiz.getIcon(device);
            var label = 'i18n_ec_' + device;
            var item = utilService.createCellBoardItemNav(label, icon, asterics.envControl.STATE_CONNECTION_CHECK, stateParams);
            if (hasTooltip) {
                item.tooltip = 'i18n_ec_' + device + '_tooltip';
            }
            return item;
        };

        thiz.reinitCellBoardItems = function (items) {
            var reinitList = [];
            angular.forEach(items, function (item) {
                var newItem;
                if (item.type === asterics.const.CB_TYPE_SUBCB) {
                    newItem = utilService.createCellBoardItemSubCb(item.title, item.faIcon, item.toState);
                } else if (item.type === asterics.envControl.HW_FS20_PCSENDER) {
                    newItem = thiz.createCellBoardItemPlugDevice(item.title, item.faIcon, item.code, asterics.envControl.HW_FS20_PCSENDER);
                } else if (item.type === asterics.envControl.HW_IRTRANS_USB) {
                    newItem = thiz.createCellBoardItemIrDevice(item.title, item.faIcon, item.code, asterics.envControl.HW_IRTRANS_USB);
                } else if (item.type === asterics.envControl.HW_IR_FLIPMOUSE) {
                    newItem = thiz.createCellBoardItemIrDevice(item.title, item.faIcon, item.code, asterics.envControl.HW_IR_FLIPMOUSE);
                }
                reinitList.push(newItem);
            });
            return reinitList;
        };

        thiz.getIrElements = function (substateName) {
            switch (substateName) {
                case asterics.envControl.DEVICE_AMB_LAMP:
                    return [
                        createIrElement('i18n_ec_on', 'sun-o'),
                        createIrElement('i18n_ec_off', 'moon-o'),
                        createIrElement('i18n_ec_dim_down', 'angle-double-down'),
                        createIrElement('i18n_ec_dim_up', 'angle-double-up')
                    ];
                case asterics.envControl.DEVICE_TV:
                    return [
                        createIrElement('i18n_ec_onoff', 'power-off'),
                        createIrElement('i18n_ec_canalplus', 'arrow-up'),
                        createIrElement('i18n_ec_canalminus', 'arrow-down'),
                        createIrElement('i18n_ec_volplus', 'volume-up'),
                        createIrElement('i18n_ec_volminus', 'volume-down')
                    ];
                case asterics.envControl.DEVICE_HIFI:
                    return [
                        createIrElement('i18n_ec_onoff', 'power-off'),
                        createIrElement('i18n_ec_play', 'play'),
                        createIrElement('i18n_ec_pause', 'pause'),
                        createIrElement('i18n_ec_stop', 'stop'),
                        createIrElement('i18n_ec_next', 'step-forward'),
                        createIrElement('i18n_ec_back', 'step-backward'),
                        createIrElement('i18n_ec_volplus', 'volume-up'),
                        createIrElement('i18n_ec_volminus', 'volume-down')
                    ];
                case asterics.envControl.DEVICE_DVD:
                    return [
                        createIrElement('i18n_ec_onoff', 'power-off'),
                        createIrElement('i18n_ec_play', 'play'),
                        createIrElement('i18n_ec_pause', 'pause'),
                        createIrElement('i18n_ec_stop', 'stop'),
                        createIrElement('i18n_ec_volplus', 'volume-up'),
                        createIrElement('i18n_ec_volminus', 'volume-down'),
                        createIrElement('i18n_ec_up', 'arrow-up'),
                        createIrElement('i18n_ec_down', 'arrow-down'),
                        createIrElement('i18n_ec_right', 'arrow-right'),
                        createIrElement('i18n_ec_left', 'arrow-left'),
                        createIrElement('i18n_ec_ok', 'check-circle-o')
                    ];
                case asterics.envControl.DEVICE_IR_NUMBERS:
                    return [
                        createIrElement('1', 'circle'),
                        createIrElement('2', 'circle'),
                        createIrElement('3', 'circle'),
                        createIrElement('4', 'circle'),
                        createIrElement('5', 'circle'),
                        createIrElement('6', 'circle'),
                        createIrElement('7', 'circle'),
                        createIrElement('8', 'circle'),
                        createIrElement('9', 'circle'),
                        createIrElement('0', 'circle')
                    ];
                default:
                    return;
            }
        };

        thiz.getIcon = function (device) {
            switch (device) {
                case asterics.envControl.DEVICE_AMB_LAMP:
                    return 'sun-o';
                case asterics.envControl.DEVICE_TV:
                    return 'tv';
                case asterics.envControl.DEVICE_HIFI:
                    return 'music';
                case asterics.envControl.DEVICE_DVD:
                    return 'circle';
                case asterics.envControl.DEVICE_TABLELAMP:
                    return 'lightbulb-o';
                case asterics.envControl.DEVICE_IR_GENERIC:
                    return 'building-o';
                case asterics.envControl.DEVICE_IR_CMD_GENERIC:
                    return 'wifi';
                case asterics.envControl.DEVICE_PLUG_GENERIC:
                    return 'plug';
                case asterics.envControl.DEVICE_IR_NUMBERS:
                    return 'th';
                default:
                    return;
            }
        };

        thiz.scrollToEnd = function () {
            $timeout(function () {
                $anchorScroll('end');
            });
        };

        function createIrElement(label, icon) {
            return {
                label: label,
                icon: icon
            };
        }
    }]);