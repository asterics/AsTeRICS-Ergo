angular.module(asterics.appServices)
    .service('ecInfraredDeviceFactory', ['areService', 'areWebsocketService', '$q', '$timeout', function (areService, areWebsocketService, $q, $timeout) {
        var thiz = this;

        thiz.createIRDevice = function(componentName, portName, learnCmd, sndCmd, testCmd, learnCmdResponse, errorResponses) {
            return new InfraredDevice(componentName, portName, learnCmd, sndCmd, testCmd, learnCmdResponse, errorResponses);
        };

        function InfraredDevice(componentName, portName, learnCmd, sndCmd, testCmd, learnCmdResponse, errorResponses) {
            var _testTimeout = 6000;
            var _lastLearnStartTime;
            thiz.canceler = $q.defer();

            thiz.irSend = function (code) {
                return irAction(sndCmd + code);
            };

            thiz.irLearn = function () {
                _lastLearnStartTime = new Date().getTime();
                var def = $q.defer();
                irAction(learnCmd).then(function (response) { //W5 means timeout of 5 seconds
                    var index = response.indexOf(learnCmdResponse);
                    if (index == -1 || isErrorResponse(response)) {
                        def.reject(response);
                    } else {
                        def.resolve(response.substring(index + learnCmdResponse.length));
                    }
                }, function error(response) {
                    def.reject(response);
                });
                return def.promise;
            };

            thiz.isConnected = function () {
                var def = $q.defer();
                irAction(testCmd, _testTimeout).then(function (response) {
                    if (isErrorResponse(response)) {
                        def.resolve(false);
                    } else {
                        def.resolve(true);
                    }
                }, function error(response) {
                    def.resolve(false);
                });
                return def.promise;
            };

            //aborts a current action, closes websocket
            thiz.abortAction = function () {
                thiz.canceler.resolve();
                thiz.canceler = $q.defer();
            };

            function irAction(cmd, timeout) {
                var def = $q.defer();
                var actionString = '@IRTRANS:' + cmd;
                console.log("sending: " + actionString);

                areWebsocketService.doActionAndGetWebsocketResponse(actionFunction, thiz.canceler, timeout).then(function (response) {
                    console.log('ir response: ' + response);
                    if (isErrorResponse(response)) {
                        def.reject(response);
                    } else {
                        def.resolve(response);
                    }
                }, function error() {
                    def.reject();
                });

                function actionFunction() {
                    areService.sendDataToInputPort(componentName, portName, actionString, thiz.canceler).then(function success() {
                    }, function error() {
                        def.reject();
                    });
                }

                return def.promise;
            };

            function isErrorResponse(response) {
                if(!errorResponses) {
                    return false;
                }
                if(errorResponses instanceof Array) {
                    for(var i=0; i<errorResponses.length; i++) {
                        if(response.indexOf(errorResponses[i]) !== -1) {
                            return true;
                        }
                    }
                } else if(response.indexOf(errorResponses) !== -1) {
                    return true;
                }
                return false;
            }
        }

    }]);