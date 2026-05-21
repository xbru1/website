document.addEventListener("DOMContentLoaded", function () {
    // Add new links to the navbar by adding new elements to this array, relative pathings for each page will be automatically determined
    var navLinks = [
        ["/", "Home"],        
        ["/pages/page.html", "Test Page"],        
        ["/pages/wikipedia.html", "Strange Wikipedia Articles"],        
        ["/", "NYI"]
    ];

    // Add new footer boxes by adding new elements here, the second element in an array will indicate a hyperlink
    var footerItems = [
        ["Pages and styling to be finished soon"],
        ["Website by Xadrian Brumley"],
        ["These boxes are pretty cool"],
        ["Website source code here", "https://github.com/xbru1/website"]
    ];

    
    // Preparation
    const body = document.getElementsByTagName("body")[0];
    var header = document.createElement("h1");
    var headerDiv = document.createElement("div");
    var navbar = document.createElement("nav");
    var footer = document.createElement("footer");
    var depth = (window.location.pathname.split("/").length - 2);

    body.prepend(header);
    header.append(headerDiv);
    header.setAttribute("class", "construction glowing");
    headerDiv.append(document.createTextNode(document.getElementsByTagName("title")[0].textContent));
    body.prepend(navbar);
    body.append(footer);

    for (var i = 0; i < navLinks.length; i++) {
        // Calculate the relative path to each link
        for (var j = 1; j <= depth; j++) {
            if (j % 2 == 0) {
                navLinks[i][0] = "/" + navLinks[i][0];
            }
            navLinks[i][0] = ".." + navLinks[i][0];
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

        footer.setAttribute("class", "construction glowing");
    }
    console.log("Loaded");
    console.log(navLinks);
});