angular.module(asterics.appServices)
    .service('utilService', ['$state', function ($state) {
        var thiz = this;

        thiz.createCellBoardItem = function(title, faIcon, clickAction) {
            return {
                title: title,
                faIcon: faIcon,
                clickAction: clickAction
            };
        };

        thiz.createSelectItem = function(title, faIcon) {
            return {
                title: title,
                faIcon: faIcon
            };
        };

        thiz.createCellBoardItemNav = function (title, faIcon, navState) {
            var element = thiz.createCellBoardItem(title, faIcon, function() {
                $state.go(navState);
            });
            return element;
        };
    }]);