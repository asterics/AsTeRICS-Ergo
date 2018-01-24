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
        .state(asterics.envControl.STATE_HELP_CONTROLS, {
            url: '/help/controls',
            template: '<env-control-help-controls/>'
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
        .state(asterics.envControl.STATE_HELP_FS20, {
            url: '/help/controls/HW_FS20_PCSENDER',
            template: '<env-control-help-fs/>'
        })
        .state(asterics.envControl.STATE_HELP_FS20_PLUG, {
            url: '/help/controls/STATE_HELP_FS20_PLUG',
            template: '<env-control-help-fs/>'
        })
        .state(asterics.envControl.STATE_HELP_IRTRANS, {
            url: '/help/controls/HW_IRTRANS_USB',
            template: '<env-control-help-irtrans/>'
        })
        .state(asterics.envControl.STATE_HELP_IRBULB, {
            url: '/help/controls/HW_IR_BULB',
            template: '<env-control-help-irbulb/>'
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
            template: '<env-control-add-sub/>'
        })
        .state(asterics.envControl.STATE_ADD_FS20, {
            url: '/fs20/:cellBoardId',
            template: '<env-control-add-fs selected-icon="$resolve.selectedIcon"/>',
            resolve: {
                selectedIcon: function() {
                    return "plug";
                }
            }
        })
        .state(asterics.envControl.STATE_ADD_IR, {
            url: '/ir/:cellBoardId',
            template: '<env-control-add-ir/>'
        })
        .state(asterics.envControl.STATE_ADD_IR_DEVICE, {
            url: '/irdevice/:cellBoardId',
            template: '<env-control-add-ir is-device-learn="true"/>'
        })
        .state(asterics.envControl.STATE_ADD_LAMP, {
            url: '/lamp',
            template: '<env-control-add-fs selected-label="$resolve.selectedLabel" selected-icon="$resolve.selectedIcon"/>',
            resolve: {
                selectedLabel: function ($translate) {
                    return $translate.instant('i18n_ec_lamp');
                },
                selectedIcon: function() {
                    return "lightbulb-o";
                }
            },
            params: {
                headerI18n: null,
                device: null,
                hardware: null
            }
        })
        .state(asterics.envControl.STATE_NO_HARDWARE_FOUND, {
            url: '/nohardware',
            template: '<no-hardware-found/>',
            params: {
                headerI18n: null,
                device: null,
                selectedHardware: null
            }
        })
        .state(asterics.envControl.STATE_CONNECTION_CHECK, {
            url: '/connectioncheck',
            template: '<connection-check/>',
            params: {
                deviceId: null
            }
        });

    configRouteAddIrMass(asterics.envControl.DEVICE_AMB_LAMP);
    configRouteAddIrMass(asterics.envControl.DEVICE_TV);
    configRouteAddIrMass(asterics.envControl.DEVICE_DVD);
    configRouteAddIrMass(asterics.envControl.DEVICE_HIFI);

    function configRouteAddIrMass(deviceId) {
        var configObject = {
            url: '/' + deviceId,
            template: '<env-control-add-mass/>',
            params: {
                headerI18n: null,
                device: null,
                hardware: null
            }
        };
        $stateProvider.state(asterics.envControl.STATE_ADD + '.' + deviceId, configObject);
    }
}]);