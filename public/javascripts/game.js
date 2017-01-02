// Stocks game
// ===========

// Test data
// ---------

var stocks = [];

function randomNumber(){
  return Math.floor(Math.random() * 20) + 1;
}

function addStock(name){
  var price = randomNumber();
  var previous = randomNumber();
  stocks.push({name, price,
    amount: randomNumber(),
    growth: Math.round(100 * (price - previous) / previous),
    historic_prices: [ randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber(), previous, price ]
  })
}

addStock("Apple")
addStock("Gooogle")
addStock("Facebook")
addStock("Tesla")
addStock("Microsoft")
addStock("Dell")
addStock("IBM")
addStock("American Airlines")
addStock("Swizlers")

// Components
// -----------

Vue.component('stock', {
  props: ['stock'],
  template: '<li> \
              <a v-on:click="viewDetails">{{ stock.name }} is worth ${{stock.price}}.00 and you own {{ stock.amount }} shares. Growth rate: {{stock.growth}}%.</a> \
              <button v-on:click="buy">Buy</button> \
              <button v-on:click="sell">Sell</button> \
              <button v-on:click="viewDetails">Details</button> \
            </li>',
  methods: {
    buy: function(){
      if (this.$parent.money > this.stock.price) {
        this.$parent.money -= this.stock.price;
        this.stock.amount+=1;
      }
    },
    sell: function(){
      if (this.stock.amount > 0 && this.stock.price > 0){
        this.$parent.money += this.stock.price;
        this.stock.amount-=1;
      }
    },
    viewDetails: function(){
      return this.$parent.renderChart(this.stock.historic_prices)
    }
  }
})

Vue.component('chart', {
  template: '<canvas id="historicPrices" width="80%" height="100"></canvas>',
  methods: {
    renderChart: function(stockPrices){
      console.log(stockPrices);
      console.log(this.chart);
      historicPrices.data.datasets[0].data = stockPrices
    }
  }
})

Vue.component('net', {
  props: ['netWorth'],
  template: '<p>${{netWorth}}</p>',
  created: function(){
    this.getNetWorth();
  },
  methods: {
    getNetWorth: function(){

      var stockValue = 0;
      var stocksArray = this.$parent.stocks;

      for (var i = 0; i < stocksArray.length; i++){
        stockValue+=(stocksArray[i].price * stocksArray[i].amount);
      }

      this.$parent.netWorth = this.$parent.money + stockValue - this.$parent.loaned
    }
  }
})

// Views
// -----

var game = new Vue({
  el: '#app',
  data: {
    loaned: 0,
    money: 1000,
    stocks: stocks,
    netWorth: 0,
    historic_prices: stocks[0].historic_prices
  },
  methods: {

    drawLoan: function(){
      if (this.loaned < 1000){
        this.money+=100
        this.loaned+=100
      }
    },

    renderChart: function(stockPrices){
      this.historic_prices = stockPrices;

      historicPrices.data.datasets[0].data = stockPrices;

      historicPrices.update();
    }

  }
})


// Chart
// ------

var ctx = document.getElementById("historicPrices");
var historicPrices = new Chart(ctx, {
  type: 'line',
  animation: false,
  data: {
    labels: [ 1986,1987,1988,1989,1990,1991,1992,1993,1994,1995 ],
    datasets: [{
      data: stocks[0].historic_prices,
      borderColor: "rgb(126, 71, 166)",
      pointBackgroundColor: "rgb(126, 71, 166)",
      // pointBorderWidth: "rgb(126, 71, 166)",
      // label: "Purple",
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});

