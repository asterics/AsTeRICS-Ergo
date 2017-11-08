asterics.envControl = asterics.envControl || {};

asterics.envControl.FS20_TOGGLE_CODE = 18;
asterics.envControl.FS20_LEARN_CODE = 23;

asterics.envControl.CB_TYPE_FS20 = 'CB_TYPE_FS20';
asterics.envControl.CB_TYPE_IR = 'CB_TYPE_IR';

asterics.envControl.HW_FS20_PCSENDER = 'HW_FS20_PCSENDER';
asterics.envControl.HW_FS20_PLUG = 'HW_FS20_PLUG';
asterics.envControl.HW_IRTRANS_USB = 'HW_IRTRANS_USB';
asterics.envControl.HW_USB_CABLE_AB = 'HW_USB_CABLE_AB';
asterics.envControl.HW_IR_BULB = 'HW_IR_BULB';

asterics.envControl.IRTRANS_SOCKET_ERROR = 'ERROR_SOCKET_NOT_OPEN';
asterics.envControl.IRTRANS_TIMEOUT_ERROR = 'TIMEOUT ERROR';

asterics.envControl.DEVICE_TABLELAMP = 'lamp';
asterics.envControl.DEVICE_AMB_LAMP = 'amblight';
asterics.envControl.DEVICE_TV = 'tv';
asterics.envControl.DEVICE_DVD = 'dvd';
asterics.envControl.DEVICE_HIFI = 'hifi';
asterics.envControl.DEVICE_IR_GENERIC = 'irgeneric';
asterics.envControl.DEVICE_PLUG_GENERIC = 'pluggeneric';
asterics.envControl.DEVICES = [
    asterics.envControl.DEVICE_TABLELAMP,
    asterics.envControl.DEVICE_AMB_LAMP,
    asterics.envControl.DEVICE_TV,
    asterics.envControl.DEVICE_DVD,
    asterics.envControl.DEVICE_HIFI,
    asterics.envControl.DEVICE_IR_GENERIC,
    asterics.envControl.DEVICE_PLUG_GENERIC
];
asterics.envControl.DEVICES_WITH_NUMBERS = [
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
asterics.envControl.STATE_ADD_TV = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_TV;
asterics.envControl.STATE_ADD_DVD = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_DVD;
asterics.envControl.STATE_ADD_HIFI = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_HIFI;

asterics.envControl.STATE_ADD_AMBLIGHT = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_AMB_LAMP;

asterics.const.HOME_STATES.push(asterics.envControl.STATE_MAIN);

asterics.envControl.SAVE_FOLDER = 'envControl';
asterics.envControl.SAVE_PATH = "webservice/";

asterics.envControl.LINKS = {};
asterics.envControl.LINKS[asterics.envControl.HW_IRTRANS_USB] = [
    {link: "http://www.my-knx-shop.net/IRT-USB-Mod-IRTrans-USB-Fertiggeraet", label: "i18n_ec_link_irtrans_knxshop"},
    {link: "https://www.amazon.de/IRTrans-Controller-Infrarot-irtrans-USB/dp/B01M7WU6SQ", label: "i18n_ec_link_irtrans_amazon"},
    {link: "http://www.irtrans.de/de/shop/usb.php", label: "i18n_ec_link_irtrans_producer"}
];
asterics.envControl.LINKS[asterics.envControl.HW_USB_CABLE_AB] = [
    {link: "https://www.amazon.de/AmazonBasics-USB-2-0-Druckerkabel-Stecker-B-Stecker/dp/B00NH11KIK", label: "i18n_ec_link_usbcable_amazon"}
];
asterics.envControl.LINKS[asterics.envControl.HW_IR_BULB] = [
    {link: "https://www.amazon.de/dp/B01G1PJWYM/", label: "i18n_ec_link_irbulb_amazon"},
    {link: "https://www.amazon.de/dp/B01FULHM72/", label: "i18n_ec_link_irbulb_amazon2"},
    {link: "https://www.conrad.at/de/led-e27-gluehlampenform-10-w-60-w-rgbw-o-x-l-65-mm-x-130-mm-eek-a-lightme-colorchanging-dimmbar-inkl-fernbedienung-1-st-1498582.html", label: "i18n_ec_link_irbulb_conrad"}
];
asterics.envControl.LINKS[asterics.envControl.HW_FS20_PLUG] = [
    {link: "https://www.amazon.de/Unbekannt-Funk-Schaltsteckdose-FS20-ST-4/dp/B0030T7RWC", label: "i18n_ec_link_fs20plug_amazon"},
    {link: "https://www.elv.at/elv-funk-schaltsteckdose-fs20-st.html", label: "i18n_ec_link_fs20plug_elv"}
];
asterics.envControl.LINKS[asterics.envControl.HW_FS20_PCSENDER] = [
    {link: "https://www.amazon.de/ELV-FS20-PC-Sender-FS20-PCS/dp/B004S7FVIC/", label: "i18n_ec_link_fs20sender_amazon"},
    {link: "https://www.elv.at/fs20-pc-sender-fs20-pcs.html", label: "i18n_ec_link_fs20sender_elv"}
];