angular.module(asterics.appComponents).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state(asterics.envControl.STATE_MAIN, {
            url: '/envcontrol',
            templateUrl: 'angular/envControl/component/envControlContainer.html'
        })
        .state("envControl.add", {
            url: '/add',
            template: '<env-control-add/>'
        })
        .state("envControl.addsub", {
            url: '/addsub/:cellBoardId',
            template: '<env-control-add-sub/>'
        })
        .state("envControl.add.fs20", {
            url: '/fs20/:cellBoardId',
            template: '<env-control-add-fs/>'
        })
        .state("envControl.add.ir", {
            url: '/ir/:cellBoardId',
            template: '<env-control-add-ir/>'
        })
        .state("envControl.add.lamp", {
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
        $stateProvider.state('envControl.add.' + substateName, configObject);
    }
}]);