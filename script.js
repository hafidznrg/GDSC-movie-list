var content = document.getElementById("content");

let rawMovies = fetch('movie.json').then(response => {
    return response.json();
}).then(data => {
    // console.log(data);
    return data;
}).catch(err => {
    console.log(err);
});

function modalView(item){
    // console.log(item);
    let title = item.nama;
    let poster = item.poster;
    let tahun = item.tahun;
    let desc = item.desc;
    let genre = item.genre;
    let rating = item.rating;
    let duration = item.duration;
    let director = item.director;
    var modal = document.getElementById("myModal");
    modal.innerHTML = "";
    var modal_content = document.createElement("div");
    modal_content.className = "modal-content";
    // Poster image
    var modal_poster_img = document.createElement("img");
    modal_poster_img.src = poster;
    var modal_poster = document.createElement("div");
    modal_poster.className = "movie-image";
    modal_poster.appendChild(modal_poster_img);
    modal_content.appendChild(modal_poster);

    // Movie Detail
    var modal_title = document.createElement("h3");
    modal_title.innerHTML = title;
    modal_title.className = "modal-title";
    var modal_desc = document.createElement("p");
    modal_desc.innerHTML = desc;
    var modal_tahun = document.createElement("p");
    modal_tahun.innerHTML = "Year : " + tahun;
    var modal_genre = document.createElement("p");
    modal_genre.innerHTML = "Genre : " + genre;
    var modal_rating = document.createElement("p");
    modal_rating.innerHTML = "Rating : " + rating;
    var modal_duration = document.createElement("p");
    modal_duration.innerHTML = "Duration : " + duration;
    var modal_director = document.createElement("p");
    modal_director.innerHTML = "Directed by " + director;

    var movie_detail = document.createElement("div");
    movie_detail.className = "movie-detail";
    movie_detail.appendChild(modal_title);
    movie_detail.appendChild(modal_desc);
    movie_detail.appendChild(modal_tahun);
    movie_detail.appendChild(modal_genre);
    movie_detail.appendChild(modal_rating);
    movie_detail.appendChild(modal_duration);
    movie_detail.appendChild(modal_director);
    modal_content.appendChild(movie_detail);
    modal.appendChild(modal_content);


    modal.style.display = "block";
}

function filterMovies(arr, query) {
    arr.then(arr => {
        var count = 0;
        arr.filter((el) =>{
            let name = el.nama;
            if (name.toLowerCase().indexOf(query.toLowerCase()) !== -1){
                count += 1;
                var item = document.createElement("div");
                item.className = "movie-item";
                item.onclick = function(){ modalView(el)};
                let itemImg = document.createElement("div");
                itemImg.className = "movie-img";
                let itemImage = document.createElement("img");
                itemImage.src = el.poster;
                itemImg.appendChild(itemImage);
                let itemTitle = document.createElement("h3");
                itemTitle.innerHTML = el.nama;
                itemTitle.className = "movie-title";
                let itemDesc = document.createElement("p");
                if (el.desc[80] === ' ') {
                    itemDesc.innerHTML = el.desc.slice(0,80) + "...";
                } else {
                    var i =0;
                    while (el.desc[80+i] !== ' ') {
                        i += 1;
                    }
                    itemDesc.innerHTML = el.desc.slice(0,80+i) + "...";
                }
                itemDesc.className = "movie-desc";
                item.appendChild(itemImg);
                item.appendChild(itemTitle);
                item.appendChild(itemDesc);
                content.appendChild(item);
            }
        })

        if (count === 0){
            let notFound = document.createElement("h3");
            notFound.innerHTML = "Sorry, the movie doesn't exist in here."
            content.appendChild(notFound);
        }
    })
}

filterMovies(rawMovies, "");

var search = document.getElementById('searchbar');

search.onkeyup = function(){
    var query = document.getElementById("searchbar").value;
    content.innerHTML = "";
    filterMovies(rawMovies, query);
}

var modal = document.getElementById("myModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modal.innerHTML = "";
    }
}