import { PageComponent } from 'rasengan';
import { Markdown, TableOfContents, extractTOC } from '@rasenganjs/mdx';

const markdown = `
# Créer une API REST avec Express.js

Express.js est un framework minimaliste et flexible pour Node.js, idéal pour construire des API REST rapidement et efficacement. Dans cet article, nous allons voir comment créer une API REST basique avec Express.js, incluant les routes de base pour la gestion des données.

## Prérequis

Avant de commencer, assurez-vous d'avoir Node.js installé sur votre machine. Si ce n'est pas encore fait, téléchargez-le depuis [nodejs.org](https://nodejs.org/).

## Initialisation du projet

### Création du projet

Créez un nouveau dossier pour votre projet et initialisez un projet Node.js :

~~~sh
mkdir my-api && cd my-api
npm init -y
~~~

### Installation d'Express.js

Ensuite, installez Express.js :

~~~sh
npm install express
~~~

## Création du serveur Express

### Configuration du serveur

Créez un fichier ~server.js~ à la racine de votre projet et ajoutez le code suivant :

~~~javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware pour parser le JSON

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API REST !');
});

app.listen(PORT, () => {
    console.log(~Serveur démarré sur http://localhost:\${PORT}~);
});
~~~

### Démarrage du serveur

Lancez votre serveur avec la commande :

~~~sh
node server.js
~~~

Vous devriez voir ~Serveur démarré sur http://localhost:3000~ dans votre terminal et pouvoir accéder à l'URL ~http://localhost:3000~ depuis votre navigateur.

## Mise en place des routes CRUD

### Création du fichier des routes

Ajoutons maintenant des routes pour gérer une ressource simple, comme des utilisateurs.

Créez un dossier ~routes/~ et ajoutez un fichier ~users.js~ :

~~~javascript
const express = require('express');
const router = express.Router();

// Données fictives
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

// Lire tous les utilisateurs
router.get('/', (req, res) => {
    res.json(users);
});

// Lire un utilisateur par ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
});

// Créer un utilisateur
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Mettre à jour un utilisateur
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    user.name = req.body.name;
    res.json(user);
});

// Supprimer un utilisateur
router.delete('/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
~~~

### Intégration des routes dans le serveur

Puis, modifiez ~server.js~ pour utiliser ces routes :

~~~javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(~Serveur démarré sur http://localhost:\${PORT}~);
});
~~~

## Test des routes

Vous pouvez tester votre API avec [Postman](https://www.postman.com/) ou en utilisant ~curl~ :

### Tester la récupération des utilisateurs

- Récupérer tous les utilisateurs :
  ~~~sh
  curl -X GET http://localhost:3000/users
  ~~~
- Récupérer un utilisateur par ID :
  ~~~sh
  curl -X GET http://localhost:3000/users/1
  ~~~

### Tester la création d'un utilisateur

- Créer un utilisateur :
  ~~~sh
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Alice"}'
  ~~~

### Tester la mise à jour d'un utilisateur

- Mettre à jour un utilisateur :
  ~~~sh
  curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name": "John Smith"}'
  ~~~

### Tester la suppression d'un utilisateur

- Supprimer un utilisateur :
  ~~~sh
  curl -X DELETE http://localhost:3000/users/1
  ~~~

## Conclusion

Vous venez de créer une API REST basique avec Express.js ! Ce guide vous a montré comment configurer un serveur, définir des routes CRUD et tester votre API. Pour aller plus loin, vous pouvez ajouter une base de données avec MongoDB ou PostgreSQL et utiliser des middleware comme \`cors\` ou \`morgan\` pour améliorer votre API.

Bon codage ! 🚀
`;

export const Contact: PageComponent = () => {
  console.log(extractTOC(markdown));
  return (
    <section className="overflow-auto">
      {/* <h1>Contact page</h1> */}

      <section className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-10 xl:max-w-6xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)] h-screen">
        <section className="px-0 pt-10 pb-24 sm:px-6 xl:pr-0">
          <Markdown content={markdown} />
        </section>

        <aside className="rasengan-toc max-xl:hidden">
          <TableOfContents items={extractTOC(markdown)} />
        </aside>
      </section>
    </section>
  );
};

Contact.path = '/contact?';

Contact.metadata = {
  title: 'Contact',
  description: 'Contact page',
};
