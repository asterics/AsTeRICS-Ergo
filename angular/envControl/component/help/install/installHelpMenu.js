angular.module(asterics.appComponents)
    .component('installHelpMenu', {
        bindings: {},
        controller: ['utilService', '$state', 'envControlHelpDataService', '$stateParams', 'envControlUtilService', 'hardwareService', '$translate', '$rootScope', function (utilService, $state, envControlHelpDataService, $stateParams, envControlUtilService, hardwareService, $translate, $rootScope) {
            var thiz = this;
            thiz.constants = asterics.const;
            thiz.hardwareId = $stateParams.hardwareId;
            thiz.i18nHardware = {
                hardware: $translate.instant('i18n_ec_' + thiz.hardwareId)
            };
            thiz.skipConnectionTest = $stateParams.skipConnectionTest;
            thiz.hardwareList = envControlHelpDataService.getComputerConfiguredHardware();
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.isConnected = null;
            thiz.inCheck = false;
            thiz.testFunction = null;
            thiz.hardwareMethodCallResults = {};
            thiz.htmlPath = null;

            thiz.goToHelp = function (hardware) {
                $state.params.skipConnectionTest = true;
                if(!hardware) {
                    hardware = thiz.hardwareId;
                }
                envControlUtilService.goToHelp(hardware);
            };

            thiz.goToInstall = function (hardware) {
                envControlUtilService.goToInstall(hardware);
            };

            thiz.goToFaq = function (faqId) {
                $state.params.skipConnectionTest = true;
                envControlUtilService.goToFaq(faqId);
            };

            thiz.test = function () {
                if(_.isFunction(thiz.testFunction)) {
                    thiz.testFunction();
                }
            };

            thiz.testRegisterFunction = function (testFunction) {
                thiz.testFunction = testFunction;
            };

            thiz.callSpecialHardwareMethod = function (methodName) {
                thiz.hardwareMethodCallResults[methodName] = null;
                var result = hardwareService.callSpecialHardwareMethod(thiz.hardwareId, methodName);
                if(result && _.isFunction(result.then)) {
                    result.then(function (asyncResult) {
                        thiz.hardwareMethodCallResults[methodName] = asyncResult;
                    });
                } else {
                    thiz.hardwareMethodCallResults[methodName] = result;
                }
            };

            thiz.$onInit = function () {
                if (thiz.hardwareId && !$stateParams.skipConnectionTest) {
                    connectionCheck();
                }
            };

            function connectionCheck() {
                thiz.inCheck = true;
                hardwareService.isConnected(thiz.hardwareId).then(function (response) {
                    thiz.inCheck = false;
                    thiz.isConnected = response;
                    getHtmlPath(thiz.hardwareId, $translate.use());
                });
            }

            function getHtmlPath(hardwareId, lang) {
                if(!hardwareId) {
                    return;
                }
                var base = 'angular/envControl/component/help/install/pages/';
                var localized = base + hardwareId + '_' + lang + '.html';
                var nonLocalized = base + hardwareId + '.html';
                utilService.existsFile(localized).then(function (response) {
                    if(response) {
                        thiz.htmlPath = localized;
                    } else {
                        thiz.htmlPath = nonLocalized;
                    }
                });
            }

            $rootScope.$on(asterics.const.EVENT_LANG_CHANGED, function (event, lang) {
                getHtmlPath(thiz.hardwareId, lang);
            });
        }],
        templateUrl: "angular/envControl/component/help/install/installHelpMenu.html"
    });