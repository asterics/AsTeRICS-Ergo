angular.module(asterics.appComponents)
    .component('envControlAddMass', {

        bindings: {
            learnItems: '<',
            selectedLabel: '<',
            selectedIcon: '<'
        },
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', '$scope', '$stateParams', 'stateUtilService', '$translate', '$anchorScroll', '$timeout', 'envControlHelpDataService', function (envControlDataService, $state, envControlIRService, utilService, $scope, $stateParams, stateUtilService, $translate, $anchorScroll, $timeout, envControlHelpDataService) {
            var thiz = this;
            var _cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            var _currentLearnItem = null;
            var _addDevice = stateUtilService.getLastPart($state.current.name);

            thiz.cellBoardConfig = [generateBackItem()];
            thiz.inLearn = false;
            thiz.headerI18n = 'i18n_ec_irmass_header_' + _addDevice;
            thiz.deviceI18nParams = {device: stateUtilService.getLastPartUpper(_cbToAdd)};
            thiz.stateI18nParams = {
                backState: $state.current.name,
                backStateParams: encodeURI(angular.toJson($stateParams))
            };
            thiz.nameLabelI18n = 'i18n_ec_irmass_name_' + _addDevice;
            thiz.isNumberLearn = _addDevice == 'numbers';
            thiz.isConnected = null;
            thiz.neededHardware = envControlHelpDataService.getNeededHardware(_addDevice);

            //learns the next item to learn, after success automatically learns next item.
            //if no item left or error on learning -> return
            thiz.trainCode = function () {
                thiz.showError = false;
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
                    thiz.trainCode();
                }

                function error(response) {
                    if (response === asterics.envControl.IRTRANS_SOCKET_ERROR) {
                        thiz.inLearn = false;
                        thiz.showError = true;
                        clearItems();
                    } else if (thiz.inLearn) {
                        thiz.trainCode();
                    }
                }

                envControlIRService.irLearn().then(success, error);
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
                var newCellboard = envControlDataService.addSubCellboard(thiz.selectedLabel, thiz.selectedIcon, _cbToAdd);
                angular.forEach(thiz.learnItems, function (e) {
                    if (e.code) {
                        envControlDataService.addCellBoardElementIrTrans(e.label, e.icon, e.code, newCellboard);
                    }
                });
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
                $state.go('home.envControl.help/controls/' + hardware, {
                    backState: $state.current.name,
                    backStateParams: thiz.stateI18nParams.backStateParams
                });
            };

            thiz.goToIrTransHelp = function () {
                thiz.goToHelp(asterics.envControl.HW_IRTRANS_USB);
            };

            thiz.goToIrTransInstall = function () {
                $state.go('home.envControl.help/install/' + asterics.envControl.HW_IRTRANS_USB, {
                    backState: $state.current.name,
                    backStateParams: thiz.stateI18nParams.backStateParams
                });
            };

            init();
            function init() {
                envControlIRService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
                });
            }

            function abortLearning() {
                thiz.inLearn = false;
                envControlIRService.abortAction();
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

            function generateBackItem() {
                if (_cbToAdd === asterics.envControl.STATE_MAIN) {
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

            $scope.$watch(function () {
                return thiz.selectedLabel
            }, function () {
                if (envControlDataService.existsLabel(thiz.selectedLabel, _cbToAdd)) {
                    thiz.selectedLabel = envControlDataService.getNonConflictingLabel(thiz.selectedLabel, _cbToAdd);
                }
            });

            //aborting all current learning when leaving the page
            $scope.$on("$destroy", function () {
                abortLearning();
            });
        }],
        templateUrl: "angular/envControl/component/add/envControlAddMass.html"
    });