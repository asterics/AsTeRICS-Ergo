angular.module(asterics.appComponents)
    .component('mockConfigurator', {

        bindings: {},
        controller: ['hardwareFs20Sender', 'hardwareIrTrans', '$stateParams', function (hardwareFs20Sender, hardwareIrTrans, $stateParams) {
            var thiz = this;
            thiz.show = false;
            thiz.fsPlugged = true;
            thiz.irPlugged = true;

            thiz.fsPlugStateChanged = function () {
                console.log("setting fs20 to plugged: " + thiz.fsPlugged);
                console.log($stateParams);
                hardwareFs20Sender.setDevicePlugged(thiz.fsPlugged);
            };

            thiz.irPlugStateChanged = function () {
                console.log("setting irTrans to plugged: " + thiz.irPlugged);
                hardwareIrTrans.setDevicePlugged(thiz.irPlugged);
            };

            init();

            function init() {
                if ($stateParams) {
                    if ($stateParams.showMockConfig) {
                        thiz.show = ($stateParams.showMockConfig == 'true');
                    }
                    if ($stateParams.mockFs20Connected) {
                        thiz.fsPlugged = ($stateParams.mockFs20Connected == 'true');
                        hardwareFs20Sender.setDevicePlugged(thiz.fsPlugged);
                    }
                    if ($stateParams.mockIrConnected) {
                        thiz.irPlugged = ($stateParams.mockIrConnected == 'true');
                        hardwareIrTrans.setDevicePlugged(thiz.irPlugged);
                    }
                }
            }
        }],
        templateUrl: "angular/envControl/component/mock/envControlMockConfigurator.html"
    });