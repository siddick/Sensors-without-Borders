'use strict';


requirejs.config({
    paths: {
        jquery: '../components/jquery/dist/jquery',
        bootstrap: '../components/bootstrap/dist/js/bootstrap',
        datatables: "../components/datatables/media/js/jquery.dataTables.min",
        tableTools: "../components/datatables-tabletools/js/dataTables.tableTools",
        dataTablesBootstrap: "../components/Plugins/integration/bootstrap/3/dataTables.bootstrap.min"
    },
    shim: {
        bootstrap: ['jquery'],
        datatables: ["jquery"],
        dataTablesBootstrap: ["datatables", "bootstrap"],
        tableTools: ["dataTablesBootstrap"]
    }
});


require(['bootstrap', 'tableTools'], function () {

    var app = {
        initialize: function () {
			$('table.table').DataTable();

			//Loading Batches
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

			
        }
    };

    app.initialize();

});