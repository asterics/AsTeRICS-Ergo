angular.module(asterics.appServices)
    .service('areSaveService', ['$http', '$q', 'utilService', function ($http, $q, utilService) {
        var thiz = this;
        var _saveFolder = "saved";
        var _pathToSaveFolder = "data/webservice/";
        var _timestampSuffix = ".timestamp";

        thiz.saveData = function (filename, dataJSON) {
            var modificationDate = new Date().getTime();
            var savepath = _pathToSaveFolder + _saveFolder + "/" + getCurrentAppName();
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

        thiz.getSavedData = function (filename, appName) {
            if (!appName) {
                appName = getCurrentAppName();
            }
            var getPath = _saveFolder + "/" + appName;
            var def = $q.defer();
            $http({
                method: 'GET',
                url: utilService.getBaseUrl() + getPath + "/" + filename
            }).then(function (response) {
                def.resolve(response.data);
            }, function () {
                def.resolve(null);
            });
            return def.promise;
        };

        thiz.getLastModificationDate = function (filename, appName) {
            if (!appName) {
                appName = getCurrentAppName();
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

        function getCurrentAppName() {
            var searchString = "#!/" + asterics.const.STATE_HOME + "/";
            var href = window.location.href;
            var appName = href.substring(href.indexOf(searchString)).substring(searchString.length);
            var indexOfSlash = appName.indexOf('/');
            if (indexOfSlash > 0) {
                return appName.substring(0, indexOfSlash);
            } else {
                return appName;
            }
        }
    }]);