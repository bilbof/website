
export default ({
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
      return this.$parent.updateLineChart(this.stock.historic_prices)
    }
  }
})
