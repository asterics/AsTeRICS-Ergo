var asterics = {};
asterics.app = 'astericsApp';
asterics.appServices = asterics.app + ".services";
asterics.appComponents = asterics.app + ".components";
asterics.appControllers = asterics.app + ".controllers";

angular.module(asterics.app, [
    'ui.bootstrap',
    'ui.router',
    asterics.appServices,
    asterics.appComponents
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("home", {
            url: '/',
            template: 'homepage - START'
        });
    $urlRouterProvider.otherwise('/');
}]);

angular.module(asterics.appServices, []);
angular.module(asterics.appComponents, []);
angular.module(asterics.appControllers, []);