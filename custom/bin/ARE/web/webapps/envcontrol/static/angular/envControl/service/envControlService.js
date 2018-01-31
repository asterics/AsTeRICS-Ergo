angular.module(asterics.appServices)
    .service('envControlService', ['areService', '$q', function (areService, $q) {
        var thiz = this;
        var envModelName = 'envControl.acs';

        thiz.startEnvModel = function () {
            return areService.deployAndStartModel(envModelName);
        };

        thiz.isEnvModelStarted = function () {
            return areService.isModelStarted(envModelName);
        };
    }]);