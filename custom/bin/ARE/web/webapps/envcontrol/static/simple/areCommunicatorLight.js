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

function getWebappData(webappId, filepath, successCallback, errorCallback) {
    if (!webappId || !filepath) return;

    var url = _baseURI + "storage/webapps/" + encodeParam(webappId) + "/" + encodeParam(filepath);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                successCallback(xmlHttp.responseText);
            } else {
                errorCallback();
            }
        }
    };
    xmlHttp.open("GET", url);
    xmlHttp.send();
}

function sendDataToInputPort(componentId, portId, value) {
    if (!componentId || !portId || !value) return;
    if(MODE_MOCK) {
        console.log('not sending data because of mock mode...');
        return;
    }

    //use GET sendDataToInputPort() for legacy reasons (phones that do only support GET requests)
    var url = _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/ports/" + encodeParam(portId) + "/data/" + encodeParam(value);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url); // false for synchronous request
    xmlHttp.send(value);
}