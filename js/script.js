async function fetchNews() {
    const link = document.getElementById('linkInput').value;
    const response = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=18e5220c0d3d46fcadd1eceb8c065451");
    const apiData = await response.json();


const articlesContainer = document.getElementById('articles');

    // Compare headlines and add similar articles
    apiData.forEach(article => {
        if (isSimilar(link, article.headline)) {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            const image = document.createElement('img');
            image.src = article.urlToImage;

            const headline = document.createElement('h2');
            headline.textContent = article.title;

            const description = document.createElement('p');
            description.textContent = article.description;

            articleDiv.appendChild(image.src);
            articleDiv.appendChild(headline.textContent);
            articleDiv.appendChild(description.textContent);

            articlesContainer.appendChild(articleDiv);
        }
    });
}

function isSimilar(link, headline) {
    const cleanLink = link.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase(); // Remove special characters and convert to lowercase
    const cleanHeadline = headline.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase(); // Same for headline

    const maxDistance = Math.max(cleanLink.length, cleanHeadline.length); // Maximum possible distance
    const distance = levenshteinDistance(cleanLink, cleanHeadline);

    const similarityRatio = 1 - (distance / maxDistance);

    return similarityRatio > 0.7; // Adjust the threshold as needed
}

function levenshteinDistance(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = s1[i - 1] !== s2[j - 1] ? 1 : 0;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[m][n];
}