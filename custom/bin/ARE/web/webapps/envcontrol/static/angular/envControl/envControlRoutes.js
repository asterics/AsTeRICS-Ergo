angular.module(asterics.appComponents).config(['$stateProvider', '$translateProvider', function ($stateProvider, $translateProvider) {

    $translateProvider.translations(asterics.const.I18N_DE, asterics.i18n_envControl_de);
    $translateProvider.translations(asterics.const.I18N_EN, asterics.i18n_envControl_en);

    $stateProvider
        .state(asterics.envControl.STATE_MAIN, {
            url: '/envcontrol?showConfig?fs20?irtrans?flipmouse',
            template: '<env-control-container/>'
        })
        .state(asterics.envControl.STATE_HELP, {
            url: '/help',
            template: '<env-control-help/>'
        })
        .state(asterics.envControl.STATE_HELP_DEVICES, {
            url: '/help/devices',
            template: '<env-control-help-select/>'
        })
        .state(asterics.envControl.STATE_HELP_HARDWARE, {
            url: '/help/hardware/:hardwareId',
            template: '<hardware-help-menu/>',
        })
        .state(asterics.envControl.STATE_HELP_INSTALL, {
            url: '/help/install/:hardwareId',
            template: '<install-help-menu/>',
            params: {
                skipConnectionTest: null
            }
        })
        .state(asterics.envControl.STATE_HELP_FAQ, {
            url: '/help/faq/:open',
            template: '<env-control-help-faq/>'
        })
        .state(asterics.envControl.STATE_ADD, {
            url: '/add',
            template: '<env-control-add/>'
        })
        .state(asterics.envControl.STATE_ADDMORE, {
            url: '/add/more',
            template: '<env-control-add-more/>'
        })
        .state(asterics.envControl.STATE_ADDSUB, {
            url: '/addsub/:cellBoardId',
            template: '<env-control-add-sub/>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_ADD_PLUG_GENERIC, {
            url: '/pluggeneric/:cellBoardId',
            template: '<add-plug-device-ir-plug>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_ADD_PLUG_GENERIC + asterics.envControl.HW_FS20_PCSENDER, {
            url: '/pluggeneric/' + asterics.envControl.HW_FS20_PCSENDER + '/:cellBoardId',
            template: '<env-control-add-fs>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_ADD_IR_GENERIC, {
            url: '/irgeneric/:cellBoardId',
            template: '<env-control-add-ir is-device-learn="true"/>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_ADD_IR_CMD_GENERIC, {
            url: '/ircmdgeneric/:cellBoardId',
            template: '<env-control-add-ir/>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_ADD_LAMP + asterics.envControl.HW_FS20_PCSENDER, {
            url: '/lamp/' + asterics.envControl.HW_FS20_PCSENDER,
            template: '<env-control-add-fs/>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_ADD_LAMP, {
            url: '/lamp',
            template: '<add-plug-device-ir-plug/>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_NO_HARDWARE_FOUND, {
            url: '/nohardware',
            template: '<no-hardware-found/>',
            params: getAddParams()
        })
        .state(asterics.envControl.STATE_CONNECTION_CHECK, {
            url: '/connectioncheck/:cellBoardId',
            template: '<connection-check/>',
            params: getAddParams()
        });

    configRouteAddIrMass(asterics.envControl.DEVICE_AMB_LAMP);
    configRouteAddIrMass(asterics.envControl.DEVICE_TV);
    configRouteAddIrMass(asterics.envControl.DEVICE_DVD);
    configRouteAddIrMass(asterics.envControl.DEVICE_HIFI);
    configRouteAddIrMass(asterics.envControl.DEVICE_IR_NUMBERS);

    function configRouteAddIrMass(deviceId) {
        var configObject = {
            url: '/' + deviceId + '/:cellBoardId',
            template: '<env-control-add-mass/>',
            params: getAddParams()
        };
        $stateProvider.state(asterics.envControl.STATE_ADD + '.' + deviceId, configObject);
    }

    function getAddParams() {
        return {
            headerI18n: null,
            device: null,
            hardware: null,
            cellBoardName: null
        }
    }
}]);