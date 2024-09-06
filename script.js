document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'MkjdY4DYnFOLdzL6JFXNQyY9XNJIvAIs';
  const newsContainer = document.getElementById('news-container');
  
  fetch(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const articles = data.results;

      if (articles && articles.length > 0) {
        articles.forEach(article => {
          const newsCard = document.createElement('div');
          newsCard.className = 'news-card';

          const newsImage = document.createElement('img');
          newsImage.src = article.multimedia && article.multimedia.length > 0 ? article.multimedia[0].url : 'default-image.jpg';

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
      } else {
        newsContainer.textContent = 'No hay noticias disponibles.';
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsContainer.textContent = 'Lo sentimos, no se pudieron cargar las noticias.';
    });

  // Manejo del formulario de suscripción
  const subscribeForm = document.querySelector('#subscribe form');
  
  subscribeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email').value;

    // Aquí podrías hacer una llamada a tu backend para enviar el correo
    console.log(`Correo para suscripción: ${emailInput}`);

    // Simulación de envío de noticias
    alert(`Noticias enviadas a: ${emailInput}`);

    // Limpiar el campo de correo
    subscribeForm.reset();
  });
});

// Desplazamiento suave al hacer clic en los enlaces de navegación
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = target.getBoundingClientRect().top + window.pageYOffset - 80; // Ajusta el desplazamiento
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  });
});
