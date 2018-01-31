angular.module(asterics.appComponents)
    .component('hardwareTest', {
        bindings: {
            registerFunction: '&',
            hardwareId: '<',
            testFailedHint: '@'
        },
        controller: ['utilService', 'hardwareService', function (utilService, hardwareService) {
            var thiz = this;
            thiz.hasTested = false;
            thiz.testResult = null;

            thiz.test = function () {
                thiz.hasTested = true;
                thiz.testResult = null;
                hardwareService.isConnected(thiz.hardwareId).then(function (response) {
                    thiz.testResult = response;
                });
            };

            thiz.$onInit = function () {
                if (_.isFunction(thiz.registerFunction)) {
                    thiz.registerFunction({
                        testFunction: thiz.test
                    });
                }
            };
        }],
        templateUrl: "angular/envControl/component/help/install/hardwareTest.html"
    });