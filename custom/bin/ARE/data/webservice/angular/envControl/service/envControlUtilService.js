angular.module(asterics.appServices)
    .service('envControlUtilService', ['envControlFsService', 'envControlIRService', 'utilService', function (envControlFsService, envControlIRService, utilService) {
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

        thiz.getIrElementsTv = function () {
            return [
                createIrElement('EIN/AUS', 'power-off'),
                createIrElement('Kanal +', 'arrow-up'),
                createIrElement('Kanal -', 'arrow-down'),
                createIrElement('Volume +', 'volume-up'),
                createIrElement('Volume -', 'volume-down')
            ];
        };

        function createIrElement(label, icon) {
            return {
                label: label,
                icon: icon
            };
        }
    }]);