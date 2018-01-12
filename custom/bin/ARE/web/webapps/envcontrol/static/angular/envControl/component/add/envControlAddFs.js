angular.module(asterics.appComponents)
    .component('envControlAddFs', {

        bindings: {
            selectedLabel: '<',
            selectedIcon: '<'
        },
        controller: ['envControlDataService', '$state', 'ecDeviceService', 'utilService', '$stateParams', 'stateUtilService', '$scope', function (envControlDataService, $state, ecDeviceService, utilService, $stateParams, stateUtilService, $scope) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            thiz.stateLastPart = stateUtilService.getLastPart($state.current.name);
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.isConnected = null;
            thiz.neededHardware = [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG];
            thiz.plugDevice = null;

            thiz.addCellBoardItemAndReturn = function () {
                var additionalData = envControlDataService.getAdditionalDeviceData(thiz.plugDevice.getName()) || [];
                var code = thiz.plugDevice.getNewCode(additionalData);
                additionalData.push(code);
                envControlDataService.setAdditionalDeviceData(additionalData, thiz.plugDevice.getName());
                thiz.plugDevice.trainCode(code);
                envControlDataService.addCellBoardElementPlug(thiz.selectedLabel, thiz.selectedIcon, code, thiz.cbToAdd, thiz.plugDevice.getName());
                envControlDataService.saveData();
                $state.go(thiz.cbToAdd);
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware);
            };

            thiz.goToFs20Help = function () {
                thiz.goToHelp(asterics.envControl.HW_FS20_PCSENDER);
            };

            thiz.goToFs20Install = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_FS20_PCSENDER);
            };

            init();
            function init() {
                ecDeviceService.getOneConnectedDevice(asterics.envControl.HW_GROUP_PLUG).then(function (response) {
                    if (response) {
                        thiz.isConnected = true;
                        thiz.plugDevice = response;
                    } else {
                        thiz.isConnected = false;
                    }
                });
            }

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