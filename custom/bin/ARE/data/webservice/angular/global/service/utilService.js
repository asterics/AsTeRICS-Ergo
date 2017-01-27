angular.module(asterics.appServices)
    .service('utilService', ['$state', 'stateUtilService', function ($state, stateUtilService) {
        var thiz = this;

        thiz.createCellBoardItem = function (title, faIcon, type, clickAction) {
            return {
                title: title,
                faIcon: faIcon,
                type: type,
                clickAction: clickAction,
                disabled: false,
                active: false,
                visible: true
            };
        };

        thiz.createSelectItem = function (title, id, faIcon) {
            return {
                title: title,
                id: id,
                faIcon: faIcon
            };
        };

        thiz.createCellBoardItemNav = function (title, faIcon, navState, stateParams) {
            var element = thiz.createCellBoardItem(title, faIcon, asterics.const.CB_TYPE_NAV, function () {
                $state.go(navState, stateParams);
            });
            return element;
        };

        thiz.createCellBoardItemBack = function (navState, stateParams) {
            if (navState) {
                return thiz.createCellBoardItemNav('Zurück', 'arrow-left', navState, stateParams);
            } else {
                return thiz.createCellBoardItemNav('Zurück', 'arrow-left', stateUtilService.getLastState(), stateParams);
            }
        };
    }]);