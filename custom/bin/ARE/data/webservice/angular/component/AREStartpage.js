angular.module(are.app)
    .component('areStartpage', {

        bindings: {},
        controller: ['areService', function (areService) {
            var thiz = this;
            console.log("test");
            thiz.text = "intial from component";
            thiz.get = function () {
                thiz.text = areService.test();
            }
        }],
        controllerAs: 'areStartpageCtrl',
        templateUrl: "angular/component/AREStartpage.html"
    });