angular.module(asterics.appComponents)
    .component('envControlAddSub', {

        bindings: {},
        controller: ['utilService', '$stateParams', function (utilService, $stateParams) {
            var thiz = this;
            thiz.cbToAdd = $stateParams.cellBoardId;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl')];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Nummern', 'th', 'envControl.add.'+ asterics.envControl.SUBSTATE_ADD_NUMBERS, $stateParams),
                utilService.createCellBoardItemNav('Steckdose', 'plug', 'envControl.add.fs20', $stateParams),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', 'envControl.add.ir', $stateParams)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAdd.html"
    });