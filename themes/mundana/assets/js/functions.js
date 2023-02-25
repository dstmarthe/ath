jQuery(document).ready(function () {
	$(window).scroll(function () {
		$(".topnav").toggleClass("scrollednav py-0", $(this).scrollTop() > 50);
	});
});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("nav").outerHeight();

$(window).scroll(function (event) {
	didScroll = true;
});

setInterval(function () {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);

function hasScrolled() {
	var st = $(this).scrollTop();

	// Make sure they scroll more than delta
	if (Math.abs(lastScrollTop - st) <= delta) return;

	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight) {
		// Scroll Down
		$("nav").removeClass("nav-down").addClass("nav-up");
		$(".nav-up").css("top", -$("nav").outerHeight() + "px");
	} else {
		// Scroll Up
		if (st + $(window).height() < $(document).height()) {
			$("nav").removeClass("nav-up").addClass("nav-down");
			$(".nav-up, .nav-down").css("top", "0px");
		}
	}

	lastScrollTop = st;
}

//$('.site-content').css('margin-top', $('header').outerHeight() + 'px');

/* window.addEventListener("scroll", function () {
	var sidebar = document.querySelector(".sidebar");
	var sidebarHeight = sidebar.offsetHeight;
	var windowHeight = window.innerHeight;
	var sidebarTop = sidebar.getBoundingClientRect().top;

	if (sidebarTop >= 0 && sidebarTop + sidebarHeight <= windowHeight) {
		sidebar.style.position = "fixed";
		sidebar.style.top = "0";
	} else if (sidebarTop < 0) {
		sidebar.style.position = "absolute";
		sidebar.style.top = "0";
	} else {
		sidebar.style.position = "absolute";
		sidebar.style.top = windowHeight - sidebarHeight + "px";
	}
});*/
