angular.module(asterics.appComponents)
    .component('ecHelpInstallFs20', {
        bindings: {},
        controller: ['utilService', 'deviceFs20Sender', '$timeout', '$anchorScroll', '$stateParams', function (utilService, deviceFs20Sender, $timeout, $anchorScroll, $stateParams) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.isConnected = null;
            thiz.patched = false;
            thiz.triedCheck = false;
            thiz.show = false;
            thiz.showAssistant = false;

            thiz.patch = function () {
                deviceFs20Sender.fs20Patch().then(function () {
                    thiz.patched = true;
                    scrollToEnd();
                });
            };

            thiz.test = function () {
                thiz.triedCheck = true;
                thiz.isConnected = null;
                deviceFs20Sender.isConnected().then(function (isConnected) { //do test twice because sometimes the first time is wrong?!
                    thiz.isConnected = isConnected;
                    scrollToEnd();
                });
            };

            init();
            function init() {
                deviceFs20Sender.isConnected().then(function (isConnected) {
                    thiz.showAssistant = !isConnected;
                    thiz.show = true;
                });
            }

            function scrollToEnd() {
                $timeout(function () {
                    $anchorScroll('end');
                });
            }
        }],
        templateUrl: "angular/envControl/component/help/install/ecHelpInstallFs20.html"
    });