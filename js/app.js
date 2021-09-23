/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/*
 * Define Global Variables
 */
let myUl = document.getElementById('navbar__list');
let sections = document.querySelectorAll('section');
// save all created links in this array
let links = [];
/*
 * End Global Variables
 * /

/*build the nav function
*addEventListner using scrollIntoView function
 to scrol smoothly to the selected section
*/
function navigationMenur() {
    for (let i = 0; i < sections.length; i++) { // for sections loop
        let sectionsName = sections[i].getAttribute('id'); // assign sections[i] to SectionsName variable
        var myList = document.createElement('li'); // create li
        var myLink = document.createElement('a'); // create anchor
        myLink.setAttribute('href', '#' + sectionsName); // set sectionsName to link
        myLink.innerHTML = sections[i].getAttribute('data-nav'); // set section's data-nav as inner text of section
        // push created link to links array to use it in observer
        links.push(myLink);

        /*********scrollIntoView Event  ***********/
        myLink.addEventListener('click', function(event) {
                event.preventDefault();
                sections[i].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            })
            /*********append childs to ul to make dynamic navigation 
             * depends on section number  ***********/
        myList.appendChild(myLink);
        myUl.appendChild(myList);
    }
}


/*function that detect the active section using isIntersecting and abserver API*/
function isActiveSection() {
    let options = { root: null, rootMargin: '0px', threshold: 0.3 };
    let callback = (entries) => {
            // Add class 'active' to section when near top of viewport
            if (entries[0].isIntersecting) { // is this section active?
                sections.forEach((sec) => { // loop sections
                    if (sec.classList.contains('your-active-class')) { //add class
                        sec.classList.remove('your-active-class'); //remove class
                    }
                });
                // Set sections as active
                entries[0].target.classList.add('your-active-class');

                let link = null;
                for (let i = 0; i < links.length; i++) {
                    links[i].classList.remove('your-active-link');
                    if (links[i].innerHTML == entries[0].target.getAttribute('data-nav')) {
                        link = links[i].classList.add("your-active-link")
                    } //end if links.text = active section
                } //end loops in links  
            }; // end if section isIntersecting
        } //end callback function

    sections.forEach((section) => {
        let observer = new IntersectionObserver(callback, options);
        observer.observe(section);
    });
} //end function

/**call main function */
navigationMenur();
isActiveSection();