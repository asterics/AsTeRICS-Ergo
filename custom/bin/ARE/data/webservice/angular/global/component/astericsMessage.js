angular.module(asterics.appComponents)
    .component('astericsMessage', {

        bindings: {
            group: "@",
            messageCode: "@",
            messageArgs: "<",
            messageOptions: "<",
            messageLevel: "@"
        },
        transclude: true,
        controller: ['messageService', function (messageService) {
            var thiz = this;
            thiz.message = null;

            thiz.getFaClass = function () {
                var level = thiz.getMessageLevel();
                switch (level) {
                    case asterics.const.MSG_INFO:
                        return 'fa-info-circle';
                    case asterics.const.MSG_SUCCESS:
                        return 'fa-check-circle';
                    case asterics.const.MSG_WARN:
                        return 'fa-exclamation-triangle';
                    case asterics.const.MSG_ERROR:
                        return 'fa-exclamation-triangle';
                }
            };

            thiz.getMessages = function () {
                if(thiz.messageCode) {
                    if(!thiz.message) {
                        thiz.message = messageService.generateMessage(thiz.messageCode, thiz.messageArgs, thiz.messageOptions);
                    }
                    return [thiz.message];
                } else if(thiz.group) {
                    return messageService.getMessageGroup(thiz.group).messages;
                }
            };

            thiz.getMessageLevel = function () {
                if(thiz.messageLevel) {
                    return thiz.messageLevel;
                } else if(thiz.group) {
                    return messageService.getMessageGroup(thiz.group).level;
                }
                return asterics.const.MSG_INFO;
            };

            thiz.hasMessages = function () {
                var messages = thiz.getMessages();
                return !!(messages) && !!(messages.length) && messages.length > 0;
            };
        }],
        templateUrl: "angular/global/component/astericsMessage.html"
    });