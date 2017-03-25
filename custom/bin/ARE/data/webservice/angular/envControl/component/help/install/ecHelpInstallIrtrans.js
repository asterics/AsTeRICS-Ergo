angular.module(asterics.appComponents)
    .component('ecHelpInstallIrtrans', {
        bindings: {},
        controller: ['utilService', 'envControlIRService', '$scope', '$timeout', '$anchorScroll', function (utilService, envControlIRService, $scope, $timeout, $anchorScroll) {
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
                scrollToEnd();
                envControlIRService.isConnected().then(function (isConnected) {
                    thiz.isConnected = isConnected;
                    thiz.checkResult = true;
                    scrollToEnd();
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

            function scrollToEnd() {
                $timeout(function () {
                    $anchorScroll('end');
                });
            }

            //aborting all current learning when leaving the page
            $scope.$on("$destroy", function () {
                envControlIRService.abortAction();
            });
        }],
        templateUrl: "angular/envControl/component/help/install/ecHelpInstallIrtrans.html"
    });