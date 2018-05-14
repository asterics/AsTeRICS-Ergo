angular.module(asterics.appServices)
    .service('hardwareService', ['$q', 'hardwareFlipMouse', 'hardwareIrTrans', 'hardwareFs20Sender', 'envControlHelpDataService', function ($q, hardwareFlipMouse, hardwareIrTrans, hardwareFs20Sender, envControlHelpDataService) {
        var thiz = this;

        //arrays storing the known hardware for each category. first hardware in the array have higher priority,
        //which means that using them is preferred if several hardware instances are connected
        var _irHardware = [hardwareIrTrans, hardwareFlipMouse];
        var _plugHardware = [hardwareFs20Sender];
        var _hardwareMap = {};                    //stores all hardware hardware group
        var _lastConnectedHardwareMap = {};        //stores one last connection status of hardware by hardwareId
        var _allHardware = _plugHardware.concat(_irHardware);     //list of all known hardware instances
        var _additionalDataSaveCallback = null;
        _hardwareMap[asterics.envControl.HW_GROUP_IR] = _irHardware;
        _hardwareMap[asterics.envControl.HW_GROUP_PLUG] = _plugHardware;

        thiz.isConnected = function (hardwareId) {
            return getSingleHardware(hardwareId).isConnected();
        };

        /**
         * calls a specific method of a hardware device by method name
         *
         * @param hardwareId the ID of the hardware to call a method of
         * @param methodName the name of the method to call
         * @return the result of the invoked method or null if the method was not found on the hardware device
         */
        thiz.callSpecialHardwareMethod = function (hardwareId, methodName) {
            var hardware = getSingleHardware(hardwareId);
            if(hardware && hardware[methodName] && _.isFunction(hardware[methodName])) {
                return hardware[methodName]();
            }
            return null;
        };

        /**
         * returns exactly one connected hardware for a given hardware list of hardware IDs. If several hardware instances
         * for the given list are connected the hardware with higher priority is returned.
         * Exception: If "forceFullRescan" is not set and a lower
         * priority hardware was at first the only connected hardware, all subsequent calls will return the same hardware,
         * even if a hardware with higher priority was connected in the meantime.
         * @param possibleHardwareList the possible hardware ids to get a hardware
         * @param forceFullRescan if true a full rescan is always triggered and the returned hardware surely has the
         *        highest priority of all currently connected hardware instances
         * @return a promise resolving to a found connected hardware or "null" if no hardware was found
         *         the promise notifies not connected hardware (by ID) as soon as the result is available
         */
        thiz.getOneConnectedHardware = function (possibleHardwareList, forceFullRescan) {
            if(!_.isArray(possibleHardwareList)) {
                console.log("invalid arguments for getOneConnectedHardware()");
                return;
            }
            var returnDef = $q.defer();
            var lastConnectedHardware = null;
            possibleHardwareList.forEach(function(hardwareId) {
                if(_lastConnectedHardwareMap[hardwareId]) {
                    lastConnectedHardware = _lastConnectedHardwareMap[hardwareId];
                }
            });
            if (lastConnectedHardware && !forceFullRescan) {
                lastConnectedHardware.isConnected().then(function (response) {
                    if (response) {
                        console.log("found connected hardware for list <" + possibleHardwareList + ">: " + lastConnectedHardware.getName());
                        returnDef.resolve(lastConnectedHardware);
                    } else {
                        console.log("hardware <" + lastConnectedHardware.getName() + "> is not connected.");
                        returnDef.notify(lastConnectedHardware.getName());
                        getOneConnectedHardwareInternal(possibleHardwareList, lastConnectedHardware).then(function (response) {
                            returnDef.resolve(response);
                        }, function error () {

                        }, function notifiy (hardware) {
                            returnDef.notify(hardware);
                        });
                        possibleHardwareList.forEach(function(hardwareId) {
                            _lastConnectedHardwareMap[hardwareId] = null;
                        });
                    }
                });
            } else {
                getOneConnectedHardwareInternal(possibleHardwareList).then(function (response) {
                    returnDef.resolve(response);
                }, function error () {

                }, function notifiy (hardware) {
                    returnDef.notify(hardware);
                });
            }
            return returnDef.promise;

        };

        thiz.sendToHardware = function (code, hardwareId) {
            for (var i = 0; i < _allHardware.length; i++) {
                if (_allHardware[i].getName() == hardwareId) {
                    _allHardware[i].send(code);
                }
            }
        };

        /**
         * calls a delete handler of the hardware with the given ID, if it implements one.
         * passes the given data to the delete handler
         * @param hardwareId the hardware of which the delete handler should be called
         * @param data is passed to the delete handler
         */
        thiz.handleDelete = function(hardwareId, data) {
            var hardware = getSingleHardware(hardwareId);
            if(hardware && _.isFunction(hardware.deleteHandler)) {
                hardware.deleteHandler(data);
            }
        };

        /**
         * method that takes additional device data stored in config (map with key=deviceID, value=data) and distributes
         * the data to the corresponding devices, if they implement a device.setAdditionalData() method.
         * @param additionalData the map of additional data
         */
        thiz.updateAdditionalData = function(additionalData) {
            if(additionalData) {
                Object.keys(additionalData).forEach(function(key) {
                    var hardware = getSingleHardware(key);
                    if(hardware && _.isFunction(hardware.setAdditionalData)) {
                        hardware.setAdditionalData(additionalData[key]);
                    }
                });
            }
        };

        /**
         * set a callback that should be called by hardwareInstances if they have new additional data to be stored
         * @param fn
         */
        thiz.setAdditionalDataCallBack = function(fn) {
            _additionalDataSaveCallback = fn;
            _allHardware.forEach(function (hw) {
                if(_.isFunction(hw.setAdditionalDataUpdateFunction)) {
                    hw.setAdditionalDataUpdateFunction(_additionalDataSaveCallback);
                }
            });
        };

        /**
         * returns all known hardware for the given list of hardware IDs
         * @param hardwareIds
         * @returns {*}
         */
        function getHardware(hardwareIds) {
            return _allHardware.filter(hardware => _.includes(hardwareIds, hardware.getName()));
        }

        /**
         * returns all known hardware for the given list of hardware IDs
         * @param hardwareIds
         * @returns {*}
         */
        function getSingleHardware(hardwareId) {
            var list = _allHardware.filter(hardware => hardwareId == hardware.getName());
            if(list.length == 1) {
                return list[0];
            } else {
                return null;
            }
        }

        function getOneConnectedHardwareInternal(possibleHardwareList, ignoreHardware) {
            var returnDef = $q.defer();
            var lastDoneDef = $q.defer();
            var returned = false;
            var promises = [];
            var hardwareInstances = getHardware(possibleHardwareList);
            hardwareInstances = hardwareInstances.filter(e => e !== ignoreHardware); //remove ignored hardware
            if (hardwareInstances.length == 0) {
                returnDef.resolve(null);
            }
            for (var i = 0; i < hardwareInstances.length; i++) {
                var promise = hardwareInstances[i].isConnected();
                evaluatePromise(promise, hardwareInstances, i);
            }

            function evaluatePromise(promise, hardwareInstances, i) {
                promise.isDone = false;
                var higherPrioDefs = promises.slice(); // all promises currently saved have higher priority -> copy them to new array
                promises.push(promise);
                promise.then(function (response) {
                    promise.isDone = true;
                    if(response == false) {
                        console.log("hardware <" + hardwareInstances[i].getName() + "> is not connected.");
                        returnDef.notify(hardwareInstances[i].getName());
                    }
                    $q.all(higherPrioDefs).then(function () {
                        if (!returned && response === true) {
                            returned = true;
                            console.log("found connected hardware for list <" + possibleHardwareList + ">: " + hardwareInstances[i].getName());
                            _lastConnectedHardwareMap[hardwareInstances[i].getName()] = hardwareInstances[i];
                            returnDef.resolve(hardwareInstances[i]);
                        }
                        if (hardwareInstances.length - 1 == i) {
                            lastDoneDef.resolve();
                        }
                    });

                });
            }

            //return null if all promises resolved and nothing returned yet
            lastDoneDef.promise.then(function () {
                if (!returned) {
                    console.log("no connected hardware found for list <" + possibleHardwareList + ">.");
                    returnDef.resolve(null);
                }
            });
            return returnDef.promise;
        }
    }]);