angular.module(asterics.appComponents).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state("envControl", {
            url: '/envcontrol',
            templateUrl: 'angular/envControl/component/envControlContainer.html'
        })
        .state("envControl.add", {
            url: '/add',
            template: '<env-control-add/>'
        });
}]);