angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', function (envControlService, envControlDataService) {
            var thiz = this;
            thiz.cellBoardElements = [];

            init();
            function init() {
                thiz.cellBoardElements = envControlDataService.getCellBoardElements();
                envControlService.isEnvModelStarted().then(function (isStarted) {
                    if (!isStarted) {
                        envControlService.startEnvModel();
                    }
                });
            }
        }],
        controllerAs: 'envControlCtrl',
        templateUrl: "angular/envControl/component/envControlMain.html"
    });