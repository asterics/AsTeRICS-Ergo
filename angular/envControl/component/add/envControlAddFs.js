angular.module(asterics.appComponents)
    .component('envControlAddFs', {

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
            thiz.translatedDevice = envControlUtilService.getTranslatedValueObject('device', thiz.device);

            thiz.addCellBoardItemAndReturn = function () {
                var additionalData = envControlDataService.getAdditionalDeviceData(thiz.hardware.getName()) || [];
                var code = thiz.hardware.getNewCode(additionalData);
                additionalData.push(code);
                envControlDataService.setAdditionalDeviceData(additionalData, thiz.hardware.getName());
                thiz.hardware.trainCode(code);
                envControlDataService.addCellBoardElementPlug(thiz.selectedLabel, thiz.selectedIcon, code, thiz.cbToAdd, thiz.hardware.getName());
                envControlDataService.saveData();
                $state.go(thiz.cbToAdd);
            };

            thiz.goToHelp = function (hardware) {
                envControlUtilService.goToHelp(hardware);
            };

            thiz.goToFs20Help = function () {
                thiz.goToHelp(asterics.envControl.HW_FS20_PCSENDER);
            };

            $scope.$watch(function () {
                return thiz.selectedLabel
            }, function () {
                if (envControlDataService.existsLabel(thiz.selectedLabel, thiz.cbToAdd)) {
                    thiz.selectedLabel = envControlDataService.getNonConflictingLabel(thiz.selectedLabel, thiz.cbToAdd);
                }
            });
        }],
        templateUrl: "angular/envControl/component/add/envControlAddFs.html"
    });