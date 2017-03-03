angular.module(asterics.appComponents)
    .component('envControlAddFs', {

        bindings: {
            selectedLabel: '<'
        },
        controller: ['envControlDataService', '$state', 'envControlFsService', 'utilService', '$stateParams', 'stateUtilService', function (envControlDataService, $state, envControlFsService, utilService, $stateParams, stateUtilService) {
            var thiz = this;
            thiz.backStateParam = {backState: $state.current.name};
            thiz.cbToAdd = $stateParams.cellBoardId;
            thiz.stateLastPart = stateUtilService.getLastPart($state.current.name);
            thiz.cellBoardConfig = [generateBackItem()];
            thiz.code = envControlDataService.getNewFs20Code();
            thiz.selectedIcon = 'lightbulb-o';

            thiz.addCellBoardItemAndReturn = function () {
                envControlFsService.trainCode(thiz.code);
                envControlDataService.addCellBoardElementFs20(thiz.selectedLabel, thiz.selectedIcon, thiz.code, thiz.cbToAdd);
                if (!thiz.cbToAdd) {
                    $state.go(asterics.envControl.STATE_MAIN);
                } else {
                    $state.go(thiz.cbToAdd);
                }
            };

            function generateBackItem() {
                if (!thiz.cbToAdd) {
                    return utilService.createCellBoardItemBack(asterics.envControl.STATE_ADD);
                } else {
                    return utilService.createCellBoardItemBack(asterics.envControl.STATE_ADDSUB, $stateParams);
                }
            }
        }],
        templateUrl: "angular/envControl/component/add/envControlAddFs.html"
    });