<?php
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
?>
<!DOCTYPE html>
	<html>
		<head>
			<!-- nbmaa version 0-->
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<meta name=viewport content="width=device-width, initial-scale=1">
			<meta http-equiv="cache-control" content="max-age=0" />
			<meta http-equiv="cache-control" content="no-cache" />
			<meta http-equiv="expires" content="0" />
			<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
			<meta http-equiv="pragma" content="no-cache" />
			<title>New Britain Museum of American Art</title>
			<link rel="stylesheet" href="http://www.nbmaa.org/nbmaa4/plugins/nbmaacal/nbmaacal.css">
            <link rel="stylesheet" href="http://www.nbmaa.org/nbmaa4/frameworks/bootstrap-3.3.7/css/bootstrap-yeti.min.css">
			<link rel="stylesheet" href="http://www.nbmaa.org/nbmaa4/css/nbmaa4.css">
			<link rel="stylesheet" href="http://www.nbmaa.org/nbmaa4/app/app.css">
			<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,700,700i" rel="stylesheet">
			<!-- libraries, frameworks, plugins -->
			<script type="text/javascript" src="http://www.nbmaa.org/nbmaa4/libraries/jquery-3.2.0.min.js"></script>
			<script type="text/javascript" src="http://www.nbmaa.org/nbmaa4/libraries/lodash-4.17.4.core.js"></script>
			<script type="text/javascript" src="http://www.nbmaa.org/nbmaa4/frameworks/bootstrap-3.3.7/js/bootstrap.min.js"></script>
			<script type="text/javascript" src="http://www.nbmaa.org/nbmaa4/plugins/nbmaacal/nbmaacal.js"></script>
			<script type="text/javascript" src="http://www.nbmaa.org/nbmaa4/plugins/moment.min.js"></script>
			<script type="text/javascript" src="http://www.nbmaa.org/nbmaa4/app/app.js"></script>
			<script type="text/javascript" src="http://www.nbmaa.org/nbmaa4/app/uriMap.js"></script>
		</head>
		<body>
			<div id="app" class="container-fluid" style="max-width:1400px;">
                <div class="row" id="header">
                    <div class="col-sm-12">
                        <h3>New Britain Museum of American Art</h3>
                    </div>
                </div>
				<div class="row" id="nav-view"></div>
                <div class="row" id="content-view"></div>
				<div class="row">
					<div class="col-sm-12" id="debug"></div>
				</div>
			</div>
			<script type="text/javascript">

					$(document).ready(function() {
							var nbmaa = nbmaa4();
					});

					function dateFormatter(date){
                        return moment(date, "YYYY-MM-DD").format("MMM DD, YYYY");
					}

					function printDateFormatter(date){
                        return moment(date, "YYYY-MM-DD").format("dddd, MMMM DD, YYYY");
					}

					function timeFormatter(time){
                        return moment(time, "hh:mm:ss").format("h:mm A");
					}

			</script>
		</body>
	</html>
