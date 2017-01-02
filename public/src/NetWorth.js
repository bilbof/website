
export default ({
  props: ['netWorth'],
  template: '<span> Net worth: ${{netWorth}}</span>',
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
