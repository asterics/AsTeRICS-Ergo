angular.module(asterics.appServices)
    .service('envControlUtilService', ['envControlFsService', 'envControlIRService', 'utilService', '$rootScope', function (envControlFsService, envControlIRService, utilService, $rootScope) {
        var thiz = this;

        thiz.createCellBoardItemFs20 = function (title, faIcon, code) {
            var element = utilService.createCellBoardItem(title, faIcon, asterics.envControl.CB_TYPE_FS20, function () {
                envControlFsService.fs20Toggle(code);
            });
            element.code = code;
            return element;
        };

        thiz.createCellBoardItemIrTrans = function (title, faIcon, code) {
            var element = utilService.createCellBoardItem(title, faIcon, asterics.envControl.CB_TYPE_IR, function () {
                envControlIRService.irSend(code);
            });
            element.code = code;
            return element;
        };

        thiz.getIrElements = function (substateName) {
            switch (substateName) {
                case asterics.envControl.SUBSTATE_ADD_TV:
                    return [
                        createIrElement('EIN/AUS', 'power-off'),
                        createIrElement('Kanal +', 'arrow-up'),
                        createIrElement('Kanal -', 'arrow-down'),
                        createIrElement('Volume +', 'volume-up'),
                        createIrElement('Volume -', 'volume-down')
                    ];
                case asterics.envControl.SUBSTATE_ADD_HIFI:
                    return [
                        createIrElement('EIN/AUS', 'power-off'),
                        createIrElement('Play', 'play'),
                        createIrElement('Pause', 'pause'),
                        createIrElement('Stop', 'stop'),
                        createIrElement('Next', 'step-forward'),
                        createIrElement('Back', 'step-backward'),
                        createIrElement('Volume +', 'volume-up'),
                        createIrElement('Volume -', 'volume-down')
                    ];
                case asterics.envControl.SUBSTATE_ADD_DVD:
                    return [
                        createIrElement('EIN/AUS', 'power-off'),
                        createIrElement('Play', 'play'),
                        createIrElement('Pause', 'pause'),
                        createIrElement('Stop', 'stop'),
                        createIrElement('Volume +', 'volume-up'),
                        createIrElement('Volume -', 'volume-down'),
                        createIrElement('Up', 'arrow-up'),
                        createIrElement('Down', 'arrow-down'),
                        createIrElement('Right', 'arrow-right'),
                        createIrElement('Left', 'arrow-left'),
                        createIrElement('OK', 'check-circle-o')
                    ];
                case asterics.envControl.SUBSTATE_ADD_NUMBERS:
                    return [
                        createIrElement('1', 'circle'),
                        createIrElement('2', 'circle'),
                        createIrElement('3', 'circle'),
                        createIrElement('4', 'circle'),
                        createIrElement('5', 'circle'),
                        createIrElement('6', 'circle'),
                        createIrElement('7', 'circle'),
                        createIrElement('8', 'circle'),
                        createIrElement('9', 'circle'),
                        createIrElement('0', 'circle')
                    ];
                default:
                    return;
            }
        };

        function createIrElement(label, icon) {
            return {
                label: label,
                icon: icon
            };
        }
    }]);