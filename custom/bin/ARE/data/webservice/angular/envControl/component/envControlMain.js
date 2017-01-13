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
            thiz.PasteItem = null;
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
                if (envControlDataService.hasClipboardData()) {
                    var clipBoard = envControlDataService.getClipboardData();
                    if (clipBoard.cellBoardName === thiz.cellBoardId) {
                        clipBoard.element.disabled = false;
                        envControlDataService.clearClipboard();
                    }
                }
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
                var deleteItem = generateSwitchModeItem('Löschen aktivieren', 'Löschen deaktivieren', 'trash', asterics.const.CELLB_MODE_DELETE);
                deleteItem.visible = function () {
                    var ret = thiz.cellBoardEnvControl && !thiz.pasteItem.visible();
                    return ret && thiz.cellBoardEnvControl.length > 0;
                };
                items.push(deleteItem);
                thiz.moveItem = generateMoveItem();
                thiz.moveItem.visible = function () {
                    var ret = thiz.cellBoardEnvControl && !thiz.pasteItem.visible();
                    return ret && (thiz.cellBoardEnvControl.length > 1 || (thiz.cellBoardEnvControl.length > 0 && thiz.cellBoardId !== asterics.envControl.STATE_MAIN));
                };
                items.push(thiz.moveItem);
                thiz.pasteItem = utilService.createCellBoardItem('Element einfügen', 'clipboard', asterics.envControl.CB_TYPE_FN, function () {
                    envControlDataService.pasteCellBoardItem(thiz.cellBoardId);
                    removeElementFromCellboard(thiz.cellBoardConfig, this);
                });
                thiz.pasteItem.visible = function() {
                    return envControlDataService.hasClipboardData() && envControlDataService.getClipboardData().cellBoardName !== thiz.cellBoardId;
                };
                items.push(thiz.pasteItem);
                return items;
            }

            function generateMoveItem() {
                return generateSwitchModeItem('Verschieben aktivieren', 'Verschieben deaktivieren', 'arrows', asterics.const.CELLB_MODE_MOVE);
            }

            function generateSwitchModeItem(titleDeactivated, titleActivated, icon, switchMode) {
                var item = utilService.createCellBoardItem(titleDeactivated, icon, asterics.envControl.CB_TYPE_FN, function () {
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
                item.disabled = function () {
                    return thiz.cellBoardMode !== asterics.const.CELLB_MODE_NORMAL && thiz.cellBoardMode !== switchMode;
                };
                return item;
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