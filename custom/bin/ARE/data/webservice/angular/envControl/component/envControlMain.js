angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', '$state', function (envControlService, envControlDataService, $state) {
            var thiz = this;
            thiz.configDeleteItem = generateDeleteModeItem(true);
            thiz.cellBoardConfig = [generateAddItem(),thiz.configDeleteItem];
            thiz.cellBoardEnvControl = [];
            thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;

            thiz.removeHandler = function(item) {
                thiz.cellBoardEnvControl = envControlDataService.removeCellBoardElement(item);
            };

            init();
            function init() {
                thiz.cellBoardEnvControl = envControlDataService.getCellBoardElements();
                envControlService.isEnvModelStarted().then(function (isStarted) {
                    if (!isStarted) {
                        envControlService.startEnvModel();
                    }
                });
            }

            function generateDeleteModeItem(enableDeleteMode) {
                var title = 'Löschen deaktivieren';
                if(enableDeleteMode) {
                    title = 'Löschen aktivieren';
                }
                return asterics.utils.createCellBoardItem(title, 'trash', function () {
                    if(thiz.cellBoardMode === asterics.const.CELLB_MODE_NORMAL) {
                        thiz.cellBoardMode = asterics.const.CELLB_MODE_DELETE;
                    } else {
                        thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
                    }
                    var index = thiz.cellBoardConfig.indexOf(thiz.configDeleteItem);
                    thiz.cellBoardConfig.splice(index, 1, generateDeleteModeItem(!enableDeleteMode));
                });
            }

            function generateAddItem() {
                return asterics.utils.createCellBoardItem('neues Element', 'plus', function() {
                    $state.go('envControl.add');
                });
            }
        }],
        controllerAs: 'envControlCtrl',
        templateUrl: "angular/envControl/component/envControlMain.html"
    });