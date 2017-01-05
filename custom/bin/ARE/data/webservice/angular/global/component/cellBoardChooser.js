angular.module(asterics.appComponents)
    .component('cellBoardChooser', {

        bindings: {
            item: "<"
        },
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.getFaClass = function() {
                if(thiz.item && thiz.item.faIcon) {
                    return 'fa fa-3x fa-' +  thiz.item.faIcon;
                }
            }
        }],
        templateUrl: "angular/global/component/cellBoardChooser.html"
    });