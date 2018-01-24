angular.module(asterics.appComponents)
    .component('ecHelpInstallIrtrans', {
        bindings: {},
        controller: ['utilService', 'hardwareIrTrans', '$scope', '$timeout', '$anchorScroll', '$stateParams', 'stateUtilService', function (utilService, hardwareIrTrans, $scope, $timeout, $anchorScroll, $stateParams, stateUtilService) {
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
                hardwareIrTrans.isConnected().then(function (isConnected) {
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
                if($stateParams.skipConnectionTest) {
                    thiz.show = true;
                    thiz.showAssistant = true;
                    thiz.isConnected = false;
                } else {
                    hardwareIrTrans.isConnected().then(function (isConnected) {
                        thiz.isConnected = isConnected;
                        thiz.showAssistant = !thiz.isConnected;
                        thiz.show = true;
                    });
                }
            }

            function scrollToEnd() {
                $timeout(function () {
                    $anchorScroll('end');
                });
            }

            stateUtilService.addOneTimeStateChangeFunction(function () {
                hardwareIrTrans.abortAction();
            });
        }],
        templateUrl: "angular/envControl/component/help/install/ecHelpInstallIrtrans.html"
    });