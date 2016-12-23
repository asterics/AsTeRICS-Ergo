angular.module(are.app)
    .service('envControlService', ['areService', function (areService) {
        var thiz = this;
        var envModelName = 'envControl.acs';

        thiz.startEnvModel = function () {
            return areService.deployAndStartModel(envModelName);
        };

        thiz.isEnvModelStarted = function() {
            return areService.isModelStarted(envModelName);
        };
    }]);