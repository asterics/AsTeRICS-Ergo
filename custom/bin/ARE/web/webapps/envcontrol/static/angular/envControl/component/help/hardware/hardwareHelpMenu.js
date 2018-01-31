angular.module(asterics.appComponents)
    .component('hardwareHelpMenu', {
        bindings: {
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', '$stateParams', 'envControlUtilService', '$translate', '$rootScope', function (utilService, $state, envControlHelpDataService, $stateParams, envControlUtilService, $translate, $rootScope) {
            var thiz = this;
            thiz.links = asterics.envControl.LINKS;
            thiz.hardwareId = $stateParams.hardwareId;
            thiz.hardwareList = envControlHelpDataService.getHardwareWithHelp();
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.htmlPath = null;
            var _helpMapping = {};
            _helpMapping[asterics.envControl.HW_USB_CABLE_AB] = asterics.envControl.HW_IRTRANS_USB;
            _helpMapping[asterics.envControl.HW_FS20_PLUG] = asterics.envControl.HW_FS20_PCSENDER;

            thiz.goToHelp = function (hardware) {
                envControlUtilService.goToHelp(hardware);
            };

            thiz.goToInstall = function (hardware) {
                if(!hardware) {
                    hardware = thiz.hardwareId;
                }
                envControlUtilService.goToInstall(hardware);
            };

            thiz.$onInit = function () {
                if(_helpMapping[thiz.hardwareId]) {
                    thiz.hardwareId = _helpMapping[thiz.hardwareId];
                }
                getHtmlPath(thiz.hardwareId, $translate.use());
            };

            function getHtmlPath(hardwareId, lang) {
                if(!hardwareId) {
                    return;
                }
                var base = 'angular/envControl/component/help/hardware/pages/';
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
        templateUrl: "angular/envControl/component/help/hardware/hardwareHelpMenu.html"
    });