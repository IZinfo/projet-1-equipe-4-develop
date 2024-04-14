/** POST Produit ID.
 * POST l'id du produit sélectionné vers le serveur.
 * @param {int} id L'id du produit
 * @returns {int} L'id avec le format body: JSON.stringify
*/
async function postCarteID(id, type) {
    //console.log('Start Fetching ID to Server');
    let response = null;

    switch (type) {
        case 'achat':
            let qtyAchetee = document.querySelector("#qtyAchetee"+id).value;
            //console.log(qtyAchetee);

            response = await fetch('/api/achat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id, qtyAchetee }) // Sending id in the body
            });
            break;
        default:
            console.log("Ce type n'est pas pris en charge.");
            break;
    }

    if (!response.ok) {
        console.log('Erreur lors du fetch id carte.');
    }
}






/** active CardList Navbar.
 * Change la page active sur la navbar sur Cartes.
*/
function activeCardListNavbar() {
    document.querySelector("#achat").classList.remove("active");
    document.querySelector("#cardcoll").classList.remove("active");
    document.querySelector("#cardlist").classList.add("active");
    document.querySelector("#checkout").classList.remove("active");
    document.querySelector("#ajout").classList.remove("active");
}



/** active CardColl Navbar.
 * Change la page active sur la navbar sur CardColl.
*/
function activeCardCollNavbar() {
    document.querySelector("#achat").classList.remove("active");
    document.querySelector("#cardcoll").classList.add("active");
    document.querySelector("#cardlist").classList.remove("active");
    document.querySelector("#checkout").classList.remove("active");
    document.querySelector("#ajout").classList.remove("active");
}


/** active Checkout Navbar.
 * Change la page active sur la navbar sur Checkout.
*/
function activeCheckoutNavbar() {
    document.querySelector("#achat").classList.remove("active");
    document.querySelector("#cardcoll").classList.remove("active");
    document.querySelector("#cardlist").classList.remove("active");
    document.querySelector("#checkout").classList.add("active");
    document.querySelector("#ajout").classList.remove("active");
}


/** active Achat Navbar.
 * Change la page active sur la navbar sur Achat.
*/
function activeAchatNavbar() {
    document.querySelector("#achat").classList.add("active");
    document.querySelector("#cardcoll").classList.remove("active");
    document.querySelector("#cardlist").classList.remove("active");
    document.querySelector("#checkout").classList.remove("active");
    document.querySelector("#ajout").classList.remove("active");
}



/** Enlever active Navbar.
 * Change la page active sur la navbar sur aucune.
*/
function removeActiveNavbar() {
    document.querySelector("#achat").classList.remove("active");
    document.querySelector("#cardcoll").classList.remove("active");
    document.querySelector("#cardlist").classList.remove("active");
    document.querySelector("#checkout").classList.remove("active");
    document.querySelector("#ajout").classList.remove("active");
}