(function() {
    var WebSocket = window.WebSocket || window.MozWebSocket;
    if (!WebSocket) return;

    var connect = function(){
        var connection = new WebSocket('ws://localhost:' + location.port);
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
