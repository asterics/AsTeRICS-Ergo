angular.module(asterics.appComponents)
    .component('mockConfigurator', {

        bindings: {},
        controller: ['hardwareFs20Sender', 'hardwareIrTrans', 'hardwareFlipMouse', '$stateParams', function (hardwareFs20Sender, hardwareIrTrans, hardwareFlipMouse, $stateParams) {
            var thiz = this;
            thiz.show = false;
            thiz.fsPlugged = true;
            thiz.irPlugged = true;
            thiz.flipPlugged = true;

            thiz.fsPlugStateChanged = function () {
                console.log("setting fs20 to plugged: " + thiz.fsPlugged);
                console.log($stateParams);
                hardwareFs20Sender.setDevicePlugged(thiz.fsPlugged);
            };

            thiz.irPlugStateChanged = function () {
                console.log("setting irTrans to plugged: " + thiz.irPlugged);
                hardwareIrTrans.setDevicePlugged(thiz.irPlugged);
            };

            thiz.flipMouseStateChanged = function () {
                console.log("setting flipMouse to plugged: " + thiz.irPlugged);
                hardwareFlipMouse.setDevicePlugged(thiz.flipPlugged);
            };

            init();
            function init() {
                if ($stateParams) {
                    if ($stateParams.showConfig) {
                        thiz.show = ($stateParams.showConfig == 'true');
                    }
                    if ($stateParams.fs20) {
                        thiz.fsPlugged = ($stateParams.fs20 == 'true');
                        hardwareFs20Sender.setDevicePlugged(thiz.fsPlugged);
                    }
                    if ($stateParams.irtrans) {
                        thiz.irPlugged = ($stateParams.irtrans == 'true');
                        hardwareIrTrans.setDevicePlugged(thiz.irPlugged);
                    }
                    if ($stateParams.flipmouse) {
                        thiz.flipPlugged = ($stateParams.flipmouse == 'true');
                        hardwareFlipMouse.setDevicePlugged(thiz.irPlugged);
                    }
                }
            }
        }],
        templateUrl: "angular/envControl/component/mock/envControlMockConfigurator.html"
    });