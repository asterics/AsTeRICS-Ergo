angular.module(asterics.appComponents)
    .component('envControlHelpSelect', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', 'envControlHelpDataService', function (utilService, $state, envControlHelpDataService) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.devices = asterics.envControl.DEVICES;
            thiz.deviceSelectionMap = {};
            thiz.neededHardware = [];
            thiz.alternativeHardare = {};
            thiz.alternativeHardwareDevices = [];

            thiz.refreshNeededHardware = function () {
                var _selectedDeviceList = _.map(thiz.deviceSelectionMap, function (value, key) {
                    return value ? key : undefined;
                });
                thiz.neededHardware = envControlHelpDataService.getNeededHardware(_.compact(_selectedDeviceList));
                thiz.alternativeHardare = envControlHelpDataService.getAlternatives(_.compact(_selectedDeviceList));
                thiz.alternativeHardwareDevices = Object.keys(thiz.alternativeHardare);
                envControlHelpDataService.setDeviceSelectionMap(thiz.deviceSelectionMap);
            };

            thiz.getNeededHardware = function (device) {
                return envControlHelpDataService.getNeededHardware([device]);
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware, {backState: $state.current.name});
            };

            init();
            function init() {
                thiz.deviceSelectionMap = envControlHelpDataService.getDeviceSelectionMap();
                thiz.refreshNeededHardware();
            }
        }],
        templateUrl: "angular/envControl/component/help/envControlHelpSelect.html"
    });