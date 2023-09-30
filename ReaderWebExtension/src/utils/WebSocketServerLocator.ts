// function findServers(port, ipBase, ipLow, ipHigh, maxInFlight, timeout, cb) {
//     var ipCurrent = +ipLow, numInFlight = 0, servers = [];
//     ipHigh = +ipHigh;

//     function tryOne(ip) {
//         ++numInFlight;
//         var address = "ws://" + ipBase + ip + ":" + port;
//         var socket = new WebSocket(address);
//         var timer = setTimeout(function() {
//             console.log(address + " timeout");
//             var s = socket;
//             socket = null;
//             s.close();
//             --numInFlight;
//             next();
//         }, timeout);
//         socket.onopen = function() {
//             if (socket) {
//                 console.log(address + " success");
//                 clearTimeout(timer);
//                 servers.push(socket.url);
//                 --numInFlight;
//                 next();
//             }
//         };
//         socket.onerror = function(err) {
//             if (socket) {
//                 console.log(address + " error");
//                 clearTimeout(timer);
//                 --numInFlight;
//                 next();
//             }
//         }
//     }

//     function next() {
//         while (ipCurrent <= ipHigh && numInFlight < maxInFlight) {
//             tryOne(ipCurrent++);
//         }
//         // if we get here and there are no requests in flight, then
//         // we must be done
//         if (numInFlight === 0) {
//             console.log(servers);
//             cb(servers);
//         }
//     }

//     next();
// }

// findServers(1234, "192.168.1.", 1, 255, 20, 4000, function(servers) {
//     console.log(servers);
// });