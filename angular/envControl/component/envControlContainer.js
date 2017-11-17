angular.module(asterics.appComponents)
    .component('envControlContainer', {

        bindings: {},
        controller: ['$stateParams', function ($stateParams) {
            var thiz = this;
            thiz.singlePageMode = !!$stateParams.singlePageMode;
        }],
        templateUrl: "angular/envControl/component/envControlContainer.html"
    });