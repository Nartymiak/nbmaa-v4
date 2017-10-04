nbmaa4 = function(){

	var uriMap = window.uriMap.paths;

	var app = {
		root: 'http://www.nbmaa.org/nbmaa4/',
		//change this to 0 in production
		dirAddr: 2
	};

    var settings = {
    }

    var props = {
		page : {
			title: null,
			pageParam: null,
			view: null,
			uri: null,
			path: null,
		},
		cal : {
			curDay: null,
			curWeek: null
		}
    }

    var state = {
        load: null,
        current: null
    }

    var jwt = {
    }

    var el = this;

    /**
     * ===================================================================================
     * = PRIVATE FUNCTIONS
     * ===================================================================================
     */

    var init = function() {
        // first thing, get where the user lands in the app by reading the url
		props.page.uri = window.location.pathname.split('/');
		props.page.path = props.page.uri.slice(app.dirAddr,props.page.uri.length);
		props.page.path = props.page.path.join('/');
		setup();
    }

	var setup = function() {
		console.log('open');
		start();
	}

	var start = function(){
		view('nav', 'nav-view');
		calendarLogic(); // uses nbmaacal.js
		loadControls();
		//makeSiteMap();
	}

	var loadControls = function(){
		openPage();
		bindLinks();
	}

	var bindLinks = function(){
		$('body').on('click', 'a.appLink', function(e){
			e.preventDefault();
			props.page.view = $(this).attr('data-view');
			props.page.path = $(this).attr('href');
			props.page.uri = props.page.path.split('/');
			openPage();
		});
	}

	var calendarLogic = function(){
		var todayEv = $('<div id="todayEvents">');
		var weekEv = $('<div id="weekEvents">');
		var weekendEv = $('<div id="weekendEvents">');
		var monthEv = $('<div id="monthEvents">');

		$('body').on('calChange', '#nbmaacal', function(){
			props.cal.curDay = $(this).attr('data-cur-day-date');
			props.cal.curWeek = $(this).attr('data-cur-week-date');
			props.cal.startRange = $(this).attr('data-start-range');
			props.cal.endRange = $(this).attr('data-end-range');
			console.log('test');
			view('cal-event-list','calEventList');
		});

		$('body').on('calSquareClick', '#nbmaacal', function(){
			console.log('fire');
			props.cal.curDay = $(this).attr('data-cur-day-date');
			props.cal.curWeek = $(this).attr('data-cur-week-date');
			weekStart = moment(props.cal.curWeek,"YYYY-M-D").subtract(1,'days');
			weekEnd = moment(props.cal.curWeek,"YYYY-M-D").add(8, 'days');
			todayEv.empty();
			$('.program').each(function(){
				if($(this).attr('data-cur-day-date')===props.cal.curDay){
					todayEv.append($(this).clone());
				}
			});
			console.log('today: ' + todayEv);
		});
	}

	var openPage = function() {
		var lastPath = _.find(uriMap, {'path' : props.page.uri[props.page.uri.length-1]});
		var secondToLastPath = _.find(uriMap, {'path' : props.page.uri[props.page.uri.length-2]});
		if(lastPath){
			props.page.view = lastPath.view;
			props.page.title = lastPath.title;
			view(props.page.view, 'content-view', function(){pushHistoryState();});
		}else if (secondToLastPath) {
			props.page.view = secondToLastPath.childView;
			props.page.pageParam =  props.page.uri[props.page.uri.length-1];
			view(props.page.view, 'content-view', function(){applySecondPathTitle(function(){pushHistoryState()})});
		}else{
			props.page.title = 'Error - Page not found';
			view('404', 'content-view', function(){pushHistoryState();});
		}
	}

	var applySecondPathTitle = function(cb){
		props.page.title = $('#program').attr('data-title');
		if(cb){cb();}
	}

	var pushHistoryState = function(){
		var historyUrl = app.root + '' + props.page.path;
		document.title = 'New Britain Museum of American Art | ' + props.page.title;
		window.history.pushState({"html": document.body.innerHTML, "pageTitle": 'New Britain Museum of American Art | ' + props.page.title },"", historyUrl);
	}

    var view = function(page, location, cb){

        propsString = JSON.stringify(props);
		locationStr = location;
        location = $('#'+location+'');

        $.ajax({
            url: 'http://www.nbmaa.org/nbmaa4/views/'+page+'.php',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Toke', jwt.unParsed);
            },
            data : {props:propsString},
            method: 'POST',
            dataType : 'text',
            success: function(data){
                    location.empty();
                    location.html(data);
					formatDateAndTime();
            },
            error: function( xhr, status, errorThrown ) {
                console.log(errorThrown);
				view('404', locationStr);
            },
            complete: function( xhr, status ) {
                if(cb){ cb() };
            }
        });
    }

    var parseJWT = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

	var makeSiteMap = function() {

		var string, obj;
		string = '';

		for(obj in uriMap){
			var path = uriMap[obj].path;
			string += recursPath(path, path);
			string += '<br>';
		}
		$('#debug').html(string);
	}

	var recursPath = function(path, uri) {
		var obj = _.find(uriMap,{'path': path});
		if(obj.parentPath === null){
			return uri;
		}else{
			uri = obj.parentPath +'/' + uri;
			return recursPath(obj.parentPath, uri);
		}
	}

	var formatDateAndTime = function(){

		$('.date').each(function(){
			var str = printDateFormatter($(this).html());
			str = str.replace(/, 2017/g, "");
			$(this).html(str);
		});
		$('.time').each(function(){
			var str = timeFormatter($(this).html());
			str = str.replace(/:00/g, "");
			str = str.replace(/AM/g, "a.m.");
			str = str.replace(/PM/g, "p.m.");
			str = str.replace(/12 p.m./g, "noon");
			$(this).html(str);
		});
		$('.dateAndTime').each(function(){
			var str = $(this).html();
			var count = (str.match(/a.m./g) || []).length;
			if(count === 2){
				str = str.replace(' a.m.','');
			}
			count = (str.match(/p.m./g) || []).length;
			if(count === 2){
				str = str.replace(' p.m.','');
			}
			$(this).html(str);
		});

		function printDateFormatter(date){
	        return moment(date, "YYYY-MM-DD").format("dddd, MMMM D, YYYY");
		}

		function timeFormatter(time){
	        return moment(time, "hh:mm:ss").format("h:mm A");
		}

	}

	// history
	window.onpopstate = function(e){
	    if(e.state){
	        document.body.innerHTML = e.state.html;

	    }
	};

    init();
    return this;
}
