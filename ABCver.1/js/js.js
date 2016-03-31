//ローディング画面
$('head').append(
	'<style type="text/css">#container { display: none; } #fade, #loader { display: block; }</style>'
);
jQuery.event.add(window, "load", function() { // 全ての読み込み完了後に呼ばれる関数
	var pageH = $("#container").height();
	$("#fade").css("height", pageH).delay(900).fadeOut(800);
	$("#loader").delay(600).fadeOut(300);
	$("#container").css("display", "block");
});
//画面サイズごとの処理
$(function() {
	$("#toggle").click(function() {
		$("#menu").slideToggle();
		return false;
	});
	$(window).resize(function() {
		var win = $(window).width();
		var p = 480;
		if (win > p) {
			$("#menu").show();
		} else {
			$("#menu").hide();
		}
	});
});
$(window).bind('scroll', function(e) {
	parallaxScroll();
});

function parallaxScroll() {
	var scrolled = $(window).scrollTop();
	//ID「parallax-bg1」を指定し、-0.1倍速でスクロール
	$('#parallax-bg1').css('left', (0 - (scrolled * -0.10)) + '%');
	$('#parallax-bg1').css('top', (0 - (scrolled * 0.0)) + 'px');
	//ID「parallax-bg2」を指定し、-0.2倍速でスクロール
	$('#parallax-bg2').css('left', (0 - (scrolled * -0.20)) + '%');
	$('#parallax-bg2').css('top', (0 - (scrolled * 0.0)) + 'px');
	//ID「parallax-bg3」を指定し、-0.3倍速でスクロール
	$('#parallax-bg3').css('left', (0 - (scrolled * -0.30)) + '%');
	$('#parallax-bg3').css('top', (0 - (scrolled * 0.0)) + 'px');
	//ID「parallax-bg4」を指定し、0.0倍速でスクロール
	$('#parallax-bg4').css('left', (0 - (scrolled * -0.0)) + '%');
	$('#parallax-bg4').css('top', (0 - (scrolled * 0.0)) + 'px');
	$('#bm').css('top', (0 - (scrolled * 1)) + 'px');
};
//滑らかに余韻
$(function() {
	var scrolls = 0;
	var speed = 220;
	$('html').mousewheel(function(event, move) {
		if (jQuery.browser.webkit) {
			if (move > 0) scrolls = $('body').scrollTop() - speed;
			else if (move < 0) scrolls = $('body').scrollTop() + speed;
		} else {
			if (move > 0) scrolls = $('html').scrollTop() - speed;
			else if (move < 0) scrolls = $('html').scrollTop() + speed;
		}
		$('html,body').stop().animate({
			scrollTop: scrolls
		}, 'slow', $.easie(0, 0, 0, 1));
		//イージングプラグイン使わないとき
		//.animate({ scrollTop: scrolls }, 'normal');
		return false;
	});
});
//ページトップ
$(function() {
	var topBtn = $('#page_top');
	topBtn.hide();
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
	//スクロールしてトップ
	topBtn.click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000); //スピード
		return false;
	});
});
myWeek = new Array("日", "月", "火", "水", "木", "金", "土");

function myFunc() {
	myDate = new Date();
	myMsg = myDate.getFullYear() + "年";
	myMsg += (myDate.getMonth() + 1) + "月";
	myMsg += myDate.getDate() + "日";
	myMsg += "(" + myWeek[myDate.getDay()] + "曜日)";
	myMsg += myDate.getHours() + "時";
	myMsg += myDate.getMinutes() + "分";
	myMsg += myDate.getSeconds() + "秒";
	document.getElementById("myIDdate").innerHTML = myMsg;
}
setInterval("myFunc()", 1000);
//カウントダウン
function CountdownTimer(elm, tl, mes) {
	this.initialize.apply(this, arguments);
}
CountdownTimer.prototype = {
	initialize: function(elm, tl, mes) {
		this.elem = document.getElementById(elm);
		this.tl = tl;
		this.mes = mes;
	},
	countDown: function() {
		var timer = '';
		var today = new Date();
		var day = Math.floor((this.tl - today) / (24 * 60 * 60 * 1000));
		var hour = Math.floor(((this.tl - today) % (24 * 60 * 60 * 1000)) / (60 *
			60 * 1000));
		var min = Math.floor(((this.tl - today) % (24 * 60 * 60 * 1000)) / (60 *
			1000)) % 60;
		var sec = Math.floor(((this.tl - today) % (24 * 60 * 60 * 1000)) / 1000) %
			60 % 60;
		var milli = Math.floor(((this.tl - today) % (24 * 60 * 60 * 1000)) / 10) %
			100;
		var me = this;
		if ((this.tl - today) > 0) {
			if (day) timer += '<span class="day">' + day + '日</span>';
			if (hour) timer += '<span class="hour">' + hour + '時間</span>';
			timer += '<span class="min">' + this.addZero(min) +
				'分</span><span class="sec">' + this.addZero(sec) + '秒</span>';
			this.elem.innerHTML = timer;
			tid = setTimeout(function() {
				me.countDown();
			}, 10);
		} else {
			this.elem.innerHTML = this.mes;
			return;
		}
	},
	addZero: function(num) {
		return ('0' + num).slice(-2);
	}
}

function CDT() {
	var tl = new Date('2015/2/01 00:00:00');
	var timer = new CountdownTimer('CDT', tl, '受け付けは終了しました');
	timer.countDown();
}
window.onload = function() {
	CDT();
}