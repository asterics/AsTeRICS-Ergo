angular.module(asterics.appComponents)
    .component('mainHeader', {

        bindings: {},
        controller: ['stateUtilService', '$rootScope', '$translate', '$stateParams', 'envControlDataService', function (stateUtilService, $rootScope, $translate, $stateParams, envControlDataService) {
            var thiz = this;
            thiz.singlePageMode = !!$stateParams.singlePageMode;
            thiz.breadCrumbStates = stateUtilService.getBreadCrumbStates();
            thiz.isMockMode = window.location.href.indexOf("mock.html") != -1;
            thiz.selectedLanguage = _.find(asterics.const.languages, function (lang) {
                    return _.includes(navigator.language, lang);
                }) || asterics.const.I18N_DE;
            $translate.use(thiz.selectedLanguage);

            thiz.getStateTitle = function (stateName) {
                var title = $translate.instant(stateName);
                if (!title || title === stateName) {
                    if (stateName === asterics.envControl.STATE_ADD) {
                        //TODO fix?!
                    }
                    title = stateUtilService.getLastPartUpper(stateName);
                }
                return title;
            };

            thiz.languageChanged = function () {
                $rootScope.$broadcast(asterics.const.EVENT_LANG_CHANGED, thiz.selectedLanguage);
                $translate.use(thiz.selectedLanguage);
            };

            thiz.goToSimpleVersion = function goToSimpleVersion() {
                var url = './simple/';
                if(asterics.const.IS_MOCK_MODE) {
                   url += '?' + encodeURIComponent(envControlDataService.getDataJSON());
                }
                window.location.replace(url);
            };

            thiz.showSimpleVersion = function() {
                return envControlDataService.hasData();
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