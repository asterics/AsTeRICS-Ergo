angular.module(asterics.appComponents)
    .component('ecHelpInstallIrtrans', {
        bindings: {
        },
        controller: ['utilService', 'envControlIRService', function (utilService, envControlIRService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.show = false;
            thiz.showAssistant = false;
            thiz.triedCheck = false;
            thiz.checkResult = false
            thiz.isConnected;

            thiz.test = function () {
                thiz.triedCheck = true;
                thiz.checkResult = false;
                envControlIRService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
                    thiz.checkResult = true;
                });
            };

            init();
            function init() {
                envControlIRService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
                    thiz.showAssistant = !thiz.isConnected;
                    thiz.show = true;
                });
            }
        }],
        templateUrl: "angular/envControl/component/help/install/ecHelpInstallIrtrans.html"
    });