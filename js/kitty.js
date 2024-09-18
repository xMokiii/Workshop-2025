document.addEventListener("DOMContentLoaded", function () {
    const catImage = document.getElementById("cat-image");
    const newCatButton = document.getElementById("new-cat-button");

    // Function to fetch a random cat image
    function fetchRandomCat() {
        fetch("https://api.thecatapi.com/v1/images/search")
            .then(response => response.json())
            .then(data => {
                const imageUrl = data[0].url;
                catImage.src = imageUrl;
            })
            .catch(error => console.error('Error fetching cat:', error));
    }

    // Fetch a random cat image on page load
    fetchRandomCat();

    // Add click event listener to the button
    newCatButton.addEventListener("click", fetchRandomCat);
});