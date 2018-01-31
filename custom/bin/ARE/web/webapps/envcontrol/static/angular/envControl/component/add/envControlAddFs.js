angular.module(asterics.appComponents)
    .component('envControlAddFs', {

        bindings: {
            selectedLabel: '<',
            selectedIcon: '<'
        },
        controller: ['envControlDataService', '$state', 'hardwareService', 'utilService', '$stateParams', 'stateUtilService', '$scope', 'envControlUtilService', function (envControlDataService, $state, hardwareService, utilService, $stateParams, stateUtilService, $scope, envControlUtilService) {
            var thiz = this;
            thiz.device = $stateParams.device;
            thiz.hardware = $stateParams.hardware;
            thiz.headerI18n = $stateParams.headerI18n;
            
            thiz.cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            thiz.stateLastPart = stateUtilService.getLastPart($state.current.name);
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.isConnected = null;
            thiz.neededHardware = [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG];

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