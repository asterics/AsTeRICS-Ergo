angular.module(asterics.appComponents)
    .component('astericsMessage', {

        bindings: {
            group: "@"
        },
        transclude: true,
        controller: ['messageService', function (messageService) {
            var thiz = this;

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
                return messageService.getMessageGroup(thiz.group).messages;
            };

            thiz.getMessageLevel = function () {
                return messageService.getMessageGroup(thiz.group).level;
            };

            thiz.hasMessages = function () {
                var messages = thiz.getMessages();
                return !!(messages) && !!(messages.length) && messages.length > 0;
            }
        }],
        templateUrl: "angular/global/component/astericsMessage.html"
    });