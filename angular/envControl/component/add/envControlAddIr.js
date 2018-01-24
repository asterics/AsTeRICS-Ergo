angular.module(asterics.appComponents)
    .component('envControlAddIr', {

        bindings: {
            isDeviceLearn: '@'
        },
        controller: ['envControlDataService', '$state', 'hardwareService', 'utilService', '$stateParams', 'stateUtilService', '$anchorScroll', '$timeout', '$scope', function (envControlDataService, $state, hardwareService, utilService, $stateParams, stateUtilService, $anchorScroll, $timeout, $scope) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.selectedLabel = null;
            thiz.selectedDeviceName = null;
            thiz.learnItems = [];
            thiz.code = null;
            thiz.selectedIcon = 'wifi';
            thiz.inTrain = false;
            thiz.isConnected = null;
            thiz.irDevice = null;

            thiz.addCellBoardItemAndReturn = function () {
                var cbToAddButtons = thiz.cbToAdd;
                if (thiz.isDeviceLearn) {
                    cbToAddButtons = envControlDataService.addSubCellboard(thiz.selectedDeviceName, 'building-o', thiz.cbToAdd);
                }
                angular.forEach(thiz.learnItems, function (item) {
                    envControlDataService.addCellBoardElementIr(item.name, thiz.selectedIcon, item.code, cbToAddButtons, thiz.irDevice.getName());
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
                thiz.headerTitle = thiz.isDeviceLearn ? 'i18n_ec_ir_header_device' : 'i18n_ec_ir_header';
                if (thiz.cbToAdd !== asterics.envControl.STATE_MAIN) {
                    thiz.headerTitle = 'i18n_ec_ir_headerto';
                    thiz.deviceNameParam = {device: stateUtilService.getLastPartUpper(thiz.cbToAdd)};
                }
                hardwareService.getOneConnectedDevice(asterics.envControl.HW_GROUP_IR).then(function (response) {
                    if (response) {
                        thiz.isConnected = true;
                        thiz.irDevice = response;
                        startTrainCodes();
                    } else {
                        thiz.isConnected = false;
                    }
                });
            };

            thiz.goToIrTransHelp = function () {
                $state.go('home.envControl.help/controls/' + asterics.envControl.HW_IRTRANS_USB);
            };

            thiz.goToIrTransInstall = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_IRTRANS_USB);
            };

            function startTrainCodes() {
                thiz.irDevice.irLearn().then(function (response) {
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
            stateUtilService.addOneTimeStateChangeFunction(function () {
                thiz.inTrain = false;
                if(thiz.device) {
                    thiz.irDevice.abortAction();
                }
            });
        }],
        templateUrl: "angular/envControl/component/add/envControlAddIr.html"
    });