angular.module(asterics.appComponents)
    .component('envControlAddIr', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', function (envControlDataService, $state, envControlIRService, utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl.add')];
            thiz.selectedLabel = null;
            thiz.code = null;
            thiz.selectedIcon = 'wifi';
            thiz.inTrain = false;

            thiz.trainCode = function () {
                envControlIRService.irLearn().then(function (response) {
                    thiz.code = response;

                });
                thiz.inTrain = true;
            };

            thiz.addCellBoardItemAndReturn = function () {
                envControlDataService.addCellBoardElementIrTrans(thiz.selectedLabel, thiz.selectedIcon, thiz.code);
                $state.go('envControl');
            };

            thiz.stepCompleted = function (nr) {
                var ret = true;
                if (nr >= 1) {
                    ret = ret && thiz.selectedLabel;
                }
                if (nr >= 2) {
                    ret = ret && thiz.inTrain;
                }
                if (nr >= 3) {
                    ret = ret && thiz.code;
                }
                return ret;
            };
        }],
        templateUrl: "angular/envControl/component/envControlAddIr.html"
    });