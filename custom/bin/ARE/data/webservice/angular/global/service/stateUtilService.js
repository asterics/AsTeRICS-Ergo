angular.module(asterics.appServices)
    .service('stateUtilService', ['$state', function ($state) {
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

        thiz.isSubState = function (stateName) {
            return _.includes(stateName, '.');
        };

        thiz.cutLastPart = function (stateName) {
            var lastPart = thiz.getLastPart(stateName);
            if (stateName === lastPart) {
                return stateName;
            } else {
                return stateName.substring(0, stateName.indexOf(lastPart) - 1);
            }
        };

        thiz.getLastPart = function (stateName) {
            if (_.includes(stateName, '/')) {
                return stateName.substring(stateName.lastIndexOf('/') + 1);
            } else if (_.includes(stateName, '.')) {
                return stateName.substring(stateName.lastIndexOf('.') + 1);
            } else {
                return stateName;
            }
        };

        thiz.getLastPartUpper = function (stateName) {
            var lastPart = thiz.getLastPart(stateName);
            return lastPart[0].toUpperCase() + lastPart.substring(1);
        };

        thiz.getBreadCrumbStates = function () {
            var states = [$state.current.name];
            var nextState = $state.current.name;
            while(nextState && nextState !== asterics.const.STATE_HOME) {
                nextState = thiz.cutLastPart(nextState);
                states.unshift(nextState);
            }
            return states;
        }
    }]);