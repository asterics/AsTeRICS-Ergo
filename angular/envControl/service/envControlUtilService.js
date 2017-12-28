angular.module(asterics.appServices)
    .service('envControlUtilService', ['envControlFsService', 'envControlIRService', 'utilService', '$timeout', '$anchorScroll', function (envControlFsService, envControlIRService, utilService, $timeout ,$anchorScroll) {
        var thiz = this;

        thiz.createCellBoardItemFs20 = function (title, faIcon, code) {
            var element = utilService.createCellBoardItem(title, faIcon, asterics.envControl.CB_TYPE_FS20, function () {
                envControlFsService.fs20Toggle(code);
            });
            element.code = code;
            element.tooltip = 'i18n_ec_tooltip_click_fs20';
            element.tooltipParams = {device: title};
            element.class = 'action-button';
            return element;
        };

        thiz.createCellBoardItemIrTrans = function (title, faIcon, code) {
            var element = utilService.createCellBoardItem(title, faIcon, asterics.envControl.CB_TYPE_IR, function () {
                envControlIRService.irSend(code);
            });
            element.code = code;
            element.class = 'action-button';
            return element;
        };

        thiz.createCellBoardItemNavSubcellboard = function (title, faIcon, toState, stateParams) {
            var element = utilService.createCellBoardItemSubCb(title, faIcon, toState, stateParams);
            element.toState = toState;
            element.tooltip = 'i18n_ec_tooltip_click_subcb';
            element.tooltipParams = {device: title};
            element.class = 'subfolder-button';
            return element;
        };

        thiz.reinitCellBoardItems = function (items) {
            var reinitList = [];
            angular.forEach(items, function (item) {
                var newItem;
                if (item.type === asterics.const.CB_TYPE_SUBCB) {
                    newItem = thiz.createCellBoardItemNavSubcellboard(item.title, item.faIcon, item.toState);
                } else if (item.type === asterics.envControl.CB_TYPE_FS20) {
                    newItem = thiz.createCellBoardItemFs20(item.title, item.faIcon, item.code);
                } else if (item.type === asterics.envControl.CB_TYPE_IR) {
                    newItem = thiz.createCellBoardItemIrTrans(item.title, item.faIcon, item.code);
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
                case asterics.envControl.SUBSTATE_ADD_NUMBERS:
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

        thiz.scrollToEnd = function() {
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