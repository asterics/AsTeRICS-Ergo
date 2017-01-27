angular.module(asterics.appComponents)
    .component('envControlAddMore', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Steckdose', 'plug', asterics.envControl.STATE_ADD_FS20),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', asterics.envControl.STATE_ADD_IR)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddMore.html"
    });