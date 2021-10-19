var content = document.getElementById("content");

fetch('movie.json').then(response => {
    return response.json();
    }).then(data => {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
        var item = document.createElement("div");
        item.className = "movie-item";
        let itemImg = document.createElement("div");
        itemImg.className = "movie-img";
        let itemTitle = document.createElement("h3");
        itemTitle.innerHTML = data[index].nama;
        itemTitle.className = "movie-title";
        let itemDesc = document.createElement("p");
        itemDesc.innerHTML = data[index].desc;
        itemDesc.className = "movie-desc";
        item.appendChild(itemImg);
        item.appendChild(itemTitle);
        item.appendChild(itemDesc);
        content.appendChild(item);
    }
    }).catch(err => {
    console.log(err);
    });