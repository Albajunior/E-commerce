

//on recupere l'id stocker dans le lien
const idproduit_url = window.location.search;
const urlParam = new URLSearchParams(idproduit_url);
const idproduit = urlParam.get("id");

const order = document.getElementById('orderId');

order.innerHTML = idproduit;

