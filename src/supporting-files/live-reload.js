(function() {
    var WebSocket = window.WebSocket || window.MozWebSocket;
    if (!WebSocket) return;

    var connect = function(){
        var isSecure = window.location.protocol.indexOf('https') >= 0;
        var protocol = isSecure ? 'wss' : 'ws';
        var connection = new WebSocket(protocol + '://' + location.host);
        connection.onmessage = function() {
            window.location.reload();
        };
        connection.onerror = function() {
            if (connection.readyState) {
                connection.close();
            }
        };
        connection.onclose = function() {
            window.setTimeout(connect, 1000);
        };
    };

    connect();
})();
