angular.module(asterics.appComponents)
    .component('envControlAddMass', {

        bindings: {
            learnItems: '<',
            selectedLabel: '<',
            selectedIcon: '<'
        },
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', '$scope', '$stateParams', 'stateUtilService', '$translate', '$anchorScroll', '$timeout', function (envControlDataService, $state, envControlIRService, utilService, $scope, $stateParams, stateUtilService, $translate, $anchorScroll, $timeout) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId || asterics.envControl.STATE_MAIN;
            thiz.cellBoardConfig = [generateBackItem()];
            thiz.inLearn = false;
            thiz.learningAborted = false;
            thiz.addType = stateUtilService.getLastPart($state.current.name);
            thiz.headerI18n = 'i18n_ec_irmass_header_' + thiz.addType;
            thiz.deviceI18nParams = {device: stateUtilService.getLastPartUpper(thiz.cbToAdd)};
            thiz.typeI18nParams = {device: $translate.instant('i18n_ec_' + thiz.addType)};
            thiz.stateI18nParams = {
                backState: $state.current.name,
                backStateParams: encodeURI(angular.toJson($stateParams))
            };
            thiz.nameLabelI18n = 'i18n_ec_irmass_name_' + thiz.addType;
            thiz.isNumberLearn = thiz.addType == 'numbers';

            thiz.trainCode = function (irElement, index) {
                thiz.showError = false;
                if (!irElement || !index) {
                    index = thiz.numberOfLearnedCodes();
                    if (index >= 0 && index < thiz.learnItems.length) {
                        irElement = thiz.learnItems[index];
                    } else {
                        return;
                    }
                }

                function success(response) {
                    irElement.code = response;
                    if (index < thiz.learnItems.length - 1) {
                        thiz.trainCode(thiz.learnItems[index + 1], index + 1);
                    }
                    scrollToEnd();
                }

                function error(response) {
                    if (response === asterics.envControl.IRTRANS_SOCKET_ERROR) {
                        thiz.inLearn = false;
                        thiz.showError = true;
                        thiz.clearItems();
                    } else if (thiz.inLearn) {
                        thiz.trainCode(thiz.learnItems[index], index);
                    }
                }

                envControlIRService.irLearn().then(success, error);
                thiz.inLearn = true;
                thiz.learningAborted = false;
                scrollToEnd();
            };

            thiz.clearItems = function () {
                angular.forEach(thiz.learnItems, function (e) {
                    e.code = null;
                });
            };

            thiz.clearItemsAndRestartLearning = function () {
                thiz.clearItems();
                thiz.trainCode();
            };

            thiz.addCellBoardItemsAndReturn = function () {
                var newCellboard = envControlDataService.addSubCellboard(thiz.selectedLabel, thiz.selectedIcon, thiz.cbToAdd);
                angular.forEach(thiz.learnItems, function (e) {
                    if (e.code) {
                        envControlDataService.addCellBoardElementIrTrans(e.label, e.icon, e.code, newCellboard);
                    }
                });
                if (!thiz.cbToAdd) {
                    $state.go(asterics.envControl.STATE_MAIN);
                } else {
                    $state.go(thiz.cbToAdd);
                }
            };

            thiz.numberOfLearnedCodes = function () {
                var index = _.findLastIndex(thiz.learnItems, function (elem) {
                    return !!(elem.code);
                });
                return index == -1 ? 0 : index + 1;
            };

            thiz.allCodesLearned = function () {
                return thiz.numberOfLearnedCodes() === thiz.learnItems.length;
            };

            thiz.abortLearning = function () {
                thiz.learningAborted = true;
                thiz.inLearn = false;
                envControlIRService.abortAction();
            };

            thiz.isItemVisible = function (item) {
                if (item.code) {
                    return true;
                }
                if (thiz.inLearn && thiz.prevElementLearned(item)) {
                    return true;
                }
                return false;
            };

            thiz.prevElementLearned = function (element) {
                var index = thiz.learnItems.indexOf(element);
                if (!thiz.inLearn) {
                    return false;
                } else if (index === 0) {
                    return true;
                } else {
                    return thiz.learnItems[index - 1].code;
                }
            };

            $scope.$watch(function () {
                return thiz.selectedLabel
            }, function () {
                if (envControlDataService.existsLabel(thiz.selectedLabel, thiz.cbToAdd)) {
                    thiz.selectedLabel = envControlDataService.getNonConflictingLabel(thiz.selectedLabel, thiz.cbToAdd);
                }
            });

            //aborting all current learning when leaving the page
            $scope.$on("$destroy", function () {
                thiz.abortLearning();
            });

            function generateBackItem() {
                if (thiz.cbToAdd === asterics.envControl.STATE_MAIN) {
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
        }],
        templateUrl: "angular/envControl/component/add/envControlAddMass.html"
    });