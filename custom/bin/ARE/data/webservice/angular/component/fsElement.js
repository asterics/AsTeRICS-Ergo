angular.module(are.app)
    .component('fsElement', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.startModel = function () {
                envControlService.startEnvModel();
            };

            thiz.sendEvent = function () {
                envControlService.fs20Toggle("11111111_1111");
            };
        }],
        controllerAs: 'fsElementCtrl',
        templateUrl: "angular/component/fsElement.html"
    });