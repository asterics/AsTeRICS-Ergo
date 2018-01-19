angular.module(asterics.appComponents)
    .component('noHardwareFound', {
        bindings: {},
        controller: ['$stateParams', 'utilService', 'envControlHelpDataService', '$translate', '$state', function ($stateParams, utilService, envControlHelpDataService, $translate, $state) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_ADD)];
            thiz.headerI18n = $stateParams.headerI18n;
            thiz.device = $stateParams.device;
            thiz.hardwarePossibilities = envControlHelpDataService.getHardwarePossibilities(thiz.device);
            thiz.selectedHardware = getSelectedHardware();
            var test = null;

            thiz.getLabel = function (hardwarePossibility) {
                var str = '';
                for (var i = 0; i < hardwarePossibility.length; i++) {
                    var translated = $translate.instant('i18n_ec_' + hardwarePossibility[i]);
                    str += translated;
                    if (i != hardwarePossibility.length - 1) {
                        str += ' + ';
                    }
                }
                return str;
            };

            thiz.goToHelp = function (hardware) {
                $state.params.selectedHardware = thiz.selectedHardware;
                $state.go('home.envControl.help/controls/' + hardware);
            };

            function getSelectedHardware() {
                if ($stateParams.selectedHardware) {
                    for (var i = 0; i < thiz.hardwarePossibilities.length; i++) {
                        if (_.isEqual($stateParams.selectedHardware, thiz.hardwarePossibilities[i])) {
                            return thiz.hardwarePossibilities[i];
                        }
                    }
                }
                return thiz.hardwarePossibilities[0];
            }
        }],
        templateUrl: "angular/envControl/component/add/noHardwareFound.html"
    });