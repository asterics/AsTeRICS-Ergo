asterics.const = asterics.const || {};
asterics.const.CELLB_MODE_NORMAL = 'CB_MODE_NORMAL';
asterics.const.CELLB_MODE_DELETE = 'CB_MODE_DELETE';
asterics.const.CELLB_MODE_MOVE = 'CB_MODE_MOVE';

asterics.const.CB_TYPE_NAV = 'CB_TYPE_NAV';
asterics.const.CB_TYPE_SUBCB = 'CB_TYPE_SUBCB';
asterics.const.CB_TYPE_FN = 'CB_TYPE_FN';

asterics.const.ServerEventTypes = {
    MODEL_CHANGED: "model_changed",
    MODEL_STATE_CHANGED: "model_state_changed",
    EVENT_CHANNEL_TRANSMISSION: "event_channel_transmission",
    DATA_CHANNEL_TRANSMISSION: "data_channel_transmission",
    PROPERTY_CHANGED: "property_changed"
};

asterics.const.STATE_HOME = 'home';

asterics.const.I18N_DE = 'de';
asterics.const.I18N_EN = 'en';
asterics.const.languages = [
    asterics.const.I18N_DE,
    asterics.const.I18N_EN
];

asterics.const.MSG_INFO = 'info';
asterics.const.MSG_SUCCESS = 'success';
asterics.const.MSG_WARN = 'warn';
asterics.const.MSG_ERROR = 'error';

asterics.const.OS_IS_WIN10 = (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1);
asterics.const.OS_IS_WIN7 = (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1);
asterics.const.OS_IS_OTHER = !(asterics.const.OS_IS_WIN7 || asterics.const.OS_IS_WIN10);
