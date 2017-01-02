// NumberWang!
// ===========

var MaxNumberWang = 25;

function RandomNumberWang(){
  return Math.floor(Math.random() * MaxNumberWang) + 1;
}

// Components
// -----------

import Vue from 'vue'
import io from 'socket.io-client'
import LineChart from './LineChart'
import Stock from './Stock'
import NetWorth from './NetWorth'
import Messenger from './Form'

// Socket.io
// ---------

var socket = io.connect();

Vue.component('numberwang', {
  template: '<div> \
             <h1> {{ number }} </h1> \
             <h3>Target: <b>{{target}}</b></h3> \
             <p>{{ winner.name }} is winning with {{winner.points}} points! You have <b>{{ points }}</b> points.</p> \
             <button class="increase" v-on:click="increase">Increase</button> \
             <button class="decrease" v-on:click="decrease">Decrease</button> \
             <ul class="events" ><li v-for="event in events">{{ event }}</li></ul> \
             </div>',
  data: function(){
    return {
      number: 0,
      id: socket.id,
      name: "",
      clicked: 0,
      connections: 0,
      target: RandomNumberWang(),
      events: [],
      points: 0,
      winner: {
        name: "a",
        points: 0
      }
    }
  },
  created: function() {

    if (!window.localStorage.numberwang){
      this.name = prompt("What's your name?");

      window.localStorage.numberwang = JSON.stringify({
        "name": this.name,
        "points": 0
      });

    } else {
      var numberwangData = JSON.parse(window.localStorage.numberwang);
      this.name = numberwangData.name
      this.points = numberwangData.points
    }

    socket.emit('name', this.name)

    socket.on('connections', function(res){
      this.connections = res.connections;
      this.clicked = res.clicked;
      this.number = res.number;
      this.winner = res.winner || { name: "John Smith", points: 0 };
      this.events = this.events.concat(res.events);
      this.events.unshift("Welcome back "+this.name+", let's play NumberWang!");
    }.bind(this));

    socket.on('event', function(event){
      this.events.unshift(event);
    }.bind(this));

    socket.on('change', function(change){
      // this.events.unshift(change.event); // hiding other user clicks
      this.number = change.number;
      this.clicked = change.clicked;
      this.winner = change.winner;

      if (this.number == this.target) {
        this.points++;
        var storage = JSON.parse(window.localStorage.numberwang);
        storage.points++;
        window.localStorage.numberwang = JSON.stringify(storage);
        this.target = RandomNumberWang();
        this.events.unshift("That's NumberWang! Your new target is "+this.target+".");
        socket.emit('pointWon', 1);
      }
    }.bind(this));

  },
  methods: {
    increase: function(){
      this.number++;
      socket.emit('numberChange', 1);
    },
    decrease: function(){
      this.number--;
      socket.emit('numberChange', -1);
    }
  }
})

// Views
// -----

var game = new Vue({
  el: '#app',
  data: {},
  components: {},
  methods: {}
}).$mount('#app');

// That's WangerNumb!
