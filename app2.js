//modbus device over TCP
var modbus = require("modbus-stream");

modbus.tcp.server({ debug: "server" }, function(connection){
    
    connection.readCoils({ address: 5, quantity: 8 }, function(err, info){
        console.log("response", info.response.data);
    });
}).listen(502, function(){
    // ready
    console.log("Ready");
});

modbus.tcp.connect(502, "10.5.49.246", { debug: "client" }, function(err, connection){
    
    connection.on("read-coils", function(request, reply){
        reply(null, [ 1, 0, 1, 0, 1, 1, 0, 1 ]);
        });
    });