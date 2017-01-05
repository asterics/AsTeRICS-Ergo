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
            areService.sendDataToInputPort(IrTransName, IrTransActionInput, actionString).then(function () {
                areService.getRuntimeComponentProperty(IrTransName, propCmdResult).then(function (result) {
                    console.log("result: " + result.data);
                    def.resolve(result.data);
                });
            });
            return def.promise;
        };

        thiz.irSend = function (cmd) {
            return thiz.irAction('Asndhex H' + cmd);
        };

        thiz.irLearn = function () {
            var def = $q.defer();
            thiz.irAction('Alearn').then(function (response) {
                var index = response.indexOf(learnCmdResponse);
                if (index == -1) {
                    def.reject();
                }
                def.resolve(response.substring(index + learnCmdResponse.length));
            });
            return def.promise;
        };
    }]);