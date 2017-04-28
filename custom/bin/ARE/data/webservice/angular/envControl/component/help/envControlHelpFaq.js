angular.module(asterics.appComponents)
    .component('envControlHelpFaq', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', '$stateParams', '$anchorScroll', '$timeout', function (utilService, $state, $stateParams, $anchorScroll, $timeout) {
            var thiz = this;
            thiz.open = [];
            thiz.currentState = $state.current.name;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];

            thiz.toState = function (state) {
                return $state.go(eval(state));
            };

            init();
            function init() {
                if ($stateParams.open) {
                    var number = parseInt($stateParams.open);
                    if (number != NaN) {
                        thiz.open[number] = true;
                        $timeout(function () {
                            $anchorScroll('' + number);
                        });
                    }
                }
            }
        }],
        templateUrl: "angular/envControl/component/help/envControlHelpFaq.html"
    });