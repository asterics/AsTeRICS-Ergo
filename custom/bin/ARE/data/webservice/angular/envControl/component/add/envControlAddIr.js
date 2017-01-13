angular.module(asterics.appComponents)
    .component('envControlAddIr', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', '$stateParams', function (envControlDataService, $state, envControlIRService, utilService, $stateParams) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack(asterics.envControl.STATE_ADD)];
            thiz.selectedLabel = null;
            thiz.code = null;
            thiz.selectedIcon = 'wifi';
            thiz.inTrain = false;

            thiz.trainCode = function () {
                envControlIRService.irLearn().then(function (response) {
                    thiz.code = response;
                }, function error() {
                    if(thiz.inTrain) {
                        thiz.trainCode();
                    }
                });
                thiz.inTrain = true;
            };

            thiz.abortLearning = function () {
                thiz.inTrain = false;
                envControlIRService.abortAction();
            };

            thiz.addCellBoardItemAndReturn = function () {
                envControlDataService.addCellBoardElementIrTrans(thiz.selectedLabel, thiz.selectedIcon, thiz.code, thiz.cbToAdd);
                $state.go(asterics.envControl.STATE_MAIN);
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
        templateUrl: "angular/envControl/component/add/envControlAddIr.html"
    });