angular.module(asterics.appComponents)
    .component('envControlAddMass', {

        bindings: {
            learnItems: '<',
            selectedLabel: '<'
        },
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', '$scope', '$stateParams', 'stateUtilService', function (envControlDataService, $state, envControlIRService, utilService, $scope, $stateParams, stateUtilService) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl.add')];
            thiz.inLearn = false;
            thiz.learningAborted = false;

            //TODO: replace with i18n
            thiz.headerTitles = {
                tv: 'Neue Fernsehsteuerung einrichten',
                dvd: 'Neue Steuerung eines DVD-Players einrichten',
                hifi: 'Neue Steuerung eines Musik-Players einrichten',
                numbers: 'Zifferntasten eines Geräts lernen'
            };
            thiz.nameLables = {
                tv: 'Bitte Namen für den Fernseher auswählen',
                dvd: 'Bitte Namen für den DVD-Player auswählen',
                hifi: 'Bitte Namen für den Musik-Player auswählen',
                numbers: 'Bitte Namen für die Zifferntasten auswählen'
            };
            var lastPart = stateUtilService.getLastPart($state.current.name);
            thiz.headerTitle = thiz.headerTitles[lastPart];
            thiz.nameLabel = thiz.nameLables[lastPart];
            if (lastPart === 'numbers' && thiz.cbToAdd) {
                thiz.headerTitle = 'Zifferntasten von ' + stateUtilService.getLastPartUpper(thiz.cbToAdd) + ' lernen';
            }

            thiz.trainCode = function (irElement, index) {
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
                }

                function error() {
                    if (thiz.inLearn) {
                        thiz.trainCode(thiz.learnItems[index], index);
                    }
                }

                envControlIRService.irLearn().then(success, error);
                thiz.inLearn = true;
                thiz.learningAborted = false;
            };

            thiz.clearItemsAndRestartLearning = function () {
                angular.forEach(thiz.learnItems, function (e) {
                    e.code = null;
                });
                thiz.trainCode();
            };

            thiz.addCellBoardItemsAndReturn = function () {
                var newCellboard = envControlDataService.addSubCellboard(thiz.selectedLabel, 'tv', thiz.cbToAdd); //TODO - change 'tv'
                angular.forEach(thiz.learnItems, function (e) {
                    if (e.code) {
                        envControlDataService.addCellBoardElementIrTrans(e.label, e.icon, e.code, newCellboard);
                    }
                });
                $state.go('envControl');
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

            //aborting all current learning when leaving the page
            $scope.$on("$destroy", function () {
                thiz.abortLearning();
            });

        }],
        templateUrl: "angular/envControl/component/add/envControlAddMass.html"
    });