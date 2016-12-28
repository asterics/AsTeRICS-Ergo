angular.module(asterics.appComponents)
    .component('mainMenu', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('Umgebungssteuerung', 'home', 'envControl')];
        }],
        controllerAs: 'mainMenuCtrl',
        templateUrl: "angular/global/component/mainMenu.html"
    });