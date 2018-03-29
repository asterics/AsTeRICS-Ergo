angular.module(asterics.appComponents)
    .component('envControlAddMore', {

        bindings: {},
        controller: ['utilService', 'envControlUtilService', function (utilService, envControlUtilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.cellBoardChoose = [
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_PLUG_GENERIC),
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_IR_CMD_GENERIC, true),
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_IR_GENERIC, true)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddMore.html"
    });