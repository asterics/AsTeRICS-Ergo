angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack(asterics.envControl.STATE_MAIN)];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Lampe', 'lightbulb-o', asterics.envControl.STATE_ADD_LAMP),
                utilService.createCellBoardItemNav('Fernseher', 'television', asterics.envControl.STATE_ADD + '.' + asterics.envControl.SUBSTATE_ADD_TV),
                utilService.createCellBoardItemNav('DVD-Player', 'circle', asterics.envControl.STATE_ADD + '.' + asterics.envControl.SUBSTATE_ADD_DVD),
                utilService.createCellBoardItemNav('Musik-Player', 'music', asterics.envControl.STATE_ADD + '.' + asterics.envControl.SUBSTATE_ADD_HIFI),
                utilService.createCellBoardItemNav('Nummern', 'th', asterics.envControl.STATE_ADD + '.'+ asterics.envControl.SUBSTATE_ADD_NUMBERS),
                utilService.createCellBoardItemNav('Steckdose', 'plug', asterics.envControl.STATE_ADD_FS20),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', asterics.envControl.STATE_ADD_IR)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAdd.html"
    });