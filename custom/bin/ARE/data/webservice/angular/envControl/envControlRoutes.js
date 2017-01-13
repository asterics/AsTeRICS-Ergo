angular.module(asterics.appComponents).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state(asterics.envControl.STATE_MAIN, {
            url: '/envcontrol',
            templateUrl: 'angular/envControl/component/envControlContainer.html'
        })
        .state(asterics.envControl.STATE_ADD, {
            url: '/add',
            template: '<env-control-add/>'
        })
        .state(asterics.envControl.STATE_ADDSUB, {
            url: '/addsub/:cellBoardId',
            template: '<env-control-add-sub/>'
        })
        .state(asterics.envControl.STATE_ADD_FS20, {
            url: '/fs20/:cellBoardId',
            template: '<env-control-add-fs/>'
        })
        .state(asterics.envControl.STATE_ADD_FS20, {
            url: '/ir/:cellBoardId',
            template: '<env-control-add-ir/>'
        })
        .state(asterics.envControl.STATE_ADD_LAMP, {
            url: '/lamp',
            template: '<env-control-add-fs selected-label="Lampe"/>'
        });

    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_TV, 'Fernseher', 'tv');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_DVD, 'DVD-Player', 'circle');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_HIFI, 'Musik-Player', 'music');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_NUMBERS, 'Nummern', 'th');

    function configRouteAddIrMass(substateName, selectedLabel, selectedIcon) {
        var configObject = {
            url: '/' + substateName + "/:cellBoardId",
            template: '<env-control-add-mass learn-items="$resolve.learnItems" selected-label="$resolve.selectedLabel" selected-icon="$resolve.selectedIcon"/>',
            resolve: {
                learnItems: function (envControlUtilService) {
                    return envControlUtilService.getIrElements(substateName);
                },
                selectedLabel: function () { //TODO: inject $translate and translate
                    return selectedLabel;
                },
                selectedIcon: function () {
                    return selectedIcon;
                }
            }
        };
        $stateProvider.state(asterics.envControl.STATE_ADD + '.' + substateName, configObject);
    }
}]);