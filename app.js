/*This is my current app.js file. It creates a client and a server network socket
 and the server requests coils as soon as the client connects.*/
var modbus = require("modbus-stream");
 
modbus.tcp.server({ debug: "server" }, function(connection) {
    connection.readDiscreteInputs({ address: 5, quantity: 8 }, function(err, info){
        console.log("response", info.response.data);
    });
}).listen(3000, function(){
    modbus.tcp.connect(3000, { debug: "client" }, function(err, connection){
        connection.on("read-discrete-inputs", function(request, reply){
            reply(null, [ 1, 0, 1, 0, 1, 1, 0, 1 ]);
        });
    });
});
