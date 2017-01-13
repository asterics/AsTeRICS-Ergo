angular.module(asterics.appComponents)
    .component('envControlAddFs', {

        bindings: {
            selectedLabel: '@'
        },
        controller: ['envControlDataService', '$state', 'envControlFsService', 'utilService', '$stateParams', function (envControlDataService, $state, envControlFsService, utilService, $stateParams) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack(asterics.envControl.STATE_ADD)];
            thiz.code = envControlDataService.getNewFs20Code();
            thiz.selectedIcon = 'lightbulb-o';
            thiz.trained = false;

            thiz.trainCode = function () {
                envControlFsService.trainCode(thiz.code);
                thiz.trained = true;
            };

            thiz.addCellBoardItemAndReturn = function () {
                envControlDataService.addCellBoardElementFs20(thiz.selectedLabel, thiz.selectedIcon, thiz.code, thiz.cbToAdd);
                $state.go(asterics.envControl.STATE_MAIN);
            };

            thiz.stepCompleted = function (nr) {
                var ret = true;
                if (nr >= 1) {
                    ret = ret && thiz.selectedLabel;
                }
                if (nr >= 2) {
                    ret = ret && thiz.trained;
                }
                return ret;
            };
        }],
        templateUrl: "angular/envControl/component/add/envControlAddFs.html"
    });