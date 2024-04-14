const express = require("express");
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
const handlebars = require("handlebars")


app.set("views", "./views");

app.use(express.static("static"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// ref : https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
// ref : https://handlebarsjs.com/examples/helper-simple.html

// Définir des conditions personnalisée

handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 > v2) {
      return options.fn(this);
  }
  return options.inverse(this);
});



const cartes = require('./cartes');


app.get('/', (req, res) => {
  res.render('app');
});

app.get('/cardlist', (req, res) => {
  const cards = cartes.retourneListeCartes();
  //console.log(cards);

  res.render('cardlist', {
    cards : cards,
  });
});

app.get('/checkout', (req, res) => {
  res.render('checkout');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});











/***** Achats *****/


/*** ID du Produit sélectionné */
let detail_id = null;

/*** Définir la quantité acheté d'un produit */
let qtyAchetee = 1;

/*** Numéro de la facture crée */
let no_fact = null;

/*** Message lors d'erreur d'achat */
let message_achat = null;

app.post('/api/achat', async (req, res) => {
  // Reset le msg a null 
  message_achat = null;

  // Reset les variables d'achat
  detail_id = null;
  qtyAchetee = 1;

  detail_id = req.body.id;
  qtyAchetee = req.body.qtyAchetee;

  if (detail_id != null)
  {
      const listeCartes = cartes.retourneListeCartes();
      const qtyActu = listeCartes[detail_id].qty;

      console.log("Quantité acheté : "+qtyAchetee+"/"+qtyActu);
      // Si la quantité acheté est plus petite ou égal a notre qty actuelle
      if (qtyAchetee <= qtyActu)
      {
          // Ajout d'un produit dans la liste de commande
          listeCartes[detail_id].reduireQuantite(qtyAchetee);

          no_fact = cartes.ajoutAchat(listeCartes[detail_id], qtyAchetee);
      }
      else
      {   // Reset les variables d'achat
          qtyAchetee = 1;
          detail_id = null;
          
          console.log("Erreur lors de l'achat");
          message_achat = "Erreur lors de l'achat, veuillez réessayer.";
      }
  }
});



// Permet de voir les factures dans une liste
app.get('/liste_achat', async (req, res) => {
  // Liste des cartes acheté et facturé
  const CartesAchat = cartes.retourneListeAchats();
  res.render('liste_achats', {
      titre_page : 'Mes achats',
      achats : CartesAchat 
  });
});




// Vue du détail des factures ( Utilise le même handlebars que /confirm_facture ) 
app.get('/facture', (req, res) => {
  const no_facture = req.query.no_facture;

  console.log('no facture : ', no_facture);

  // Liste des factures
  const factures = cartes.retourneListeAchats();

  // Trouvé la bonne facture
  let facture = null;
  factures.forEach(fact => {
      
      if (fact.no_facture == no_facture)
      {
          facture = fact;
      }
  });

  res.render('facture', {
      titre_page : 'Détail de la facture',
      detail_facture : facture,
  });
});




// Vue de la confirmation de facturage ( Utilise le même handlebars que /facture ) 
app.get('/confirm_facture', (req, res) => {

  const no_facture = no_fact;
  
  if (!no_facture || no_facture === null)
  {
      console.log("Erreur lors de la facturation.");
  }

  console.log('no facture : ', no_facture);
 
  // Liste des factures
  const factures = cartes.retourneListeAchats();

  // Trouvé la bonne facture
  let facture = null;
  factures.forEach(fact => {
      
      if (fact.no_facture == no_facture)
      {
          facture = fact;
      }
  });


  if (message_achat === null)
  {
      res.render('facture', {
          titre_page : "Facture de l'achat",
          facture : facture,
      });
  }
  else
  {
      console.log('msg: ', message_achat);

      res.render('facture', {
          titre_page : "Erreur lors de l'achat",
          facture : facture,
          message_achat : message_achat,
      });
  }
});







 
const port = 3000;
app.listen(port , function () { 
    console.log('Serveur démarré sur le port '+port)
});