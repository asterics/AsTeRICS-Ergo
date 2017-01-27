var asterics = {};
asterics.app = 'astericsApp';
asterics.appServices = asterics.app + ".services";
asterics.appComponents = asterics.app + ".components";
asterics.appControllers = asterics.app + ".controllers";

angular.module(asterics.app, [
    'ui.router',
    'pascalprecht.translate',
    asterics.appServices,
    asterics.appComponents
]).config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function ($stateProvider, $urlRouterProvider, $translateProvider) {

    $translateProvider.translations(asterics.const.I18N_DE, {
        BLA: 'BLA DEUTSCH',
        i18n_choose_lang: 'Sprache wählen:',
        i18n_lang_de: 'Deutsch',
        i18n_lang_en: 'Englisch'
    });

    $translateProvider.translations(asterics.const.I18N_EN, {
        BLA: 'BLA ENGLISH',
        i18n_choose_lang: 'Choose language:',
        i18n_lang_de: 'German',
        i18n_lang_en: 'English'
    });

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