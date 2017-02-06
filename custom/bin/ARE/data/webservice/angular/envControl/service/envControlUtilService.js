angular.module(asterics.appServices)
    .service('envControlUtilService', ['envControlFsService', 'envControlIRService', 'utilService', function (envControlFsService, envControlIRService, utilService) {
        var thiz = this;

        thiz.createCellBoardItemFs20 = function (title, faIcon, code) {
            var element = utilService.createCellBoardItem(title, faIcon, asterics.envControl.CB_TYPE_FS20, function () {
                envControlFsService.fs20Toggle(code);
            });
            element.code = code;
            element.tooltip = 'i18n_ec_tooltip_click_fs20';
            element.tooltipParams = {device: title};
            return element;
        };

        thiz.createCellBoardItemIrTrans = function (title, faIcon, code) {
            var element = utilService.createCellBoardItem(title, faIcon, asterics.envControl.CB_TYPE_IR, function () {
                envControlIRService.irSend(code);
            });
            element.code = code;
            return element;
        };

        thiz.createCellBoardItemNavSubcellboard = function (title, faIcon, navState, stateParams) {
            var element = utilService.createCellBoardItemNav(title, faIcon, navState, stateParams);
            element.toState = navState;
            element.tooltip = 'i18n_ec_tooltip_click_subcb';
            element.tooltipParams = {device: title};
            return element;
        };

        thiz.getIrElements = function (substateName) {
            switch (substateName) {
                case asterics.envControl.SUBSTATE_ADD_TV:
                    return [
                        createIrElement('i18n_ec_onoff', 'power-off'),
                        createIrElement('i18n_ec_canalplus', 'arrow-up'),
                        createIrElement('i18n_ec_canalminus', 'arrow-down'),
                        createIrElement('i18n_ec_volplus', 'volume-up'),
                        createIrElement('i18n_ec_volminus', 'volume-down')
                    ];
                case asterics.envControl.SUBSTATE_ADD_HIFI:
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
                case asterics.envControl.SUBSTATE_ADD_DVD:
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

        function createIrElement(label, icon) {
            return {
                label: label,
                icon: icon
            };
        }
    }]);