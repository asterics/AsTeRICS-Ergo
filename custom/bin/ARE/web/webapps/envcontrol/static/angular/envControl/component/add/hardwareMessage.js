angular.module(asterics.appComponents)
    .component('hardwareMessage', {
        bindings: {
            connectedHardware: '<',
            device: '<'
        },
        controller: ['$stateParams', 'utilService', 'envControlHelpDataService', 'envControlUtilService', function ($stateParams, utilService, envControlHelpDataService, envControlUtilService) {
            var thiz = this;

            thiz.goToHelp = function (hardware) {
                envControlUtilService.goToHelp(hardware);
            };

            thiz.$onInit = function () {
                thiz.neededAdditionalHardware = _.without(envControlHelpDataService.getNeededHardware(thiz.device, thiz.connectedHardware), thiz.connectedHardware);
            };
        }],
        templateUrl: "angular/envControl/component/add/hardwareMessage.html"
    });