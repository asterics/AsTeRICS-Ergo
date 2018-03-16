angular.module(asterics.appComponents)
    .component('addPlugDeviceIrPlug', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'hardwareService', 'utilService', '$stateParams', '$scope', 'envControlUtilService', '$translate', function (envControlDataService, $state, hardwareService, utilService, $stateParams, $scope, envControlUtilService, $translate) {
            var thiz = this;
            thiz.device = $stateParams.device;
            thiz.hardware = $stateParams.hardware;
            thiz.headerI18n = $stateParams.headerI18n;
            thiz.selectedLabel = thiz.device != asterics.envControl.DEVICE_PLUG_GENERIC ? $translate.instant('i18n_ec_' + thiz.device) : '';
            thiz.selectedIcon = envControlUtilService.getIcon(thiz.device);
            
            thiz.cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.translatedDevice = envControlUtilService.getTranslatedValueObject('device', thiz.device + '_in_text');

            thiz.addCellBoardItemAndReturn = function () {
                var code = thiz.hardware.getRandomCode(envControlDataService.getCodes(thiz.hardware.getName()));
                thiz.hardware.send(code);
                envControlDataService.addCellBoardElementIr(thiz.selectedLabel, thiz.selectedIcon, code, thiz.cbToAdd, thiz.hardware.getName());
                envControlDataService.saveData();
                $state.go(thiz.cbToAdd);
            };

            thiz.goToHelp = function () {
                envControlUtilService.goToHelp(thiz.hardware);
            };

            $scope.$watch(function () {
                return thiz.selectedLabel
            }, function () {
                if (envControlDataService.existsLabel(thiz.selectedLabel, thiz.cbToAdd)) {
                    thiz.selectedLabel = envControlDataService.getNonConflictingLabel(thiz.selectedLabel, thiz.cbToAdd);
                }
            });
        }],
        templateUrl: "angular/envControl/component/add/addPlugDeviceIrPlug.html"
    });