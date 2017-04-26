angular.module(asterics.appComponents)
    .component('envControlAddMore', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            var itemIrcommandDevice = utilService.createCellBoardItemNav('i18n_ec_ircommand_device', 'building-o', asterics.envControl.STATE_ADD_IR_DEVICE);
            itemIrcommandDevice.tooltip = 'i18n_ec_ircommand_device_tooltip';
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('i18n_ec_plug', 'plug', asterics.envControl.STATE_ADD_FS20),
                itemIrcommandDevice
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddMore.html"
    });