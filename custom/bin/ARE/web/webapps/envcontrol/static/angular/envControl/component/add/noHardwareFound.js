angular.module(asterics.appComponents)
    .component('noHardwareFound', {
        bindings: {},
        controller: ['$stateParams', 'utilService', 'envControlHelpDataService', '$translate', '$state', function ($stateParams, utilService, envControlHelpDataService, $translate, $state) {
            var thiz = this;
            thiz.cellBoardConfig = [utilService.createCellBoardItemNav('i18n_back', 'arrow-left', asterics.envControl.STATE_ADD)];
            thiz.headerI18n = $stateParams.headerI18n;
            thiz.device = $stateParams.device;
            thiz.i18nArgDevice = {
                device: $translate.instant('i18n_ec_' + thiz.device)
            };
            thiz.computerConfiguredHardware = getComputerConfiguredHardware();
            thiz.deviceSelectionMap = {};
            thiz.deviceSelectionMap[thiz.device] = {};
            thiz.deviceSelectionMap[thiz.device].chosen = true;
            thiz.deviceSelectionMap[thiz.device].amount = 1;

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

            thiz.refresh = function () {
                thiz.computerConfiguredHardware = getComputerConfiguredHardware();
            };

            thiz.goToHelp = function (hardware) {
                $state.go('home.envControl.help/controls/' + hardware);
            };

            thiz.goToInstall = function() {
                $state.go('home.envControl.help/install/' + thiz.computerConfiguredHardware, {skipConnectionTest: true});
            };

            function getComputerConfiguredHardware() {
                var computerHardware = envControlHelpDataService.getComputerConfiguredHardware(thiz.device);
                return computerHardware ? computerHardware[0] : null;
            }
        }],
        templateUrl: "angular/envControl/component/add/noHardwareFound.html"
    });