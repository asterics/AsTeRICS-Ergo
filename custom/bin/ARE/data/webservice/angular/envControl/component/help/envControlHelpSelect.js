angular.module(asterics.appComponents)
    .component('envControlHelpSelect', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', function (utilService, $state, envControlHelpDataService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.devices = asterics.envControl.DEVICES;
            thiz.selectedDevices = {};
            thiz.neededHardware = [];
            thiz.alternativeHardare = {};

            thiz.refreshNeededHardware = function () {
                var _selectedDeviceList = _.map(thiz.selectedDevices, function (value, key) {
                    return value ? key : undefined;
                });
                thiz.neededHardware = envControlHelpDataService.getNeededHardware(_.compact(_selectedDeviceList));
                thiz.alternativeHardare = envControlHelpDataService.getAlternatives(_.compact(_selectedDeviceList));
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware, {backState: $state.current.name});
            };
        }],
        templateUrl: "angular/envControl/component/help/envControlHelpSelect.html"
    });