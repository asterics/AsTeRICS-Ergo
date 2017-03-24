angular.module(asterics.appComponents)
    .component('envControlHelpInstall', {
        bindings: {
        },
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
        }],
        templateUrl: "angular/envControl/component/help/install/envControlHelpInstall.html"
    });