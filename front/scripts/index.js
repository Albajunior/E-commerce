
const titletab = [];
const pricetab = [];
const desctab = [];
const id_produit = [];

const contents = document.getElementsByClassName('productName');
const descriptions = document.getElementsByClassName('productDescription');

let url = 'http://localhost:3000/api/products';

//fetch sur l'api 
getArticles();


function getArticles() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      alert("Error. Veuillez lancé le serveur local (Port 3000) ? Si le problème persiste, contactez-nous.");
      document.location.href = "index.html";
    })
    .then(function (data) {
      const st = data;
      sessionStorage.setItem('tableau', JSON.stringify(st));

      //localStorage.setItem("names", JSON.stringify(names))

      const lien = [];
      const images = document.querySelectorAll('.image');

      for (let product of data) {

        //creer un tableau pour chak parametre
        const img = document.createElement('img');

        lien.push(product.imageUrl);
        titletab.push(product.name);
        desctab.push(product.description);
        id_produit.push(product._id);

      }
      images.forEach((image, i) => {
        const imag = document.createElement('img')
        imag.src = lien[i]
        image.appendChild(imag)
      })


      let paniernonvide = [];
      let items = document.querySelector('#items');

      for (m = 0; m < data.length; m++) {
        paniernonvide = paniernonvide + `
       <a href="product.html?id=${id_produit[m]}" class="title">
           <article>
             <img class="image" src="${lien[m]}" alt="  ">
             <h3 class="productName">${titletab[m]}</h3>
             <p class="productDescription">${desctab[m]}</p>
           </article>
         </a> `;
        items.innerHTML = paniernonvide;
      }

      const titlee = document.getElementsByClassName('title');

      for (let i = 0; i < titlee.length; i++) {
        //clik sur produit  
        if (titlee[i].addEventListener('click', function () {
          const valeuri = i;
          sessionStorage.setItem('vali', valeuri);

          //  // console.log(sessionStorage.getItem('vali'));
          document.location.href = "product.html";
        })
        );
      }

    }
    )
}












