angular.module(asterics.appServices)
    .service('envControlHelpDataService', ['utilService', function (utilService) {
        var thiz = this;
        var data = {};

        var _deviceMappings = {};
        var _hardwareAmount = {};
        var _accessories = {};
        var _hardwareAlternatives = []; //a list of lists, where each list defines equal hardware that can be interchanged
        var _originalState = true;

        thiz.setDeviceSelectionMap = function (map) {
            data._deviceSelectionMap = map;
        };

        thiz.getDeviceSelectionMap = function () {
            return data._deviceSelectionMap;
        };

        thiz.getNeededHardwareAmounts = function (deviceSelectionMap) {
            var devicesList = getSelectedDevicesList(deviceSelectionMap);
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
            if (device && _deviceMappings[device]) {
                return _deviceMappings[device].hardware[0];
            }
            return null;
        };

        thiz.getNeededAccessories = function (hardwareName) {
            return _accessories[hardwareName];
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

        thiz.getHardwareAlternatives = function (hardwareList) {
            var returnList = [];
            if (!hardwareList || hardwareList.length == 0) {
                return returnList;
            }
            for (var i = 0; i < _hardwareAlternatives.length; i++) {
                if (containsAllElements(_hardwareAlternatives[i][0], hardwareList)) {
                    for (var j = 1; j < _hardwareAlternatives[i].length; j++) {
                        returnList.push([_hardwareAlternatives[i][0], _hardwareAlternatives[i][j]]);
                    }
                }
            }
            return returnList;
        };

        thiz.replaceDeviceHardware = function (device) {
            _originalState = false;
            var deviceMapping = _deviceMappings[device];
            if (deviceMapping && deviceMapping.hardware) {
                var temp = deviceMapping.hardware[0];
                deviceMapping.hardware[0] = deviceMapping.hardware[1];
                deviceMapping.hardware[1] = temp;
                console.log(deviceMapping);
            }
        };

        thiz.replaceAlternativeHardware = function (alternative) {
            _originalState = false;
            for (var i = 0; i < _hardwareAlternatives.length; i++) {
                if (_hardwareAlternatives[i][0] == alternative[0]) {
                    var temp = _hardwareAlternatives[i][0];
                    for (var j = 0; j < _hardwareAlternatives[i].length; j++) {
                        if (_hardwareAlternatives[i][j] == alternative[1]) {
                            _hardwareAlternatives[i][0] = _hardwareAlternatives[i][j];
                            _hardwareAlternatives[i][j] = temp;
                            console.log(_hardwareAlternatives[i]);
                        }
                    }
                } else {
                    for (var j = 0; j < _hardwareAlternatives[i].length; j++) {
                        replaceElements(_hardwareAlternatives[i][j], alternative);
                    }
                }
            }
            replaceAlternativeHardwareInDeviceMappings(alternative);
        };

        thiz.isOriginalState = function() {
            return _originalState;
        };

        thiz.resetData = function() {
            _deviceMappings = angular.copy(data._deviceMappings);
            _hardwareAmount = angular.copy(data._hardwareAmount);
            _accessories = angular.copy(data._accessories);
            _hardwareAlternatives = angular.copy(data._hardwareAlternatives);
            _originalState = true;
        };

        function replaceAlternativeHardwareInDeviceMappings(alternative) {
            var keys = Object.keys(_deviceMappings);
            for (var i = 0; i < keys.length; i++) {
                var deviceMapping = _deviceMappings[keys[i]];
                if (isEqual(deviceMapping.hardware[0], alternative[0])) {
                    deviceMapping.hardware[0] = alternative[1];
                } else {
                    for (var j = 0; j < deviceMapping.hardware.length; j++) {
                        for (var k = 0; k < deviceMapping.hardware[j].length; k++) {
                            if (isEqual(deviceMapping.hardware[j][k], alternative[0])) {
                                deviceMapping.hardware[j][k] = alternative[1][0];
                            }
                        }
                    }
                }
            }
        }

        function replaceElements(array, alternative) {
            for (var i = 0; i < array.length; i++) {
                if (isEqual(array[i], alternative[0])) {
                    array[i] = alternative[1][0];
                }
            }
        }

        function isEqual(valOrArray1, valOrArray2) {
            if (valOrArray1 == valOrArray2) {
                return true; //objects are equal
            }
            if (valOrArray1.length && valOrArray1.length == 1 && valOrArray1[0] == valOrArray2) {
                return true; //first object is array with one element and second exactly this element
            }
            if (valOrArray2.length && valOrArray2.length == 1 && valOrArray2[0] == valOrArray1) {
                return true; //second object is array with one element and first exactly this element
            }
            if (valOrArray1.length && valOrArray2.length && _.intersection(valOrArray1, valOrArray2).length == valOrArray1.length) {
                return true; //both objects are arrays containing the same values (maybe in different order)
            }
            return false;
        }

        function containsAllElements(array, arrayToCheckIfContainsAllFromArray) {
            return _.intersection(array, arrayToCheckIfContainsAllFromArray).length == array.length;
        }

        function getSelectedDevicesList(map) {
            var _selectedDeviceList = _.map(map, function (value, key) {
                return (value && value.chosen) ? key : undefined;
            });
            return _.compact(_selectedDeviceList);
        }

        initData();
        function initData() {
            data._deviceSelectionMap = {};
            data._deviceMappings = {};
            data._hardwareAmount = {};
            data._accessories = {};
            data._hardwareAlternatives = []; //a list of lists, where each list defines equal hardware that can be interchanged
            data._deviceMappings[asterics.envControl.DEVICE_TABLELAMP] = {
                hardware: [
                    [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG],
                    [asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_BULB]
                ]
            };
            data._deviceMappings[asterics.envControl.DEVICE_AMB_LAMP] = {
                hardware: [
                    [asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_BULB]
                ]
            };
            data._deviceMappings[asterics.envControl.DEVICE_DVD] = {
                hardware: [
                    [asterics.envControl.HW_IRTRANS_USB]
                ]
            };
            data._deviceMappings[asterics.envControl.DEVICE_TV] = {
                hardware: [
                    [asterics.envControl.HW_IRTRANS_USB]
                ]
            };
            data._deviceMappings[asterics.envControl.DEVICE_HIFI] = {
                hardware: [
                    [asterics.envControl.HW_IRTRANS_USB]
                ]
            };
            data._deviceMappings[asterics.envControl.DEVICE_IR_GENERIC] = {
                hardware: [
                    [asterics.envControl.HW_IRTRANS_USB]
                ]
            };
            data._deviceMappings[asterics.envControl.DEVICE_PLUG_GENERIC] = {
                hardware: [
                    [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG]
                ]
            };
            data._hardwareAmount[asterics.envControl.HW_FS20_PCSENDER] = 1;
            data._hardwareAmount[asterics.envControl.HW_FS20_PLUG] = undefined;
            data._hardwareAmount[asterics.envControl.HW_IRTRANS_USB] = 1;
            data._hardwareAmount[asterics.envControl.HW_IR_BULB] = undefined;
            data._hardwareAmount[asterics.envControl.HW_IR_FLIPMOUSE] = 1;
            data._hardwareAmount[asterics.envControl.HW_IR_PLUG] = undefined;
            data._accessories[asterics.envControl.HW_IRTRANS_USB] = [asterics.envControl.HW_USB_CABLE_AB];
            data._hardwareAlternatives.push([[asterics.envControl.HW_IRTRANS_USB], [asterics.envControl.HW_IR_FLIPMOUSE]]);
            data._hardwareAlternatives.push([[asterics.envControl.HW_FS20_PLUG, asterics.envControl.HW_FS20_PCSENDER], [asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_PLUG]]);
            thiz.resetData();
        }
    }]);