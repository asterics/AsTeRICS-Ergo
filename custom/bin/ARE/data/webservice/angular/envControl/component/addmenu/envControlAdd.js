angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl')];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Lampe', 'lightbulb-o', 'envControl.add.lamp'),
                utilService.createCellBoardItemNav('Fernseher', 'television', 'envControl.add.' + asterics.envControl.SUBSTATE_ADD_TV),
                utilService.createCellBoardItemNav('DVD-Player', 'circle', 'envControl.add.' + asterics.envControl.SUBSTATE_ADD_DVD),
                utilService.createCellBoardItemNav('Musik-Player', 'music', 'envControl.add.' + asterics.envControl.SUBSTATE_ADD_HIFI),
                utilService.createCellBoardItemNav('Nummern', 'th', 'envControl.add.'+ asterics.envControl.SUBSTATE_ADD_NUMBERS),
                utilService.createCellBoardItemNav('Steckdose', 'plug', 'envControl.add.fs20'),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', 'envControl.add.ir')
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAdd.html"
    });