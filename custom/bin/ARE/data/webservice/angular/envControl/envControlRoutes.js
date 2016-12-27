angular.module(asterics.appComponents).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state("envControl", {
            url: '/envcontrol',
            template: '<env-control/>'
        });
}]);