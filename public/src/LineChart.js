// Stocks game - Line Chart
// ========================

import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
  mixins: [reactiveProp],
  props: ["money", "options"],
  mounted () {
    this.renderChart({
      labels: [60,90,80,50,20,40,24,23,30,50],
      datasets: [
        {
          data: this.chartData,
          backgroundColor: '#f87979'
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,
      legend: false
    })
  },
  events: {
    updatedChartData: function(){
      console.log(" updatedChartData event")
      this.render();
    }
  },
  methods: {
    render: function(){
      console.log(this);
      console.log("render");


      // this.chartData.datasets[0].data = [2,23]
      // this._chart.update()
    }

  }
})
