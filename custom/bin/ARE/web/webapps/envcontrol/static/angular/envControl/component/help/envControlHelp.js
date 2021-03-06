angular.module(asterics.appComponents)
    .component('envControlHelp', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', function (utilService, $state) {
            var thiz = this;
            thiz.currentState = $state.current.name;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
        }],
        templateUrl: "angular/envControl/component/help/envControlHelp.html"
    });