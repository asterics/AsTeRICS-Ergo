angular.module(asterics.appServices)
    .service('hardwareFs20Sender', ['areService', '$q', '$timeout', function (areService, $q, $timeout) {
        var thiz = this;
        var fs20SenderName = 'FS20Sender.1';
        var fs20ActionInput = 'Action';
        var houseCodeLength = 8;
        var _plugged = true;
        thiz.canceler = $q.defer();

        thiz.fs20Action = function (deviceCode, actionCode) {
            var actionString = '@FS20:' + deviceCode + '_' + actionCode;
            return fs20Send(actionString);
        };

        thiz.send = function (code) {
            return thiz.fs20Action(code, asterics.envControl.FS20_TOGGLE_CODE);
        };

        thiz.trainCode = function (code) {
            return thiz.fs20Action(code, asterics.envControl.FS20_LEARN_CODE)
        };

        thiz.isConnected = function () {
            var def = $q.defer();
            def.resolve(_plugged);
            return def.promise;
        };

        thiz.fs20Patch = function () {
            return fs20Send('@FS20:patch');
        };

        thiz.generateFs20HouseCode = function () {
            var code = "";
            for (var i = 0; i < houseCodeLength; i++) {
                code = code + getRandomInt(1, 4).toString();
            }
            return code;
        };

        thiz.getNewCode = function (existingCodes) {
            if (!existingCodes || existingCodes.length == 0) {
                return thiz.generateFs20HouseCode() + '_1111';
            } else {
                var codes = _.map(existingCodes, function (elem) {
                    return parseInt(elem.substr(-4))
                });
                var max = _.max(codes);
                var housecode = existingCodes[0].split('_')[0];
                return housecode + '_' + (addOneInFs20NumberSystemTo(max));
            }
        };

        //only for mock mode:
        thiz.setDevicePlugged = function (plugged) {
            _plugged = plugged;
        };

        function fs20Send(cmd) {
            var def = $q.defer();
            console.log("sending mocked FS20 command: " + cmd);
            $timeout(function () {
                def.resolve(1);
            }, 500)
            return def.promise;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //FS20 uses a number system from 1111 to 4444 - so its like numbers with base 4, but all with offset 1111.
        //this function adds 1 to such a number and returns it. for instance:
        //1111 + 1 = 1112
        //1114 + 1 = 1121
        //1444 + 1 = 2111
        function addOneInFs20NumberSystemTo(number) {
            number = number - 1111; //minus offset
            var numBase4 = parseInt(number, 4) + 1; //convert from base 4 to base 10 and add 1
            var newNum = numBase4.toString(4); //convert from base 10 to base 4
            return parseInt(newNum) + 1111; // re-add offset
        }
    }]);