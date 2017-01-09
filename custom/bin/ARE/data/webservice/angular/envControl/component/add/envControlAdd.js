angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('envControl')];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('Fernseher', 'television', 'envControl.add.tv'),
                utilService.createCellBoardItemNav('Steckdose', 'plug', 'envControl.add.fs20'),
                utilService.createCellBoardItemNav('Fernbedienungs-Befehl', 'wifi', 'envControl.add.ir')
            ];
        }],
        templateUrl: "angular/envControl/component/add/envControlAdd.html"
    });