angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'fsService', function (envControlService, fsService) {
            var thiz = this;

            thiz.element = asterics.utils.createCellBoardItem('FS20-Toggle', 'fs20.png', function(){
                fsService.fs20Toggle("11111111_1111");
            });
            thiz.chosableElementTypes = [thiz.element];

            thiz.addItem = function(){
                thiz.chosableElementTypes.push(thiz.element);
            };

            init();
            function init() {
                envControlService.isEnvModelStarted().then(function (isStarted) {
                    if (!isStarted) {
                        envControlService.startEnvModel();
                    }
                });
            }
        }],
        controllerAs: 'envControlCtrl',
        templateUrl: "angular/envControl/component/envControlMain.html"
    });