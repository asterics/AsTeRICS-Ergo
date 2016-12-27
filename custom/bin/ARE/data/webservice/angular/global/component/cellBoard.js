angular.module(asterics.appComponents)
    .component('cellBoard', {

        bindings: {
            chooseItems: '=',
            configurable: "="
        },
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.configEnabled = false;
            thiz.configItems = [generateConfigItem(true)];

            thiz.getItems = function() {
                if(thiz.configurable) {
                    return (thiz.chooseItems || []).concat(thiz.configItems);
                }
                return thiz.chooseItems;
            };

            thiz.itemClicked = function(item) {
                if(thiz.configEnabled && !_.includes(thiz.configItems, item)) {
                    thiz.chooseItems = _.without(thiz.chooseItems, item);
                } else {
                    item.clickAction();
                }
            };

            thiz.getDirectiveName = function(item) {
                if(item && item.directiveName) {
                    return item.directiveName;
                }
                return 'cell-board-chooser';
            };

            thiz.isCustomComponent = function(item) {
                return item && item.directiveName;
            };

            thiz.setConfigState = function(enableConfig) {
                thiz.configEnabled = enableConfig;
                thiz.configItems = [generateConfigItem(!enableConfig)];
            };

            function generateConfigItem(enableConfig) {
                var title = 'Konfig deaktivieren';
                if(enableConfig) {
                    title = 'Konfig aktivieren';
                }
                return asterics.utils.createCellBoardItem(title, 'config.png', function () {
                    thiz.setConfigState(enableConfig);
                });
            }
        }],
        controllerAs: 'cellBoardCtrl',
        templateUrl: "angular/global/component/cellBoard.html"
    });