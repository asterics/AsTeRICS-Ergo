angular.module(asterics.appServices)
    .service('hardwareIrTrans', ['areService', '$q', '$timeout', function (areService, $q, $timeout) {
        var thiz = this;
        var _plugged = true;
        thiz.canceler = $q.defer();

        thiz.getName = function() {
            return asterics.envControl.HW_IRTRANS_USB;
        };

        thiz.send = function (cmd) {
            var def = $q.defer();
            console.log("sending mocked IrTrans command: " + cmd);
            def.resolve();
            return def.promise;
        };

        thiz.irLearn = function () {
            var def = $q.defer();

            $timeout(function () {
                var cmd = "HEXCODE" + new Date().getTime();
                console.log("learned mocked IrTrans command: " + cmd);
                def.resolve(cmd);
            }, 500);
            return def.promise;
        };

        thiz.isConnected = function () {
            var def = $q.defer();
            $timeout(function () {
                def.resolve(_plugged);
            }, 500);
            return def.promise;
        };

        thiz.abortAction = function () {
            var def = $q.defer();
            def.resolve();
            return def.promise;
        };

        thiz.getRandomCode = function(codesToSkip) {
            return new Date().getTime().toString();
        };

        //only for mock mode:
        thiz.setDevicePlugged = function (plugged) {
            _plugged = plugged;
        };
    }]);