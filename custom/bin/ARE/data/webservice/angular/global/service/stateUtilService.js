angular.module(asterics.appServices)
    .service('stateUtilService', ['$state', function ($state) {
        var thiz = this;

        thiz.getNewSubStateName = function (parentState, newName) {
            var newState;
            if (thiz.getSubStateDepth(parentState) > 1) {
                newState = parentState + '/' + newName.toLowerCase();
            } else {
                newState = asterics.envControl.STATE_MAIN + '.' + newName.toLowerCase();
            }
            return newState;
        };

        thiz.getSubState = function (stateName) {
            return stateName.substring(stateName.indexOf('.') + 1);
        };

        //adds a new state if it is not existing
        thiz.addState = function (name, config) {
            if (!$state.get(name)) {
                asterics.$stateProvider.state(name, config);
            }
        };

        thiz.getSubStateDepth = function (stateName) {
            return stateName.split('.').length - 1;
        };

        thiz.getSubStateDepthWithSlashes = function (stateName) {
            return thiz.getSubStateDepth(stateName) + stateName.split('/').length - 1;
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
            while (nextState && nextState !== asterics.const.STATE_HOME) {
                nextState = thiz.cutLastPart(nextState);
                states.unshift(nextState);
            }
            return states;
        }
    }]);