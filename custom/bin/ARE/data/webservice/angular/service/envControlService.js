angular.module(are.app)
    .service('envControlService', ['areService', function (areService) {
        var thiz = this;
        var envModelName = 'envControl.acs';
        var fs20SenderName = 'FS20Sender.1';
        var fs20ActionInput = 'Action';
        var actionCodeToggle = 18;

        thiz.startEnvModel = function () {
            return areService.deployAndStartModel(envModelName);
        };

        thiz.fs20Action = function (deviceCode, actionCode) {
            var actionString = '@FS20:' + deviceCode + '_' + actionCode;
            return areService.sendDataToInputPort(fs20SenderName, fs20ActionInput, actionString);
        };

        thiz.fs20Toggle = function (code) {
            return thiz.fs20Action(code, actionCodeToggle);
        };
    }]);