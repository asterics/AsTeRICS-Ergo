angular.module(asterics.appServices)
    .service('envControlHelpDataService', ['utilService', function (utilService) {
        var thiz = this;
        var _deviceSelectionMap = {};
        var _deviceMappings = {};
        var _hardwareAmount = {};
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
        _hardwareAmount[asterics.envControl.HW_FS20_PCSENDER] = 1;
        _hardwareAmount[asterics.envControl.HW_FS20_PLUG] = undefined;
        _hardwareAmount[asterics.envControl.HW_IRTRANS_USB] = 1;
        _hardwareAmount[asterics.envControl.HW_IR_BULB] = undefined;

        thiz.setDeviceSelectionMap = function (map) {
            _deviceSelectionMap = map;
        };

        thiz.getDeviceSelectionMap = function () {
            return _deviceSelectionMap;
        };

        thiz.getNeededHardwareAmounts = function (deviceSelectionMap) {
            var devicesList = getSelectedDevicesList(deviceSelectionMap);
            var neededHardware = [];
            var amounts = {};
            angular.forEach(devicesList, function (device) {
                var neededForDevice = _deviceMappings[device].hardware[0];
                angular.forEach(neededForDevice, function (hardware) {
                    if (_hardwareAmount[hardware] == 1) {
                        amounts[hardware] = 1;
                    } else {
                        amounts[hardware] = (amounts[hardware] || 0) + deviceSelectionMap[device].amount;
                    }
                });
            });
            return amounts;
        };

        thiz.getNeededHardware = function (device) {
            if(device && _deviceMappings[device]) {
                return _deviceMappings[device].hardware[0];
            }
            return null;
        };

        thiz.getAlternatives = function (deviceSelectionMap) {
            var devicesList = getSelectedDevicesList(deviceSelectionMap);
            var alternatives = {};
            angular.forEach(devicesList, function (device) {
                if (_deviceMappings[device].hardware.length > 1) {
                    alternatives[device] = _deviceMappings[device].hardware.slice(1);
                }
            });
            return alternatives;
        };

        function getSelectedDevicesList(map) {
            var _selectedDeviceList = _.map(map, function (value, key) {
                return (value && value.chosen) ? key : undefined;
            });
            return _.compact(_selectedDeviceList);
        }
    }]);