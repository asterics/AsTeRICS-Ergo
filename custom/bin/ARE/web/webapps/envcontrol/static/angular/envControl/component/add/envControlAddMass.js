angular.module(asterics.appComponents)
    .component('envControlAddMass', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'ecDeviceService', 'utilService', '$scope', '$stateParams', 'stateUtilService', '$translate', '$anchorScroll', '$timeout', 'envControlHelpDataService', 'envControlTextService', 'messageService', 'envControlUtilService', function (envControlDataService, $state, ecDeviceService, utilService, $scope, $stateParams, stateUtilService, $translate, $anchorScroll, $timeout, envControlHelpDataService, envControlTextService, messageService, envControlUtilService) {
            var thiz = this;
            var _cbToAdd = asterics.envControl.STATE_MAIN;
            var _currentLearnItem = null;
            thiz.addDevice = $stateParams.device;

            thiz.irDevice = $stateParams.hardware;
            thiz.headerI18n = $stateParams.headerI18n;

            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_ADD)];
            thiz.inLearn = false;
            thiz.learningAborted = false;
            thiz.headerI18nParams = {device: stateUtilService.getLastPartUpper(_cbToAdd)};
            thiz.nameLabelI18n = 'i18n_ec_irmass_name_' + thiz.addDevice;
            thiz.isNumberLearn = thiz.addDevice == 'numbers';
            thiz.neededHardware = _.without(envControlHelpDataService.getNeededHardware(thiz.addDevice, thiz.irDevice.getName()), thiz.irDevice.getName());

            thiz.learnItems = envControlUtilService.getIrElements(thiz.addDevice);
            thiz.selectedIcon = envControlUtilService.getIcon(thiz.addDevice);
            thiz.selectedLabel = $translate.instant('i18n_ec_' + thiz.addDevice);

            //learns the next item to learn, after success automatically learns next item.
            //if no item left or error on learning -> return
            thiz.trainCode = function () {
                if (thiz.learningAborted) {
                    return;
                }
                thiz.showError = false;
                thiz.waiting = false;
                if (!_currentLearnItem || _currentLearnItem.code) {
                    _currentLearnItem = getNextItemToLearn();
                }
                if (!_currentLearnItem) {
                    thiz.inLearn = false;
                    return;
                }

                function success(response) {
                    _currentLearnItem.code = response;
                    scrollToEnd();
                    thiz.waiting = true;
                    $timeout(thiz.trainCode, 750);
                }

                function error(response) {
                    if (response !== asterics.envControl.IRLEARN_TIMEOUT) {
                        thiz.inLearn = false;
                        thiz.showError = true;
                        clearItems();
                        abortLearning();
                    } else if (thiz.inLearn) {
                        thiz.trainCode();
                    }
                }

                thiz.irDevice.irLearn().then(success, error);
                if (!thiz.inLearn) {
                    scrollToEnd();
                }
                thiz.inLearn = true;
            };

            thiz.clearItemsAndRestartLearning = function () {
                clearItems();
                if (thiz.inLearn) {
                    _currentLearnItem = getNextItemToLearn();
                } else {
                    thiz.trainCode();
                }
            };

            thiz.skipItem = function (item) {
                item.skipped = true;
                _currentLearnItem = getNextItemToLearn();
                scrollToEnd();
            };

            thiz.goToPreviousItem = function (item) {
                var prevItem = getPrevItem(item);
                prevItem.code = null;
                prevItem.skipped = false;
                if (thiz.inLearn) {
                    _currentLearnItem = getNextItemToLearn();
                } else {
                    thiz.trainCode();
                }
                scrollToEnd();
            };

            thiz.addCellBoardItemsAndReturn = function () {
                abortLearning();
                var newCellboard = envControlDataService.addSubCellboard(thiz.selectedLabel, thiz.selectedIcon, _cbToAdd, thiz.addDevice);
                angular.forEach(thiz.learnItems, function (e) {
                    if (e.code) {
                        envControlDataService.addCellBoardElementIr(e.label, e.icon, e.code, newCellboard, thiz.irDevice.getName());
                    }
                });
                envControlDataService.saveData();
                if (_cbToAdd == asterics.envControl.STATE_MAIN) {
                    messageService.success('envControlMain', 'i18n_ec_success_add_ir', {deviceName: thiz.selectedLabel}, {surviveClears: 1});
                }
                $state.go(_cbToAdd);
            };

            thiz.getNumberOfLearnedItems = function () {
                var count = 0;
                angular.forEach(thiz.learnItems, function (e) {
                    if (e.code) {
                        count++;
                    }
                });
                return count;
            };

            thiz.allCodesLearned = function () {
                return !getNextItemToLearn();
            };

            thiz.isItemVisible = function (item) {
                if (item.code || item.skipped) {
                    return true;
                }
                if (thiz.inLearn && prevItemLearnedOrSkipped(item)) {
                    return true;
                }
                return false;
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware);
            };

            thiz.goToIrTransHelp = function () {
                thiz.goToHelp(asterics.envControl.HW_IRTRANS_USB);
            };

            thiz.goToIrTransInstall = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_IRTRANS_USB);
            };

            thiz.getAdditionalInstructions = function () {
                return envControlTextService.getAdditionalInstructions($state.current.name);
            };

            function abortLearning() {
                thiz.learningAborted = true;
                thiz.inLearn = false;
                if (thiz.irDevice) {
                    thiz.irDevice.abortAction();
                }
            }

            function clearItems() {
                angular.forEach(thiz.learnItems, function (e) {
                    e.code = null;
                    e.skipped = false;
                });
            }

            function getPrevItem(item) {
                if (!item) {
                    return thiz.learnItems[thiz.learnItems.length - 1];
                }
                var index = thiz.learnItems.indexOf(item);
                if (index == 0) {
                    return item;
                }
                return thiz.learnItems[index - 1];
            }

            function prevItemLearnedOrSkipped(item) {
                var prevItem = getPrevItem(item);
                return !!(prevItem.code) || !!(prevItem.skipped) || prevItem === item;
            }

            //returns index of next item to learn, if all learned -1
            function getIndexOfNextItemToLearn() {
                var index = _.findIndex(thiz.learnItems, function (elem) {
                    return !elem.code && !elem.skipped;
                });
                return index;
            }

            function getNextItemToLearn() {
                var index = getIndexOfNextItemToLearn();
                if (index < 0 || index > thiz.learnItems.length - 1) {
                    return null;
                }
                return thiz.learnItems[index];
            }

            function scrollToEnd() {
                $timeout(function () {
                    $anchorScroll('end');
                });
            }

            $scope.$watch(function () {
                return thiz.selectedLabel
            }, function () {
                if (envControlDataService.existsLabel(thiz.selectedLabel, _cbToAdd)) {
                    thiz.selectedLabel = envControlDataService.getNonConflictingLabel(thiz.selectedLabel, _cbToAdd);
                }
            });

            //aborting all current learning when leaving the page
            stateUtilService.addOneTimeStateChangeFunction(function () {
                abortLearning();
            });
        }],
        templateUrl: "angular/envControl/component/add/envControlAddMass.html"
    });