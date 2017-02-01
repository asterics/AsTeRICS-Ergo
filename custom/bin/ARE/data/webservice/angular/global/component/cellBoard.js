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

            thiz.getClass = function (item) {
                return item && item.active ? 'active' : '';
            };

            thiz.getFaClass = function(item) {
                if(item && item.faIcon) {
                    return 'fa fa-3x fa-' +  item.faIcon;
                }
            };

            thiz.isDisabled = function (item) {
                if (_.isFunction(item.disabled)) {
                    return item.disabled();
                } else {
                    return item.disabled;
                }
            };

            thiz.isVisible = function (item) {
                if (_.isFunction(item.visible)) {
                    return item.visible();
                } else {
                    return item.visible;
                }
            };
        }],
        templateUrl: "angular/global/component/cellBoard.html"
    });