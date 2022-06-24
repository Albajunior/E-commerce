//on selectionne les element du html
const prixproduits = document.getElementsByClassName('price');
const descriptions = document.getElementsByClassName('description');
const nomproduits = document.getElementsByClassName('title');
const currencyEl_one = document.getElementById('colors');
const images = document.querySelectorAll('.imagee');
const quantity = document.getElementById('quantity');
let n = [];

//on recupere l'id stocker dans le lien
const idproduit_url = window.location.search;
const urlParam = new URLSearchParams(idproduit_url);
const idproduit = urlParam.get("id");

//id est le nom utiliser dans l'url
//fetch sur l'api et on recupere le produit eyant l'id selectionner

main();

function main() {
  getArticles();
}

function getArticles() {
  fetch("http://localhost:3000/api/products/" + idproduit)
    .then(function (response) {
      return response.json();

    }).catch((error) => {
      alert("Error. Veuillez lancé le serveur local (Port 3000) ? Si le problème persiste, contactez-nous.");
      document.location.href = "product.html";
    }).then(function (data) {
      n = [data];
      // on affiche les couleurs du produit

      for (i = 0; i < n[0].colors.length; i++) {
        //console.log(color);
        // elt.options[i].label = n[a].colors[i];
        var option4 = new Option(n[0].colors[i], n[0].colors[i]);
        var elt = document.querySelector('select');
        elt.options[elt.options.length] = option4;
      }

      prixproduits[0].innerText = n[0].price;
      descriptions[0].innerText = n[0].description;
      nomproduits[0].innerText = n[0].name;

      images.forEach((imagee, i) => {
        const imag = document.createElement('img')
        imag.src = n[0].imageUrl;
        imagee.appendChild(imag)
      });
    })
}

// // fonction pour ajouter le produit dans le paniet

function panier() {

  const currency_one = currencyEl_one.value;

  //  currency_one = color du produit
  //  quantity.value = qte du produit
  if (quantity.value <= 0) {
    alert('Veuiller choisir une valeur superieur a zero')
  } else {

    let detailproduit = {
      nomp: n[0].name,
      prixp: n[0].price,
      qte: quantity.value,
      colorp: currency_one,
      lien: n[0].imageUrl,
      _id: idproduit,
    }

    let produitpanier = JSON.parse(sessionStorage.getItem('produit'));

    if (produitpanier) {
      produitpanier.push(detailproduit);
      sessionStorage.setItem('produit', JSON.stringify(produitpanier));
      alert('Ce produit a ete ajoute dans votre panier');

    } else {
      produitpanier = [];
      produitpanier.push(detailproduit);
      sessionStorage.setItem('produit', JSON.stringify(produitpanier));
      alert('Ce produit a ete ajoute dans votre panier');
    }
  };

}






