angular.module(asterics.appComponents)
    .component('envControlHelpIrbulb', {
        bindings: {},
        controller: ['utilService', '$stateParams', function (utilService, $stateParams) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.irbulbLinks = asterics.envControl.LINKS[asterics.envControl.HW_IR_BULB];

        }],
        templateUrl: "angular/envControl/component/help/controls/envControlHelpBulb.html"
    });