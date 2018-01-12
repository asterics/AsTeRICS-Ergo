angular.module(asterics.appServices)
    .service('ecDeviceService', ['$q', 'deviceFlipMouse', 'deviceIrTrans', 'deviceFs20Sender', function ($q, deviceFlipMouse, deviceIrTrans, deviceFs20Sender) {
        var thiz = this;

        //arrays storing the known devices for each category. first devices in the array have higher priority,
        //which means that using them is preferred if several devices are connected
        var _irDevices = [deviceIrTrans, deviceFlipMouse];
        var _plugDevices = [deviceFs20Sender];
        var _deviceMap = {};                    //stores all devices by hardware group
        var _lastConnectedDeviceMap = {};       //stores one last (and maybe still connected) device by hardware group
        var _allDevices = _irDevices.concat(_plugDevices);     //list of all known devices
        _deviceMap[asterics.envControl.HW_GROUP_IR] = _irDevices;
        _deviceMap[asterics.envControl.HW_GROUP_PLUG] = _plugDevices;

        /**
         * returns all known devices with the given groupId
         * @param groupId
         * @returns {*}
         */
        thiz.getDevices = function (groupId) {
            var devices = _deviceMap[groupId];
            if (!devices || devices.length == 0) {
                return [];
            }
            return devices;
        };

        /**
         * returns exactly one connected device for a given hardware groupId. If several devices for the groupId are
         * connected the device with higher priority is returned. Exception: If "forceFullRescan" is not set and a lower
         * priority device was at first the only connected device, all subsequent calls will return the same device,
         * even if a device with higher priority was connected in the meantime.
         * @param groupId the hardware groupId to get a device
         * @param forceFullRescan if true a full rescan is always triggered and the returned device surely has the
         *        highest priority of all currently connected devices
         * @return a promise resolving to a found connected device or "null" if no device was found
         */
        thiz.getOneConnectedDevice = function (groupId, forceFullRescan) {
            var lastConnectedDevice = _lastConnectedDeviceMap[groupId];
            var returnDef = $q.defer();
            if (lastConnectedDevice && !forceFullRescan) {
                lastConnectedDevice.isConnected().then(function (response) {
                    if (response) {
                        returnDef.resolve(lastConnectedDevice);
                    } else {
                        getOneConnectedDeviceInternal(groupId, lastConnectedDevice).then(function (response) {
                            returnDef.resolve(response);
                        });
                        _lastConnectedDeviceMap[groupId] = null;
                    }
                });
            } else {
                getOneConnectedDeviceInternal(groupId).then(function (response) {
                    returnDef.resolve(response);
                });
            }
            return returnDef.promise;

        };

        thiz.sendToDevice = function (code, hardwareId) {
            for(var i=0; i<_allDevices.length; i++) {
                if(_allDevices[i].getName() == hardwareId) {
                    _allDevices[i].send(code);
                }
            }
        };

        function getOneConnectedDeviceInternal(groupId, ignoreDevice) {
            var returnDef = $q.defer();
            var lastDoneDef = $q.defer();
            var returned = false;
            var promises = [];
            var devices = thiz.getDevices(groupId);
            devices = devices.filter(e => e !== ignoreDevice); //remove ignored device
            if (devices.length == 0) {
                returnDef.resolve(null);
            }
            for (var i = 0; i < devices.length; i++) {
                var promise = devices[i].isConnected();
                evaluatePromise(promise, devices, i);
            }

            function evaluatePromise(promise, devices, i) {
                promise.isDone = false;
                var higherPrioDefs = promises.slice(); // all promises currently saved have higher priority -> copy them to new array
                promises.push(promise);
                promise.then(function (response) {
                    promise.isDone = true;
                    if (!returned && response === true && awaitAllDone(higherPrioDefs)) {
                        returned = true;
                        console.log("found connected device for hardware group <" + groupId + ">: " + devices[i].getName());
                        _lastConnectedDeviceMap[groupId] = devices[i];
                        returnDef.resolve(devices[i]);
                    }
                    if (devices.length - 1 == i) {
                        awaitAllDone(higherPrioDefs);
                        lastDoneDef.resolve();
                    }
                });
            }

            //busy-waiting for all given promises to until done
            function awaitAllDone(promises) {
                for (var i = 0; i < promises.length; i++) {
                    while (!promises[i].isDone) {
                    }
                }
                return true;
            }

            //return null if all promises resolved and nothing returned yet
            lastDoneDef.promise.then(function () {
                if (!returned) {
                    console.log("no connected found device for hardware group <" + groupId + ">.");
                    returnDef.resolve(null);
                }
            });
            return returnDef.promise;
        }
    }]);