angular.module(asterics.appComponents).directive('cellBoardElement', ['$compile', function ($compile) {
    return {
        scope: {
            item: '='
        },
        link: function (scope, element) {
            var generatedTemplate = '<' + scope.item + '/>';
            element.append($compile(generatedTemplate)(scope));
        }
    };
}]);