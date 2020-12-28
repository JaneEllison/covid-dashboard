import newsData from './newsData.js';

const newsContainer = document.querySelector('.news__container');
const newsCards = document.querySelector('.news__cards');
const fullscreenBtn = document.querySelector('.fullscreen__news');

const getCards = async() => {

  newsData.forEach((post) => createNewsCards(post));
}

const createNewsCards = (post) => {
  const newsCard = document.createElement('div');
  const newsCardHeader = document.createElement('div');
  const newsCardImage = document.createElement('div');
  const newsCardText = document.createElement('div');
  const newsOriginalLink = document.createElement('div');
  
  newsCard.className = 'news__card';
  newsCardHeader.className = 'news__card_header';
  newsCardImage.className = 'news__card_image';
  newsCardText.className = 'news__card_text';
  newsOriginalLink.className = 'news__card_button'

  if(post.urlToImage !== '') {
    newsCardImage.innerHTML = `<img src="${post.urlToImage}" class="post__img">`
  } else {
    newsCardImage.innerHTML = `<img src="../assets/images/bg-covid.jpeg" class="post__img">`
  }
  newsCardHeader.innerHTML = `<h3>${post.title}</h3>`;
  newsCardText.innerText = post.description;
  newsOriginalLink.innerHTML = `<a href = "${post.url}" target="_blank"target="_blank" class = "post__link"> Go to original post</a>`;

  newsCards.append(newsCard);
  newsCard.append(newsCardHeader, newsCardImage, newsCardText, newsOriginalLink);
};

getCards();

fullscreenBtn.addEventListener('click', () => {
  if(!document.fullscreen) {
    newsContainer.requestFullscreen();
    fullscreenBtn.style.top = '0.5rem';
    fullscreenBtn.style.right = '0.5rem';
  } else {
    document.exitFullscreen();
    fullscreenBtn.style.top = '-0.4rem';
    fullscreenBtn.style.right = '-0.4rem';
  };
});