angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('home.envControl')];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Lampe', 'lightbulb-o', 'home.envControl.add.lamp'),
                utilService.createCellBoardItemNav('Fernseher', 'television', 'home.envControl.add.' + asterics.envControl.SUBSTATE_ADD_TV),
                utilService.createCellBoardItemNav('DVD-Player', 'circle', 'home.envControl.add.' + asterics.envControl.SUBSTATE_ADD_DVD),
                utilService.createCellBoardItemNav('Musik-Player', 'music', 'home.envControl.add.' + asterics.envControl.SUBSTATE_ADD_HIFI),
                utilService.createCellBoardItemNav('Nummern', 'th', 'home.envControl.add.'+ asterics.envControl.SUBSTATE_ADD_NUMBERS),
                utilService.createCellBoardItemNav('Steckdose', 'plug', 'home.envControl.add.fs20'),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', 'home.envControl.add.ir')
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAdd.html"
    });