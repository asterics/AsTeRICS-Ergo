asterics.eC = asterics.eC || {};
asterics.eC.prototypes = asterics.eC.prototypes || {};

asterics.eC.prototypes.Faq = function(properties) {
    var thiz = this;
    if(!properties) {
        return;
    }

    thiz.id = properties.id;
    thiz.keywords = properties.keywords;
    thiz.language = properties.language;
    thiz.title = properties.title;

    thiz.getHtmlName = function() {
        return 'faq' + thiz.id + thiz.language + '.html';
    }
};