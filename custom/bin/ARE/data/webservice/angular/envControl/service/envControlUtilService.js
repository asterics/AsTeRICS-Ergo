angular.module(asterics.appServices)
    .service('envControlUtilService', ['envControlFsService', 'utilService', function (envControlFsService, utilService) {
        var thiz = this;
        thiz.createCellBoardItemFs20 = function (title, faIcon, code) {
            var element = utilService.createCellBoardItem(title, faIcon, function() {
                envControlFsService.fs20Toggle(code);
            });
            element.code = code;
            return element;
        };
    }]);