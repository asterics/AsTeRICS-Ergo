angular.module(asterics.appComponents)
    .component('hardwareMessage', {
        bindings: {
            connectedHardware: '<',
            device: '<'
        },
        controller: ['$stateParams', 'utilService', 'envControlHelpDataService', '$translate', '$state', function ($stateParams, utilService, envControlHelpDataService, $translate, $state) {
            var thiz = this;

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware);
            };

            thiz.$onInit = function () {
                thiz.neededAdditionalHardware = _.without(envControlHelpDataService.getNeededHardware(thiz.device, thiz.connectedHardware), thiz.connectedHardware);
            };
        }],
        templateUrl: "angular/envControl/component/add/hardwareMessage.html"
    });