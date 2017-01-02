

(function buildChart(){
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
	    type: 'line',
	    animation: false,
	    data: {
			labels: [ 1998,1999,2000,2001,2002,2003 ],
	        datasets: [{
	        	data: [ 28, 24, 18, 14, 13, 19 ],
	        	borderColor: "rgb(126, 71, 166)",
	        	pointBackgroundColor: "rgb(126, 71, 166)",
	        	pointBorderWidth: "rgb(126, 71, 166)",
	        	label: "Purple",
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
})()
