angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', '$state', 'utilService', 'stateUtilService', function (envControlService, envControlDataService, $state, utilService, stateUtilService) {
            var thiz = this;
            thiz.cellBoardId = $state.current.name;
            thiz.configDeleteItem = generateDeleteModeItem(true);
            thiz.cellBoardConfig = [thiz.configDeleteItem];
            thiz.cellBoardEnvControl = [];
            thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
            thiz.title = 'Geräte steuern';
            if (thiz.cellBoardId === asterics.envControl.STATE_MAIN) {
                thiz.title = thiz.title + ' - Hauptseite';
            } else {
                var states = stateUtilService.getBreadCrumbStates();
                thiz.title = thiz.title + ' - ' + stateUtilService.getLastPartUpper(states[2]);
            }

            thiz.removeHandler = function (item) {
                thiz.cellBoardEnvControl = envControlDataService.removeCellBoardElement(thiz.cellBoardId, item);
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
                if (thiz.cellBoardId === asterics.envControl.STATE_MAIN) {
                    items.push(utilService.createCellBoardItemBack('home'));
                    items.push(utilService.createCellBoardItemNav('neues Element', 'plus', asterics.envControl.STATE_ADD));
                } else {
                    items.push(utilService.createCellBoardItemBack(stateUtilService.cutLastPart($state.current.name)));
                    items.push(utilService.createCellBoardItemNav('neues Element', 'plus', asterics.envControl.STATE_ADDSUB, {cellBoardId: thiz.cellBoardId}));
                }
                return items;
            }
        }],
        templateUrl: "angular/envControl/component/envControlMain.html"
    });