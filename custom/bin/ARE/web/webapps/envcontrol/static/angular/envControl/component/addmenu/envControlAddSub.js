angular.module(asterics.appComponents)
    .component('envControlAddSub', {

        bindings: {},
        controller: ['utilService', '$stateParams', 'stateUtilService', 'envControlUtilService', function (utilService, $stateParams, stateUtilService, envControlUtilService) {
            var thiz = this;
            thiz.cellBoardIdToAdd = $stateParams.cellBoardId;
            thiz.deviceName = stateUtilService.getLastPartUpper(thiz.cellBoardIdToAdd);
            thiz.translateParam = {device: thiz.deviceName};
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];

            thiz.cellBoardChoose = [
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_IR_NUMBERS, false, angular.copy($stateParams)),
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_IR_CMD_GENERIC, true, angular.copy($stateParams))
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddSub.html"
    });