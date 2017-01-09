angular.module(asterics.appComponents)
    .component('envControlAddTv', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'envControlIRService', 'utilService', function (envControlDataService, $state, envControlIRService, utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl.add')];
            thiz.selectedLabel = 'Fernseher';
            thiz.irElements = [
                createIrElement('EIN/AUS', 'power-off'),
                createIrElement('Kanal +', 'arrow-up'),
                createIrElement('Kanal -', 'arrow-down'),
                createIrElement('Volume +', 'volume-up'),
                createIrElement('Volume -', 'volume-down')
            ];
            thiz.code = null;
            thiz.inLearn = false;
            thiz.selectedIcon = 'wifi';

            thiz.trainCode = function (irElement, index) {
                envControlIRService.irLearn().then(function (response) {
                    irElement.code = response;
                    if (index < thiz.irElements.length - 1) {
                        thiz.trainCode(thiz.irElements[index + 1], index + 1);
                    }
                });
                thiz.inLearn = true;
            };

            thiz.addCellBoardItemsAndReturn = function () {
                angular.forEach(thiz.irElements, function(e) {
                    envControlDataService.addCellBoardElementIrTrans(e.label, e.icon, e.code);
                });
                $state.go('envControl');
            };

            thiz.prevElementLearned = function (element) {
                var index = thiz.irElements.indexOf(element);
                if (!thiz.inLearn) {
                    return false;
                } else if (index === 0) {
                    return true;
                } else {
                    return thiz.irElements[index - 1].code;
                }
            };

            thiz.allCodesLearned = function () {
                return thiz.irElements[thiz.irElements.length-1].code;
            };

            function createIrElement(label, icon) {
                return {
                    label: label,
                    icon: icon
                };
            }
        }],
        templateUrl: "angular/envControl/component/add/envControlAddTv.html"
    });