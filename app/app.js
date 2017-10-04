nbmaa4 = function(){

	var uriMap = window.uriMap.paths;

	var app = {
		root: 'http://www.nbmaa.org/nbmaa4/',
		//change this to 0 in production
		dirAddr: 2
	};

    var settings = {
		aniDelay : 200
    }

    var props = {
		page : {
			title: null,
			pageParam: null,
			view: null,
			uri: null,
			path: null,
			dateParam: null
		},
		cal : {
			curDay:  moment().format('YYYY-MM-DD'),
			curWeek: moment().startOf('week').format('YYYY-MM-DD'),
			today: moment().format('YYYY-MM-DD'),
			startRange : moment().startOf('month').format('YYYY-MM-DD'),
			endRange : moment().endOf('month').format('YYYY-MM-DD')
		}
    }

    var state = {
        load: null,
        current: null
    }

    var jwt = {
    }

	var pushHist = false;

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
		props.page.dateParam = window.location.search.substring(1);
		//convert dateParam to JSON
		if(props.page.dateParam){
			tempDP = JSON.parse('{"' + props.page.dateParam.replace(/&/g, '","').replace(/=/g,'":"') + '"}',function(key, value) { return key===""?value:decodeURIComponent(value) });
			props.cal.curDay = tempDP.curDay;
			props.cal.curWeek = tempDP.curWeek;
			props.cal.startRange = tempDP.startRange;
			props.cal.endRange = tempDP.endRange;
		}
		keywordsDiv();
		setup();
    }

	var setup = function() {
		start();
	}

	var start = function(){
		view('nav', 'nav-view');
		bindLinks();
		calendarLogic(); // uses nbmaacal.js
		openPage();
	}

	var bindLinks = function(){
		$('body').on('click', 'a.appLink', function(e){
			e.preventDefault();
			props.page.view = this.dataset.view;
			props.page.path = $(this).attr('href');
			props.page.uri = props.page.path.split('/');
			props.page.dateParam = null;
			markSelected($('#nav'),$(this));
			openPage();
		});
	}

	var calendarLogic = function(){

		var progObj,parentObj,tempEventType, tempDP;
		var showEv = $('<div id="showEvents">');
		var todayEv = $('<div id="todayEvents">');
		var weekEv = $('<div id="weekEvents">');
		var weekendEv = $('<div id="weekendEvents">');
		var monthEv = $('<div id="monthEvents">');
		var todayHeader = $('<h3 class="calEventListHeader">Today</h3>');
		var weekHeader = $('<h3 class="calEventListHeader">What Else is Going on This Week</h3>');

		$('body').on('calLoaded', '#nbmaacal', function(){
			updatePropsCal();
			view('cal-event-list','calEventList',function(){updateEvCats();updateCalWithEvs();});
		});

		$('body').on('calChange', '#nbmaacal', function(){
			updatePropsCal();
			view('cal-event-list','calEventList',function(){pushHistoryState();updateEvCats();updateCalWithEvs();});
		});

		$('body').on('calSquareClick', '#nbmaacal', function(){
			updatePropsCal();
			updateEvCats();
			pushHistoryState();
		});

		var updatePropsCal = function(){
			props.cal.curDay = $('#nbmaacal')[0].dataset.curDayDate;
			props.cal.curWeek = $('#nbmaacal')[0].dataset.curWeekDate;
			props.cal.startRange = $('#nbmaacal')[0].dataset.startRange;
			props.cal.endRange = $('#nbmaacal')[0].dataset.endRange;
			props.page.dateParam = $.param(props.cal);
		}

		var updateEvCats = function(){
			$('#calEventList').css('display', 'block');
			if(	props.cal.curDay !== props.cal.today){
				todayHeader.html(moment(props.cal.curDay, "YYYY-MM-DD").format("dddd, MMMM D, YYYY"));
			}
			todayEv.empty();
			weekEv.empty();
			$('.evCatContainer').empty();
			$('.program').each(function(){
				// add event categories
				progObj = _.find(uriMap,{'path': this.dataset.catagory});
				parentObj = _.find(uriMap,{'path': progObj.parentPath});
				var eventType = $('<div class="eventCat">');
				var tempEventType =$('<div class="eventCat">'+progObj.title+'</div>');
				eventType.html(parentObj.title);
				$(this).find('.evCatContainer').prepend(tempEventType).prepend(eventType);
				// sort evs into today and this week
				if(this.dataset.date===props.cal.curDay){
					todayEv.append($(this).clone().addClass('opacZero'));
				}
				if(moment(this.dataset.date).isBetween(moment(props.cal.curDay).startOf('week').subtract(1,'days'), moment(props.cal.curDay).endOf('week'))){
					weekEv.append($(this).clone().addClass('opacZero'));
				}
			});

			if(todayEv.children().length === 0){
				todayEv.append('<p class="card program opacTransit opacZero"><em>Hmmm. Looks like there are no events on this day.</em></p>');
			}
			if(weekEv.children().length === 0){
				weekEv.append('<p class="card program opacTransit opacZero"><em>Interesting... There happens to be no events this week.</em></p>');
			}

			showEv.prepend(weekEv).prepend(weekHeader).prepend(todayEv).prepend(todayHeader);
			$('#calEventList').before(showEv);
			$('#calEventList').css('display', 'none');
			// timeout to let render to DOM
			setTimeout(function(){opacZeroToOne($('#showEvents'),settings.aniDelay)},100);
			// update selects
			markSelected($('#monthMenu'),$('#monthMenu a[data-value="'+ moment(props.cal.curDay, "YYYY-MM-DD").format("M")+'"]'));
			markSelected($('#yearMenu'),$('#yearMenu a[data-value="'+ moment(props.cal.curDay, "YYYY-MM-DD").format("YYYY")+'"]'));
			markSelected($('.daysContainer'),$('.week[data-value="'+props.cal.curWeek+'"]'));
			markSelected($('.week'),$('.calSquare[data-value="'+props.cal.curDay+'"]'));
		}

		var updateCalWithEvs = function(){
			var calBadge = $('<div class="calBadge opacTransit opacZero"><div class="badge"></div></div>');
			$('#calEventList .program').each(function(){
				var count = $('.calSquare[data-value="'+this.dataset.date+'"]').attr('data-ev-count');
				if(!count){count = 0};
				calBadge.find('.badge').html(parseInt(count)+1);
				var calSquare = $('.calSquare[data-value="'+this.dataset.date+'"]');
				if(count === 0){
					calSquare.append(calBadge.clone());
				} else {
					calSquare.find('.badge').html(parseInt(count)+1);
				}
					calSquare.attr('data-ev-count', parseInt(count)+1);
			});
			opacZeroToOne($('.calGrid'),settings.aniDelay/3);
		}
	}

	var opacZeroToOne = function(parent, delay){
		var timer = delay;
		parent.find('.opacZero').each(function(i){
			var obj = $(this);
			setTimeout(function(){
					obj.removeClass('opacZero').addClass('opacOne');
			}, timer+=delay);
		});
	}

	var keywordsDiv = function(list) {
		var keywords = $('<div class="keywords">');
		var parents = _.filter(uriMap,{'childView': 'program'});
		for(obj in parents){
			keywords.append('<span class="keyword">'+obj.title+'</span>');
		}
		return keywords;
	}

	var openPage = function() {
		var lastPath = _.find(uriMap, {'path' : props.page.uri[props.page.uri.length-1]});
		var secondToLastPath = _.find(uriMap, {'path' : props.page.uri[props.page.uri.length-2]});
		if(lastPath){
			props.page.view = lastPath.view;
			props.page.title = lastPath.title;
			view(props.page.view, 'content-view', function(){pushHistoryState();loadPlugins();});
		}else if (secondToLastPath) {
			props.page.view = secondToLastPath.childView;
			props.page.pageParam =  props.page.uri[props.page.uri.length-1];
			view(props.page.view, 'content-view', function(){applySecondPathTitle(function(){pushHistoryState();loadPlugins();})});
		}else{
			props.page.title = 'Error - Page not found';
			view('404', 'content-view', function(){pushHistoryState();loadPlugins();});
		}

		var applySecondPathTitle = function(cb){
			props.page.title = $('#program').attr('data-title');
			if(cb){cb();}
		}
	}

	loadPlugins = function(){
		if($('#nbmaacal').length>0){
			$('#nbmaacal').empty();
			$('#nbmaacal').nbmaacal({
				curDay : props.cal.curDay,
				curWeek : props.cal.curWeek,
				curMonth : moment(props.cal.curDay, "YYYY-MM-DD").format("MM"),
				curYear : moment(props.cal.curDay, "YYYY-MM-DD").format("YYYY")
			});
		}
	}

	var pushHistoryState = function(){
		var historyUrl;
		if(pushHist){
			if(props.page.dateParam){historyUrl = app.root + '' + props.page.path + '?' + props.page.dateParam;}
			else{historyUrl = app.root + '' + props.page.path}
			document.title = 'New Britain Museum of American Art | ' + props.page.title;
			window.history.pushState({"html": document.body.innerHTML, "pageTitle": 'New Britain Museum of American Art | ' + props.page.title },"", historyUrl);
		}else{
			//activate the pushHistoryState func after page is started
			pushHist = true;
		}
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

	var markSelected = function(parent, obj){
		parent.find('.selected').removeClass('selected');
		obj.addClass('selected');
	}

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

	// history
	window.onpopstate = function(e){
	    if(e.state){
	        document.body.innerHTML = e.state.html;
			loadPlugins();
	    }
	};

    init();
    return this;
}
