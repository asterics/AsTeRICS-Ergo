angular.module(asterics.appServices)
    .service('envControlTextService', ['utilService', function (utilService) {
        var thiz = this;
        var _additionalInstructions = {};
        _additionalInstructions[asterics.envControl.STATE_ADD_AMBLIGHT] = [
            'i18n_additional_instr_amblight'
        ];

        thiz.getAdditionalInstructions = function (state) {
            var list = _additionalInstructions[state];
            return list || [];
        };
    }]);