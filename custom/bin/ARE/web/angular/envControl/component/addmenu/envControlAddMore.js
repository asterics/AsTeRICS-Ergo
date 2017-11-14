angular.module(asterics.appComponents)
    .component('envControlAddMore', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            var itemIrcommand = utilService.createCellBoardItemNav('i18n_ec_ircommand', 'wifi', asterics.envControl.STATE_ADD_IR);
            itemIrcommand.tooltip = 'i18n_ec_ircommand_tooltip';
            var itemIrcommandDevice = utilService.createCellBoardItemNav('i18n_ec_ircommand_device', 'building-o', asterics.envControl.STATE_ADD_IR_DEVICE);
            itemIrcommandDevice.tooltip = 'i18n_ec_ircommand_device_tooltip';
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('i18n_ec_plug', 'plug', asterics.envControl.STATE_ADD_FS20),
                itemIrcommand,
                itemIrcommandDevice
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAddMore.html"
    });