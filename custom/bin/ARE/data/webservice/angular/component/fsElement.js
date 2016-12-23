angular.module(are.app)
    .component('fsElement', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;

            thiz.sendEvent = function () {
                envControlService.fs20Toggle("11111111_1111");
            };

            init();
            function init() {
                envControlService.isEnvModelStarted().then(function(isStarted) {
                    if(!isStarted) {
                        envControlService.startEnvModel();
                    }
                });
            }
        }],
        controllerAs: 'fsElementCtrl',
        templateUrl: "angular/component/fsElement.html"
    });