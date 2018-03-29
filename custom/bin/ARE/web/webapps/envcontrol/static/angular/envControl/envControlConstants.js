var asterics = asterics || {};
asterics.const = asterics.const || {};
asterics.envControl = asterics.envControl || {};

//not used anymore, just for comatibility resons:
asterics.envControl.CB_TYPE_FS20 = 'HW_FS20_PCSENDER';
asterics.envControl.CB_TYPE_IR = 'HW_IRTRANS_USB';

asterics.envControl.HW_FS20_PCSENDER = 'HW_FS20_PCSENDER';
asterics.envControl.HW_FS20_PLUG = 'HW_FS20_PLUG';
asterics.envControl.HW_FS20_SET = 'HW_FS20_SET';
asterics.envControl.HW_IR_PLUG = 'HW_IR_PLUG';
asterics.envControl.HW_IRTRANS_USB = 'HW_IRTRANS_USB';
asterics.envControl.HW_USB_CABLE_AB = 'HW_USB_CABLE_AB';
asterics.envControl.HW_IR_BULB = 'HW_IR_BULB';
asterics.envControl.HW_IR_FLIPMOUSE = 'HW_IR_FLIPMOUSE';
asterics.envControl.HW_GROUP_IR = 'HW_GROUP_IR';
asterics.envControl.HW_GROUP_PLUG = 'HW_GROUP_PLUG';

asterics.envControl.IRLEARN_TIMEOUT = 'IRLEARN_TIMEOUT';

asterics.envControl.DEVICE_TABLELAMP = 'lamp';
asterics.envControl.DEVICE_AMB_LAMP = 'amblight';
asterics.envControl.DEVICE_TV = 'tv';
asterics.envControl.DEVICE_DVD = 'dvd';
asterics.envControl.DEVICE_HIFI = 'hifi';
asterics.envControl.DEVICE_IR_GENERIC = 'irgeneric';
asterics.envControl.DEVICE_IR_CMD_GENERIC = 'ircmdgeneric';
asterics.envControl.DEVICE_PLUG_GENERIC = 'pluggeneric';
asterics.envControl.DEVICE_IR_NUMBERS = 'numbers';
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
asterics.envControl.STATE_HELP_HARDWARE = 'home.envControl.help/hardware';
asterics.envControl.STATE_HELP_INSTALL = 'home.envControl.help/install';
asterics.envControl.STATE_HELP_FAQ = 'home.envControl.help/faq';
asterics.envControl.STATE_ADD = 'home.envControl.add';
asterics.envControl.STATE_ADDMORE = 'home.envControl.add/more';
asterics.envControl.STATE_ADDSUB = 'home.envControl.addsub';
asterics.envControl.STATE_NO_HARDWARE_FOUND = 'home.envControl.add.nohardware';
asterics.envControl.STATE_CONNECTION_CHECK = 'home.envControl.add.connectioncheck';
asterics.envControl.STATE_ADD_LAMP = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_TABLELAMP;
asterics.envControl.STATE_ADD_TV = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_TV;
asterics.envControl.STATE_ADD_DVD = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_DVD;
asterics.envControl.STATE_ADD_HIFI = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_HIFI;
asterics.envControl.STATE_ADD_AMBLIGHT = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_AMB_LAMP;
asterics.envControl.STATE_ADD_PLUG_GENERIC = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_PLUG_GENERIC;
asterics.envControl.STATE_ADD_IR_GENERIC = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_IR_GENERIC;
asterics.envControl.STATE_ADD_IR_CMD_GENERIC = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_IR_CMD_GENERIC;
asterics.envControl.STATE_ADD_NUMBERS = asterics.envControl.STATE_ADD + '.' + asterics.envControl.DEVICE_IR_NUMBERS;

asterics.const.NAVIGATION_IGNORE_STATES = asterics.const.NAVIGATION_IGNORE_STATES || [];
asterics.const.NAVIGATION_IGNORE_STATES.push(asterics.envControl.STATE_CONNECTION_CHECK);

asterics.const.HOME_STATES = asterics.const.HOME_STATES || [];
asterics.const.HOME_STATES.push(asterics.envControl.STATE_MAIN);

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
    {link: "https://www.amazon.de/gp/product/B017XWJFYO/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=astericsfound-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B017XWJFYO&linkId=91c6e363bea5a43fdba428a94d9a729c", label: "i18n_ec_link_irbulb_amazon"},
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
asterics.envControl.LINKS[asterics.envControl.HW_IR_PLUG] = [
    {link: "https://www.amazon.de/gp/product/B003KUDRCA/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=astericsfound-21&creative=6742&linkCode=as2&creativeASIN=B003KUDRCA&linkId=557a51fe51c5b381f022346dd6af18f5", label: "i18n_ec_link_irplug_amazon"},
    {link: "https://www.pearl.at/at-a-PX2151-1430.shtml", label: "i18n_ec_link_irplug_perl"}
];