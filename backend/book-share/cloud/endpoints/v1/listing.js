Parse.Cloud.define("v1_createListing", async (request) => {
    const { user_id, offering, demanding, swap_only } = request.params;
    if(!offering && !demanding) {
        throw new Error("either 'offering' or 'demanding' required")
    }

    var queryUser = new Parse.Query("User");
    let user = await queryUser.get(user_id);

    if (!user) {
        throw new Error("User not found")
    }

    var offeringBook
    if(offering) {
        var queryBook1 = new Parse.Query("Book");
        offeringBook = await queryBook1.get(offering);
        if(!offeringBook) {
            throw new Error("'offering' book not found")
        }
    }

    var demandingBook
    if(demanding) {
        var queryBook2 = new Parse.Query("Book");
        demandingBook = await queryBook2.get(demanding);
        if(!demandingBook) {
            throw new Error("'offering' book not found")
        }
    }

    if(!offering && swap_only) {
        throw new Error("'swap_only' cannot be true while only demanding")
    }

    var listingClass = Parse.Object.extend('Listing')
    var listing = new listingClass();

    listing.set("offering", offeringBook);
    listing.set("demanding", demandingBook);
    listing.set("swap_only", swap_only);
    listing.set("listed_by", user);

    await listing.save();

	return {
        success: true,
        message: "Listing Created"
    }
});

Parse.Cloud.define("v1_updateListings", async (request) => {
    const { listing_id, offering, demanding, swap_only } = request.params;

    var queryListing = new Parse.Query("Listing");
    let listing = await queryListing.get(listing_id);

    if (!listing) {
        throw new Error("Listing not found")
    }

    var offeringBook
    if(offering) {
        var queryBook1 = new Parse.Query("Book");
        offeringBook = await queryBook1.get(offering);
        if(!offeringBook) {
            throw new Error("'offering' book not found")
        }
        listing.set("offering", offeringBook);
    }

    var demandingBook
    if(demanding) {
        var queryBook2 = new Parse.Query("Book");
        demandingBook = await queryBook2.get(demanding);
        if(!demandingBook) {
            throw new Error("'offering' book not found")
        }
        listing.set("demanding", demandingBook);
    }

    if (listing.get("offering" && swap_only)) {
        listing.set("swap_only", swap_only);
    } else{
        if (swap_only) {
            throw new Error("'swap_only' cannot be true while only demanding")
        }
    }

    

    await listing.save();

	return {
        success: true,
        message: "Listing Updated"
    }
});

Parse.Cloud.define("v1_singleListings", async (request) => {
    const { listing_id} = request.params;

    var queryListing = new Parse.Query("Listing");
    queryListing.include("demanding")
    queryListing.include("offering")
    queryListing.include("listed_by")
    queryListing.include("demanding.author")
    queryListing.include("offering.author")
    let listing = await queryListing.get(listing_id);

    if (!listing) {
        throw new Error("Listing not found")
    }

	return {
        success: true,
        message: "Listing fetched",
        listing: listing
    }
});

Parse.Cloud.define("v1_getListings", async (request) => {
    const { user_id, offering, demanding, disable_swap_only } = request.params;

    var queryListing = new Parse.Query("Listing");
    queryListing.include("demanding")
    queryListing.include("offering")
    queryListing.include("listed_by")
    queryListing.include("demanding.author")
    queryListing.include("offering.author")

    if (user_id) {
        const userPointer = { __type: "Pointer", className: "_User", objectId: user_id }
        queryListing.equalTo("listed_by", userPointer)
    }

    if (offering) {
        const offeringPointer = { __type: "Pointer", className: "Book", objectId: offering }
        queryListing.equalTo("offering", offeringPointer)
    }

    if (demanding) {
        const demandingPointer = { __type: "Pointer", className: "Book", objectId: demanding }
        queryListing.equalTo("demanding", demandingPointer)
    }

    if(disable_swap_only) {
        queryListing.notEqualTo("swap_only", true)
    }

    let listings = await queryListing.find();

	return {
        success: true,
        message: "Listing fetched",
        listings: listings
    }
});

Parse.Cloud.define("v1_deleteListing", async (request) => {
    const { listing_id } = request.params;
    var queryListing = new Parse.Query("Listing");
    let listing = await queryListing.get(listing_id);
    await listing.destroy()
	return {
        success: true,
        message: "Listing destoryed"
    }
});
