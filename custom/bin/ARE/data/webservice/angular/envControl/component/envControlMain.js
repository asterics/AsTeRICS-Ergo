angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', '$state', 'utilService', function (envControlService, envControlDataService, $state, utilService) {
            var thiz = this;
            thiz.configDeleteItem = generateDeleteModeItem(true);
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack('home'), utilService.createCellBoardItemNav('neues Element', 'plus', 'envControl.add'), thiz.configDeleteItem];
            thiz.cellBoardEnvControl = [];
            thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;

            thiz.removeHandler = function (item) {
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
                if (enableDeleteMode) {
                    title = 'Löschen aktivieren';
                }
                return utilService.createCellBoardItem(title, 'trash', asterics.envControl.CB_TYPE_FN, function () {
                    if (thiz.cellBoardMode === asterics.const.CELLB_MODE_NORMAL) {
                        thiz.cellBoardMode = asterics.const.CELLB_MODE_DELETE;
                    } else {
                        thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
                    }
                    var index = thiz.cellBoardConfig.indexOf(thiz.configDeleteItem);
                    thiz.cellBoardConfig.splice(index, 1, generateDeleteModeItem(!enableDeleteMode));
                });
            }
        }],
        controllerAs: 'envControlCtrl',
        templateUrl: "angular/envControl/component/envControlMain.html"
    });