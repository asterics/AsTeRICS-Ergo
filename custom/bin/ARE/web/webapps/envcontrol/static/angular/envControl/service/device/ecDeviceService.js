angular.module(asterics.appServices)
    .service('ecDeviceService', ['$q', 'deviceFlipMouse', 'deviceIrTrans', 'deviceFs20Sender', function ($q, deviceFlipMouse, deviceIrTrans, deviceFs20Sender) {
        var thiz = this;
        var _irDevices = [deviceIrTrans, deviceFlipMouse];
        var _plugDevices = [deviceFs20Sender];
        var _deviceMap = {};
        _deviceMap[asterics.envControl.HW_GROUP_IR] = _irDevices;
        _deviceMap[asterics.envControl.HW_GROUP_PLUG] = _plugDevices;

        thiz.getDevices = function (groupId) {
            var devices = _deviceMap[groupId];
            if(!devices || devices.length == 0) {
                return [];
            }
            return devices;
        };

        thiz.getConnectedDevices = function (groupId) {
            var devices = _deviceMap[groupId];
            if(!devices || devices.length == 0) {
                return [];
            }
            //TODO
        };

        thiz.getOneConnectedDevice = function(groupId) {
            var returnDef = $q.defer();
            var lastDoneDef = $q.defer();
            var returned = false;
            var promises = [];
            var devices = thiz.getDevices(groupId);
            for(var i=0; i<devices.length; i++) {
                var promise = devices[i].isConnected();
                promise.isDone = false;
                var higherPrioDefs = promises.slice();
                promises.push(promise);
                promise.then(function(response) {
                    promise.isDone = true;
                    if(response === true || allDone(higherPrioDefs)) {
                        returned = true;
                        console.log("found connected device: " + devices[i].getName());
                        returnDef.resolve(devices[i]);
                    }
                    if(i == devices.length-1) {
                        lastDoneDef.resolve();
                    }
                });
            }
            lastDoneDef.promise.then(function () {
                if(!returned) {
                    returnDef.resolve(null);
                }
            });
            return returnDef.promise;
        }

        function allDone(promises) {
            for(var i=0; i<promises.length(); i++) {
                if(!promises[i].isDone) {
                    return false;
                }
                return true;
            }
        }

    }]);