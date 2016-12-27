angular.module(asterics.appComponents).directive('cellBoardElement', ['$compile', function ($compile) {
    return {
        scope: {
            directiveName: '='
        },
        link: function (scope, element) {
            var generatedTemplate = '<' + scope.directiveName + '/>';
            element.append($compile(generatedTemplate)(scope));
        }
    };
}]);