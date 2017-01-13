angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', '$state', 'utilService', 'stateUtilService', function (envControlService, envControlDataService, $state, utilService, stateUtilService) {
            var thiz = this;
            thiz.cellBoardId = $state.current.name;
            thiz.cellBoardConfig = [];
            thiz.cellBoardEnvControl = [];
            thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
            thiz.moveItem = null;
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

            thiz.moveHandler = function (item) {
                envControlDataService.prepareCellBoardElementMove(thiz.cellBoardId, item);
                item.disabled = true;
                thiz.moveItem.clickAction();
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
                items.push(generateSwitchModeItem('Löschen aktivieren', 'Löschen deaktivieren', 'trash', asterics.const.CELLB_MODE_DELETE));
                thiz.moveItem = generateMoveItem();
                items.push(thiz.moveItem);
                if (envControlDataService.hasClipboardData()) {
                    items.push(utilService.createCellBoardItem('Element einfügen', 'clipboard', asterics.envControl.CB_TYPE_FN, function () {
                        envControlDataService.pasteCellBoardItem(thiz.cellBoardId);
                        removeElementFromCellboard(thiz.cellBoardConfig, this);
                    }));
                }
                return items;
            }

            function generateMoveItem() {
                return generateSwitchModeItem('Verschieben aktivieren', 'Verschieben deaktivieren', 'arrows', asterics.const.CELLB_MODE_MOVE);
            }

            function generateSwitchModeItem(titleDeactivated, titleActivated, icon, switchMode) {
                return utilService.createCellBoardItem(titleDeactivated, icon, asterics.envControl.CB_TYPE_FN, function () {
                    if (this.title === titleDeactivated) {
                        this.active = true;
                        this.title = titleActivated;
                    } else {
                        this.active = false;
                        this.title = titleDeactivated;
                    }
                    if (thiz.cellBoardMode === asterics.const.CELLB_MODE_NORMAL) {
                        thiz.cellBoardMode = switchMode;
                    } else {
                        thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
                    }
                });
            }

            function removeElementFromCellboard(cellboard, element) {
                var index = cellboard.indexOf(element);
                if (index > -1) {
                    cellboard.splice(index, 1);
                }
                return index;
            }
        }],
        templateUrl: "angular/envControl/component/envControlMain.html"
    });