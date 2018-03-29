angular.module(asterics.appComponents)
    .component('cellBoard', {

        bindings: {
            chooseItems: '<',
            actionMode: "<",
            removeHandler: "&",
            moveHandler: "&"
        },
        controller: ['$translate', '$timeout', function ($translate, $timeout) {
            var thiz = this;
            var _deleteText = $translate.instant('i18n_ec_delete');
            var _additionalClass = '';
            var _contextMenuOptions = [
                [_deleteText, function ($itemScope, $event, modelValue, text, $li) {
                    thiz.removeHandler({item: $itemScope.item});
                }]
            ];

            thiz.getContextMenuOptions = function (item) {
                if (item && (item.type === asterics.const.CB_TYPE_NAV || item.type === asterics.const.CB_TYPE_FN)) {
                    return [];
                }
                return _contextMenuOptions;
            };

            thiz.itemClicked = function (item) {
                _additionalClass = 'clicked';
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
                $timeout(function(){
                    _additionalClass = '';
                }, 1000);
            };

            thiz.getClass = function (item) {
                var elementClass = item.class || '';
                return item && item.active ? elementClass + ' active' : elementClass + ' ' + _additionalClass;
            };

            thiz.getFaClass = function (item) {
                if (item && item.faIcon) {
                    return 'fa fa-3x fa-' + item.faIcon;
                }
            };

            thiz.getTooltip = function (item) {
                if (item && item.tooltip) {
                    return $translate.instant(item.tooltip, item.tooltipParams);
                }
            };

            thiz.isDisabled = function (item) {
                if (_.isFunction(item.disabled)) {
                    return item.disabled();
                } else {
                    return item.disabled;
                }
            };

            thiz.showFolderIcon = function(item) {
                return item.type === asterics.const.CB_TYPE_SUBCB;
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