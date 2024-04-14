const listeCartes = [];


const listeAchats = [];

/** Retourne Liste Cartes.
 * Permet de retourner la liste de Cartes.
 * @returns {array} La liste de Cartes.
 */
function retourneListeCartes() {
    return listeCartes;
}



/** Retourne Liste Cartes.
 * Permet de retourner la liste de Cartes.
 * @returns {array} La liste de Cartes.
 */
function retourneListeAchats() {
    return listeAchats;
}


/** Classe de Cartes.
 * Permet de créer des Cartes, afficher les infos et le push dans la base de donnée.
 * @param {string} nom Le nom de la Cartes
 * @param {float} prix Le prix de la Cartes
 * @param {float} qty La quantité de Cartes
 * @param {string} desc La description du Cartes
 * @param {string} lien_img Le lien de l'image pour affichage
 */
class Cartes{
    // Enlever id lors d'intégration de base de donnée --> simulation d'un id de db
    constructor(id, nom, prix, qty, desc, lien_img) {
        this.id = id;


        this.nom = nom;
        this.prix = prix;
        this.qty = qty;
        this.desc = desc;
        this.lien_img = lien_img;

        var now = new Date();
        now.setHours(now.getHours() - 4); // Notre timezone est UTC-4
        var time = now.toISOString().slice(0, 19).replace('T', ' ');

        this.date = time;
    }


    info(){
        return console.log(this.nom, this.prix+"$", this.qty, this.desc);
    }




    /** Classe de Cartess, fonction reduireQuantite.
     * Permet de réduire la quantité affiché d'un Cartes lors d'un achat.
     * @param {int} qty La quantité du Cartes
     */
    reduireQuantite(qtyToRemove){
        this.qty -= qtyToRemove;
    }

    /* Ceci vas servir pour pousser un nouveau Cartes dans une base de donnée
    pushCartes(){
        const Cartes = [this.nom, this.prix, this.qty, this.desc, this.lien_img, this.date];
        return Cartes;
    }
    */
}







/** Ajout Produit Achat.
 * Permet d'ajouter un produit acheté dans la liste d'achat et générer une facture
 * @param {object} produit L'object provenant de l'array listeProduits
 * @returns {string} Le numéro de facture de l'achat'.
 */
function ajoutAchat(produit, qty) {
    console.log("Carte ajouté dans la liste d'achat");

    const facture = genereFacture();

    prixFinale = qty*produit.prix;

    // produit.qty est remplacé par 1 --> mettre un input pour choisir qty voulue
    listeAchats.push(new Achat(produit.nom, qty, facture[0], prixFinale, 'Carte de crédit', facture[1]));

    return facture[0];
}


/** Classe des achats.
 * Permet de créer des achats, afficher les infos wr le push dans la base de donnée.
 * @param {string} nom Le nom du produit acheté
 * @param {int} qty La quantité du produit acheté
 * @param {string} no_facture Le numéro de facture
 * @param {float} prix Le montant facturé
 * @param {string} methode La méthode de paiement
 * @param {string} date La date de facturation
 */
class Achat{
    constructor(nom, qty, no_facture, prix, methode, date) {

        this.nom = nom;
        this.qty = qty;
        this.no_facture = no_facture;
        this.prix = prix;
        this.methode = methode;

        this.date = date;
    }


    info(){
        return console.log(this.nom, this.qty, this.no_facture, this.prix, this.methode, this.date);
    }


    /* Ceci vas servir pour pousser une nouvelle achat dans une base de donnée
    pushFacture(){
        const facture = [this.nom, this.qty, this.no_facture, this.prix, this.methode, this.date];
        return facture;
    }
    */
}







/** Génére Facture.
 * Affiche un numéro de facture fictif et l'heure de l'achat.
 * @returns {string} Le numéro de facture fictif de l'achat'.
*/
function genereFacture() 
{
    const caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';

    // Génére un chiffre au hasard qui détermine un caractère dans le string et les concat
    // Ont peut changer 15 pour la longueur de texte générée
    for ($i = 0; $i < 15; $i++) {
        let nombreHasard = Math.floor(Math.random() * (caracteres.length-1));
        code += caracteres[nombreHasard];
    }



    //document.querySelector("#no_facture").innerText = code;

    // La date UTC-4 en format SQL
    var now = new Date();
    now.setHours(now.getHours() - 4);
    var time = now.toISOString().slice(0, 19).replace('T', ' ');

    const arrayFacture = []
    arrayFacture.push(code);
    arrayFacture.push(time);

    //return [code, time];
    return arrayFacture;
    //document.querySelector("#date").innerText = time;
}
















// Permet simplement de créer des produits automatiquement pour programmer rapidement
function creerProduitAuto() {
    let id = 0; // Permet de simuler l'id d'une base de donnée --> commence a 0 car début array = 0
  
    
    listeCartes.push(new Cartes(id, 'Ananas', 60, 12, 'Très juteux ! (test)', '/img/Ananas.jpg'));
    id ++;
    listeCartes.push(new Cartes(id, 'Banane', 25, 8, 'Délicieuse ! (test)', '/img/Banana.jpg'));
    id ++;
    listeCartes.push(new Cartes(id, 'Kiwi', 5, 52, 'Meilleur Kiwi au monde (test)', '/img/Kiwi.jpg'));
    id ++;
    listeCartes.push(new Cartes(id, 'Fraises', 5.99, 25, 'Un petit casseau de fraise (test)', '/img/Strawberry.jpg'));
}
creerProduitAuto();

//console.log(listeCartes);






module.exports = { 
    retourneListeCartes,
    retourneListeAchats,
    genereFacture,
    ajoutAchat,
};
