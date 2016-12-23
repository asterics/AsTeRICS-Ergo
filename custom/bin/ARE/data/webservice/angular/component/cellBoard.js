angular.module(are.app)
    .component('cellBoard', {

        bindings: {},
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.items = [];
            thiz.addItem = function (item) {
                thiz.items.push(item);
            };

            thiz.removeItem = function (index) {
                thiz.items.splice(index, 1);
            };
        }],
        controllerAs: 'cellBoardCtrl',
        templateUrl: "angular/component/cellBoard.html"
    });