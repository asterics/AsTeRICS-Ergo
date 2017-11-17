angular.module(asterics.appComponents)
    .component('mainMenu', {

        bindings: {},
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('home.envControl', 'home', 'home.envControl')];
            thiz.isNonSupportedBrowser = function() {
                return false;
            }
        }],
        templateUrl: "angular/global/component/mainMenu.html"
    });