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
                'home.envControl.addsub': 'Neues Element',
                'home.envControl.add.tv': 'Fernseher',
                'home.envControl.add.dvd': 'DVD-Player',
                'home.envControl.add.hifi': 'Musik-Player',
                'home.envControl.add.numbers': 'Nummern',
                'home.envControl.add.fs20': 'Steckdose',
                'home.envControl.add.ir': 'Fernbedienung',
            };

            thiz.getStateTitle = function (stateName) {
                var title = thiz.stateTitles[stateName];
                if (!title) {
                    if (stateName === asterics.envControl.STATE_ADD) {

                    }
                    title = stateUtilService.getLastPartUpper(stateName);
                }
                return title;
            };

            init();
            function init() {
                $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                    thiz.breadCrumbStates = stateUtilService.getBreadCrumbStates();
                    if (to.name === asterics.envControl.STATE_ADDSUB) {
                        thiz.breadCrumbStates.splice(thiz.breadCrumbStates.length - 1, 0, toParams.cellBoardId);
                    } else if (_.includes(to.name, asterics.envControl.STATE_ADD) && toParams.cellBoardId) {
                        thiz.breadCrumbStates.splice(thiz.breadCrumbStates.length - 2, 0, toParams.cellBoardId);
                    }
                });
            }
        }],
        templateUrl: "angular/global/component/mainHeader.html"
    });