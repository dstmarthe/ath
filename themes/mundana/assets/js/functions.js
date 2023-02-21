jQuery(document).ready(function () {
	$(window).scroll(function () {
		$(".topnav").toggleClass("scrollednav py-0", $(this).scrollTop() > 50);
	});
});

window.addEventListener("scroll", function () {
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
});
