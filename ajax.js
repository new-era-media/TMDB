new Vue({
    el:'.app',
    data:{
        arr:{
            1:{
                one:'asd'
            },
            second:{
                one:'asd'
            }
        },
        genresPanel: false,
        searchPanel: true,
        movePage : false,
        movePageTwo: false,
        response : '',
        title: '',
        scrLoad: 'https://image.tmdb.org/t/p/w500',
        srcImg: '',
        url:'https://api.themoviedb.org/3/search/movie?api_key=dcfecd096bade627fda8751e71be0e9a&query=',
        search: '',
        advSearch: 0,
        asvResponse: '',
        modal: false,
        genres: 0,
        allPages: 0,
        page: 1,
        error: '',
        genresArray: [],
        genresArrayMass: [],
        genresNumber: 0,
        videoLink : '',
        test: 1,
        styleObject: {
            border: 'test red solid'
            // background: 'url(' + this.scrLoad + this.srcImg +') center center no-repeat;'
        }
    },
    methods: {
        ajax(){
            if  (this.genresPanel) return false
            else{
                this.genresArray = [] 
                this.genresArrayMass = []
                xhr = new XMLHttpRequest();
                xhr.open('GET', this.url+this.search + '&language=ru&page='+ this.page)
                xhr.onreadystatechange = () =>{
                if (xhr.readyState != 4 && xhr.status != 200) return false;
                this.allPages = JSON.parse(xhr.responseText).total_pages;
                this.response = JSON.parse(xhr.responseText).results;
                if (this.genresNumber != 0){
                    this.response.forEach(el => {
                        el.genre_ids.forEach(els=>{
                            this.genresArrayMass.push(els);
                            if (els == this.genresNumber){                   
                                this.genresArray.push(el);
                                return false                 
                               }
                        })                   
                    });
                    this.response = this.genresArray.slice( this.genresArray.length/2, this.genresArray.length)
                    if ( this.response.length == 0){
                        this.error = 'На этой странице такого жанра нет';
                        this.movePageTwo = false;
                    } else {
                        this.error = '';
                    }
                } else {
                    if ( JSON.parse(xhr.responseText).total_results == 0 || this.search.length == 0) {
                        this.error = 'Поиск не дал результатов';
                        this.movePage = false;
                     } else {
                        this.error = ''
                     }                     
                }    
                    console.log(this.genresArrayMass);
                }
                xhr.send();
            }
        },
        genreSearch(e){
            if  (this.searchPanel) return false
            else{
                xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=dcfecd096bade627fda8751e71be0e9a&with_genres=' + this.genres + '&language=ru&page='+ this.page)
                xhr.onreadystatechange = () =>{
                if (xhr.readyState != 4 && xhr.status != 200) return false;
                this.allPages = JSON.parse(xhr.responseText).total_pages;
                this.response = JSON.parse(xhr.responseText).results; 
                this.srcImg = JSON.parse(xhr.responseText).poster_path;      
                }
                xhr.send();
            }           
        },
        nextPage(){
            if (this.page < this.allPages) this.page++ 
            else  return false
        },
        prewPage(){
            if (this.page > 1) this.page--
            else  return false
        },
        swap(id){
            this.advSearch = id;
        },
        advAjax(){
            xhr = new XMLHttpRequest();
            xhr.open('GET', ['https://api.themoviedb.org/3/movie/'+ this.advSearch +'?api_key=dcfecd096bade627fda8751e71be0e9a&language=ru&append_to_response=videos'])
            xhr.onreadystatechange = ()=>{
            if (xhr.readyState != 4 && xhr.status != 200) return false;
                this.asvResponse = JSON.parse(xhr.responseText); 
                this.srcImg=JSON.parse(xhr.responseText).poster_path; 
                this.videoLink = 'https://www.youtube.com/embed/'+this.asvResponse.videos.results[0].key;        
            }
    xhr.send();
        }
    },
})
