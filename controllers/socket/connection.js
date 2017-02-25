var _ = require('underscore');

// webpack --progress --colors --watch --display-error-details

module.exports = function(server){
  var io = require('socket.io')(server);

  var connections = 0;
  var clicked = 0;
  var number = 0;
  var events = [];
  var leaderboard = {};
  var winner = { name: null, points: 0 }

  function calculateLeader(){

    var leaderboardArray = Object.keys(leaderboard).map(function (key) {
      return {
        name: key,
        points: leaderboard[key]
      }
    });

    if (!leaderboardArray.length){
      return { name: "Nobody", "points": "any"}
    }

    _.sortBy(leaderboardArray, 'points');

    return leaderboardArray[0];
  }

  function broadcast(type, message){
    events.unshift(message);

    console.log("calculateLeader")
    console.log(calculateLeader())

    io.emit(type, {
      connections: connections,
      clicked: clicked,
      number: number,
      events: type === 'connections' ? events : [],
      event: message,
      winner: calculateLeader()
    });
  }

  io.on('connection', function(socket) {

    socket.on('name', function(name){
      connections++;
      socket.name = name;
      leaderboard[name] = 0;
      broadcast('connections', name+' connected');
      socket.broadcast.emit('event', name+' connected')
    });

    socket.on('pointWon', function(point){
      leaderboard[socket.name]++;

      var leader = calculateLeader();

      if (leader.name !== winner.name){
        broadcast('winnerUpdate', leader)
      } else {
        var message = "That's WangerNumb! "+socket.name+' is on ' +leaderboard[socket.name]+" points!"
        events.unshift(message);
        socket.broadcast.emit('event', message)
      }

    })

    socket.on('numberChange', function(numberChange){
      clicked++;
      number+=numberChange;
      broadcast('change', socket.name+': '+numberChange)
    })

    socket.on('disconnect', function(){
      connections--;
      broadcast('connections', socket.name +' disconnected');
    });

  });
}

