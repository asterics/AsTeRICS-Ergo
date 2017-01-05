angular.module(asterics.appComponents)
    .component('cellBoard', {

        bindings: {
            chooseItems: '<',
            actionMode: "<",
            removeHandler: "&"
        },
        controller: ['envControlService', function (envControlService) {
            var thiz = this;

            thiz.itemClicked = function(item) {
                if(thiz.actionMode === asterics.const.CELLB_MODE_DELETE) {
                    thiz.removeHandler({item: item});
                } else {
                    item.clickAction();
                }
            };
        }],
        templateUrl: "angular/global/component/cellBoard.html"
    });