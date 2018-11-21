/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        // This tests to make sure all URL are defined and are not empty,
        // it loops through each feed in the allFeeds array and checks
        // the URL and URL length

        it('URL defined and not empty', function(){
            for (let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        })


        //  This tests to make sure all feed names are defined and are not empty
        //  it loops through each feed in the allFeeds array and checks the name
        //  and name length

        it('name defined and not empty', function() {
            for (let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        })
    });

    // The menu test suite
    describe('The menu', function(){
        //body variable declared outside for both test
        let body = document.querySelector('body');
        
        // This test to ensure that the menu is hidden by default, 
        // it checks if the menu has the class 'menu-hidden' 
        it('is  hidden', function(){
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        })

        //  This test ensures the menu is visible when clicked and hidden
        //  when clicked again, it calls the click() method on menu and checks
        //  that 'menu-hidden' class is absent, then calls the click() method again
        //  and checks that the 'menu-hidden' class is present 
         it('toggles show and hide', function(){
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBeFalsy();
            
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
            
         })
    })

    // Initial Entries suite
    describe('Initial Entries', function(){
        const feed = document.querySelector('.feed');

        // loadFeed function called before the test is run to load
        // the data from each feed.
        // accepts a callback done() to run asynchronously 
        beforeEach(function(done){
            loadFeed(0, done);
        });
        
        //Test after loadFeed() is run, it test to ensure HTML contains at least 
        // a feed with entry
        it('contains feed with entry', function() {
            expect($('.feed .entry').length).not.toBe(0);
        })
    })

    // New feed selection suite
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        const firstFeed = [];

        //runs the loadFeed function, then adds the entry loaded
        // to the firstfeed array, then calls the loadFeed function
        // to load a new feed (Asynchronous)
        beforeEach(function(done){
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry) {
                firstFeed.push(entry.innerText);
            });
            loadFeed(1, done);
        });
        
        //This tests to ensure the program loads a different feed,
        // it checks if the first feed is different from the second
        // after the loadFeed function is called a second time to load new feed
        it('content changes', function(done){
            Array.from(feed.children).forEach(function(entry, index){
                expect(entry.innerText === firstFeed[index]).toBe(false);
                done();
            })
        })
    })
}());
