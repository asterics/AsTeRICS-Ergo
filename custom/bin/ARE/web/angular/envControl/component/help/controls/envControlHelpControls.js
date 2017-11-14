angular.module(asterics.appComponents)
    .component('envControlHelpControls', {
        bindings: {
        },
        controller: ['utilService', '$state', function (utilService, $state) {
            var thiz = this;
            thiz.currentState = encodeURI($state.current.name);
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
        }],
        templateUrl: "angular/envControl/component/help/controls/envControlHelpControls.html"
    });