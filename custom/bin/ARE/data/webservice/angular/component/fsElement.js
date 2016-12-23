angular.module(are.app)
    .component('fsElement', {

        bindings: {},
        controller: ['fsService', function (fsService) {
            var thiz = this;

            thiz.sendEvent = function () {
                fsService.fs20Toggle("11111111_1111");
            };
        }],
        controllerAs: 'fsElementCtrl',
        templateUrl: "angular/component/fsElement.html"
    });