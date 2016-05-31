$(function () {
    var setWrap = $('#container'),
        setBase = $('.stageBase'),
        scrollSpeed = 500,
        scrollEasing = 'swing',
        slideSpeed = 500,
        slideEasing = 'linear',
        downBtn = 'show', // 'show' or 'hide'
        UpBtn = 'show',
        urlHash = 'on', // 'on' or 'off'
        setHash = '!page';

    var url = document.URL,
        stageSlide = $('.stageSlide');

    setWrap.append('<nav id="pageNav"><ul></ul></nav>');
    setBase.each(function (i) {
        $('#pageNav ul').append('<li class="pagePn' + (i + 1) + '"><a href="javascript:void(0);"></a></li>');
    });

    if (downBtn == 'show') {
        setWrap.append('<div id="pageDown"><a href="javascript:void(0);"></a></div>');
    }
    if (UpBtn == 'show') {
        setWrap.append('<div id="pageUp"><a href="javascript:void(0);"></a></div>');
    }

    var coreNav = $('#pageNav'),
        setNav = coreNav.find('ul'),
        navList = setNav.find('li'),
        navLength = navList.length;
    setNav.find('li:first').addClass('activeStage');
    $('body').attr('data-page', '1');

    $(window).load(function () {
        // StageHeight
        $(window).resize(function () {
            var wdHeight = $(window).height();
            setBase.css({
                height: wdHeight
            });

            var resizeContTop = parseInt(setWrap.css('top'));

            if (resizeContTop === 0) {
                setWrap.css({
                    top: '0'
                });
            } else {
                var activeStagePos = setNav.find('li.activeStage');
                activeStagePos.each(function () {
                    var posIndex = navList.index(this);
                    setWrap.css({
                        top: -(wdHeight * posIndex)
                    });
                });
            }

            coreNav.each(function () {
                var navHeight = $(this).height();
                $(this).css({
                    top: ((wdHeight) - (navHeight)) / 2
                });
            });
        }).resize();

        // StageSlide
        stageSlide.each(function () {
            var thisSlide = $(this),
                chdPanel = thisSlide.find('.slidePanel'),
                chdPanelLength = chdPanel.length;

            chdPanel.eq('0').addClass('activePanel').end().wrapAll('<div class="slideWrap"></div>');
            thisSlide.append('<a href="javascript:void(0);" class="sdPrev"></a><a href="javascript:void(0);" class="sdNext"></a><div class="slideNav"></div>');

            var thisWrap = thisSlide.find('.slideWrap'),
                thisPrev = thisSlide.find('.sdPrev'),
                thisNext = thisSlide.find('.sdNext'),
                thisPn = thisSlide.find('.slideNav');

            chdPanel.each(function (i) {
                thisPn.append('<a href="javascript:void(0);" class="slidePn' + (i + 1) + '"></a>');
            });

            var pnPoint = thisPn.find('a'),
                pnFirst = thisPn.find('a:first'),
                pnLast = thisPn.find('a:last'),
                pnCount = thisPn.find('a').length;

            pnFirst.addClass('pnActive');

            pnPoint.click(function () {
                var pnNum = pnPoint.index(this),
                    mvWidth = chdPanel.width(),
                    wpWidth = thisWrap.width(),
                    moveLeft = mvWidth * pnNum;
                thisWrap.stop().animate({
                    left: -(moveLeft)
                }, slideSpeed, slideEasing);
                pnPoint.removeClass('pnActive');
                $(this).addClass('pnActive');
                pnAcvCheck();
            });

            thisPrev.click(function () {
                thisWrap.not(':animated').each(function () {
                    thisPn.find('.pnActive').prev().click();
                    pnAcvCheck();
                });
            });

            thisNext.click(function () {
                thisWrap.not(':animated').each(function () {
                    thisPn.find('.pnActive').next().click();
                    pnAcvCheck();
                });
            });

            function pnAcvCheck() {
                var pnAcvNum = thisPn.find('.pnActive');
                pnAcvNum.each(function () {
                    var acvIndex = pnPoint.index(this);
                    acvCount = acvIndex + 1;
                    if (1 == acvCount) {
                        thisPrev.css({
                            display: 'none'
                        });
                        thisNext.css({
                            display: 'block'
                        });
                    } else if (pnCount == acvCount) {
                        thisPrev.css({
                            display: 'block'
                        });
                        thisNext.css({
                            display: 'none'
                        });
                    } else {
                        thisPrev.css({
                            display: 'block'
                        });
                        thisNext.css({
                            display: 'block'
                        });
                    }
                    chdPanel.removeClass('activePanel').eq(acvIndex).addClass('activePanel');
                });
            }
            pnAcvCheck();

            $(window).resize(function () {
                var setWrapLeft = parseInt(thisWrap.css('left')),
                    setPanelWidth = chdPanel.width(),
                    setLeft = setWrapLeft / setPanelWidth;

                var sdWidth = $(window).width(),
                    sdHeight = $(window).height();
                thisSlide.css({
                    width: sdWidth,
                    height: sdHeight
                });
                thisWrap.css({
                    width: (sdWidth * chdPanelLength),
                    height: sdHeight
                });
                chdPanel.css({
                    width: sdWidth,
                    height: sdHeight
                });

                var setWidth = chdPanel.width(),
                    adjLeft = setWidth * setLeft;
                thisWrap.css({
                    left: (adjLeft)
                });
            }).resize();

            var thisInt = thisWrap.find('.slideInitial');
            thisInt.each(function () {
                var pnlInt = thisWrap.find('.slideInitial');
                pnlInt.each(function () {
                    var intIndex = chdPanel.index(this);
                    pnPoint.eq(intIndex).click();
                });
            });
            setTimeout(function () {
                thisSlide.css({
                    visibility: 'visible',
                    opacity: '0'
                }).animate({
                    opacity: '1'
                }, slideSpeed);
            }, slideSpeed);
        });

        // MouseWheelEvent
        var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        $(document).on(mousewheelevent, function (e) {
            if (!(setWrap.is(':animated'))) {
                e.preventDefault();
                var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
                if (delta < 0) {
                    motionDown();
                } else {
                    motionUp();
                }
            }
        });

        // KeyEvent
        $('html').keydown(function (e) {
            if (setWrap.is(':animated')) {
                e.preventDefault();
            } else {
                switch (e.which) {
                case 38: // Key[↑]
                    e.preventDefault();
                    motionUp();
                    break;

                case 40: // Key[↓]
                    e.preventDefault();
                    motionDown();
                    break;
                }
            }
        });

        // FlickEvent
        var isTouch = ('ontouchstart' in window);
        setWrap.on({
            'touchstart': function (e) {
                if (setWrap.is(':animated')) {
                    e.preventDefault();
                } else {
                    this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
                    this.topBegin = parseInt($(this).css('top'));
                    this.top = parseInt($(this).css('top'));
                    this.touched = true;
                }
            },
            'touchmove': function (e) {
                if (!this.touched) {
                    return;
                }
                e.preventDefault();
                this.top = this.top - (this.pageY - (isTouch ? event.changedTouches[0].pageY : e.pageY));
                this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
            },
            'touchend': function (e) {
                if (!this.touched) {
                    return;
                }
                this.touched = false;

                if (((this.topBegin) - 30) > this.top) {
                    motionDown();
                } else if (((this.topBegin) + 30) < this.top) {
                    motionUp();
                }
            }
        });

        // ScrollUpEvent
        function motionUp() {
            var stageHeightU = setBase.height(),
                contTopUp = parseInt(setWrap.css('top')),
                moveTopUp = contTopUp + stageHeightU;
            $('input,textarea').blur();
            if (!(contTopUp === 0)) {
                setWrap.stop().animate({
                    top: moveTopUp
                }, scrollSpeed, scrollEasing);
                setNav.find('li.activeStage').removeClass('activeStage').prev().addClass('activeStage');

                var acvStageP = parseInt($('body').attr('data-page')),
                    setPrev = acvStageP - 1;
                $('body').attr('data-page', setPrev);
                if (downBtn == 'show') {
                    pagePos();
                }
                if (UpBtn == 'show') {
                    pagePos2();
                }
            }
            if (urlHash == 'on') {
                replaceHash();
            }
        }

        // ScrollDownEvent
        function motionDown() {
            var stageHeightD = setBase.height(),
                contTopDown = parseInt(setWrap.css('top')),
                moveTopDown = contTopDown - stageHeightD;
            $('input,textarea').blur();

            var contHeight = setWrap.height(),
                maxHeightAdj = -(contHeight - stageHeightD);

            if (!(contTopDown == maxHeightAdj)) {
                setWrap.stop().animate({
                    top: moveTopDown
                }, scrollSpeed, scrollEasing);
                setNav.find('li.activeStage').removeClass('activeStage').next().addClass('activeStage');

                var acvStageN = parseInt($('body').attr('data-page')),
                    setNext = acvStageN + 1;
                $('body').attr('data-page', setNext);
                if (downBtn == 'show') {
                    pagePos();
                }
                if (UpBtn == 'show') {
                    pagePos2();
                }
            }
            if (urlHash == 'on') {
                replaceHash();
            }
        }

        // SideNaviClick
        navList.click(function () {
            if (!(setWrap.is(':animated'))) {
                var crtIndex = navList.index(this),
                    crtHeight = $(window).height();
                setWrap.stop().animate({
                    top: -(crtHeight * crtIndex)
                }, scrollSpeed, scrollEasing);
                setNav.find('li.activeStage').removeClass('activeStage');
                $(this).addClass('activeStage');

                $('body').attr('data-page', crtIndex + 1);

                if (downBtn == 'show') {
                    pagePos();
                }
                if (UpBtn == 'show') {
                    pagePos2();
                }
                if (urlHash == 'on') {
                    replaceHash();
                }
            }
        });

        // PageDownBtnClick
        $('#pageDown a').click(function () {
            if (!(setWrap.is(':animated'))) {
                var navActive = setNav.find('li.activeStage');
                navActive.each(function () {
                    var navIndex = navList.index(this),
                        setNav = navIndex + 1;
                    if (!(setNav == navLength)) {
                        $(this).next().click();
                    }
                });
                if (urlHash == 'on') {
                    replaceHash();
                }
            }
        });

        function pagePos() {
            var pnAcv = coreNav.find('li.activeStage');
            pnAcv.each(function () {
                var pnIndexN = navList.index(this),
                    pnCountN = pnIndexN + 1;
                if (pnCountN == navLength) {
                    $('#pageDown').css({
                        display: 'none'
                    });
                } else {
                    $('#pageDown').css({
                        display: 'block'
                    });
                }
            });
        }

        // PageUpBtnClick
        $('#pageUp a').click(function () {
            if (!(setWrap.is(':animated'))) {
                var navActive = setNav.find('li.activeStage');
                navActive.each(function () {
                    var navIndex = navList.index(this),
                        setNav = navIndex + 7;
                    if (!(setNav == navLength)) {
                        $(this).prev().click();
                    }
                });
                if (urlHash == 'off') {
                    replaceHash();
                }
            }
        });

        function pagePos2() {
            var pnAcv = coreNav.find('li.activeStage');
            pnAcv.each(function () {
                var pnIndexN = navList.index(this),
                    pnCountN = pnIndexN + 7;
                if (pnCountN == navLength) {
                    $('#pageUp').css({
                        display: 'none'
                    });
                } else {
                    $('#pageUp').css({
                        display: 'block'
                    });
                }
            });
        }

        // HashReplace
        function replaceHash() {
            var pnAcv = coreNav.find('li.activeStage');
            pnAcv.each(function () {
                var pnIndexN = navList.index(this),
                    pnCountN = pnIndexN + 1;
                location.hash = setHash + pnCountN;
            });
        }
        if (urlHash == 'on') {
            replaceHash();
        }

        // OpeningFade
        $('body').css({
            visibility: 'visible',
            opacity: '0'
        }).animate({
            opacity: '1'
        }, 1000);

        // LoadPageMove
        if (url.indexOf(setHash) !== -1) {
            var numSplit = ((url.split(setHash)[1]) - 1);
            navList.eq(numSplit).click();
        }
    });

    // HashChangeEvent
    if (urlHash == 'on') {
        $(window).on('hashchange', function () {
            var stateUrl = document.URL,
                hashSplit = ((stateUrl.split(setHash)[1]) - 1);
            navList.eq(hashSplit).click();
        });
    }
});