function update_graphs() {
    var isAnnual = $('#check-annual').is(":checked");
    compute_tarification2020(isAnnual);
    compute_simulation(isAnnual);
}


$('input').change(function(){
    update_graphs();
});

$('#getigne2020-preset').click(function(){
    $('#func').val('');
    $('#coefficient').val(0.00012);
    $('#seuil-bas').val(3.30);
    $('#seuil-haut').val(3.50);
    $('#decalage-origine').val(3.26);
    update_graphs();
});

$('#naoned-preset').click(function(){
    $('#func').val('-9.458466 - (-0.04154805/0.002693492)*(1 - Math.exp(-0.002693492*x))');
    $('#coefficient').val(0);
    $('#seuil-bas').val(0.84);
    $('#seuil-haut').val(6.06);
    $('#decalage-origine').val(0);
    update_graphs();
});

$('#lamontagne-preset').click(function(){
    $('#func').val('');
    $('#coefficient').val(0.00342);
    $('#seuil-bas').val(1.15);
    $('#seuil-haut').val(5.75);
    $('#decalage-origine').val(0);
    update_graphs();
});
