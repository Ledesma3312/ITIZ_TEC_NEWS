document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'MkjdY4DYnFOLdzL6JFXNQyY9XNJIvAIs'; // Tu clave API de The New York Times
  const newsContainer = document.getElementById('news-container');

  fetch(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const articles = data.results;

      articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const newsImage = document.createElement('img');
        newsImage.src = article.multimedia && article.multimedia.length > 0 ? article.multimedia[0].url : 'default-image.jpg'; // Imagen por defecto si no hay multimedia
        newsImage.alt = article.title;

        const newsCardContent = document.createElement('div');
        newsCardContent.className = 'news-card-content';

        const newsTitle = document.createElement('h3');
        newsTitle.textContent = article.title;

        const newsDescription = document.createElement('p');
        newsDescription.textContent = article.abstract;

        const newsLink = document.createElement('a');
        newsLink.href = article.url;
        newsLink.target = '_blank';
        newsLink.textContent = 'Leer más';

        newsCardContent.appendChild(newsTitle);
        newsCardContent.appendChild(newsDescription);
        newsCardContent.appendChild(newsLink);

        newsCard.appendChild(newsImage);
        newsCard.appendChild(newsCardContent);

        newsContainer.appendChild(newsCard);
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsContainer.textContent = 'Lo sentimos, no se pudieron cargar las noticias.';
    });
});

