angular.module(asterics.appComponents).config(['$stateProvider', '$translateProvider', function ($stateProvider, $translateProvider) {

    $translateProvider.translations(asterics.const.I18N_DE, asterics.i18n_envControl_de);
    $translateProvider.translations(asterics.const.I18N_EN, asterics.i18n_envControl_en);

    $stateProvider
        .state(asterics.envControl.STATE_MAIN, {
            url: '/envcontrol?showMockConfig?mockFs20Connected?mockIrConnected',
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
            template: '<ec-help-install-irtrans/>'
        })
        .state(asterics.envControl.STATE_HELP_INSTALL_FS20, {
            url: '/help/install/fs20',
            template: '<ec-help-install-fs20/>'
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
            }
        })
        .state(asterics.envControl.STATE_NO_HARDWARE_FOUND, {
            url: '/add/nohardware',
            template: '<no-hardware-found/>',
            params: {
                headerI18n: null,
                device: null,
                selectedHardware: null
            }
        });

    configRouteAddIrMass(asterics.envControl.DEVICE_AMB_LAMP, 'i18n_ec_amblight', 'sun-o');
    configRouteAddIrMass(asterics.envControl.DEVICE_TV, 'i18n_ec_tv', 'tv');
    configRouteAddIrMass(asterics.envControl.DEVICE_DVD, 'i18n_ec_dvd', 'circle');
    configRouteAddIrMass(asterics.envControl.DEVICE_HIFI, 'i18n_ec_hifi', 'music');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_NUMBERS, 'i18n_ec_numbers', 'th');

    function configRouteAddIrMass(substateName, selectedLabel, selectedIcon) {
        var configObject = {
            url: '/' + substateName + "/:cellBoardId",
            template: '<env-control-add-mass learn-items="$resolve.learnItems" selected-label="$resolve.selectedLabel" selected-icon="$resolve.selectedIcon"/>',
            resolve: {
                learnItems: function (envControlUtilService) {
                    return envControlUtilService.getIrElements(substateName);
                },
                selectedLabel: function ($translate) {
                    return $translate.instant(selectedLabel);
                },
                selectedIcon: function () {
                    return selectedIcon;
                }
            }
        };
        $stateProvider.state(asterics.envControl.STATE_ADD + '.' + substateName, configObject);
    }
}]);