angular.module(asterics.appComponents)
    .component('envControlAddSub', {

        bindings: {},
        controller: ['utilService', '$stateParams', 'stateUtilService', 'envControlDataService', function (utilService, $stateParams, stateUtilService, envControlDataService) {
            var thiz = this;
            thiz.cellBoardIdToAdd = $stateParams.cellBoardId;
            thiz.deviceName = stateUtilService.getLastPartUpper(thiz.cellBoardIdToAdd);
            thiz.translateParam = {device: thiz.deviceName};
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];

            var numberElement = utilService.createCellBoardItemNav('i18n_ec_numbersfor', 'th', asterics.envControl.STATE_ADD + '.' + asterics.envControl.SUBSTATE_ADD_NUMBERS, $stateParams);
            numberElement.translateParams = thiz.translateParam;
            var irCommandElement = utilService.createCellBoardItemNav('i18n_ec_ircommand', 'wifi', asterics.envControl.STATE_ADD_IR, $stateParams);
            irCommandElement.tooltip = 'i18n_ec_ircommand_tooltip';
            if (_.includes(asterics.envControl.DEVICES_WITH_NUMBERS, envControlDataService.getDeviceType(thiz.cellBoardIdToAdd))) {
                thiz.cellBoardChoose = [
                    numberElement,
                    irCommandElement
                ];
            } else {
                irCommandElement.clickAction();
            }
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddSub.html"
    });