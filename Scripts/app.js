/* File: app.js */
/* Author: Haris Siddiqi */
/* COMP125 Assignment 2*/
/* Description: Functions to add functionality to the site */

"use strict";
// IIFE -Immediately Ivoked Function Expression
(function(){
    // Hightlights active navbar links
    function highlightActiveLink() 
    {
        let title = document.title;

        title = title.toLowerCase();

        console.log(`The title of the page is ${title}`);

        let navAnchors = document.querySelectorAll("li a");

        for (const anchor of navAnchors) 
        {

            let anchorString = anchor.getAttribute("href");
            anchorString = anchorString.substr(0, anchorString.length - 5);

            if ((title === "projects") && (anchorString === "services") || (title === "about") && (anchorString === "index") || (title === anchorString)) 
            {
                anchor.className = "nav-link active";
            }
        }

        return title;
    }

    // Adds text to index.html (old way)
    /*
    function addParagraphsToJumbotron() 
    {
        // step 1 hook into the spot (element) on the page
        let jumbotron = document.getElementsByClassName("jumbotron")[0];

        if (jumbotron) 
        {
            // back to step 2 - create a new element
            let newDiv = document.createElement("div");

            // step 3 - configure
            newDiv.innerHTML =
                `
                <p>\n</p>
                <p>
                    My name is Haris Siddiqi and I am a second semester software engineering student at Centennial College.
                    My academic and professional goals are:
                </p>
                <p>- Performing exceptionally in my courses</p>
                <p>- Getting internship and work experience</p>
                <p>- Choosing a niche to specialize in within software development</p>

                <p>-------------</p>
                <p>
                    The technologies I am competent in include:
                </p>
                <p>- HTML, CSS, JS</p>
                <p>- Python (soon!)</p>
                <p>- C#</p>
                <p>- Unix/Linux</p>
                <p>- SQL</p>
                `;
            // step 4 attach the new element
            jumbotron.appendChild(newDiv);
            return true;
        }
        return false;
    }
    */

    // Adds functionality to form
    function validateForm()
    {
        let contactForm = document.forms[0];

        if(contactForm)
        {
            contactForm.noValidate = true;

            let errorMessage = document.getElementById("errorMessage");

            let firstName = document.getElementById("firstName");
            firstName.addEventListener("blur", (event) => 
            {
                if(firstName.value.length < 2)
                {
                    firstName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a Valid First Name with a length of 2 or more characters"; 
                }
                else
                {
                    errorMessage.hidden = true;
                }
            });


            // Creates a "hook" or reference to the button element with an id of "submitButton"
            let submitButton = document.getElementById("submitButton");

            submitButton.addEventListener("click", (event) =>
            {
                event.preventDefault();
                console.log("Submit Button Clicked");
            });
        }
        return false;
    }

    // Adds text to services.html
    /*
    function addtexttoservices()
    {
        // step 1 hook into the spot (element) on the page
        let projects_container = document.getElementsByClassName("projects-container")[0];

        if (projects_container) 
        {
            // back to step 2 - create a new element
            let newDiv = document.createElement("div");

            // step 3 - configure
            newDiv.innerHTML =
                `
                <p id="projects-text">Implemented a rational number class in C#.</p>
                <img src="./Assets/images/rationalclass.jpg" alt="rational class">
                <p id="projects-text">Made a fully responsive landing page.</p>
                <img src="./Assets/images/landingpage.jpg" alt="landing page">
                <p id="projects-text">Completed CSS3 design course.</p>
                <img src="./Assets/images/css30days.jpg" alt="css3 course" style="margin-bottom: 100px;"> 
                `;
            // step 4 attach the new element
            projects_container.appendChild(newDiv);
            return true;
        }
        return false;
    } */

    // Loads footer into page using AJAX
    function loadFooter() {
        // Create object
        console.log("Loading footer...");
        let footerRaw = new XMLHttpRequest();

        // Gets data and send
        footerRaw.open("GET", "./Views/partials/footer.html")
        footerRaw.send();

        // Load data
        footerRaw.addEventListener("readystatechange", function () {
            if ((footerRaw.readyState === 4) && (footerRaw.status === 200)) {
                let footer = document.getElementsByTagName("footer")[0];
                let footerData = footerRaw.responseText;
                footer.innerHTML = footerData;
            }
        });
    }

    // Loads header into page using AJAX
    function loadHeader() {
        // Create object
        console.log("Loading header...");
        let headerRaw = new XMLHttpRequest();

        // Gets data and send
        headerRaw.open("GET", "./Views/partials/header.html")
        headerRaw.send();

        // Load data
        headerRaw.addEventListener("readystatechange", function () {
            if ((headerRaw.readyState === 4) && (headerRaw.status === 200)) {
                let header = document.getElementsByTagName("header")[0];
                let headerData = headerRaw.responseText;
                header.innerHTML = headerData;
            }
        });
    }

    // Load paragraphs into page using AJAX
    function addParagraphs() {
        console.log("Paragraphs Loading...");

        // Creates object
        let parText = new XMLHttpRequest();

        // Get data and send
        parText.open("GET", "Scripts/paragraphs.json"); 
        parText.send();

        // Load data
        parText.addEventListener("readystatechange", function () {
            if ((parText.readyState === 4) && (parText.status === 200)) {
                let rawParagraph = JSON.parse(parText.responseText);
                let paragraphArray = rawParagraph.Paragraphs;

                // Loop through classnames
                let classArray = ["welcome", "services"];
                for (name of classArray) {
                    // Insert text at appropriate point
                    let variable = document.getElementsByClassName(name)[0];
                    if (variable = document.getElementsByClassName("welcome")[0]) {
                        document.getElementsByClassName("welcome")[0].innerHTML = paragraphArray[0].welcome;
                    } else if (variable = document.getElementsByClassName("services")[0]) {
                        document.getElementsByClassName("services")[0].innerHTML = paragraphArray[0].services;
                    }
                }
            }
        });
    }

    // Call functions
    function Start()
    {
       console.log('%cApp Started...', "color:white; font-size: 24px;");   
       loadFooter();
       loadHeader();
       addParagraphs();
       let title = highlightActiveLink();
       let formValidated = validateForm();
    }

    window.addEventListener("load", Start);
})();
