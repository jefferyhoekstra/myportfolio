// initialization
const express = require("express");
const server = express();
const listings = require("./data/listings");
const port = 3000;
const downtown = listings.downtown

// middleware
server.use(express.static("public"));
server.set("view engine", "ejs");

// server listen
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

server.get("/:neighborhood?", (request, response) => {
    const { neighborhood } = request.params;
    const { sort } = request.query;
    const neighborhoodListings = listings[neighborhood];
    if (sort === "ascending") {
        neighborhoodListings.sort(
            (a, b) =>
                a.price.replace("$", "").replace(",", "") -
                b.price.replace("$", "").replace(",", "")
        );
    } else if (sort === "descending") {
        neighborhoodListings.sort(
            (a, b) =>
                b.price.replace("$", "").replace(",", "") -
                a.price.replace("$", "").replace(",", "")
        );
    }
    response.render("neighborhoodPage", { data: neighborhoodListings, data1: neighborhood });
});

server.get("/:neighborhood/:id?", (request, response) => {
    const {neighborhood, id} = request.params;
    const listing = listings[neighborhood].find((list) => list.id === id);
    response.render("listingPage", {listing});
});