asterics.envControl = asterics.envControl || {};

asterics.envControl.FS20_TOGGLE_CODE = 18;
asterics.envControl.FS20_LEARN_CODE = 23;

asterics.envControl.CB_TYPE_FS20 = 'CB_TYPE_FS20';
asterics.envControl.CB_TYPE_IR = 'CB_TYPE_IR';

asterics.envControl.HW_FS20_PCSENDER = 'HW_FS20_PCSENDER';
asterics.envControl.HW_FS20_PLUG = 'HW_FS20_PLUG';
asterics.envControl.HW_IRTRANS_USB = 'HW_IRTRANS_USB';
asterics.envControl.HW_IR_BULB = 'HW_IR_BULB';

asterics.envControl.IRTRANS_SOCKET_ERROR = 'ERROR_SOCKET_NOT_OPEN';
asterics.envControl.IRTRANS_TIMEOUT_ERROR = 'TIMEOUT ERROR';

asterics.envControl.DEVICE_TABLELAMP = 'lamp';
asterics.envControl.DEVICE_AMB_LAMP = 'amblight';
asterics.envControl.DEVICE_TV = 'tv';
asterics.envControl.DEVICE_DVD = 'dvd';
asterics.envControl.DEVICE_HIFI = 'hifi';
asterics.envControl.DEVICES = [
    asterics.envControl.DEVICE_TABLELAMP,
    asterics.envControl.DEVICE_AMB_LAMP,
    asterics.envControl.DEVICE_TV,
    asterics.envControl.DEVICE_DVD,
    asterics.envControl.DEVICE_HIFI
];

asterics.envControl.STATE_MAIN = 'home.envControl';
asterics.envControl.STATE_HELP = 'home.envControl.help';
asterics.envControl.STATE_HELP_DEVICES = 'home.envControl.help/devices';
asterics.envControl.STATE_HELP_CONTROLS = 'home.envControl.help/controls';
asterics.envControl.STATE_HELP_INSTALL = 'home.envControl.help/install';
asterics.envControl.STATE_HELP_FAQ = 'home.envControl.help/faq';
asterics.envControl.STATE_HELP_INSTALL_IR = 'home.envControl.help/install/HW_IRTRANS_USB';
asterics.envControl.STATE_HELP_INSTALL_FS20 = 'home.envControl.help/install/HW_FS20_PCSENDER';
asterics.envControl.STATE_HELP_FS20 = 'home.envControl.help/controls/HW_FS20_PCSENDER';
asterics.envControl.STATE_HELP_FS20_PLUG = 'home.envControl.help/controls/HW_FS20_PLUG';
asterics.envControl.STATE_HELP_IRTRANS = 'home.envControl.help/controls/HW_IRTRANS_USB';
asterics.envControl.STATE_HELP_IRBULB = 'home.envControl.help/controls/HW_IR_BULB';
asterics.envControl.STATE_ADD = 'home.envControl.add';
asterics.envControl.STATE_ADDMORE = 'home.envControl.add/more';
asterics.envControl.STATE_ADDSUB = 'home.envControl.addsub';
asterics.envControl.STATE_ADD_FS20 = 'home.envControl.add.fs20';
asterics.envControl.STATE_ADD_IR = 'home.envControl.add.ir';
asterics.envControl.STATE_ADD_IR_DEVICE = 'home.envControl.add.irdevice';
asterics.envControl.STATE_ADD_LAMP = 'home.envControl.add.lamp';
asterics.envControl.SUBSTATE_ADD_NUMBERS = 'numbers';