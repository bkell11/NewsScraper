$(document).ready(function () {
    //     // Setting a reference to the article-container div where all the dynamic content will go
    //     // Adding event listeners to any dynamically generated "save article"
    //     // and "scrape new article" buttons
    //     var articleContainer = $(".article-container");
    $(document).on("click", "#save-button", handleArticleSave);
    $(document).on("click", "#scrape", handleArticleScrape);
    //     $(".clear").on("click", handleArticleClear);

    function handleArticleSave() {
        // This function is triggered when the user wants to save an article
        // When we rendered the article initially, we attached a javascript object containing the headline id
        // to the element using the .data method. Here we retrieve that.

        var id = $(this).data("id");
        var savedData = {
            isSaved: true
        }
        // Remove card from page
        // Using a patch method to be semantic since this is an update to an existing record in our collection
        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: savedData,
            success: function (msg) {
                location.reload();
            }
        });
    };

    function handleArticleScrape() {
        console.log("button clicked");
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/scrape", function (req, res) {
            location.reload();
        });
    };

    //     function handleArticleClear() {
    //       $.get("api/clear").then(function() {
    //         articleContainer.empty();
    //         initPage();
    //       });
    //     }
});
