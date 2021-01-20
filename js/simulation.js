var ctx = document.getElementById('simulation-canvas');

var simulation = new Chart(ctx, {
    type: 'line',
    data: {
        labels: QF,
        datasets: [{
            label: 'Tarif annuel (simulation)',
	    yAxisID: 'A',
	    fill:false,
	    borderColor: '#28a745',
	    pointRadius: 0,
            data: []
        },{
            label: 'Tarif annuel (2020)',
	    yAxisID: 'A',
	    fill:false,
	    borderColor: 'rgba(54, 162, 235, 0.6)',
	    borderWidth: 8,
	    pointRadius: 0,
            data: calcul_restauration(RESTAURATION_PRIX, $('#check-annual').is(":checked") ? 1:NB_JOURS)
	}, {
            label: 'Coût effectif du repas',
	    yAxisID: 'A',
	    borderWidth: 8,
	    fill:false,
	    borderColor: color_with_opacity(COLOR_RED, 0.4),
	    pointRadius: 0,
            data: new Array(QF.length).fill(prix_repas)
	}, {
	    label: 'Distribution',
	    yAxisID: 'B',
	    data: childrenDistribution,
	    borderColor: 'rgba(255,1,1,0)',
	    pointBorderColor: 'rgba(255,1,1,0)',
	    pointBackgroundColor: 'rgba(255,1,1,0)'}]
    },
    options: {
        scales: {
	    xAxes: [{
		scaleLabel:{
		    display: true,
		    labelString: 'Valeur du Quotient Familial (QF)'
		},
		ticks:{
		    min: 0,
		    max: 2500,
		    stepSize: 50
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
                    },
		    min:0
                },
		scaleLabel:{
		    display: true,
		    labelString: 'Coût en euros'
		}
            },{
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

            }]
        },
	tooltips: {
	    mode: 'index',
            callbacks: {
                label: function(tooltipItem, data) {
		    var label = data.datasets[tooltipItem.datasetIndex].label || '';
		    if (label) {
			if (tooltipItem.datasetIndex <= 1) {
			    var nbJours = $('#check-annual').is(":checked") ? NB_JOURS: 1;
			    label += ' : ';
			    label += tooltipItem.yLabel.toFixed(2);
			    label += "€";
			    label += " ⇒ " + (nbJours * prix_repas - tooltipItem.yLabel).toFixed(2) + "€ d'aide"
			}else if(tooltipItem.datasetIndex == 2){
			    label += ' : ';
			    label += tooltipItem.yLabel.toFixed(2);
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

function compute_tarification2020(isAnnual) {
    var nbJours = isAnnual ? NB_JOURS: 1;
    let d = calcul_restauration(RESTAURATION_PRIX, nbJours);
    tarification2020.data.datasets[0].data = d;
    tarification2020.data.datasets[1].data = calcul_restauration(RESTAURATION_CLISSON, nbJours);
    tarification2020.data.datasets[2].data = calcul_restauration(RESTAURATION_AIGREFEUILLE, nbJours);
    tarification2020.data.datasets[3].data = calcul_restauration(RESTAURATION_MONNIERES, nbJours);
    tarification2020.data.datasets[4].data = calcul_restauration(RESTAURATION_GORGES, nbJours);
    tarification2020.data.datasets[5].data = calcul_restauration(RESTAURATION_LAPLANCHE, nbJours);
    tarification2020.data.datasets[6].data = calcul_restauration(RESTAURATION_LAHAYEFOUASSIERE, nbJours);
    tarification2020.update();

    simulation.data.datasets[1].data = d;
    simulation.update();
    
    var total2020 = range(0,total2020QF.length).map(qfIdx => {
	let idx = Math.floor((total2020QF[qfIdx]-800)/400);
	// Seuils
	idx = ((idx < 0) ? 0 : idx);
	idx = ((idx > 3) ? 3 : idx);
	console.log(total2020Children[qfIdx] + ', ' + RESTAURATION_PRIX[idx]);
	return total2020Children[qfIdx] * nbJours * RESTAURATION_PRIX[idx];
    }).reduce((a,b) => a+b).toFixed(2);
    $('#tarification-2020-type').html('(' + (isAnnual ? 'annuel':'par repas') + ')');
    $('#total-2020').html('Total : ' + formatted_number(total2020) + '€');
    return false;
}

compute_tarification2020($('#check-annual').is(":checked"));

function compute_simulation(isAnnual) {
    var nbJours = isAnnual ? NB_JOURS:1;
    // Calcul restauration en 2020
    var seuilHaut = parseFloat($('#seuil-haut').val());
    var seuilBas = parseFloat($('#seuil-bas').val());
    var offset = parseFloat($('#decalage-origine').val());
    var simulationData =[];
    var totalSimulation = 0;
    if ($('#func').val()) {
	let F = Function('x', 'return ' + $('#func').val());
	simulationData = QF.map(qf =>{
	    let v = F(qf);
	    if (v < seuilBas) { // Impossible ici
		return nbJours * seuilBas;
	    }else if(v > seuilHaut){
		return nbJours * seuilHaut;
	    }
	    return v * nbJours;
	});
	totalSimulation = range(0,total2020QF.length).map(qfIdx => {
	    let v = F(total2020QF[qfIdx]);
	    if (v < seuilBas) {
		v = seuilBas;
	    }else if(v > seuilHaut){
		v = seuilHaut;
	    }
	    return total2020Children[qfIdx] * nbJours * v;
	}).reduce((a,b)=>a+b).toFixed(2);

    }else{
	simulationData = QF.map(qf => {
	    let v = qf * parseFloat($('#coefficient').val()) + offset;
	    if (v < seuilBas) { // Impossible ici
		return nbJours * seuilBas;
	    }else if(v > seuilHaut){
		return nbJours * seuilHaut;
	    }
	    return v * nbJours;
	});
	totalSimulation = range(0,total2020QF.length).map(qfIdx => {
	    let v = total2020QF[qfIdx] * parseFloat($('#coefficient').val()) + offset;
	    if (v < seuilBas) {
		v = seuilBas;
	    }else if(v > seuilHaut){
		v = seuilHaut;
	    }

	    return total2020Children[qfIdx] * nbJours * v;
	}).reduce((a,b)=>a+b).toFixed(2);
    }
    simulation.data.datasets[0].data = simulationData;
    simulation.data.datasets[2].data = new Array(QF.length).fill(prix_repas * nbJours);
    simulation.data.datasets[0].label = isAnnual ? 'Tarif annuel (simulation)':'Tarif au repas (simulation)'
    simulation.update();

    
    
    $('#total-simulation').html('Total : ' + formatted_number(totalSimulation) + '€');
}


compute_simulation($('#check-annual').is(":checked"));

