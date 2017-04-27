angular.module(asterics.appComponents)
    .component('envControlAddFs', {

        bindings: {
            selectedLabel: '<'
        },
        controller: ['envControlDataService', '$state', 'envControlFsService', 'utilService', '$stateParams', 'stateUtilService', '$scope', function (envControlDataService, $state, envControlFsService, utilService, $stateParams, stateUtilService, $scope) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            thiz.stateLastPart = stateUtilService.getLastPart($state.current.name);
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.code = envControlDataService.getNewFs20Code();
            thiz.selectedIcon = 'lightbulb-o';
            thiz.isConnected = null;
            thiz.neededHardware = [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG];
            thiz.backStateParams = encodeURI(angular.toJson($stateParams));
            thiz.backState = $state.current.name;

            thiz.addCellBoardItemAndReturn = function () {
                envControlFsService.trainCode(thiz.code);
                envControlDataService.addCellBoardElementFs20(thiz.selectedLabel, thiz.selectedIcon, thiz.code, thiz.cbToAdd);
                $state.go(thiz.cbToAdd);
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware, {
                    backState: thiz.backState,
                    backStateParams: thiz.backStateParams
                });
            };

            thiz.goToFs20Help = function () {
                thiz.goToHelp(asterics.envControl.HW_FS20_PCSENDER);
            };

            thiz.goToFs20Install = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_FS20_PCSENDER, {
                    backState: thiz.backState,
                    backStateParams: thiz.backStateParams
                });
            };

            init();
            function init() {
                envControlFsService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
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