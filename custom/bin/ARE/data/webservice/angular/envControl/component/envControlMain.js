angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', '$state', 'utilService', 'stateUtilService', function (envControlService, envControlDataService, $state, utilService, stateUtilService) {
            var thiz = this;
            thiz.cellBoardId = $state.current.name;
            thiz.cellBoardConfig = [];
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

            function generateDynamicItems() {
                var items = [];
                if (thiz.cellBoardId === asterics.envControl.STATE_MAIN) {
                    items.push(utilService.createCellBoardItemBack('home'));
                    items.push(utilService.createCellBoardItemNav('neues Element', 'plus', asterics.envControl.STATE_ADD));
                } else {
                    items.push(utilService.createCellBoardItemBack(stateUtilService.cutLastPart($state.current.name)));
                    items.push(utilService.createCellBoardItemNav('neues Element', 'plus', asterics.envControl.STATE_ADDSUB, {cellBoardId: thiz.cellBoardId}));
                }
                items.push(generateSwitchModeItem('Löschen aktivieren','Löschen deaktivieren', asterics.const.CELLB_MODE_DELETE));
                return items;
            }

            function generateSwitchModeItem(title1, title2, switchMode) {
                return utilService.createCellBoardItem(title1, 'trash', asterics.envControl.CB_TYPE_FN, function () {
                    if(this.title === title1) {
                        this.title = title2;
                    } else {
                        this.title = title1;
                    }
                    if (thiz.cellBoardMode === asterics.const.CELLB_MODE_NORMAL) {
                        thiz.cellBoardMode = switchMode;
                    } else {
                        thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
                    }
                });
            }
        }],
        templateUrl: "angular/envControl/component/envControlMain.html"
    });