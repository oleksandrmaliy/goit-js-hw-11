import axios from "axios";

export default class ApiService {
   static ENDPOINT = "https://pixabay.com/api/";
   static API_KEY = "35828732-80dbae6f7a9b2a665dfdc53c4";

   constructor() {
      this.query = "";
      this.page = 1;
   }

   getfetchPhoto() {
      const url = `${ApiService.ENDPOINT}?key=${ApiService.API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      // return fetch(url).then((data) => {
      //    this.incrementPage()
      //    return data.json();
      // })
      return axios.get(url).then((data) => {
         this.incrementPage();
         console.log(data);
         return data.data
      })
   }

   incrementPage() { 
      this.page += 1;
   }

   resetPage() { 
     this.page = 1; 
   }
}





const URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=249f222afb1002186f4d88b2b5418b55';

import axios from "axios";
const galleryList = document.querySelector(".gallery-weekly__list");

function getTrendData() {
const URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=249f222afb1002186f4d88b2b5418b55';

    return axios.get(URL).then((data) => {
        //  incrementPage();
         console.log(data.data.results);
         return data.data
      })
}

function createMarkup(results) {
    const markup = results.slice(0, 3).map(({original_title, release_date, backdrop_path, poster_path, vote_average
}) => 
        ` <li class='gallery-weekly__list-elem'>           
        <a class='gallery-weekly__link' href="${poster_path}"><img class='gallery-weekly__image' src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="" loading="lazy" ></a>
        <div class="info">
            <h3>${original_title}</h3>
            <b>${release_date}</b>
        </div>
        <b>${vote_average}</b>
    </li>`
    ).join('') 

    // return galleryList.insertAdjacentElement("beforeend", markup);
    return galleryList.innerHTML = markup
    // return console.log(markup)
    
    
}

getTrendData().then(({ results }) => {
    console.log(results)
    return createMarkup(results);
})





