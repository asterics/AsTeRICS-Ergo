angular.module(asterics.appServices)
    .service('areSaveService', ['$http', '$q', 'utilService', '$interval', function ($http, $q, utilService, $interval) {
        var thiz = this;
        var _saveFolder = "saved";
        var _pathToSaveFolder = "data/webservice/";
        var _timestampSuffix = ".timestamp";
        var _registeredUpdateListeners = [];

        thiz.saveData = function (appName, filename, dataJSON) {
            if (!filename || !appName || !dataJSON) {
                console.log("nothing saved, because of empty parameter.");
                return;
            }
            var modificationDate = new Date().getTime();
            var savepath = _pathToSaveFolder + _saveFolder + "/" + appName;
            $http({
                method: 'POST',
                url: utilService.getRestUrl() + "storage/data/" + utilService.encodeParam(savepath) + "/" + utilService.encodeParam(filename),
                headers: {
                    "Content-Type": "application/json"
                },
                data: angular.toJson(dataJSON)
            });
            $http({
                method: 'POST',
                url: utilService.getRestUrl() + "storage/data/" + utilService.encodeParam(savepath) + "/" + utilService.encodeParam(filename + _timestampSuffix),
                headers: {
                    "Content-Type": "application/json"
                },
                data: {lastModified: modificationDate}
            });
            return modificationDate;
        };

        thiz.getSavedData = function (appName, filename) {
            if (!filename || !appName) {
                console.log("nothing returned, because of empty parameter");
                return;
            }
            var getPath = _saveFolder + "/" + appName;
            var def = $q.defer();
            $http({
                method: 'GET',
                url: utilService.getBaseUrl() + getPath + "/" + filename
            }).then(function (response) {
                def.resolve(response.data);
            }, function () {
                def.reject();
            });
            return def.promise;
        };

        thiz.getLastModificationDate = function (appName, filename) {
            if (!filename || !appName) {
                console.log("nothing returned, because of empty parameter");
                return;
            }
            var getPath = _saveFolder + "/" + appName;
            var def = $q.defer();
            $http({
                method: 'GET',
                url: utilService.getBaseUrl() + getPath + "/" + filename + _timestampSuffix
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
         * register for updates on a specific stored data-file, specified by "appName" and "filename".
         *
         * @param appName
         * @param filename
         * @param callbackFunction a function that is invoked if new data available, with new data and new timestamp as param
         * @param getCurrentTimestampFunction a function that must provide the timestamp of the current stored data, if not specified, data is updated everytime
         */
        thiz.registerForUpdates = function (appName, filename, callbackFunction, getCurrentTimestampFunction) {
            if (!appName || !filename || !callbackFunction) {
                return;
            }
            if (!getCurrentTimestampFunction) {
                getCurrentTimestampFunction = function () {
                    return -1;
                }
            }
            var listenerItem = {
                appName: appName,
                filename: filename,
                callbackFunction: callbackFunction,
                getCurrentTimestampFunction: getCurrentTimestampFunction
            };
            _registeredUpdateListeners.push(listenerItem);
        };

        function checkForUpdatesAndNotify() {
            angular.forEach(_registeredUpdateListeners, function (item) {
                var existingTimestamp = item.getCurrentTimestampFunction();
                thiz.getLastModificationDate(item.appName, item.filename).then(function (responseTimestamp) {
                    if (responseTimestamp > existingTimestamp) {
                        thiz.getSavedData(item.appName, item.filename).then(function (responseData) {
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