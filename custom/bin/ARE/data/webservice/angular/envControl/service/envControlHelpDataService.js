angular.module(asterics.appServices)
    .service('envControlHelpDataService', ['utilService', function (utilService) {
        var thiz = this;
        var _deviceMappings = {};
        _deviceMappings[asterics.envControl.DEVICE_TABLELAMP] = {
            hardware: [
                [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG],
                [asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_BULB]
            ]
        };
        _deviceMappings[asterics.envControl.DEVICE_AMB_LAMP] = {
            hardware: [
                [asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_BULB]
            ]
        };
        _deviceMappings[asterics.envControl.DEVICE_DVD] = {
            hardware: [
                [asterics.envControl.HW_IRTRANS_USB]
            ]
        };
        _deviceMappings[asterics.envControl.DEVICE_TV] = {
            hardware: [
                [asterics.envControl.HW_IRTRANS_USB]
            ]
        };
        _deviceMappings[asterics.envControl.DEVICE_HIFI] = {
            hardware: [
                [asterics.envControl.HW_IRTRANS_USB]
            ]
        };

        thiz.getNeededHardware = function (devicesList) {
            var neededHardware = [];
            angular.forEach(devicesList, function (device) {
                neededHardware = neededHardware.concat(_deviceMappings[device].hardware[0]);
            });
            return _.uniq(neededHardware);
        };

        thiz.getAlternatives = function (devicesList) {
            var alternatives = {};
            angular.forEach(devicesList, function (device) {
                if (_deviceMappings[device].hardware.length > 1) {
                    alternatives[device] = _deviceMappings[device].hardware.slice(1);
                }
            });
            return alternatives;
        };
    }]);