angular.module(asterics.appServices)
    .service('areSaveService', ['$http', '$q', 'utilService', function ($http, $q, utilService) {
        var thiz = this;
        var _saveFolder = "saved";
        var _pathToSaveFolder = "data/webservice/";
        var _timestampSuffix = ".timestamp";

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
    }]);