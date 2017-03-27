angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlDataService', '$state', 'utilService', 'stateUtilService', '$translate', 'messageService', function (envControlService, envControlDataService, $state, utilService, stateUtilService, $translate, messageService) {
            var thiz = this;
            var _msgGroup = 'envControlMain';
            var _msgGroupDelete = 'envControlMainDelete';

            thiz.cellBoardId = $state.current.name;
            thiz.substateDepth = stateUtilService.getSubStateDepthWithSlashes(thiz.cellBoardId);
            thiz.cellBoardConfig = [];
            thiz.cellBoardEnvControl = [];
            thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
            thiz.deleteItem = null;
            thiz.moveItem = null;
            thiz.pasteItem = null;

            thiz.getSubpageName = function () {
                if (thiz.cellBoardId === asterics.envControl.STATE_MAIN) {
                    return {subpage: $translate.instant('i18n_ec_mainpage')};
                } else {
                    var states = stateUtilService.getBreadCrumbStates();
                    return {subpage: stateUtilService.getLastPartUpper(states[2])};
                }
            };

            thiz.removeHandler = function (item) {
                thiz.cellBoardEnvControl = envControlDataService.removeCellBoardElement(thiz.cellBoardId, item);
                if (envControlDataService.getNumberOfElements(thiz.cellBoardId) == 0) {
                    messageService.clear();
                }
                thiz.deleteItem.normalMode(); //back to normal mode after one deletion
                messageService.success(_msgGroupDelete, 'i18n_delete_success');
            };

            thiz.undoRemove = function () {
                envControlDataService.undoRemove();
                thiz.cellBoardEnvControl = envControlDataService.getCellBoard(thiz.cellBoardId);
                messageService.clear();
            };

            thiz.moveHandler = function (item) {
                envControlDataService.prepareCellBoardElementMove(thiz.cellBoardId, item);
                item.disabled = true;
                thiz.moveItem.clickAction();
            };

            init();
            function init() {
                messageService.clear();
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

            //TODO beautify
            function generateDynamicItems() {
                var items = [];
                if (thiz.cellBoardId === asterics.envControl.STATE_MAIN) {
                    items.push(utilService.createCellBoardItemBack(asterics.const.STATE_HOME));
                    items.push(utilService.createCellBoardItemNav('i18n_ec_newelement', 'plus', asterics.envControl.STATE_ADD));
                } else {
                    items.push(utilService.createCellBoardItemBack());
                    if (thiz.substateDepth < 3) {
                        var text = thiz.substateDepth == 1 ? 'i18n_ec_newelement' : 'i18n_ec_newelement_sub';
                        items.push(utilService.createCellBoardItemNav(text, 'plus', asterics.envControl.STATE_ADDSUB, {cellBoardId: thiz.cellBoardId}));
                    }
                }
                thiz.deleteItem = generateSwitchModeItem('i18n_ec_activate_del', 'i18n_ec_deactivate_del', 'trash', asterics.const.CELLB_MODE_DELETE, 'i18n_ec_infotext_del');
                thiz.deleteItem.visible = function () {
                    var ret = thiz.cellBoardEnvControl && !thiz.pasteItem.visible();
                    return ret && thiz.cellBoardEnvControl.length > 0;
                };
                items.push(thiz.deleteItem);
                thiz.moveItem = generateMoveItem();
                thiz.moveItem.visible = function () {
                    return false; //TODO make moving good
                    /*var ret = thiz.cellBoardEnvControl && !thiz.pasteItem.visible();
                     return ret && (thiz.cellBoardEnvControl.length > 1 || (thiz.cellBoardEnvControl.length > 0 && thiz.cellBoardId !== asterics.envControl.STATE_MAIN));*/
                };
                items.push(thiz.moveItem);
                thiz.pasteItem = utilService.createCellBoardItem('i18n_ec_insert_element', 'clipboard', asterics.const.CB_TYPE_FN, function () {
                    envControlDataService.pasteCellBoardItem(thiz.cellBoardId);
                    removeElementFromCellboard(thiz.cellBoardConfig, this);
                });
                thiz.pasteItem.visible = function () {
                    return envControlDataService.hasClipboardData() && envControlDataService.getClipboardData().cellBoardName !== thiz.cellBoardId;
                };
                items.push(thiz.pasteItem);
                if (thiz.substateDepth == 1) {
                    var helpItem = utilService.createCellBoardItemNav('i18n_ec_help', 'question-circle', asterics.envControl.STATE_HELP);
                    items.push(helpItem);
                }
                return items;
            }

            function generateMoveItem() {
                return generateSwitchModeItem('i18n_ec_activate_mov', 'i18n_ec_deactivate_mov', 'arrows', asterics.const.CELLB_MODE_MOVE);
            }

            function generateSwitchModeItem(titleDeactivated, titleActivated, icon, switchMode, infoTextActivated) {
                var item = utilService.createCellBoardItem(titleDeactivated, icon, asterics.const.CB_TYPE_FN, function () {
                    messageService.clear();
                    if (this.title === titleDeactivated) {
                        this.active = true;
                        messageService.info(_msgGroup, infoTextActivated);
                        this.title = titleActivated;
                    } else {
                        this.active = false;
                        messageService.clear();
                        this.title = titleDeactivated;
                    }
                    if (thiz.cellBoardMode === asterics.const.CELLB_MODE_NORMAL) {
                        thiz.cellBoardMode = switchMode;
                    } else {
                        thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
                    }
                });
                item.normalMode = function () {
                    this.active = false;
                    messageService.clear();
                    this.title = titleDeactivated;
                    thiz.cellBoardMode = asterics.const.CELLB_MODE_NORMAL;
                };
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