// Code written by me without the use of AI; it took around 2 hours to get this all working as intended
// I have worked with jQuery in the past, but I used only vanilla JavaScript here
// This script dynamically loads the Navbar, Header, and Footer to save from it changing on each page

document.addEventListener("DOMContentLoaded", function () {

    // Add new links to the navbar by adding new elements to this array, relative pathings for each page will be automatically determined
    // [link, text, icon]
    var navLinks = [
        ["javascript:;", "Xadrian's Site", "fa-solid fa-square-caret-down"], // It is necessary to have this link call Javascript with no actual code, otherwise this link will lead somewhere and won't work as intended
        ["/", "Home", "fa-solid fa-house"],        
        ["/pages/games.html", "Odd Games", "fa-solid fa-gamepad"],
        ["/pages/cities.html", "Homonymous Cities", "fa-solid fa-city"],        
        ["/pages/wikipedia.html", "Strange Wikipedia Articles", "fa-brands fa-wikipedia-w"] 
    ];

    // Add new footer boxes by adding new elements here, the second element in an array will indicate a hyperlink if present
    var footerItems = [
        ["Website by Xadrian Brumley"],
        ["No generative AI was used in the making of this website"],
        ["Website source code available here", "https://github.com/xbru1/website"]
    ];

    // Links to embed in <head>
    var links = [
        ["preconnect", "https://fonts.googleapis.com", ""],
        ["preconnect", "https://fonts.gstatic.com", "anonymous"],
        ["stylesheet", "https://fonts.googleapis.com/css2?family=Science+Gothic:wght@100..900", ""]
    ];
    
    // Preparation
    const body = document.getElementsByTagName("body")[0];
    var header = document.createElement("h1");
    var headerDiv = document.createElement("div");
    var head = document.getElementsByTagName("head")[0];
    var favicon = document.createElement("link");
    var navbar = document.createElement("nav");
    var footer = document.createElement("footer");
    var fontScript = document.createElement("script");
    var depth = (window.location.pathname.split("/").length - 2); // Helps us calculate the relative path to all links in the navbar 
    var github = false;

    body.prepend(header);
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("href", findRelativePath("/assets/icon.png", depth));
    body.append(favicon);
    header.append(headerDiv);
    header.setAttribute("class", "construction glowing science-gothic-bold");
    headerDiv.append(document.createTextNode(document.getElementsByTagName("title")[0].textContent));
    body.prepend(navbar);
    body.append(footer);    
    fontScript.setAttribute("src", "https://kit.fontawesome.com/908306a721.js");
    fontScript.setAttribute("crossorigin", "anonymous");
    head.append(fontScript);

    for (var i = 0; i < links.length; i++) {
        var embed = document.createElement("link");
        embed.setAttribute("rel", links[i][0]);
        embed.setAttribute("href", links[i][1]);
        if (links[i][2]) {
            embed.setAttribute("crossorigin", links[i][2]);
        }
        head.append(embed);
    }

    // Extremely advanced solution to the unpleasant quirks of GitHub Pages
    if (window.location.href.includes("github")) {
        depth -= 1;
    }

    // The first link is always meant to expand the nav
    for (var i = 0; i < navLinks.length; i++) {
        // Calculate the relative path to each link
        if (i != 0) {
            navLinks[i][0] = findRelativePath(navLinks[i][0], depth);
        }
        /*for (var j = 1; j <= depth; j++) {
            if (i == 0) {
                break;
            }
            if (j % 2 == 0) {
                navLinks[i][0] = "/" + navLinks[i][0];
            }
            navLinks[i][0] = ".." + navLinks[i][0];
        }*/

        // Ensure all links are relative paths no matter what
        if (navLinks[i][0].charAt(0) == "/") {
            navLinks[i][0] = "." + navLinks[i][0];
        }

        // Add navbar links
        var a = document.createElement("a");
        var icon = document.createElement("i");
        icon.setAttribute("class", navLinks[i][2]);
        a.append(icon);
        a.setAttribute("href", navLinks[i][0]);
        a.append(document.createTextNode(navLinks[i][1]));
        navbar.append(a);

        var link = navLinks[i][0].split("/");
        if (link[link.length - 1] == window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]) {
            a.setAttribute("class", "active");
        }

        // TODO: Add breadcrumbs
    }

    // Add footer
    for (var i = 0; i < footerItems.length; i++) {        
        var div = document.createElement("div");

        // A second element in a footer item indicates that it is a hyperlink, so that must be accounted for
        if (footerItems[i].length > 1) {
            var a = document.createElement("a");
            a.append(document.createTextNode(footerItems[i][0]));
            a.setAttribute("href", footerItems[i][1]);
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
            div.append(a);
            footer.append(div);
        } else {
            div.append(document.createTextNode(footerItems[i][0]));
            footer.append(div);
        }
        footer.setAttribute("class", "construction");
    }

    // Expand the navbar at lower widths when the top bar is clicked
    navbar.firstChild.addEventListener("click", function() {
        if (navbar.className.includes("expanded")) {
            navbar.className = "";
            document.getElementsByClassName("fa-square-caret-up")[0].setAttribute("class", "fa-square-caret-down svg-inline--fa");
        } else {
            navbar.className += "expanded";
            document.getElementsByClassName("fa-square-caret-down")[0].setAttribute("class", "fa-square-caret-up svg-inline--fa");
        }
    });
});

function findRelativePath(link, depth) {
    for (var i = 1; i <= depth; i++) {
        if (i % 1 == 0) {
            link = "/" + link;
        }
        link = ".." + link;
    }
    return link;
}