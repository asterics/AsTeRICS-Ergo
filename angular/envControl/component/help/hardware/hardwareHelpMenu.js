angular.module(asterics.appComponents)
    .component('hardwareHelpMenu', {
        bindings: {
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', '$stateParams', 'envControlUtilService', function (utilService, $state, envControlHelpDataService, $stateParams, envControlUtilService) {
            var thiz = this;
            thiz.hardwareId = $stateParams.hardwareId;
            thiz.hardwareList = envControlHelpDataService.getHardwareWithHelp();
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            var _helpMapping = {};
            _helpMapping[asterics.envControl.HW_USB_CABLE_AB] = asterics.envControl.HW_IRTRANS_USB;
            _helpMapping[asterics.envControl.HW_FS20_PLUG] = asterics.envControl.HW_FS20_PCSENDER;

            thiz.goToHelp = function (hardware) {
                envControlUtilService.goToHelp(hardware);
            };

            thiz.goToInstall = function (hardware) {
                envControlUtilService.goToInstall(hardware);
            };

            thiz.$onInit = function () {
                if(_helpMapping[thiz.hardwareId]) {
                    thiz.hardwareId = _helpMapping[thiz.hardwareId];
                }
            };

            thiz.getHtmlPath = function () {
                return 'angular/envControl/component/help/hardware/pages/' + thiz.hardwareId + '.html'
            }
        }],
        templateUrl: "angular/envControl/component/help/hardware/hardwareHelpMenu.html"
    });