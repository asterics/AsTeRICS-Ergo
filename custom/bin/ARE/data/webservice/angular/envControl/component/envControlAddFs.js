angular.module(asterics.appComponents)
    .component('envControlAddFs', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'envControlFsService', 'utilService', function (envControlDataService, $state, envControlFsService, utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl.add')];
            thiz.code = envControlDataService.getNewFs20Code();
            thiz.selectedLabel = null;
            thiz.selectedIcon = 'lightbulb-o';
            thiz.trained = false;

            thiz.trainCode = function () {
                envControlFsService.trainCode(thiz.code);
                thiz.trained = true;
            };

            thiz.addCellBoardItemAndReturn = function () {
                envControlDataService.addCellBoardElementFs20(thiz.selectedLabel, thiz.selectedIcon, thiz.code);
                $state.go('envControl');
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
        templateUrl: "angular/envControl/component/envControlAddFs.html"
    });