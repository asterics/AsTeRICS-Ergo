angular.module(are.app)
    .service('areService', ['$http', function ($http) {
        var thiz = this;
        var text = "intial from service";

        thiz.test = function () {
            return text;
        }
        thiz.setTest = function (a) {
            text = a;
        }
    }]);