angular.module(asterics.appComponents)
    .component('envControlAddIr', {

        bindings: {
            isDeviceLearn: '@'
        },
        controller: ['envControlDataService', '$state', 'hardwareService', 'utilService', '$stateParams', 'stateUtilService', '$anchorScroll', '$timeout', '$translate', 'envControlUtilService', function (envControlDataService, $state, hardwareService, utilService, $stateParams, stateUtilService, $anchorScroll, $timeout, $translate, envControlUtilService) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];

            thiz.addDevice = $stateParams.device;
            thiz.irHardware = $stateParams.hardware;
            thiz.headerI18n = $stateParams.headerI18n;
            thiz.hardwareI18nParams = {hardware: $translate.instant('i18n_ec_' + thiz.irHardware.getName())};
            thiz.selectedLabel = null;
            thiz.selectedDeviceName = null;
            thiz.learnItems = [];
            thiz.selectedIcon = 'wifi';
            thiz.inTrain = false;

            thiz.addCellBoardItemAndReturn = function () {
                var cbToAddButtons = thiz.cbToAdd;
                if (thiz.isDeviceLearn) {
                    cbToAddButtons = envControlDataService.addSubCellboard(thiz.selectedDeviceName, 'building-o', thiz.cbToAdd);
                }
                angular.forEach(thiz.learnItems, function (item) {
                    envControlDataService.addCellBoardElementIr(item.name, thiz.selectedIcon, item.code, cbToAddButtons, thiz.irHardware.getName());
                });
                envControlDataService.saveData();
                $state.go(thiz.cbToAdd);
            };

            thiz.getNumLearnedValuesI18n = function () {
                return {
                    numlearned: thiz.learnItems.length
                };
            };

            thiz.$onInit = function () {
                if (thiz.cbToAdd !== asterics.envControl.STATE_MAIN) {
                    thiz.headerTitle = 'i18n_ec_ir_headerto';
                    thiz.deviceNameParam = {device: stateUtilService.getLastPartUpper(thiz.cbToAdd)};
                }
                startTrainCodes();
            };

            thiz.goToHelp = function () {
                envControlUtilService.goToHelp(thiz.irHardware.getName());
            };

            function startTrainCodes() {
                thiz.irHardware.irLearn().then(function (response) {
                    if (thiz.selectedLabel) {
                        var item = generateLearnItem(thiz.selectedLabel, response);
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

            function scrollToEnd() {
                $timeout(function () {
                    $anchorScroll('end');
                });
            }

            function generateLearnItem(name, code) {
                return {
                    name: name,
                    code: code
                };
            }

            //aborting all current learning when leaving the page
            stateUtilService.addOneTimeStateChangeFunction(function () {
                thiz.inTrain = false;
                if(thiz.device) {
                    thiz.irHardware.abortAction();
                }
            });
        }],
        templateUrl: "angular/envControl/component/add/envControlAddIr.html"
    });