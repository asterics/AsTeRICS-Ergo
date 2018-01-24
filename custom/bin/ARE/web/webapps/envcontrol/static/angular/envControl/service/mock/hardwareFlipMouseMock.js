angular.module(asterics.appServices)
    .service('hardwareFlipMouse', ['areService', 'areWebsocketService', '$q', '$timeout', function (areService, areWebsocketService, $q, $timeout) {
        var thiz = this;
        var _plugged = true;
        thiz.canceler = $q.defer();

        thiz.getName = function() {
            return asterics.envControl.HW_IR_FLIPMOUSE;
        };

        thiz.send = function (cmd) {
            var def = $q.defer();
            console.log("sending mocked FlipMouse command: " + cmd);
            def.resolve();
            return def.promise;
        };

        thiz.irLearn = function () {
            var def = $q.defer();
            $timeout(function () {
                var cmd = "CODE" + new Date().getTime();
                console.log("learned mocked FlipMouse command: " + cmd);
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

        //aborts a current action, closes websocket
        thiz.abortAction = function () {
            thiz.canceler.resolve();
            thiz.canceler = $q.defer();
        };

        //only for mock mode:
        thiz.setDevicePlugged = function (plugged) {
            _plugged = plugged;
        };
    }]);