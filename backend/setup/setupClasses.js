const Parse = require('parse/node');
require('./connection')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const classCleanUp = false



const createClasses = async () => { 
    const schemaBook = new Parse.Schema('Book');
    const optionsBookName = { required: true };
    schemaBook.addString('name', optionsBookName);
    schemaBook.addPointer('author', 'Author');
    await schemaBook.save();

    const schemaListing = new Parse.Schema('Listing');
    const optionsListingUser = { required: true };
    schemaListing.addPointer('listed_by', '_User', optionsListingUser);
    schemaListing.addPointer('offering', 'Book');
    schemaListing.addPointer('demanding', 'Book');
    const optionsListingswap = { default: false };
    schemaListing.addBoolean('swap_only', optionsListingswap);
    await schemaListing.save();

    const schemaAuthor = new Parse.Schema('Author');
    const optionsAuthorName = { required: true };
    schemaAuthor.addString('name', optionsAuthorName);
    schemaAuthor.addFile('display_picture')
    await schemaAuthor.save();

    try {
        const schemaUser = new Parse.Schema('User');
        schemaUser.addString('name');
        await schemaUser.update();
    } catch (err) {

    }
}

const cleanClasses = async (passcode) => {
    if (passcode === 'bookshare') {
        console.log('Correct passcode')
        
        const schemaBook = new Parse.Schema('Book');
        schemaBook.delete()

        const schemaListing = new Parse.Schema('Listing');
        schemaListing.delete()
        
        const schemaAuthor = new Parse.Schema('Author');
        await schemaAuthor.purge()
        schemaAuthor.delete()
    } else {
        console.log('IncorrectCorrect passcode')
    }
}

if (classCleanUp) {
    readline.question(`Enter passcode: `, passcode => {
        readline.close()
        cleanClasses(passcode)
      })
} else {
    createClasses()
}