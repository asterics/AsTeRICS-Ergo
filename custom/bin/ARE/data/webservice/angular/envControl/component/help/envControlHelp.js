angular.module(asterics.appComponents)
    .component('envControlHelp', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
        }],
        templateUrl: "angular/envControl/component/help/envControlHelp.html"
    });