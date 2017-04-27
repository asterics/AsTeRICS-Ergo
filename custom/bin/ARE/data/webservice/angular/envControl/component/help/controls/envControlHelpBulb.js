angular.module(asterics.appComponents)
    .component('envControlHelpIrbulb', {
        bindings: {},
        controller: ['utilService', '$stateParams', function (utilService, $stateParams) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
        }],
        templateUrl: "angular/envControl/component/help/controls/envControlHelpBulb.html"
    });