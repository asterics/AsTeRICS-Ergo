angular.module(asterics.appServices)
    .service('areSaveService', ['httpWrapper', '$q', 'utilService', '$interval', function ($http, $q, utilService, $interval) {
        var thiz = this;
        var _timestampSuffix = ".timestamp";
        var _registeredUpdateListeners = [];

        thiz.saveData = function (filename, dataJSON) {
            if (!filename || !dataJSON) {
                console.log("nothing saved, because of empty parameter.");
                return;
            }
            var modificationDate = new Date().getTime();
            $http({
                method: 'POST',
                url: utilService.getRestUrl() + "storage/webapps/" + utilService.encodeParam(asterics.const.WEBAPP_NAME) + "/" + utilService.encodeParam(filename),
                headers: {
                    "Content-Type": "text/plain"
                },
                data: encodeURI(angular.toJson(dataJSON))
            }).then(function () {
                //timestamp is saved after data in order to guarantee that the data is already saved, when other clients
                //receive new timestamp and therefore fetch the data
                $http({
                    method: 'POST',
                    url: utilService.getRestUrl() + "storage/webapps/" + utilService.encodeParam(asterics.const.WEBAPP_NAME) + "/" + utilService.encodeParam(filename + _timestampSuffix),
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    data: {lastModified: modificationDate}
                });
            });
            return modificationDate;
        };

        thiz.getSavedData = function (filename) {
            if (!filename) {
                console.log("nothing returned, because of empty parameter");
                return;
            }
            var def = $q.defer();
            $http({
                method: 'GET',
                url: utilService.getBaseUrl() + 'webapps/envcontrol/data/' + filename
            }).then(function (response) {
                def.resolve(angular.fromJson(decodeURI(response.data)));
            }, function (reason) {
                def.reject(reason);
            });
            return def.promise;
        };

        thiz.getLastModificationDate = function (filename) {
            if (!filename) {
                console.log("nothing returned, because of empty parameter");
                return;
            }
            var def = $q.defer();
            $http({
                method: 'GET',
                url: utilService.getBaseUrl() + 'webapps/envcontrol/data/' + filename + _timestampSuffix
            }).then(function (response) {
                if (response.data && response.data.lastModified) {
                    def.resolve(response.data.lastModified);
                } else {
                    def.resolve(-1);
                }
            }, function () {
                def.resolve(-1);
            });
            return def.promise;
        };

        /**
         * register for updates on a specific stored data-file, specified by "filename".
         *
         * @param filename
         * @param callbackFunction a function that is invoked if new data available, with new data and new timestamp as param
         * @param getCurrentTimestampFunction a function that must provide the timestamp of the current stored data, if not specified, data is updated everytime
         */
        thiz.registerForUpdates = function (filename, callbackFunction, getCurrentTimestampFunction) {
            if (!filename || !callbackFunction) {
                return;
            }
            if (!getCurrentTimestampFunction) {
                getCurrentTimestampFunction = function () {
                    return -1;
                }
            }
            var listenerItem = {
                filename: filename,
                callbackFunction: callbackFunction,
                getCurrentTimestampFunction: getCurrentTimestampFunction
            };
            _registeredUpdateListeners.push(listenerItem);
        };

        function checkForUpdatesAndNotify() {
            angular.forEach(_registeredUpdateListeners, function (item) {
                var existingTimestamp = item.getCurrentTimestampFunction();
                thiz.getLastModificationDate(item.filename).then(function (responseTimestamp) {
                    if (responseTimestamp > existingTimestamp) {
                        thiz.getSavedData(item.filename).then(function (responseData) {
                            item.callbackFunction(responseData, responseTimestamp);
                        });
                    }
                });
            });
        }

        init();

        function init() {
            $interval(checkForUpdatesAndNotify, asterics.const.PULL_RELOAD_INTERVAL_MS);
        }
    }]);