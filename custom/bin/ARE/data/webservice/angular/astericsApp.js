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
            url: '/home',
            template: '<main-menu/>'
        });
    $urlRouterProvider.otherwise('/home');
    asterics.$stateProvider = $stateProvider; //TODO: not save globally, but create service like here (tried it, but it did not work) http://stackoverflow.com/questions/25866387/angular-ui-router-programmatically-add-states
}]);

angular.module(asterics.appServices, []);
angular.module(asterics.appComponents, []);
angular.module(asterics.appControllers, []);