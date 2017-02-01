angular.module(asterics.appComponents).config(['$stateProvider', '$translateProvider', function ($stateProvider, $translateProvider) {

    $translateProvider.translations(asterics.const.I18N_DE, asterics.i18n_envControl_de);
    $translateProvider.translations(asterics.const.I18N_EN, asterics.i18n_envControl_en);

    $stateProvider
        .state(asterics.envControl.STATE_MAIN, {
            url: '/envcontrol',
            templateUrl: 'angular/envControl/component/envControlContainer.html'
        })
        .state(asterics.envControl.STATE_HELP, {
            url: '/help',
            template: '<env-control-help/>'
        })
        .state(asterics.envControl.STATE_HELP_FS20, {
            url: '/help/fs20/:backState',
            template: '<env-control-help-fs/>'
        })
        .state(asterics.envControl.STATE_HELP_IRTRANS, {
            url: '/help/irtrans/:backState',
            template: '<env-control-help-irtrans/>'
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
            template: '<env-control-add-fs/>'
        })
        .state(asterics.envControl.STATE_ADD_IR, {
            url: '/ir/:cellBoardId',
            template: '<env-control-add-ir/>'
        })
        .state(asterics.envControl.STATE_ADD_LAMP, {
            url: '/lamp',
            template: '<env-control-add-fs selected-label="$resolve.selectedLabel"/>',
            resolve: {
                selectedLabel: function ($translate) {
                    return $translate.instant('i18n_ec_lamp');
                }
            }
        });

    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_TV, 'i18n_ec_tv', 'tv');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_DVD, 'i18n_ec_dvd', 'circle');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_HIFI, 'i18n_ec_hifi', 'music');
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