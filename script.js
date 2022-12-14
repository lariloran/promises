var xhr = new XMLHttpRequest();

function ajax(method, url) {
  
    return new Promise(function (resolve, reject) {
      let xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText);
        }
      };

      xhr.open(method, url, true);

      xhr.onerror = function () {
        reject(Error("Erro de conexão."));
      };

      xhr.send();
    });
}

function randomImages() {

    ajax("GET", "data.json")
        .then(function (response) {
        var data = JSON.parse(response);

        for (let i = 0; i <= data.images.length; i++) {
            let image = data.images[Math.floor(Math.random() * 15)];
            var result = document.getElementById("result");
            var img = document.createElement("img");
            img.src = image.url;
            result.appendChild(img);
        }
    }).catch(function (error) {
        console.log(error);
    });

    
}

document.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        randomImages();
    } 
});