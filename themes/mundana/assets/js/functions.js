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

var summaryInclude = 180;
var fuseOptions = {
	shouldSort: true,
	includeMatches: true,
	includeScore: true,
	tokenize: true,
	location: 0,
	distance: 100,
	minMatchCharLength: 1,
	keys: [
		{ name: "title", weight: 0.45 },
		{ name: "contents", weight: 0.4 },
		{ name: "tags", weight: 0.1 },
		{ name: "categories", weight: 0.05 },
	],
};

// =============================
// Search
// =============================

var inputBox = document.getElementById("search-query");
if (inputBox !== null) {
	var searchQuery = param("q");
	if (searchQuery) {
		inputBox.value = searchQuery || "";
		executeSearch(searchQuery, false);
	} else {
		document.getElementById("search-results").innerHTML =
			'<p class="search-results-empty">Please enter a word or phrase above, or see <a href="/tags/">all tags</a>.</p>';
	}
}

function executeSearch(searchQuery) {
	show(document.querySelector(".search-loading"));

	fetch("/index.json").then(function (response) {
		if (response.status !== 200) {
			console.log(
				"Looks like there was a problem. Status Code: " + response.status
			);
			return;
		}
		// Examine the text in the response
		response
			.json()
			.then(function (pages) {
				var fuse = new Fuse(pages, fuseOptions);
				var result = fuse.search(searchQuery);
				if (result.length > 0) {
					populateResults(result);
				} else {
					document.getElementById("search-results").innerHTML =
						'<p class="search-results-empty">No matches found</p>';
				}
				hide(document.querySelector(".search-loading"));
			})
			.catch(function (err) {
				console.log("Fetch Error :-S", err);
			});
	});
}

function populateResults(results) {
	var searchQuery = document.getElementById("search-query").value;
	var searchResults = document.getElementById("search-results");

	// pull template from hugo template definition
	var templateDefinition = document.getElementById(
		"search-result-template"
	).innerHTML;

	results.forEach(function (value, key) {
		var contents = value.item.contents;
		var snippet = "";
		var snippetHighlights = [];

		snippetHighlights.push(searchQuery);
		snippet = contents.substring(0, summaryInclude * 2) + "&hellip;";

		//replace values
		var tags = "";
		if (value.item.tags) {
			value.item.tags.forEach(function (element) {
				tags =
					tags + "<a href='/tags/" + element + "'>" + "#" + element + "</a> ";
			});
		}

		var output = render(templateDefinition, {
			key: key,
			title: value.item.title,
			link: value.item.permalink,
			tags: tags,
			categories: value.item.categories,
			snippet: snippet,
		});
		searchResults.innerHTML += output;

		snippetHighlights.forEach(function (snipvalue, snipkey) {
			var instance = new Mark(document.getElementById("summary-" + key));
			instance.mark(snipvalue);
		});
	});
}

function render(templateString, data) {
	var conditionalMatches, conditionalPattern, copy;
	conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
	//since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
	copy = templateString;
	while (
		(conditionalMatches = conditionalPattern.exec(templateString)) !== null
	) {
		if (data[conditionalMatches[1]]) {
			//valid key, remove conditionals, leave contents.
			copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
		} else {
			//not valid, remove entire section
			copy = copy.replace(conditionalMatches[0], "");
		}
	}
	templateString = copy;
	//now any conditionals removed we can do simple substitution
	var key, find, re;
	for (key in data) {
		find = "\\$\\{\\s*" + key + "\\s*\\}";
		re = new RegExp(find, "g");
		templateString = templateString.replace(re, data[key]);
	}
	return templateString;
}

// Helper Functions
function show(elem) {
	elem.style.display = "block";
}
function hide(elem) {
	elem.style.display = "none";
}
function param(name) {
	return decodeURIComponent(
		(location.search.split(name + "=")[1] || "").split("&")[0]
	).replace(/\+/g, " ");
}
