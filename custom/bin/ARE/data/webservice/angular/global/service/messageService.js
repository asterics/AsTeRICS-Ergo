angular.module(asterics.appServices)
    .service('messageService', [function () {
        var thiz = this;
        var _messageGroups = {};

        thiz.info = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_INFO);
            var message = generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.success = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_SUCCESS);
            var message = generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.warn = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_WARN);
            var message = generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.error = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_ERROR);
            var message = generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.getMessageGroup = function (group) {
            return _messageGroups[group] || {};
        };

        thiz.clear = function (group) {
            if (_messageGroups[group] && _messageGroups[group].messages) {
                _messageGroups[group].messages = [];
            }
        };

        thiz.clearAll = function () {
            _messageGroups = {};
        };

        thiz.generateMessage = function (codeI18n, msgArgs, options) {
            if (!options) {
                options = {};
            }
            return {
                codeI18n: codeI18n,
                msgArgs: msgArgs,
                options: options
            };
        }

        function prepareGroup(group, level) {
            if (!_messageGroups[group]) {
                _messageGroups[group] = {};
                _messageGroups[group].messages = [];
            }
            _messageGroups[group].level = level;
        }
    }]);