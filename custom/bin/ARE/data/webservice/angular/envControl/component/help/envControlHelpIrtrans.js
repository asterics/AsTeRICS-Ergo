angular.module(asterics.appComponents)
    .component('envControlHelpIrtrans', {
        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
        }],
        templateUrl: "angular/envControl/component/help/envControlHelpIrtrans.html"
    });