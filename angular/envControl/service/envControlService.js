angular.module(asterics.appServices)
    .service('envControlService', ['areService', 'deviceIrTrans', 'deviceFs20Sender', '$q', function (areService, deviceIrTrans, deviceFs20Sender, $q) {
        var thiz = this;
        var envModelName = 'envControl.acs';

        thiz.startEnvModel = function () {
            return areService.deployAndStartModel(envModelName);
        };

        thiz.isEnvModelStarted = function () {
            return areService.isModelStarted(envModelName);
        };

        thiz.getActiveHardware = function () {
            var def = $q.defer();
            var devices = [];
            var promiseIrTrans = deviceIrTrans.isConnected();
            var promiseFs20 = deviceFs20Sender.isConnected();
            $q.all([promiseIrTrans, promiseFs20]).then(function() {
                if(promiseIrTrans.$$state.value) {
                    devices.push(asterics.envControl.HW_IRTRANS_USB);
                }
                if(promiseFs20.$$state.value) {
                    devices.push(asterics.envControl.HW_FS20_PCSENDER);
                }
                def.resolve(devices);
            });
            return def.promise;
        };
    }]);