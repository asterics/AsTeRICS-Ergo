angular.module(are.app)
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
        controllerAs: 'areStartpageCtrl',
        templateUrl: "angular/component/envControlMain.html"
    });