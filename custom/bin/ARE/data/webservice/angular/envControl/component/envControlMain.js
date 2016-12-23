angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;

            init();
            function init() {
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