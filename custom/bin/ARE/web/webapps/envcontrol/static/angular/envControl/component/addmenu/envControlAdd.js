angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_MAIN)];
            thiz.cellBoardChoose = [
                utilService.createCellBoardItemNav('i18n_ec_amblight', 'sun-o', asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_AMB_LAMP),
                utilService.createCellBoardItemNav('i18n_ec_lamp', 'lightbulb-o', asterics.envControl.STATE_ADD_LAMP),
                utilService.createCellBoardItemNav('i18n_ec_tv', 'television', asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_TV),
                utilService.createCellBoardItemNav('i18n_ec_dvd', 'circle', asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_DVD),
                utilService.createCellBoardItemNav('i18n_ec_hifi', 'music', asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_HIFI),
                utilService.createCellBoardItemNav('i18n_ec_more', 'plus', asterics.envControl.STATE_ADDMORE)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAdd.html"
    });