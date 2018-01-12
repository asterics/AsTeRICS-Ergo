angular.module(asterics.appServices)
    .service('deviceIrTrans', ['areService', '$q', '$timeout', function (areService, $q, $timeout) {
        var thiz = this;
        var irTransName = 'IrTrans.1';
        var irTransActionInput = 'action';
        var learnCmdResponse = 'LEARN ';
        var _learnWaitSeconds = 5;
        var _learnWaitMillis = _learnWaitSeconds * 1000;
        var _lastLearnStartTime;
        var _plugged = true;
        thiz.canceler = $q.defer();

        thiz.send = function (cmd) {
            var def = $q.defer();
            console.log("sending mocked IrTrans command: " + cmd);
            def.resolve();
            return def.promise;
        };

        thiz.irLearn = function () {
            _lastLearnStartTime = new Date().getTime();
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
            def.resolve(_plugged);
            return def.promise;
        };

        thiz.abortAction = function () {
            var def = $q.defer();
            def.resolve();
            return def.promise;
        };

        //only for mock mode:
        thiz.setDevicePlugged = function (plugged) {
            _plugged = plugged;
        };
    }]);