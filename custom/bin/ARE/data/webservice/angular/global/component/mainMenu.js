angular.module(asterics.appComponents)
    .component('mainMenu', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('home.envControl', 'home', 'home.envControl')];
        }],
        templateUrl: "angular/global/component/mainMenu.html"
    });