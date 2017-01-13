angular.module(asterics.appServices)
    .service('stateUtilService', function () {
        var thiz = this;

        thiz.addSubState = function (parentState, newName) {
            var newState;
            if (thiz.isSubState(parentState)) {
                newState = parentState + '/' + newName.toLowerCase();
            } else {
                newState = asterics.envControl.STATE_MAIN + '.' + newName.toLowerCase();
            }
            return newState;
        };

        thiz.getSubState = function (stateName) {
            return stateName.substring(stateName.indexOf('.') + 1);
        };

        thiz.addState = function (name, config) {
            asterics.$stateProvider.state(name, config);
        };

        thiz.isSubState = function(stateName) {
            return _.includes(stateName, '.');
        };

        thiz.getLastPart = function(stateName) {
            if(_.includes(stateName, '/')) {
                return stateName.substring(stateName.lastIndexOf('/')+1);
            } else if(_.includes(stateName, '.')) {
                return stateName.substring(stateName.lastIndexOf('.')+1);
            } else {
                return stateName;
            }
        };

        thiz.getLastPartUpper = function(stateName) {
            var lastPart = thiz.getLastPart(stateName);
            return lastPart[0].toUpperCase() + lastPart.substring(1);
        };
    });