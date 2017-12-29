//The base URI that ARE runs at
var _baseURI = "http://" + window.location.host + "/rest/";

//encodes PathParametes
function encodeParam(text) {
    var encoded = "";
    for (var i = 0; i < text.length; i++) {
        encoded += text.charCodeAt(i).toString() + '-';
    }

    return encoded;
}

function getWebappData(webappId, filepath) {
    if (!webappId || !filepath) return;

    var url = _baseURI + "storage/webapps/" + encodeParam(webappId) + "/" + encodeParam(filepath);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}

function sendDataToInputPort(componentId, portId, value) {
    if (!componentId || !portId || !value) return;

    //use GET sendDataToInputPort() for legacy reasons (phones that do only support GET requests)
    var url = _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/ports/" + encodeParam(portId) + "/data/" + encodeParam(value);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(value);
    return xmlHttp.responseText;
}