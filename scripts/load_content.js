// Code written by me without the use of AI; it took around 2 hours to get this all working as intended
// I have worked with jQuery in the past, but I used only vanilla JavaScript here
// This script dynamically loads the Navbar, Header, and Footer to save from changing on each page

document.addEventListener("DOMContentLoaded", function () {

    // Add new links to the navbar by adding new elements to this array, relative pathings for each page will be automatically determined
    var navLinks = [
        ["javascript:;", "☰ Xadrian's Site"], // It is necessary to have this link call Javascript with no actual code, otherwise this link will lead somewhere and won't work as intended
        ["/", "Home"],        
        ["/pages/games.html", "Odd Games"],                
        ["/pages/cities.html", "Homonymous Cities"],        
        ["/pages/wikipedia.html", "Strange Wikipedia Articles"] 
    ];

    // Add new footer boxes by adding new elements here, the second element in an array will indicate a hyperlink if present
    var footerItems = [
        ["Website by Xadrian Brumley"],
        ["No generative AI was used in the making of this website"],
        ["Website source code available here", "https://github.com/xbru1/website"]
    ];

    
    // Preparation
    const body = document.getElementsByTagName("body")[0];
    var header = document.createElement("h1");
    var headerDiv = document.createElement("div");
    var navbar = document.createElement("nav");
    var footer = document.createElement("footer");
    var depth = (window.location.pathname.split("/").length - 2); // Helps us calculate the relative path to all links in the navbar 
    var github = false;

    body.prepend(header);
    header.append(headerDiv);
    header.setAttribute("class", "construction glowing");
    headerDiv.append(document.createTextNode(document.getElementsByTagName("title")[0].textContent));
    body.prepend(navbar);
    body.append(footer);    

    // Extremely advanced solution to the unpleasant quirks of GitHub Pages
    if (window.location.href.includes("github")) {
        depth -= 1;
    }

    // The first link is always meant to expand the nav
    for (var i = 0; i < navLinks.length; i++) {
        // Calculate the relative path to each link
        for (var j = 1; j <= depth; j++) {

            if (i == 0) {
                break;
            }
            if (j % 2 == 0) {
                navLinks[i][0] = "/" + navLinks[i][0];
            }
            navLinks[i][0] = ".." + navLinks[i][0];
        }

        // Ensure all links are relative paths no matter what
        if (navLinks[i][0].charAt(0) == "/") {
            navLinks[i][0] = "." + navLinks[i][0];
        }

        // Add navbar links
        var a = document.createElement("a");
        a.setAttribute("href", navLinks[i][0]);
        a.append(document.createTextNode(navLinks[i][1]));
        navbar.append(a);
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
        } else {
            navbar.className += "expanded";
        }
    });
});