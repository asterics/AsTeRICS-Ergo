angular.module(asterics.appServices)
    .service('messageService', [function () {
        var thiz = this;
        var _messageGroups = {};

        //possible message-options:
        //surviveClears ... number that determines how many calls of "clear" this message should survive

        thiz.info = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_INFO);
            var message = thiz.generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.success = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_SUCCESS);
            var message = thiz.generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.warn = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_WARN);
            var message = thiz.generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.error = function (group, codeI18n, msgArgs, options) {
            prepareGroup(group, asterics.const.MSG_ERROR);
            var message = thiz.generateMessage(codeI18n, msgArgs, options);
            _messageGroups[group].messages.push(message);
        };

        thiz.getMessageGroup = function (group) {
            return _messageGroups[group] || {};
        };

        thiz.clear = function (group) {
            if (!group) {
                angular.forEach(_messageGroups, function (msgGroup) {
                    msgGroup.messages = getRemainingMessages(msgGroup.messages);
                });
            } else if (_messageGroups[group] && _messageGroups[group].messages) {
                _messageGroups[group].messages = getRemainingMessages(_messageGroups[group].messages);
            }
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
        };

        function prepareGroup(group, level) {
            if (!_messageGroups[group]) {
                _messageGroups[group] = {};
                _messageGroups[group].messages = [];
            }
            _messageGroups[group].level = level;
        }

        function getRemainingMessages(messages) {
            var toStay = [];
            angular.forEach(messages, function (message) {
                if (message.options.surviveClears && message.options.surviveClears > 0) {
                    toStay.push(message);
                    message.options.surviveClears--;
                }
            });
            return toStay;
        }
    }]);