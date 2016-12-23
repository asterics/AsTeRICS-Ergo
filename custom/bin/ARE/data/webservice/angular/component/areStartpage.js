angular.module(are.app)
    .component('areStartpage', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;

            init();
            function init() {
                envControlService.isEnvModelStarted().then(function(isStarted) {
                    if(!isStarted) {
                        envControlService.startEnvModel();
                    }
                });
            }
        }],
        controllerAs: 'areStartpageCtrl',
        templateUrl: "angular/component/areStartpage.html"
    });