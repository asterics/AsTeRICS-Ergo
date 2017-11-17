asterics.envControl = asterics.envControl || {};

asterics.envControl.FS20_TOGGLE_CODE = 18;
asterics.envControl.FS20_LEARN_CODE = 23;

asterics.envControl.CB_TYPE_FS20 = 'CB_TYPE_FS20';
asterics.envControl.CB_TYPE_IR = 'CB_TYPE_IR';

asterics.envControl.HW_FS20_PCSENDER = 'HW_FS20_PCSENDER';
asterics.envControl.HW_FS20_PLUG = 'HW_FS20_PLUG';
asterics.envControl.HW_FS20_SET = 'HW_FS20_SET';
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
    {link: "https://www.amazon.de/gp/product/B01M7WU6SQ/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B01M7WU6SQ&linkId=3bab3adf33dc348973e594210c7332f7", label: "i18n_ec_link_irtrans_amazon"},
    {link: "http://www.irtrans.de/de/shop/usb.php", label: "i18n_ec_link_irtrans_producer"}
];
asterics.envControl.LINKS[asterics.envControl.HW_USB_CABLE_AB] = [
    {link: "https://www.amazon.de/gp/product/B00NH11KIK/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B00NH11KIK&linkId=609503fb5ac80ff1b8a8c05d7a6d27c4", label: "i18n_ec_link_usbcable_amazon"}
];
asterics.envControl.LINKS[asterics.envControl.HW_IR_BULB] = [
    {link: "https://www.amazon.de/gp/product/B01G1PJWYM/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B01G1PJWYM&linkId=8d9afcea1b8dc8a0d8e907f5ea6b0a89", label: "i18n_ec_link_irbulb_amazon"},
    {link: "https://www.amazon.de/gp/product/B01FULHM72/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B01FULHM72&linkId=dd3df2b813b601e04b9ad4c2eeedb83c", label: "i18n_ec_link_irbulb_amazon2"},
    {link: "https://www.conrad.at/de/led-e27-gluehlampenform-10-w-60-w-rgbw-o-x-l-65-mm-x-130-mm-eek-a-lightme-colorchanging-dimmbar-inkl-fernbedienung-1-st-1498582.html", label: "i18n_ec_link_irbulb_conrad"}
];
asterics.envControl.LINKS[asterics.envControl.HW_FS20_PLUG] = [
    {link: "https://www.amazon.de/gp/product/B00KAZISBI/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B00KAZISBI&linkId=7471894c54039696a94720066b076583", label: "i18n_ec_link_fs20plug_amazon"},
    {link: "https://www.elv.at/elv-funk-schaltsteckdose-fs20-st.html", label: "i18n_ec_link_fs20plug_elv"}
];
asterics.envControl.LINKS[asterics.envControl.HW_FS20_PCSENDER] = [
    {link: "https://www.amazon.de/gp/product/B004S7FVIC/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B004S7FVIC&linkId=77ada25381381f167cc0e2c3a36b60a9", label: "i18n_ec_link_fs20sender_amazon"},
    {link: "https://www.elv.at/fs20-pc-sender-fs20-pcs.html", label: "i18n_ec_link_fs20sender_elv"}
];
asterics.envControl.LINKS[asterics.envControl.HW_FS20_SET] = [
    {link: "https://www.amazon.de/gp/product/B0062WN2E6/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B0062WN2E6&linkId=62376edd1d82977c5c2d7e8db0b59387", label: "i18n_ec_link_fs20set_amazon"}
];