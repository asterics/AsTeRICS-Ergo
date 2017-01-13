angular.module(asterics.appComponents)
    .component('mainHeader', {

        bindings: {},
        controller: ['stateUtilService', '$rootScope', function (stateUtilService, $rootScope) {
            var thiz = this;
            thiz.breadCrumbStates = [];
            //TODO: replace with i18n
            thiz.stateTitles = {
                home: 'Home',
                'home.envControl': 'Umgebungssteuerung',
                'home.envControl.add': 'Neues Element',
                'home.envControl.add.tv': 'Fernseher',
                'home.envControl.add.dvd': 'DVD-Player',
                'home.envControl.add.hifi': 'Musik-Player',
                'home.envControl.add.numbers': 'Nummern'
            };
            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                thiz.breadCrumbStates = stateUtilService.getBreadCrumbStates();
            });
        }],
        templateUrl: "angular/global/component/mainHeader.html"
    });