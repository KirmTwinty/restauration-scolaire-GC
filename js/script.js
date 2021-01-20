$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar, #content').toggleClass('active');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    $('[data-toggle="tooltip"]').tooltip({
	container: 'body'
    });

    $('.test, .nav-link, .navbar-brand, .new-button').click(function() {
	var sectionTo = $(this).attr('href');
	$('html, body').animate({
	    scrollTop: $(sectionTo).offset().top
	}, 1000);
    });

    
});

var childrenDistribution = QF.map(qf => {
    var idx = Math.floor(qf/100);
    idx = idx > 25 ? 25:idx;
    return distributionEnfants[idx];
});

Chart.defaults.global.defaultFontSize=16;
Chart.plugins.unregister(ChartDataLabels);

var ctx = document.getElementById('restauration-scolaire-stat');
var myChart = new Chart(ctx, {
    type: 'bar',
    plugins: [ChartDataLabels],
    data: {
        labels: ['0/100', '100/200', '200/300', '300/400', '400/500', '500/600', '600/700', '700/800', '800/900', '900/1000', '1000/1100', '1100/1200', '1200/1300', '1300/1400', '1400/1500', '1500/1600', '1600/1700', '1700/1800', '1800/1900', '1900/2000', '2000/2100', '2100/2200', '2200/2300', '2300/2400', '2400/2500', '2500 et +', 'non connu'],
        datasets: [{
            label: '# d\'enfants',
            data: distributionEnfants,
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
                'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(255, 99, 132, 0.6)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
                'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(54, 162, 235, 0.6)',
		'rgba(255, 99, 132, 0.6)'
            ],
            borderWidth: 1
        }]
    },
    options: {
	legend: {
	    labels:{
		defaultFontSize: 16
	    }
	},
        scales: {
	    xAxes: [{
		scaleLabel:{
		    display: true,
		    labelString: 'Valeur du Quotient Familial (QF)'
		}
	    }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
		scaleLabel:{
		    display: true,
		    labelString: 'Nombre d\'enfants concernés'
		}
            }]
        }
    }
});
$("#distribution").html('Distribution des enfants (' + totalEnfants  + ') par QF de la ville');


var ctx = document.getElementById('bilan-financier');
var data = {
    datasets: [{
        data: [3.6, 2.41, 0.91],
	backgroundColor: [color_with_opacity(COLOR_BLUE, 0.4),
			  color_with_opacity(COLOR_RED, 0.4),
			  color_with_opacity(COLOR_TEAL, 0.4)]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Coût du repas',
        'Coût en personnel',
        'Autres frais'
    ]
};
var myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'doughnut',
    data: data,
    // tooltips: {
    // 	callbacks: {
    // 	    label: function(tooltipItem, data) {
    //             var label = data.datasets[tooltipItem.datasetIndex].label || '';

    //             if (label) {
    //                 label += ': ';
    //             }
    //             label += Math.round(tooltipItem.xLabel * 200) / 100;
    //             return label;
    //         }
    //     }
    // },
    options: {
	legend: {
	    position: 'right'
	},
	layout: {
	    padding:{
		top:50,
		left:0,
		right:0,
		bottom:0
	    }
	},
	plugins: {
	    datalabels:{
		formatter: (value, ctx) =>{
		    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
			sum += data;
                    });
                    let percentage = (value*100 / sum).toFixed(2)+"%";
		    return value.toFixed(2) + '€\n' + percentage;
		},
		color: '#fff',
		font: {
		    weight: 'bold',
		    size: 18
		}
	    }
	}
    }
});
var prix_repas = data.datasets[0].data.reduce((a,b) => a+b).toFixed(2);
$("#prix-repas").html('Répartition du prix d\'un repas ('+prix_repas+'€)');
