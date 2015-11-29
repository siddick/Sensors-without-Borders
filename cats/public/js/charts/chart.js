google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.setOnLoadCallback(drawAnnotations);

function drawAnnotations() {
	var earnOverAll = parseInt($("#earnOverAll").html());
	var yetToEarnOverAll = parseInt($("#yetToEarnOverAll").html());
	var karmaInstallEarn = parseInt($("#karmaInstallEarn").html());
	var karmaInstallationPending = parseInt($("#karmaInstallationPending").html());
	var karmaMaintenanceEarn = parseInt($("#karmaMaintenanceEarn").html());
	var karmaMaintenancePending = parseInt($("#karmaMaintenancePending").html());

	var data = google.visualization.arrayToDataTable([
		['Device', 'Earned', 'Pending'],
		['Installation', karmaInstallEarn, karmaInstallationPending],
		['Maintenance', karmaMaintenanceEarn, karmaMaintenancePending],
		['Overall', earnOverAll, yetToEarnOverAll]
		]);

	var options = {
title: 'Karma Points',
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
