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

        thiz.createCellBoardItemSubCb = function (title, faIcon, navState, stateParams) {
            var element = thiz.createCellBoardItem(title, faIcon, asterics.const.CB_TYPE_SUBCB, function () {
                $state.go(navState, stateParams);
            });
            return element;
        };

        thiz.createCellBoardItemBack = function () {
            var lastState = stateUtilService.getLastState();
            return thiz.createCellBoardItemNav('i18n_back', 'arrow-left', lastState.name, lastState.params);
        };

        //encodes PathParametes
        thiz.encodeParam = function (text) {
            var encoded = "";
            var delimiter = "-";
            for (var i = 0; i < text.length; i++) {
                encoded += text.charCodeAt(i) + delimiter;
            }
            return encoded;
        };

        thiz.getBaseUrl = function () {
            var hostname = window.location.hostname;
            var port = window.location.port;
            return window.location.protocol + "//" + hostname + ":" + port + "/";
        };

        thiz.getRestUrl = function () {
            return thiz.getBaseUrl() + "rest/";
        };

        thiz.getWebsocketUrl = function () {
            return "ws://" + window.location.hostname + ":9082/ws/astericsData";
        };

        /**
         * returns a list of objects defined by the prototype list with a given
         * list of element data
         * @param prototypeFunction the prototype function to generate one
         * instance of an object
         * @param elementList a list of data-elements where each element is passed
         * to the prototype function
         * @returns {Array}
         */
        thiz.getObjectsFromList = function(prototypeFunction, elementList) {
            var returnList = [];
            angular.forEach(elementList, function (element) {
                returnList.push(new prototypeFunction(element));
            });
            return returnList;
        };
    }]);