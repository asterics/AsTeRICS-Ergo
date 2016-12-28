angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['envControlDataService', '$state', 'envControlFsService', 'utilService', function (envControlDataService, $state, envControlFsService, utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl')];
            thiz.code = envControlDataService.getNewFs20Code();
            thiz.selectedLabel = null;
            thiz.selectedIcon = 'bolt';
            thiz.selectedType = null;
            thiz.trained = false;
            thiz.selectTypes = [
                utilService.createSelectItem('Steckdose'),
                utilService.createSelectItem('IR-Commando')
            ];

            thiz.trainCode = function() {
                envControlFsService.trainCode(thiz.code);
                thiz.trained = true;
            };

            thiz.addCellBoardItemAndReturn = function() {
                envControlDataService.addCellBoardElement(thiz.selectedLabel, thiz.selectedIcon, thiz.code);
                $state.go('envControl');
            };

            thiz.stepCompleted = function(nr) {
                var ret = true;
                if(nr >= 1) {
                    ret = ret && thiz.selectedType;
                }
                if(nr >= 2) {
                    ret = ret && thiz.selectedLabel;
                }
                if(nr >= 3) {
                    ret = ret && thiz.trained;
                }
                return ret;
            };
        }],
        controllerAs: 'envControlAddCtrl',
        templateUrl: "angular/envControl/component/envControlAdd.html"
    });