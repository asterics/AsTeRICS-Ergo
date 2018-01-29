angular.module(asterics.appComponents)
    .component('hardwareList', {
        bindings: {
            navigateFunction: '&',
            list: '<',
            hardwareAmounts: '<'
        },
        controller: ['utilService', function (utilService) {
            var thiz = this;
            thiz.navigate = function (hardware) {
                if (_.isFunction(thiz.navigateFunction)) {
                    thiz.navigateFunction({hardware: hardware});
                }
            };
        }],
        templateUrl: "angular/envControl/component/help/assistant/hardwareList.html"
    })
;