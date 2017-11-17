angular.module(asterics.appServices)
    .service('stateUtilService', ['$state', '$rootScope', function ($state, $rootScope) {
        var thiz = this;
        var _stateHistory = [];
        var _stateChangeFunctions = [];
        var _stateHasChanged = true;

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
        };

        thiz.getLastState = function () {
            var lastState = _stateHistory[_stateHistory.length - 1];
            if (!lastState) {
                var states = thiz.getBreadCrumbStates();
                return {
                    name: states[states.length - 2]
                };
            }
            return lastState;
        };

        thiz.existsState = function (stateName) {
            return !!$state.href(stateName);
        };

        /**
         * adds a function that is called after the next state-change
         * can be used e.g. for aborting an action after leaving a page
         * @param fn the function to be called at state-change
         */
        thiz.addOneTimeStateChangeFunction = function (fn) {
            _stateChangeFunctions.push(fn);
        };

        /**
         * returns if the state has changed since the last call of this method
         * @returns {boolean}
         */
        thiz.hasStateChangedSinceLastCall = function () {
            var toReturn = _stateHasChanged;
            _stateHasChanged = false;
            return toReturn;
        };

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            _stateHasChanged = true;
            callAllStateChangeFunctions();
            var lastElement = thiz.getLastState();
            if (lastElement && lastElement.name === to.name) {
                _stateHistory.pop(); // moved back to last state -> remove it from history
            } else if (from.name) { //moved to new state -> add it to history
                _stateHistory.push({
                    name: from.name,
                    params: fromParams
                });
            }

            //if we got to a state, where we already were (circle) or if the state history does not contain a home state
            //-> clear history and add only home states
            if (_.some(_stateHistory, {'name': to.name}) ||
                _.intersection(asterics.const.HOME_STATES, _.map(_stateHistory, 'name')).length == 0) {
                _stateHistory = [];
                angular.forEach(asterics.const.HOME_STATES, function (stateName) {
                    if (stateName != to.name) {
                        _stateHistory.push({name: stateName});
                    }
                });
            }
        });

        function callAllStateChangeFunctions() {
            angular.forEach(_stateChangeFunctions, function (stateChangeFunction) {
                if (_.isFunction(stateChangeFunction)) {
                    stateChangeFunction();
                }
            });
            _stateChangeFunctions = [];
        }
    }]);