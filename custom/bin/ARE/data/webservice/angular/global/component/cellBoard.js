angular.module(asterics.appComponents)
    .component('cellBoard', {

        bindings: {
            chooseItems: '='
        },
        controller: ['envControlService', function (envControlService) {
            var thiz = this;
            thiz.addItem = function (item) {
                console.log("here" + thiz.items);
            };

            thiz.removeItem = function (index) {
                thiz.chooseItems.splice(index, 1);
            };

            thiz.getDirectiveName = function(item) {
                if(item && item.directiveName) {
                    return item.directiveName;
                }
                return 'cell-board-chooser';
            };

            thiz.isCustomComponent = function(item) {
                return item && item.directiveName;
            }
        }],
        controllerAs: 'cellBoardCtrl',
        templateUrl: "angular/global/component/cellBoard.html"
    });