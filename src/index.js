import './css/styles.css';
import ApiService from './fetchPhoto.js'
import LoadMoreBtn from './components/LoadMoreBtn';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";


const inputText = document.querySelector('input');
const form = document.querySelector('form');
const btn = document.querySelector('button');
const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', { 
   
   captionsData: 'alt',
   captionPosition: 'bottom',
   captionDelay: 250,
   
 });



const URL = 'https://pixabay.com/api/'
const API_KEY = '35828732-80dbae6f7a9b2a665dfdc53c4'

const apiService = new ApiService()

const loadMore = new LoadMoreBtn({
    selector: "#load-more",
    isHidden: true,
})
console.log(apiService);

loadMore.button.addEventListener("click", fetchMorePhoto);

form.addEventListener("submit", onSubmit)



function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;

  loadMore.show();

  apiService.resetPage();
  clearHTML();

    apiService.query = form.elements.searchQuery.value;  
  console.log(apiService);
   
 
  getPhotoMarkup()``

  inputText.value = ""
    // .catch(onError).finally(() => form.reset())
}
    

async function getPhotoMarkup() { 
  loadMore.disable();
  return await apiService.getfetchPhoto().then(({ hits, totalHits }) => {
    //  console.log(hits)
    if (hits.length === 0) {
      loadMore.hide()
      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }else if (hits.length < 40) {
      loadMore.hide()
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    }
    // console.log(totalHits);

   return  createMarkup(hits)
    lightbox.refresh();
   
    
    
  }).catch(onError)
}

async function fetchMorePhoto() {
  await getPhotoMarkup();
  
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}


// async function getTotalHits() { 
//   await apiService.getfetchPhoto().then(({ totalHits }) =>
//   {
//     if (totalHits === 0) {
//        loadMore.hide()
//       Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
//     } else if (totalHits < 40) {
//        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
//        loadMore.hide()
//      } else {
//        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
//     }
//  } )
// }

   function createMarkup(hits) {
        const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
 `<div class="photo-card">
  <a class='gallery__link' href='${largeImageURL}'><img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" width='360' height='260' /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
    
  </div>
</div>`).join('');
     loadMore.enable();
        return gallery.insertAdjacentHTML("beforeend", markup);
        // gallery.innerHTML = markup;
        
    }

function onError(err){
console.log(err)
}

function clearHTML() {
  gallery.innerHTML = ""
}






 const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector('.btn-up').onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();
