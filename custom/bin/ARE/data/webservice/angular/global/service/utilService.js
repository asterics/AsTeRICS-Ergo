angular.module(asterics.appServices)
    .service('utilService', ['$state', function ($state) {
        var thiz = this;

        thiz.createCellBoardItem = function (title, faIcon, type, clickAction) {
            return {
                title: title,
                faIcon: faIcon,
                type: type,
                clickAction: clickAction
            };
        };

        thiz.createSelectItem = function (title, id, faIcon) {
            return {
                title: title,
                id: id,
                faIcon: faIcon
            };
        };

        thiz.createCellBoardItemNav = function (title, faIcon, navState) {
            var element = thiz.createCellBoardItem(title, faIcon, asterics.const.CB_TYPE_NAV, function () {
                $state.go(navState);
            });
            return element;
        };

        thiz.createCellBoardItemBack = function (navState) {
            return thiz.createCellBoardItemNav('Zurück', 'arrow-left', navState);
        };
    }]);