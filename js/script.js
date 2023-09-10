function fetchNews() {
    const link = document.getElementById('linkInput').value;
    
    // Call your API here (using fetch or any other method)
    // Ensure the API returns JSON data
    
    // Assuming apiData is the JSON response


    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';

    // Compare headlines and add similar articles
    apiData.forEach(article => {
        if (isSimilar(link, article.headline)) {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            const image = document.createElement('img');
            image.src = article.image;

            const headline = document.createElement('h2');
            headline.textContent = article.headline;

            const description = document.createElement('p');
            description.textContent = article.description;

            articleDiv.appendChild(image);
            articleDiv.appendChild(headline);
            articleDiv.appendChild(description);

            articlesContainer.appendChild(articleDiv);
        }
    });
}

function isSimilar(link, headline) {
    // Implement your comparison logic here
    // This can be a simple string comparison or more complex logic
    // Return true if similar, false otherwise
    // Example:
    // return headline.includes(link);
    // Remember to handle cases like capitalization or punctuation
}
