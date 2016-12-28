angular.module(asterics.appServices)
    .service('envControlFsService', ['areService', function (areService) {
        var thiz = this;
        var fs20SenderName = 'FS20Sender.1';
        var fs20ActionInput = 'Action';

        thiz.fs20Action = function (deviceCode, actionCode) {
            var actionString = '@FS20:' + deviceCode + '_' + actionCode;
            console.log("sending: " + actionString);
            return areService.sendDataToInputPort(fs20SenderName, fs20ActionInput, actionString);
        };

        thiz.fs20Toggle = function (code) {
            return thiz.fs20Action(code, asterics.envControl.FS20_TOGGLE_CODE);
        };

        thiz.trainCode = function(code) {
            return thiz.fs20Action(code, asterics.envControl.FS20_LEARN_CODE)
        };
    }]);