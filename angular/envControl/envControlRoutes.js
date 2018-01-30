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
            url: '/help/install',
            template: '<env-control-help-install/>'
        })
        .state(asterics.envControl.STATE_HELP_FAQ, {
            url: '/help/faq/:open',
            template: '<env-control-help-faq/>'
        })
        .state(asterics.envControl.STATE_HELP_INSTALL_IR, {
            url: '/help/install/irtrans',
            template: '<ec-help-install-irtrans/>',
            params: {
                skipConnectionTest: false
            }
        })
        .state(asterics.envControl.STATE_HELP_INSTALL_FS20, {
            url: '/help/install/fs20',
            template: '<ec-help-install-fs20/>',
            params: {
                skipConnectionTest: false
            }
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
            template: '<env-control-add-fs selected-icon="$resolve.selectedIcon"/>',
            resolve: {
                selectedIcon: function () {
                    return "plug";
                }
            },
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
        .state(asterics.envControl.STATE_ADD_LAMP, {
            url: '/lamp',
            template: '<env-control-add-fs selected-label="$resolve.selectedLabel" selected-icon="$resolve.selectedIcon"/>',
            resolve: {
                selectedLabel: function ($translate) {
                    return $translate.instant('i18n_ec_lamp');
                },
                selectedIcon: function () {
                    return "lightbulb-o";
                }
            },
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