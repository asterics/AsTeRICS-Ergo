angular.module(asterics.appComponents)
    .component('envControlAddIr', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', '$stateParams', 'stateUtilService', '$anchorScroll', '$timeout', '$scope', function (envControlDataService, $state, envControlIRService, utilService, $stateParams, stateUtilService, $anchorScroll, $timeout, $scope) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId;
            thiz.cellBoardConfig = [generateBackItem()];
            thiz.selectedLabel = null;
            thiz.learnItems = [];
            thiz.code = null;
            thiz.selectedIcon = 'wifi';
            thiz.inTrain = false;
            thiz.stateI18nParams = {
                backState: $state.current.name,
                backStateParams: encodeURI(angular.toJson($stateParams))
            };
            thiz.isConnected = null;

            thiz.headerTitle = 'i18n_ec_ir_header';
            if (thiz.cbToAdd) {
                thiz.headerTitle = 'i18n_ec_ir_headerto';
                thiz.deviceNameParam = {device: stateUtilService.getLastPartUpper(thiz.cbToAdd)};
            }

            thiz.addCellBoardItemAndReturn = function () {
                angular.forEach(thiz.learnItems, function (item) {
                    envControlDataService.addCellBoardElementIrTrans(item.name, thiz.selectedIcon, item.code, thiz.cbToAdd);
                });
                if (!thiz.cbToAdd) {
                    $state.go(asterics.envControl.STATE_MAIN);
                } else {
                    $state.go(thiz.cbToAdd);
                }
            };

            thiz.getNumLearnedValuesI18n = function () {
                return {
                    numlearned: thiz.learnItems.length
                };
            };

            init();
            function init() {
                envControlIRService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
                    if (isConnected) {
                        startTrainCodes();
                    }
                });
            }

            function startTrainCodes() {
                envControlIRService.irLearn().then(function (response) {
                    if (thiz.selectedLabel) {
                        var item = generateIrTransItem(thiz.selectedLabel, response);
                        thiz.learnItems.push(item);
                        thiz.selectedLabel = null;
                        scrollToEnd();
                    }
                    if (thiz.inTrain) {
                        startTrainCodes();
                    }
                }, function error() {
                    if (thiz.inTrain) {
                        startTrainCodes();
                    }
                });
                thiz.inTrain = true;
            }

            function generateBackItem() {
                if (!thiz.cbToAdd) {
                    return utilService.createCellBoardItemBack(asterics.envControl.STATE_ADD);
                } else {
                    return utilService.createCellBoardItemBack(asterics.envControl.STATE_ADDSUB, $stateParams);
                }
            }

            function scrollToEnd() {
                $timeout(function () {
                    $anchorScroll('end');
                });
            }

            function generateIrTransItem(name, code) {
                return {
                    name: name,
                    code: code
                };
            }

            //aborting all current learning when leaving the page
            $scope.$on("$destroy", function () {
                thiz.inTrain = false;
                envControlIRService.abortAction();
            });
        }],
        templateUrl: "angular/envControl/component/add/envControlAddIr.html"
    });