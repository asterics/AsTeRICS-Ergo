angular.module(asterics.appComponents)
    .component('envControlAddIr', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', '$stateParams', 'stateUtilService', function (envControlDataService, $state, envControlIRService, utilService, $stateParams, stateUtilService) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId;
            thiz.cellBoardConfig = [generateBackItem()];
            thiz.selectedLabel = null;
            thiz.code = null;
            thiz.selectedIcon = 'wifi';
            thiz.inTrain = false;

            thiz.headerTitle = 'i18n_ec_ir_header';
            if (thiz.cbToAdd) {
                thiz.headerTitle = 'i18n_ec_ir_headerto';
                thiz.deviceNameParam = {device: stateUtilService.getLastPartUpper(thiz.cbToAdd)};
            }

            thiz.trainCode = function () {
                envControlIRService.irLearn().then(function (response) {
                    thiz.code = response;
                }, function error() {
                    if (thiz.inTrain) {
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
                if (!thiz.cbToAdd) {
                    $state.go(asterics.envControl.STATE_MAIN);
                } else {
                    $state.go(thiz.cbToAdd);
                }
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

            function generateBackItem() {
                if (!thiz.cbToAdd) {
                    return utilService.createCellBoardItemBack(asterics.envControl.STATE_ADD);
                } else {
                    return utilService.createCellBoardItemBack(asterics.envControl.STATE_ADDSUB, $stateParams);
                }
            }
        }],
        templateUrl: "angular/envControl/component/add/envControlAddIr.html"
    });