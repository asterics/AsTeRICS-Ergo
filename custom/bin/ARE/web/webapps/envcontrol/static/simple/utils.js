function parseJson(text) {
    return eval('(' + text + ')');
}

function createButton(caption, faIcon, onClickFunctionCall) {
    var btn = document.createElement("BUTTON");
    var caption = document.createTextNode(caption);
    if (!MODE_COMPATIBILITY) {
        btn.appendChild(createFaIcon(faIcon));
    }
    btn.appendChild(caption);
    var att = document.createAttribute("onclick");
    att.value = 'javascript:' + onClickFunctionCall + ';';
    btn.setAttributeNode(att);
    addAttribute(btn, 'onmousedown', 'javascript:console.log("onmousedown");');
    addAttribute(btn, 'onmouseup', 'javascript:console.log("onmouseup");');
    addAttribute(btn, 'touchstart', 'javascript:console.log("touchstart");');
    addAttribute(btn, 'touchend', 'javascript:console.log("touchend");');
    btn = appendClass(btn, 'action-button');
    if (!MODE_COMPATIBILITY) {
        btn = wrapInDiv(btn);
    } else {
        btn.style.cssText += "margin-bottom: 5px;";
    }
    btn = appendClass(btn, 'col-xs-12 col-sm-3 col-lg-2 cb-element');
    return btn;
}

function addAttribute(element, attributename, attributevalue) {
    var att = document.createAttribute(attributename);
    att.value = attributevalue;
    element.setAttributeNode(att);
}

function createFaIcon(faCode) {
    var div = document.createElement("DIV");
    var i = document.createElement("I");
    i = appendClass(i, 'fa fa-3x fa-' + faCode);
    return wrapInDiv(i);
}

function wrapInDiv(element) {
    var div = document.createElement("DIV");
    div.appendChild(element);
    return div;
}

function appendClass(element, classValue) {
    var attClass = document.createAttribute("class");
    attClass.value = classValue;
    element.setAttributeNode(attClass);
    return element;
}

function createTitle(caption, classValue) {
    var title = document.createElement("H2");
    var caption = document.createTextNode(caption);
    title.appendChild(caption);
    title = appendClass(title, classValue);
    if (MODE_COMPATIBILITY) {
        title.style.fontSize = "1em";
    }
    return title;
}

function createText(text) {
    var span = document.createElement("SPAN");
    var caption = document.createTextNode(text);
    span.appendChild(caption);
    return span;
}

function removeElement(elemID) {
    var elem = document.getElementById(elemID);
    if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
}

function getKeys(obj) {
    var r = [];
    for (var k in obj) {
        if (!obj.hasOwnProperty(k))
            continue;
        r.push(k);
    }
    return r;
}