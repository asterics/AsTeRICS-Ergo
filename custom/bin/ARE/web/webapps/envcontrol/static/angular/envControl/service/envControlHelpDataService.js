angular.module(asterics.appServices)
    .service('envControlHelpDataService', ['utilService', function (utilService) {
        var thiz = this;
        var data = {};

        var _deviceMappings = {};
        var _hardwareAmount = {};
        var _accessories = {};
        var _hardwareAlternatives = []; //a list of lists, where each list defines equal hardware that can be interchanged
        var _originalState = true;
        var _computerConfiguredHardware = [];

        thiz.setDeviceSelectionMap = function (map) {
            data._deviceSelectionMap = map;
        };

        thiz.getDeviceSelectionMap = function () {
            return data._deviceSelectionMap;
        };

        /**
         * returns a map of needed hardware and their amounts
         *
         * @param deviceSelectionMap a map containing the data that was selected in the hardware assistant
         * @param device if specified, only data from the given device is returned, do not specify to return all hardware
         * @return {{}}
         */
        thiz.getNeededHardwareAmounts = function (deviceSelectionMap, device) {
            var tempDeviceSelectionMap = angular.copy(deviceSelectionMap);
            if (device) {
                var temp = {};
                temp[device] = tempDeviceSelectionMap[device];
                tempDeviceSelectionMap = temp;
            }
            var devicesList = getSelectedDevicesList(tempDeviceSelectionMap);
            var amounts = {};
            angular.forEach(devicesList, function (device) {
                var neededForDevice = _deviceMappings[device].hardware[0];
                angular.forEach(neededForDevice, function (hardware) {
                    if (_hardwareAmount[hardware] == 1) {
                        amounts[hardware] = 1;
                    } else {
                        amounts[hardware] = (amounts[hardware] || 0) + tempDeviceSelectionMap[device].amount;
                    }
                });
            });
            return amounts;
        };

        /**
         * returning the (recommended) needed hardware for a given device
         * @param device the device to get the needed hardware
         * @param existingHardware if specified a possible hardware combination is returned, that
         *        contains the given existing Hardware, otherwise the default/recommended combination
         *        is returned.
         * @return {*}
         */
        thiz.getNeededHardware = function (device, existingHardware) {
            if (device && _deviceMappings[device]) {
                if(!existingHardware) {
                    return _deviceMappings[device].hardware[0];
                } else {
                    var allPossibilities = thiz.getHardwarePossibilities(device);
                    return allPossibilities.filter(possibility => _.includes(possibility, existingHardware))[0];
                }
            }
            return null;
        };

        /**
         * returns all hardware possibilities for a given device
         * @param device
         */
        thiz.getHardwarePossibilities = function (device) {
            var possibilites = _deviceMappings[device] ? _deviceMappings[device].hardware : [];
            var alternatives = [];
            _hardwareAlternatives.forEach(function (alternative) {
                possibilites.forEach(function (possibility) {
                    if(isEqual(alternative[0], possibility)) {
                        alternatives.push(alternative[1]);
                    } else {
                        var newPossibility = angular.copy(possibility);
                        replaceElements(newPossibility, alternative);
                        if(!isEqual(newPossibility, possibility)) {
                            alternatives.push(newPossibility);
                        }
                    }
                });
            });
            return possibilites.concat(alternatives);
        };

        /**
         * returns all computer configured hardware that can be used to control the given device
         * @param device
         */
        thiz.getComputerConfiguredHardwarePossibilities = function(device) {
            var allPossibilities = thiz.getHardwarePossibilities(device);
            var flattenedPossibilities = [].concat.apply([], allPossibilities);
            return _.uniq(flattenedPossibilities).filter(element => _.includes(_computerConfiguredHardware, element));
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

        /**
         * returns an array of alternatives from a given list of currently used hardware.
         *
         * @param hardwareList the list of currently used hardware
         * @return {Array} an array containing all alternatives that are applicable to the given hardwarelist in form
         *          of the values stored in __hardwareAlternatives
         */
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

        /**
         * chooses the alternative hardware for the given device.
         * Currently just swaps the first and the second entry in the hardware mapping of the device. In order to support
         * more than 2 hardware alternatives for a given device, this method has to be adapted.
         *
         * @param device the name of the device where the alternative hardware should be selected
         */
        thiz.replaceDeviceHardware = function (device) {
            _originalState = false;
            var deviceMapping = _deviceMappings[device];
            if (deviceMapping && deviceMapping.hardware) {
                var temp = deviceMapping.hardware[0];
                deviceMapping.hardware[0] = deviceMapping.hardware[1];
                deviceMapping.hardware[1] = temp;
            }
        };

        /**
         * chooses an alternative hardware, e.g. FlipMouse instead of IrTrans, which is contained in the given "alternative"
         * parameter.
         * This method does 3 things:
         *      1) Swap the elements in the _hardwareAlternatives mapping, e.g. changing the entry:
         *      [[IrTrans],[Flipmouse]] to [[Flipmouse],[IrTrans]]
         *      -> now the reverse alternative will be suggested in the UI
         *
         *      2) Exchange the given element in other _hardwareAlternatives mappings, e.g. change
         *      [[HW_FS20_PLUG, HW_FS20_PCSENDER], [HW_IRTRANS_USB, HW_IR_PLUG]]
         *      to
         *      [[HW_FS20_PLUG, HW_FS20_PCSENDER], [**FlipMouse**, HW_IR_PLUG]]
         *      --> now other hardware alternatives will be suggested containing the already performed swap (IrTrans -> Flipmouse)
         *
         *      3) Exchange the given alternative in the deviceMappings, e.g. changing IrTrans -> Flipmouse in all device mappings
         *      in order to use Flipmouse for all devices that formerly used IrTrans
         *
         * @param alternative an array defining the chosen alternative where alternative[0] is an array of hardware constant
         * strings that should be replaced by the hardware constant strings in the array alternative[1].
         * So valid values of "alternative" could e.g. be:
         * 1) [[asterics.envControl.HW_IRTRANS_USB], [asterics.envControl.HW_IR_FLIPMOUSE]]
         * 2) [[asterics.envControl.HW_FS20_PLUG, asterics.envControl.HW_FS20_PCSENDER], [asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_PLUG]]
         * -> so the "alternative" is always an element of the array _hardwareAlternatives
         */
        thiz.replaceAlternativeHardware = function (alternative) {
            if (!_.some(_hardwareAlternatives, function (element) { //check parameter
                    return isEqual(element, alternative);
                })) {
                console.log("replaceAlternativeHardware() called with wrong parameters!");
                return;
            }
            _originalState = false;
            for (var i = 0; i < _hardwareAlternatives.length; i++) {
                for (var j = 0; j < _hardwareAlternatives[i].length; j++) {
                    if (isEqual(_hardwareAlternatives[i][0], alternative[0])) { //found the _hardwareAlternative entry to change
                        if (_hardwareAlternatives[i][j] == alternative[1]) {    //found the replacement entry
                            var temp = _hardwareAlternatives[i][0];             //swap elements
                            _hardwareAlternatives[i][0] = _hardwareAlternatives[i][j];
                            _hardwareAlternatives[i][j] = temp;
                        }
                    } else {
                        //in other elements than the one, that is the selected alternative:
                        //replace subsets, that can be replaced by the selected alternative
                        replaceElements(_hardwareAlternatives[i][j], alternative);
                    }
                }
            }
            replaceAlternativeHardwareInDeviceMappings(alternative);
        };

        /**
         * returns true if the device and hardware mapping data was not changed from its original state, otherwise false
         * @return {boolean}
         */
        thiz.isOriginalState = function () {
            return _originalState;
        };

        /**
         * returns hardware that has to be configured on the computer (hardware installation) for a given device
         * @param device
         * @return {*}
         */
        thiz.getComputerConfiguredHardware = function(device) {
            var neededHardware = thiz.getNeededHardware(device);
            return _.intersection(_computerConfiguredHardware, neededHardware);
        };

        /**
         * resets all data to the original state
         */
        thiz.resetData = function () {
            _deviceMappings = angular.copy(data._deviceMappings);
            _hardwareAmount = angular.copy(data._hardwareAmount);
            _accessories = angular.copy(data._accessories);
            _hardwareAlternatives = angular.copy(data._hardwareAlternatives);
            _originalState = true;
            _computerConfiguredHardware = data._computerConfiguredDevices;
        };

        /**
         * replaces an original hardware with an alternative in all device mappings.
         * Currently only works for alternatives where the original hardware and the hardware to replace are exactly
         * one piece of hardware (= array with one element).
         *
         * @param alternative see #replaceAlternativeHardware()
         */
        function replaceAlternativeHardwareInDeviceMappings(alternative) {
            var originalHardware = alternative[0];
            var replaceHardware = alternative[1];
            var keys = Object.keys(_deviceMappings);
            for (var i = 0; i < keys.length; i++) {
                var deviceMapping = _deviceMappings[keys[i]];
                if (isEqual(deviceMapping.hardware[0], originalHardware)) {
                    deviceMapping.hardware[0] = replaceHardware;
                } else {
                    for (var j = 0; j < deviceMapping.hardware.length; j++) {
                        replaceElements(deviceMapping.hardware[j], alternative);
                    }
                }
            }
        }

        /**
         * searches in the given array for occurences of the originalHardware to be replaced and replaces them.
         * Currently only works for alternatives where the original hardware and the hardware to replace are exactly
         * one piece of hardware.
         *
         * @param array
         * @param alternative
         */
        function replaceElements(array, alternative) {
            var originalHardware = alternative[0];
            var replaceHardware = alternative[1];
            for (var i = 0; i < array.length; i++) {
                if (isEqual(array[i], originalHardware)) {
                    array[i] = replaceHardware[0];
                }
            }
        }

        /**
         * checks if two values/arrays are equal. also returns true, if one parameter is a single value and the other
         * a array containing exactly this single value.
         * isEqual('a','a') == true;
         * isEqual(['a'],['a']) == true;
         * isEqual('a',['a']) == true;
         * isEqual('a',['a', 'b']) == false;
         *
         * @param valOrArray1
         * @param valOrArray2
         * @return {boolean}
         */
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
            if (valOrArray1.length && valOrArray2.length && valOrArray1.length == valOrArray2.length && _.intersection(valOrArray1, valOrArray2).length == valOrArray1.length) {
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
                    /*[asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_BULB],*/
                    [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG]
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
            data._deviceMappings[asterics.envControl.DEVICE_IR_CMD_GENERIC] = {
                hardware: [
                    [asterics.envControl.HW_IRTRANS_USB]
                ]
            };
            data._deviceMappings[asterics.envControl.DEVICE_IR_NUMBERS] = {
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
            data._hardwareAlternatives.push([[asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_FS20_PLUG], [asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_PLUG]]);
            data._computerConfiguredDevices = [asterics.envControl.HW_FS20_PCSENDER, asterics.envControl.HW_IRTRANS_USB, asterics.envControl.HW_IR_FLIPMOUSE];
            thiz.resetData();
        }
    }]);