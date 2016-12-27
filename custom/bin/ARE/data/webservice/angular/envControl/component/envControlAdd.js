angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.chosableElementTypes = [
                {
                    title: "Steckdose",
                    imgUrl: "steckdose.png",
                    clickAction: function () {
                        alert("steckdose clicked!");
                    }
                },
                {
                    title: "IR",
                    imgUrl: "ir.png",
                    clickAction: function () {
                        alert("IR clicked!");
                    }
                }
            ];
        }],
        controllerAs: 'envControlAddCtrl',
        templateUrl: "angular/envControl/component/envControlAdd.html"
    });