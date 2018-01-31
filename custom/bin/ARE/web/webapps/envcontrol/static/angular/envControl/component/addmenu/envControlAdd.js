angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['utilService', 'envControlUtilService', function (utilService, envControlUtilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.cellBoardChoose = [
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_AMB_LAMP),
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_TABLELAMP),
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_TV),
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_DVD),
                envControlUtilService.createCellBoardItemAdd(asterics.envControl.DEVICE_HIFI),
                utilService.createCellBoardItemNav('i18n_ec_more', 'plus', asterics.envControl.STATE_ADDMORE)
            ];
        }],
        templateUrl: "angular/envControl/component/addmenu/envControlAdd.html"
    });