angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', '$state', 'utilService', function (envControlService, envControlDataService, $state, utilService) {
            var thiz = this;
            thiz.cellBoardId = $state.current.name;
            thiz.configDeleteItem = generateDeleteModeItem(true);
            thiz.cellBoardConfig = [thiz.configDeleteItem];
            thiz.cellBoardEnvControl = [];
            thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;

            thiz.removeHandler = function (item) {
                thiz.cellBoardEnvControl = envControlDataService.removeCellBoardElement(item);
            };

            init();
            function init() {
                thiz.cellBoardEnvControl = envControlDataService.getCellBoard(thiz.cellBoardId);
                thiz.cellBoardConfig = generateDynamicItems().concat(thiz.cellBoardConfig);
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

            function generateDynamicItems() {
                var items = [];
                if(thiz.cellBoardId === asterics.envControl.STATE_MAIN) {
                    items.push(utilService.createCellBoardItemBack('home'));
                    items.push(utilService.createCellBoardItemNav('neues Element', 'plus', 'envControl.add'));
                } else if(_.includes(thiz.cellBoardId, '-')) {
                    items.push(utilService.createCellBoardItemBack(thiz.cellBoardId.substring(0, thiz.cellBoardId.lastIndexOf('-'))));
                } else {
                    items.push(utilService.createCellBoardItemBack('^'));
                    items.push(utilService.createCellBoardItemNav('neues Element', 'plus', 'envControl.addsub', {cellBoardId: thiz.cellBoardId}));
                }
                return items;
            }
        }],
        templateUrl: "angular/envControl/component/envControlMain.html"
    });