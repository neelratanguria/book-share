Parse.Cloud.define("v1_createAuthor", async (request) => {
    const { name, display_picture } = request.params;

    var queryAuthor = new Parse.Query("Author");
    queryAuthor.equalTo("name", name)
    let existingAuthor = await queryAuthor.first();

    if (existingAuthor) {
        throw new Error("Author already exist")
    }

    var authorClass = Parse.Object.extend('Author')
    var author = new authorClass();

    author.set("name", name);
    await author.save();

    return {
        success: true,
        message: "Author Created"
    }
});

Parse.Cloud.define("v1_updateAuthor", async (request) => {
    const { author_id, name, profile_picture } = request.params;

    var queryAuthor = new Parse.Query("Author");
    let author = await queryAuthor.get(author_id);

    if (!author) {
        throw new Error("Author not found")
    }

    author.set("name", name)
    await author.save();

    return {
        success: true,
        message: "Author Updated"
    }
});

Parse.Cloud.define("v1_getAuthor", async (request) => {
    const { author_id } = request.params;

    var queryAuthor = new Parse.Query("Author");
    let author = await queryAuthor.get(author_id);

    if (!author) {
        throw new Error("Listing not found")
    }

    return {
        success: true,
        message: "author fetched",
        author: author
    }
});

Parse.Cloud.define("v1_getAuthors", async (request) => {
    const { name } = request.params;

    var queryAuthor = new Parse.Query("Author");
    if (name) {
        queryAuthor.fullText("name", name)
    }
    
    let authors = await queryAuthor.find();
    return {
        success: true,
        message: "Listing fetched",
        authors: authors
    }
});

Parse.Cloud.define("v1_deleteAuthor", async (request) => {
    const { author_id } = request.params;
    var queryAuthor = new Parse.Query("Author");
    let author = await queryAuthor.get(author_id);
    await author.destroy()
    return {
        success: true,
        message: "Author destroyed"
    }
});
