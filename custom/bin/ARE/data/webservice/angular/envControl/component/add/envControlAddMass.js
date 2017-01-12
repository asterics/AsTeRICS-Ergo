angular.module(asterics.appComponents)
    .component('envControlAddMass', {

        bindings: {
            learnItems: '<',
            selectedLabel: '<'
        },
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', '$scope', function (envControlDataService, $state, envControlIRService, utilService, $scope) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl.add')];
            thiz.inLearn = false;

            thiz.trainCode = function (irElement, index) {
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
            };

            thiz.addCellBoardItemsAndReturn = function () {
                angular.forEach(thiz.learnItems, function (e) {
                    envControlDataService.addCellBoardElementIrTrans(e.label, e.icon, e.code);
                });
                $state.go('envControl');
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

            thiz.allCodesLearned = function () {
                return thiz.learnItems[thiz.learnItems.length - 1].code;
            };

            thiz.abortLearning = function () {
                thiz.inLearn = false;
                angular.forEach(thiz.learnItems, function (e) {
                    e.code = null;
                });
                envControlIRService.abortAction();
            };

            //aborting all current learning when leaving the page
            $scope.$on("$destroy", function () {
                thiz.abortLearning();
            });

        }],
        templateUrl: "angular/envControl/component/add/envControlAddMass.html"
    });