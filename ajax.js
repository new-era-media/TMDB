new Vue({el:".app",data:{arr:{1:{one:"asd"},second:{one:"asd"}},genresPanel:!1,searchPanel:!0,movePage:!1,movePageTwo:!1,response:"",title:"",scrLoad:"https://image.tmdb.org/t/p/w500",srcImg:"",url:"https://api.themoviedb.org/3/search/movie?api_key=dcfecd096bade627fda8751e71be0e9a&query=",search:"",advSearch:0,asvResponse:"",modal:!1,genres:0,allPages:0,page:1,error:"",genresArray:[],genresArrayMass:[],genresNumber:0,videoLink:"",test:1,styleObject:{border:"test red solid"},r:12},methods:{ajax(){if(this.genresPanel)return!1;this.genresArray=[],this.genresArrayMass=[],xhr=new XMLHttpRequest,xhr.open("GET",this.url+this.search+"&language=ru&page="+this.page),xhr.onreadystatechange=(()=>{if(4!=xhr.readyState&&200!=xhr.status)return!1;this.allPages=JSON.parse(xhr.responseText).total_pages,this.response=JSON.parse(xhr.responseText).results,0!=this.genresNumber?(this.response.forEach(e=>{e.genre_ids.forEach(s=>{if(this.genresArrayMass.push(s),s==this.genresNumber)return this.genresArray.push(e),!1})}),this.response=this.genresArray.slice(this.genresArray.length/2,this.genresArray.length),0==this.response.length?(this.error="На этой странице такого жанра нет",this.movePageTwo=!1):this.error=""):0==JSON.parse(xhr.responseText).total_results||0==this.search.length?(this.error="Поиск не дал результатов",this.movePage=!1):this.error="",console.log(this.genresArrayMass)}),xhr.send()},genreSearch(e){if(this.searchPanel)return!1;xhr=new XMLHttpRequest,xhr.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=dcfecd096bade627fda8751e71be0e9a&with_genres="+this.genres+"&language=ru&page="+this.page),xhr.onreadystatechange=(()=>{if(4!=xhr.readyState&&200!=xhr.status)return!1;this.allPages=JSON.parse(xhr.responseText).total_pages,this.response=JSON.parse(xhr.responseText).results,this.srcImg=JSON.parse(xhr.responseText).poster_path}),xhr.send()},nextPage(){if(!(this.page<this.allPages))return!1;this.page++},prewPage(){if(!(this.page>1))return!1;this.page--},swap(e){this.advSearch=e},advAjax(){xhr=new XMLHttpRequest,xhr.open("GET",["https://api.themoviedb.org/3/movie/"+this.advSearch+"?api_key=dcfecd096bade627fda8751e71be0e9a&language=ru&append_to_response=videos"]),xhr.onreadystatechange=(()=>{if(4!=xhr.readyState&&200!=xhr.status)return!1;this.asvResponse=JSON.parse(xhr.responseText),this.srcImg=JSON.parse(xhr.responseText).poster_path,this.videoLink="https://www.youtube.com/embed/"+this.asvResponse.videos.results[0].key}),xhr.send()}}});
