Parse.Cloud.define("v1_createBook", async (request) => {
    const { name, author_id } = request.params;

    let author
    if (author_id) {
        var queryAuthor = new Parse.Query("Author");
        author = await queryAuthor.get(author_id);

        if (!author) {
            throw new Error("Author not found")
        }
    }

    var bookClass = Parse.Object.extend('Book')
    var book = new bookClass();

    book.set("name", name);
    book.set("author", author);

    await book.save();

    return {
        success: true,
        message: "Book Created"
    }
});

Parse.Cloud.define("v1_updateBook", async (request) => {
    const { book_id, name, author_id } = request.params;

    var queryBook = new Parse.Query("Book");
    let book = await queryBook.get(book_id);

    if (!book) {
        throw new Error("Book not found")
    }

    if (author_id) {
        var queryAuthor = new Parse.Query("Author");
        author = await queryAuthor.get(author_id);
        if (!author) {
            throw new Error("Author not found")
        }
        book.set("author", author);
    }

    if (name) {
        book.set("name".name)
    }

    await book.save();

    return {
        success: true,
        message: "Book Updated"
    }
});

Parse.Cloud.define("v1_singleBook", async (request) => {
    const { book_id } = request.params;

    var queryBook = new Parse.Query("Book");
    queryBook.include("author")
    let book = await queryBook.get(book_id);

    if (!book) {
        throw new Error("Book not found")
    }

    return {
        success: true,
        message: "Book fetched",
        book: book
    }
});

Parse.Cloud.define("v1_getBooks", async (request) => {
    const { name, author_id } = request.params;

    var queryBook = new Parse.Query("Book");

    if (name) {
        queryBook.fullText("name", name)
    }

    if (author_id) {
        const authorPointer = { __type: "Pointer", className: "Author", objectId: author_id }
        queryBook.equalTo("author", authorPointer)
    }

    let books = await queryBook.find();

    return {
        success: true,
        message: "Books fetched",
        book: books
    }
});

Parse.Cloud.define("v1_deleteBook", async (request) => {
    const { book_id } = request.params;
    var queryBook = new Parse.Query("Book");
    let book = await queryBook.get(book_id);
    await book.destroy()
    return {
        success: true,
        message: "Book destoryed"
    }
});
