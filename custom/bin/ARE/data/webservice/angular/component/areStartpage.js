angular.module(are.app)
    .component('areStartpage', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
        }],
        controllerAs: 'areStartpageCtrl',
        templateUrl: "angular/component/areStartpage.html"
    });