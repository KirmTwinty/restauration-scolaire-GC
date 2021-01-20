var ctx = document.getElementById('restauration-scolaire-2020');

function calcul_restauration(resto, nbJours, minVal=400, step=200, nSteps = 10) {
    let x= QF.map(qf => {
	let idx = Math.floor((qf-minVal)/step);
	// Seuils
	idx = ((idx < 0) ? 0 : idx);
	idx = ((idx > (nSteps-1)) ? (nSteps-1) : idx);
	return nbJours * resto[idx]

    });
    return x;
}

var tarification2020 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: QF,
        datasets: [{
            label: 'Gétigné',
	    yAxisID: 'A',
            data: calcul_restauration(RESTAURATION_PRIX, $('#check-annual').is(":checked") ? 1:NB_JOURS),
	    fill:false,
	    borderColor: color_with_opacity(COLOR_RED, 0.8),
	    borderWidth: 8,
	    pointRadius: 0
        },{
            label: 'Clisson',
	    yAxisID: 'A',
            data: calcul_restauration(RESTAURATION_CLISSON, $('#check-annual').is(":checked") ? 1:NB_JOURS),
	    fill:false,
	    borderColor: color_with_opacity(COLOR_BLUE,0.6),
	    pointRadius: 0
        },{
            label: 'Aigrefeuille',
	    yAxisID: 'A',
            data: calcul_restauration(RESTAURATION_AIGREFEUILLE, $('#check-annual').is(":checked") ? 1:NB_JOURS),
	    fill:false,
	    borderColor: color_with_opacity(COLOR_CYAN,0.6),
	    pointRadius: 0
        },{
            label: 'Monnières',
	    yAxisID: 'A',
            data: calcul_restauration(RESTAURATION_MONNIERES, $('#check-annual').is(":checked") ? 1:NB_JOURS),
	    fill:false,
	    borderColor: color_with_opacity(COLOR_GREEN,0.6),
	    pointRadius: 0
        },{
            label: 'Gorges',
	    yAxisID: 'A',
            data: calcul_restauration(RESTAURATION_GORGES, $('#check-annual').is(":checked") ? 1:NB_JOURS),
	    fill:false,
	    borderColor: color_with_opacity(COLOR_DARK,0.6),
	    pointRadius: 0
        },{
            label: 'La Planche',
	    yAxisID: 'A',
            data: calcul_restauration(RESTAURATION_LAPLANCHE, $('#check-annual').is(":checked") ? 1:NB_JOURS),
	    fill:false,
	    borderColor: color_with_opacity(COLOR_PURPLE,0.6),
	    pointRadius: 0
        },{
            label: 'La Haye Fouassière',
	    yAxisID: 'A',
            data: calcul_restauration(RESTAURATION_LAHAYEFOUASSIERE, $('#check-annual').is(":checked") ? 1:NB_JOURS),
	    fill:false,
	    borderWidth: 8,
	    borderColor: color_with_opacity(COLOR_YELLOW,0.6),
	    pointRadius: 0
        },{
            //     label: 'Coût effectif du repas',
	    //     yAxisID: 'A',
	    //     fill:false,
	    //     borderColor: color_with_opacity(COLOR_RED, 0.4),
	    //     pointRadius: 0,
            //     data: new Array(QF.length).fill(prix_repas)
	    // }
	    label: 'Distribution',
	    yAxisID: 'B',
	    data: childrenDistribution,
	    borderColor: 'rgba(255,1,1,0)',
	    pointBorderColor: 'rgba(255,1,1,0)',
	    pointBackgroundColor: 'rgba(255,1,1,0)'}]
    },
    options: {
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        scales: {
	    xAxes: [{
		scaleLabel:{
		    display: true,
		    labelString: 'Valeur du Quotient Familial (QF)'
		}
	    }],
            yAxes: [{
		id: 'A',
		type: 'linear',
		position: 'left',
		ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value.toFixed(2) + '€';
                    }
                },
		scaleLabel:{
		    display: true,
		    labelString: 'Coût en euros'
		}
            }, {
		id: 'B',
		type: 'linear',
		position: 'right',
		ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value + ' enfant(s)';
                    }
                },
		scaleLabel:{
		    display: true,
		    labelString: 'Nombre d\enfants concernés'
		}
            },
		   ]
        },
	tooltips: {
	    mode: 'index',
            callbacks: {
                label: function(tooltipItem, data) {
		    var label = data.datasets[tooltipItem.datasetIndex].label || '';
		    if (label) {
			if (tooltipItem.datasetIndex <= 7) {
			    label += ' : ';
			    label += Math.round(tooltipItem.yLabel * 100) / 100;
			    label += "€";
			}else{
                            label = 'Concerné(s) : ';
			    label += Math.round(tooltipItem.yLabel);
			    label += " enfant(s)";
			}
		    }
		    return label;
                }
            }
        }
    }
});


