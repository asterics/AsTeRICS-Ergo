var MODE_COMPATIBILITY = !Object.keys || !Object.keys({test: '1'});
if(!MODE_COMPATIBILITY) {
    var scriptJquery = document.createElement('script');
    scriptJquery.src = "../javascript/lib/jquery.min.js";
    var scriptBootstrap = document.createElement('script');
    scriptBootstrap.src = "../resources/bootstrap-3.3.7/js/bootstrap.min.js";
}
