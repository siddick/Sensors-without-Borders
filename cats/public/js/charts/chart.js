google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.setOnLoadCallback(drawAnnotations);

function drawAnnotations() {
	var earnOverAll = parseInt($("#earnOverAll").html());
	var yetToEarnOverAll = parseInt($("#yetToEarnOverAll").html());
	var karmaInstallEarn = parseInt($("#karmaInstallEarn").html());
	var karmaInstallationPending = parseInt($("#karmaInstallationPending").html());
	var karmaMaintenanceEarn = parseInt($("#karmaMaintenanceEarn").html());
	var karmaMaintenancePending = parseInt($("#karmaMaintenancePending").html());

	if (earnOverAll >= 10000) {
		$("#badge").attr("src", "../badges/ninja.jpg");
	} else if (earnOverAll >= 5000) {
		$("#badge").attr("src", "../badges/prodigy.jpg");
	} else if (earnOverAll >= 2000) {
		$("#badge").attr("src", "../badges/space_jammer.jpg");
	} else if (earnOverAll >= 1000) {
		$("#badge").attr("src", "../badges/book_worm.jpg");
	} else {
		$("#badge").attr("src", "../badges/couch_potato.jpg");
	}


	var data = google.visualization.arrayToDataTable([
		['Device', 'Earned', 'Pending'],
		['Installation', karmaInstallEarn, karmaInstallationPending],
		['Maintenance', karmaMaintenanceEarn, karmaMaintenancePending],
		['Overall', earnOverAll, yetToEarnOverAll]
		]);

	var options = {
title: '',
chartArea: {width: '50%'},
annotations: {
alwaysOutside: true,
textStyle: {
fontSize: 12,
auraColor: 'none',
color: '#555'
	       },
boxStyle: {
stroke: '#ccc',
strokeWidth: 1,
gradient: {
color1: '#f3e5f5',
color2: '#f3e5f5',
x1: '0%', y1: '0%',
x2: '100%', y2: '100%'
	}
	       }
       },
hAxis: {
title: 'Points',
minValue: 0,
       },
vAxis: {
title: 'Process'
       }
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}
