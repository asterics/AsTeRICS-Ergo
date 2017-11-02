angular.module(asterics.appComponents)
    .component('envControlHelpFaq', {
        bindings: {
            hideBack: '<',
        },
        controller: ['utilService', '$state', '$stateParams', '$anchorScroll', '$timeout', '$interval', 'envControlTextService', '$scope', '$rootScope', '$sce', '$translate', function (utilService, $state, $stateParams, $anchorScroll, $timeout, $interval, envControlTextService, $scope, $rootScope, $sce, $translate) {
            var thiz = this;
            thiz.faqs = [];
            thiz.searchFaqs = [];
            thiz.searchText = '';
            thiz.open = [];
            $scope.open = thiz.open;
            thiz.currentState = $state.current.name;
            thiz.cellBoardConfig = [utilService.createCellBoardItemBack()];
            thiz.localIP = null;
            thiz.intervalPromise = null;

            thiz.toState = function (state) {
                return $state.go(eval(state));
            };

            thiz.getTitle = function (faq) {
                var _title = faq.title;
                if (thiz.searchText) {
                    _title = _.replace(_title, new RegExp(thiz.searchText, 'ig'), '<b>$&</b>');
                }
                return getHtml(_title);
            };

            thiz.getHtmlPath = function (faq) {
                return 'angular/envControl/component/help/faq/html/' + faq.getHtmlName();
            };

            thiz.search = function () {
                if (!thiz.searchText || thiz.searchText.length == 0) {
                    thiz.searchFaqs = thiz.faqs;
                    return;
                }
                var _searchFaqs = [];
                angular.forEach(thiz.faqs, function (faq) {
                    if (faq.title && containsString(faq.title, thiz.searchText) || containsKeyword(faq, thiz.searchText)) {
                        _searchFaqs.push(faq);
                    }
                });
                if (thiz.searchFaqs.length == 1) {
                    thiz.open[thiz.searchFaqs[0].id] = true;
                } else {
                    thiz.open = [];
                }
                thiz.searchFaqs = _searchFaqs;
            };

            thiz.getLocalAsTeRICSAddress = function() {
                if(!thiz.intervalPromise && !!thiz.localIP) {
                    thiz.intervalPromise = $interval(function() {
                        console.log("refresing ip");
                        utilService.getLocalIP().then(function(response) {
                            thiz.localIP = response;
                        });
                    }, 2000);
                }
                return thiz.localIP + ":" + utilService.getLocalPort();
            };

            thiz.getLocalPort = function() {
                return utilService.getLocalPort();
            };

            init();
            function init() {
                utilService.getLocalIP().then(function(response) {
                    thiz.localIP = response;
                });
                initFaqs($translate.use());
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

            function initFaqs(lang) {
                thiz.searchFaqs = thiz.faqs = envControlTextService.getFaqs(lang);
            }

            function containsKeyword(faq, searchText) {
                if (!searchText || !faq.keywords) {
                    return false;
                }
                var returnValue = false;
                angular.forEach(faq.keywords, function (keyword) {
                    if (containsString(keyword, searchText)) {
                        returnValue = true;
                    }
                });
                return returnValue;
            }

            function containsString(string, search) {
                var _stringLower = string.toLowerCase();
                var _searchLower = search.toLowerCase();
                return _stringLower.indexOf(_searchLower) !== -1;
            }

            function getHtml(htmlString) {
                return $sce.trustAsHtml(htmlString);
            }

            //not very nice but did not find another solution :(
            //tried https://github.com/LukaszWatroba/v-accordion but events did not work
            $scope.$watch('open', function (opens) {
                angular.forEach(opens, function (open, idx) {
                    if (open) {
                        $state.params.open = idx;
                    }
                })
            }, true);

            $rootScope.$on(asterics.const.EVENT_LANG_CHANGED, function (event, lang) {
                initFaqs(lang);
            });

            $scope.$on('$destroy', function () {
                console.log("canceling interval...");
                $interval.cancel(thiz.intervalPromise);
            });
        }],
        templateUrl: "angular/envControl/component/help/faq/envControlHelpFaq.html"
    });