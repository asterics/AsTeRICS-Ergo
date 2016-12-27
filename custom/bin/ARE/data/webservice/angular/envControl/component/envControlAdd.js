angular.module(asterics.appComponents)
    .component('envControlAdd', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.chosableElementTypes = [
                asterics.utils.createCellBoardItem('Steckdose', 'steckdose.png', function () {
                    alert("steckdose clicked!");
                }),
                asterics.utils.createCellBoardItem('IR', 'ir.png', function () {
                    alert("IR clicked!");
                })
            ];
        }],
        controllerAs: 'envControlAddCtrl',
        templateUrl: "angular/envControl/component/envControlAdd.html"
    });