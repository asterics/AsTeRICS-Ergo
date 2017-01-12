angular.module(asterics.appComponents).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state("envControl", {
            url: '/envcontrol',
            templateUrl: 'angular/envControl/component/envControlContainer.html'
        })
        .state("envControl.add", {
            url: '/add',
            template: '<env-control-add/>'
        })
        .state("envControl.add.fs20", {
            url: '/fs20',
            template: '<env-control-add-fs/>'
        })
        .state("envControl.add.ir", {
            url: '/ir',
            template: '<env-control-add-ir/>'
        })
        .state("envControl.add.lamp", {
            url: '/lamp',
            template: '<env-control-add-fs selected-label="Lampe"/>'
        });

    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_TV, 'Fernseher');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_DVD, 'DVD-Player');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_HIFI, 'Musik-Player');
    configRouteAddIrMass(asterics.envControl.SUBSTATE_ADD_NUMBERS, 'Nummern');

    function configRouteAddIrMass(substateName, selectedLabel) {
        var configObject = {
            url: '/' + substateName,
            template: '<env-control-add-mass learn-items="$resolve.learnItems" selected-label="$resolve.selectedLabel"/>',
            resolve: {
                learnItems: function (envControlUtilService) {
                    return envControlUtilService.getIrElements(substateName);
                },
                selectedLabel: function () { //TODO: inject $translate and translate
                    return selectedLabel;
                }
            }
        };
        $stateProvider.state('envControl.add.' + substateName, configObject);
    }
}]);