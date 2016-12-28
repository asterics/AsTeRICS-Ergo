angular.module(asterics.appServices)
    .service('envControlUtilService', ['envControlFsService', function (envControlFsService) {
        var thiz = this;
        thiz.createCellBoardItemFs20 = function (title, faIcon, code) {
            var element = asterics.utils.createCellBoardItem(title, faIcon, function() {
                envControlFsService.fs20Toggle(code);
            });
            element.code = code;
            return element;
        };
    }]);