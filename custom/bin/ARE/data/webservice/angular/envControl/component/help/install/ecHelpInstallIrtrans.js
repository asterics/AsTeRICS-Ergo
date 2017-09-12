angular.module(asterics.appComponents)
    .component('ecHelpInstallIrtrans', {
        bindings: {},
        controller: ['utilService', 'envControlIRService', '$scope', '$timeout', '$anchorScroll', '$stateParams', function (utilService, envControlIRService, $scope, $timeout, $anchorScroll, $stateParams) {
            var thiz = this;
            thiz.show = false;
            thiz.showAssistant = false;
            thiz.triedCheck = false;
            thiz.checkResult = false;
            thiz.isConnected;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];

            thiz.test = function () {
                thiz.triedCheck = true;
                thiz.checkResult = false;
                scrollToEnd();
                envControlIRService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
                    thiz.checkResult = true;
                    scrollToEnd();
                });
            };

            thiz.isWin7OrOther = function () {
                return asterics.const.OS_IS_WIN7 || asterics.const.OS_IS_OTHER;
            };

            thiz.isWin10 = function () {
                return asterics.const.OS_IS_WIN10;
            };

            init();
            function init() {
                envControlIRService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
                    thiz.showAssistant = !thiz.isConnected;
                    thiz.show = true;
                });
            }

            function scrollToEnd() {
                $timeout(function () {
                    $anchorScroll('end');
                });
            }

            stateUtilService.addOneTimeStateChangeFunction(function () {
                envControlIRService.abortAction();
            });
        }],
        templateUrl: "angular/envControl/component/help/install/ecHelpInstallIrtrans.html"
    });