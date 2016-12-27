angular.module(asterics.appComponents)
    .component('cellBoardChooser', {

        bindings: {
            item: "<"
        },
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
        }],
        controllerAs: 'cellBoardChooserCtrl',
        templateUrl: "angular/global/component/cellBoardChooser.html"
    });