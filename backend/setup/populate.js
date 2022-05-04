const Parse = require('parse/node');
require('./connection')
const random_name = require('node-random-name');
const randomMovieNames = require('random-movie-names');



async function populate_book() {
    var book_name = randomMovieNames();
    var book_name_fixed = book_name.replace(/([A-Z])/g, ' $1').trim()
    var queryAuthor = new Parse.Query("Author");
    authors = await queryAuthor.find()
    const random = Math.floor(Math.random() * authors.length);
    const author = authors[random]
    var userBook = Parse.Object.extend("Book")
    var book = new userBook();
    book.set("name", book_name_fixed);
    book.set("author", author);
    console.log(book_name)
    book = await book.save();
}


async function populate_user() {
    person_name = random_name(); // -> "Brittny Kraska"
    email_id = person_name.replace(/\s/g, '').toLowerCase() + "@gmail.com";
    var userClass = Parse.Object.extend("User")
    var user = new userClass();
    user.set("username", email_id);
    user.set("password", "Test1234##");
    user.set("name", person_name);

    console.log(email_id)
    user = await user.save();
}

async function populate_author() {
    author_name = random_name(); // -> "Brittny Kraska"
    var authorClass = Parse.Object.extend("Author")
    var author = new authorClass();
    author.set("name", author_name);
    console.log(author_name)
    author = await author.save();
}

async function populate_listing() {
    // Query user
    var queryUser = new Parse.Query("User");
    queryUser.skip(Math.floor(Math.random() * 500))
    user = await queryUser.first()

    // Query first book
    var queryBook1 = new Parse.Query("Book");
    queryBook1.skip(Math.floor(Math.random() * 50))
    book1 = await queryBook1.first()

    exchangeChoice = Math.floor(Math.random() * 3)
    var listingClass = Parse.Object.extend("Listing")
    var listing = new listingClass();
    listing.set("listed_by", user);

    switch (exchangeChoice) {
        case 0:
            listing.set("demanding", book1);
            break
        case 1:
            listing.set("offering", book1);
            break
        case 2:
            listing.set("demanding", book1);

            console.log("quering 2nd book")
            var queryBook2 = new Parse.Query("Book");
            queryBook2.skip(Math.floor(Math.random() * 50))
            var book2 = await queryBook2.first()

            if (book1.id == book2.id) {
                console.log("same")
                return
            } else {
                console.log("different")
            }

            listing.set("offering", book2);

            swapChoice = Math.floor(Math.random() * 2)
            if (swapChoice == 1) {
                listing.set("swap_only", true);
            }
            break
    }
    await listing.save();
    console.log('saved')
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

async function main() {
    for (var i = 0; i < 50; i++) {
        //populate_user()
        //populate_author()
        //populate_book()
        populate_listing()
        //await delay(1000);
    }
}

main()


