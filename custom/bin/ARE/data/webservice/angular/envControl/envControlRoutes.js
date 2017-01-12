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
        .state("envControl.add.tv", {
            url: '/tv',
            template: '<env-control-add-mass learn-items="$resolve.learnItems" selected-label="$resolve.selectedLabel"/>',
            resolve: {
                learnItems: function (envControlUtilService) {
                    return envControlUtilService.getIrElementsTv();
                },
                selectedLabel: function () { //TODO: inject $translate and translate
                    return 'Fernseher'
                }
            }
        })
        .state("envControl.add.fs20", {
            url: '/fs20',
            template: '<env-control-add-fs/>'
        })
        .state("envControl.add.ir", {
            url: '/ir',
            template: '<env-control-add-ir/>'
        });
}]);