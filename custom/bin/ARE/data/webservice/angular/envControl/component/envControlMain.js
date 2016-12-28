angular.module(asterics.appComponents)
    .component('envControl', {

        bindings: {},
        controller: ['envControlService', 'envControlFsService', function (envControlService, envControlFsService) {
            var thiz = this;

            thiz.element = asterics.utils.createCellBoardItem('FS20-Toggle', 'lightbulb-o', function(){
                envControlFsService.fs20Toggle("11111111_1111");
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