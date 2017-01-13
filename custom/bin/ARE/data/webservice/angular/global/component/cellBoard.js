angular.module(asterics.appComponents)
    .component('cellBoard', {

        bindings: {
            chooseItems: '<',
            actionMode: "<",
            removeHandler: "&",
            moveHandler: "&"
        },
        controller: ['envControlService', function (envControlService) {
            var thiz = this;

            thiz.itemClicked = function (item) {
                switch (thiz.actionMode) {
                    case asterics.const.CELLB_MODE_DELETE: {
                        thiz.removeHandler({item: item});
                        break;
                    }
                    case asterics.const.CELLB_MODE_MOVE: {
                        thiz.moveHandler({item: item});
                        break;
                    }
                    default: {
                        item.clickAction();
                    }
                }
            };

            thiz.getClass = function(item) {
                return item.active ? 'active' : '';
            };
        }],
        templateUrl: "angular/global/component/cellBoard.html"
    });