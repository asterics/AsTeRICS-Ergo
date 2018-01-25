angular.module(asterics.appServices)
    .service('utilService', ['$state', 'stateUtilService', '$q', '$translate', function ($state, stateUtilService, $q, $translate) {
        var thiz = this;
        var _defaultPort = "8091";

        thiz.createCellBoardItem = function (title, faIcon, type, clickAction) {
            var translatedTitle = $translate.instant(title);
            return {
                title: title,
                translatedTitle: translatedTitle,
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
            element.toState = navState;
            element.tooltip = 'i18n_ec_tooltip_click_subcb';
            element.tooltipParams = {device: title};
            element.class = 'subfolder-button';
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
            return "ws://" + window.location.hostname + ":8092/ws/astericsData";
        };

        thiz.getLocalIP = function() {
            //see https://stackoverflow.com/questions/20194722/can-you-get-a-users-local-lan-ip-address-via-javascript
            var def = $q.defer();
            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
            if(!RTCPeerConnection) {
               def.resolve("");
               return def.promise;
            }
            var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};
            if(!!pc.createDataChannel) {
                pc.createDataChannel(""); //create a bogus data channel
            } else {
                def.resolve("");
                return def.promise;
            }
            pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
            pc.onicecandidate = function(ice){  //listen for candidate events
                if(!ice || !ice.candidate || !ice.candidate.candidate)  {
                    def.resolve("");
                    return;
                }
                var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                pc.onicecandidate = noop;
                def.resolve(myIP);
            };
            return def.promise;
        };

        thiz.getLocalPort = function() {
            var port = window.location.port;
            return !!port ? port : _defaultPort;
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