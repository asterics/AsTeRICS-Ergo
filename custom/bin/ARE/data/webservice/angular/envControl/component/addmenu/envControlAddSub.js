angular.module(asterics.appComponents)
    .component('envControlAddSub', {

        bindings: {},
        controller: ['utilService', '$stateParams', 'stateUtilService', function (utilService, $stateParams, stateUtilService) {
            var thiz = this;
            thiz.deviceName = stateUtilService.getLastPartUpper($stateParams.cellBoardId);
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('home.envControl')];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Nummern', 'th', 'home.envControl.add.' + asterics.envControl.SUBSTATE_ADD_NUMBERS, $stateParams),
                utilService.createCellBoardItemNav('Steckdose', 'plug', 'home.envControl.add.fs20', $stateParams),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', 'home.envControl.add.ir', $stateParams)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddSub.html"
    });