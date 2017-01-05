angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl')];
            thiz.selectedType = {};
            thiz.selectTypes = [
                utilService.createSelectItem('Steckdose', asterics.envControl.ID_FS20),
                utilService.createSelectItem('IR-Commando', asterics.envControl.ID_IR)
            ];

            thiz.enableFs = function () {
                return thiz.selectedType.id === asterics.envControl.ID_FS20;
            };

            thiz.enableIr = function () {
                return thiz.selectedType.id === asterics.envControl.ID_IR;
            };
        }],
        templateUrl: "angular/envControl/component/envControlAdd.html"
    });