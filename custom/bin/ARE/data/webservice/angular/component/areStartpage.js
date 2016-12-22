angular.module(are.app)
    .component('areStartpage', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.startModel = function () {
                envControlService.startEnvModel();
            };

            thiz.sendEvent = function () {
                envControlService.fs20Toggle("11111111_1113");
            };
        }],
        controllerAs: 'areStartpageCtrl',
        templateUrl: "angular/component/areStartpage.html"
    });