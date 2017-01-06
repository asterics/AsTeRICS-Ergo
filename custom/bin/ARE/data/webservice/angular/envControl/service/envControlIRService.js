angular.module(asterics.appServices)
    .service('envControlIRService', ['areService', '$q', function (areService, $q) {
        var thiz = this;
        var IrTransName = 'IrTrans.1';
        var IrTransActionInput = 'action';
        var propCmdResult = 'cmdResult';
        var learnCmdResponse = 'LEARN ';

        thiz.irAction = function (cmd) {
            var def = $q.defer();
            var actionString = '@IRTRANS:' + cmd;
            console.log("sending: " + actionString);

            var successCallback = function (response) {
                areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
                console.log('ir response: ' + response.data);
                def.resolve(response.data);
            };
            var errorCallback = function error() {
                areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
                def.reject();
            };
            areService.getComponentDataChannelsIds(IrTransName, 'output').then(function (response) {
                var channelIds = Object.keys(response.data);
                areService.subscribeSSE(successCallback, errorCallback, asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION, channelIds[0]);
                areService.sendDataToInputPort(IrTransName, IrTransActionInput, actionString);
            });
            return def.promise;
        };

        thiz.irSend = function (cmd) {
            return thiz.irAction('sndhex H' + cmd);
        };

        thiz.irLearn = function () {
            var def = $q.defer();
            thiz.irAction('learn').then(function (response) {
                var index = response.indexOf(learnCmdResponse);
                if (index == -1) {
                    def.reject();
                }
                def.resolve(response.substring(index + learnCmdResponse.length));
            });
            return def.promise;
        };
    }]);