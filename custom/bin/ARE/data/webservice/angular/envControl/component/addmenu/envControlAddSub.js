angular.module(asterics.appComponents)
    .component('envControlAddSub', {

        bindings: {},
        controller: ['utilService', '$stateParams', 'stateUtilService', function (utilService, $stateParams, stateUtilService) {
            var thiz = this;
            thiz.deviceName = stateUtilService.getLastPartUpper($stateParams.cellBoardId);
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack($stateParams.cellBoardId)];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Nummern für ' + thiz.deviceName, 'th', asterics.envControl.STATE_ADD + '.' + asterics.envControl.SUBSTATE_ADD_NUMBERS, $stateParams),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', asterics.envControl.STATE_ADD_IR, $stateParams)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddSub.html"
    });