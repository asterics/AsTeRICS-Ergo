angular.module(asterics.appServices)
    .service('envControlIRService', ['areService', '$q', function (areService, $q) {
        var thiz = this;
        var IrTransName = 'IrTrans.1';
        var IrTransActionInput = 'action';
        var learnCmdResponse = 'LEARN ';
        thiz.canceler = $q.defer();

        thiz.irAction = function (cmd) {
            var def = $q.defer();
            var actionString = '@IRTRANS:' + cmd;
            console.log("sending: " + actionString);

            var successCallback = function (response) {
                areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
                console.log('ir response: ' + response.data);
                if (response.data.indexOf(asterics.envControl.IRTRANS_SOCKET_ERROR) !== -1) {
                    def.reject(response.data);
                } else {
                    def.resolve(response.data);
                }
            };
            var errorCallback = function error() {
                areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
                def.reject();
            };
            areService.getComponentDataChannelsIds(IrTransName, 'output', thiz.canceler).then(function (response) {
                var channelIds = Object.keys(response.data);
                areService.subscribeSSE(successCallback, errorCallback, asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION, channelIds[0]);
                areService.sendDataToInputPort(IrTransName, IrTransActionInput, actionString, thiz.canceler).then(function success() {
                }, function error() {
                    def.reject();
                });
            });
            return def.promise;
        };

        thiz.irSend = function (cmd) {
            return thiz.irAction('sndhex H' + cmd);
        };

        thiz.irLearn = function () {
            var def = $q.defer();
            thiz.irAction('learn ,,,,,W5').then(function (response) { //W5 means timeout of 5 seconds
                var index = response.indexOf(learnCmdResponse);
                if (index == -1 || response.indexOf(asterics.envControl.IRTRANS_TIMEOUT_ERROR) !== -1) {
                    def.reject(response);
                } else {
                    def.resolve(response.substring(index + learnCmdResponse.length));
                }
            }, function error(response) {
                def.reject(response);
            });
            return def.promise;
        };

        //aborts a current action, unsubscribes from SSE
        thiz.abortAction = function () {
            thiz.canceler.resolve();
            thiz.canceler = $q.defer();
            return areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
        };
    }]);