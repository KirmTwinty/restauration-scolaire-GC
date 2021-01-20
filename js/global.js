var NB_JOURS = 180 // (UNAF 2014)
var NB_HEURES_PERISCOLAIRE = 180*4 //(tarif 1/4 d'heure)

var RESTAURATION_PRIX = [3.35, 3.35, 3.35, 3.38, 3.38, 3.44, 3.44, 3.47, 3.47, 3.47];
var RESTAURATION_CLISSON = [1.88, 2.23, 2.69, 3.13, 3.48, 3.78, 4.12, 4.37, 4.53, 4.67];
var RESTAURATION_AIGREFEUILLE = [2.98, 3.2, 3.34, 3.55, 3.76, 3.93, 4.05, 4.24, 4.46, 4.67];
var RESTAURATION_MONNIERES = [3.33, 3.64, 3.94, 4.34, 4.49, 4.65, 4.8, 5.05, 5.35, 5.96];
var RESTAURATION_GORGES = [3.47, 3.51, 3.54, 3.78, 3.79, 3.82, 3.85, 3.88, 3.9, 3.92];
var RESTAURATION_LAPLANCHE = [2.95, 3.21, 3.4, 3.6, 3.63, 3.8, 4.02, 4.18, 4.36, 4.54];
var RESTAURATION_LAHAYEFOUASSIERE = [1.24, 2.38, 2.99, 3.57, 3.88, 4.03, 4.24, 4.39, 4.5, 4.5];

var PERISCOLAIRE_PRIX = [0.37, 0.43, 0.52, 0.62, 0.7, 0.76, 0.8, 0.83, 0.85, 0.88];

function range(start, end, step=1) {
    var size = Math.floor((end - start) / step);
    return [...Array(size).keys()].map(i => ((i + start)*step));
}
function formatted_number(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}
var QF = range(0,2500, step=1);


var total2020QF = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500];

var total2020Children = [1, 3, 1, 1, 7, 14, 14, 27, 18, 22, 21, 29, 48, 25, 16, 26, 22, 11, 12, 5, 4, 3, 5, 1, 1, 10, 19];

var distributionEnfants = [1, 3, 1, 1, 7, 14, 14, 27, 18, 22, 21, 29, 48, 25, 16, 26, 22, 11, 12, 5, 4, 3, 5, 1, 1, 10, 19];

var totalEnfants = distributionEnfants.reduce((a,b) => a+b);


var COLOR_BLUE		= "rgba(0,123,255,1)";
var COLOR_INDIGO	= "rgba(102,16,242,1)";
var COLOR_PURPLE	= "rgba(111,66,193,1)";
var COLOR_PINK		= "rgba(232,62,140,1)";
var COLOR_RED		= "rgba(220,53,69,1)";
var COLOR_ORANGE	= "rgba(253,126,20,1)";
var COLOR_YELLOW	= "rgba(255,193,7,1)";
var COLOR_GREEN		= "rgba(40,167,69,1)";
var COLOR_TEAL		= "rgba(32,201,151,1)";
var COLOR_CYAN		= "rgba(23,162,184,1)";
var COLOR_WHITE		= "rgba(255,255,255,1)";
var COLOR_GRAY		= "rgba(108,117,125,1)";
var COLOR_DARK		= "rgba(52,58,64,1)";
var COLOR_PRIMARY	= "rgba(0,123,255,1)";
var COLOR_SECONDARY	= "rgba(108,117,125,1)";
var COLOR_SUCCESS	= "rgba(40,167,69,1)";
var COLOR_INFO		= "rgba(23,162,184,1)";
var COLOR_WARNING	= "rgba(255,193,7,1)";
var COLOR_DANGER	= "rgba(220,53,69,1)";
var COLOR_LIGHT		= "rgba(248,249,250,1)";
var COLOR_DARK		= "rgba(52,58,64,1)";

function color_with_opacity(rgb_color, alpha) {
    // Works with rgb and rgba color strings
    if (alpha >= 0 && alpha <= 1) {
	const regex = /(rgb[a]*)\(([0-9]+),([0-9]+),([0-9]+)[,]*([0-9])*\)/gi;
	let m = regex.exec(rgb_color);

	return m[1] == 'rgb' ?
	    `${m[1]}a(${m[2]}, ${m[3]}, ${m[4]}, ${alpha})`:
	    `${m[1]}(${m[2]}, ${m[3]}, ${m[4]}, ${alpha})`
    }else{
	return rgb_color;
    }
}
