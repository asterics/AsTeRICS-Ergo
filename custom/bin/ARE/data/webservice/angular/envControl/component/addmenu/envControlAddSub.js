angular.module(asterics.appComponents)
    .component('envControlAddSub', {

        bindings: {},
        controller: ['utilService', '$stateParams', 'stateUtilService', function (utilService, $stateParams, stateUtilService) {
            var thiz = this;
            thiz.deviceName = stateUtilService.getLastPartUpper($stateParams.cellBoardId);
            thiz.translateParam = {device: thiz.deviceName};
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack($stateParams.cellBoardId)];

            var numberElement = utilService.createCellBoardItemNav('i18n_ec_numbersfor', 'th', asterics.envControl.STATE_ADD + '.' + asterics.envControl.SUBSTATE_ADD_NUMBERS, $stateParams);
            numberElement.translateParams = thiz.translateParam;
            var irCommandElement = utilService.createCellBoardItemNav('i18n_ec_ircommand', 'wifi', asterics.envControl.STATE_ADD_IR, $stateParams);
            irCommandElement.tooltip = 'i18n_ec_ircommand_tooltip';
            thiz.cellBoardChoose = [
                numberElement,
                irCommandElement
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddSub.html"
    });