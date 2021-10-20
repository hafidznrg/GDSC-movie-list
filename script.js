var content = document.getElementById("content");
var span = document.getElementsByClassName("close")[0];

let rawMovies = fetch('movie.json').then(response => {
    return response.json();
}).then(data => {
    // console.log(data);
    return data;
}).catch(err => {
    console.log(err);
});

function modalView(item){
    console.log(item);
    let title = item.nama;
    let tahun = item.tahun;
    let desc = item.desc;
    let genre = item.genre;
    let rating = item.rating;
    let duration = item.duration;
    var modal = document.getElementById("myModal");
    var item = document.createElement("div");
    item.className = "modal-content";
    var close_btn = document.createElement("span");
    close_btn.className = "close";
    close_btn.innerHTML = "&times;";
    var modal_title = document.createElement("p");
    modal_title.className = "modal-title";
    modal_title.innerHTML = title;
    item.appendChild(close_btn);
    item.appendChild(modal_title);
    modal.appendChild(item);
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
            notFound.innerHTML = "Maaf, film yang Anda cari tidak ada."
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

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }