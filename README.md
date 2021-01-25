# Wordpress Headless

Usage de l'API Wordpress avec le framework Vue.js Gridsome.

Vue.js est un framework de développement basé sur Javascript ses fonctionnalités sont volontairement limités, ce qui permet d'ajouter des fonctionalités sur mesure en fonction du projet que l'on veut mettre ne place. 

Gridsome vien compléter les fonctionnaliés de Vue.js pour des projets de sites et d'applications Web basé sur la philosophie de la JamStack.

Grdisome ajoute :
 - un design pattern (manière d'agencer les fichiers d'un projet) ;
 - une interface de données GraphQL
 - des fonctionnalités de rendu SSR (avec Webpack)
 - quelques modules Vue.js (gestion des route, préchargement, etc.)

## Installation

Commençons par créer un **dépot Github**, que l'on vas nommer par exemple `wordpress-headless`, choisissez la génération d'un fichier `README.md` et un `.gitignore` "nodejs".

Créez un répertoire local pour votre projet, puis via votre terminal clonez votre dépôt danc ce répertoire.
~~~
$ cd chemin/vers/votre/repertoire
$ git clone https://github.com/username/wordpress-headless.git .
~~~

Notez bien le point `.` pour spécfier à Git de cloner le dépôt dans le repertoire courant.

Pour ignorer certains fichiers locaux généré par Gridsome, ajouter les lignes suivante au fichier `.gitignore` : 

~~~
# Gridsome
src/assets/remoteImages
src/.temp
~~~

### Installer Gridsome via `@gridsome/cli`

Installer Gridsome en global. Suivre [la documentation officielle de Gridsome](https://gridsome.org/docs/#how-to-install)

Gridsome CLI vous facilite la tâche et installe divers fichiers et réppertoires pour vous.

### Installer Gridsome via un paquet NPM

Via cette méthode, votre repertoire de projet sera vide, il vous sera nécessaire de mettre en place les fichiers et repertoires nécessaire au bon fonctionnement de Gridsome.

Bien que cette méthode soit un peu plus complexe, elle permet de mieux comprendre le fonctionnement de Gridsome, le cours sera basé sur cette méthode.

#### NPM et le paquet Gridsome
Commencer, **initialisez NPM** avec la commande `npm init`, remplisser le questionnaire.

Ajouter le paquet Gridsome : 
~~~
$ npm install gridsome
~~~

## Le Layout Gridsome

**Un fichier Layout** est nécessaire afin de respecter le design pattern de Gridsome basé sur les [Composant mono-fichier de Vue.js](https://fr.vuejs.org/v2/guide/single-file-components.html), créont un [fichier de Layout](https://gridsome.org/docs/layouts/) principal qui engloberas les autres composants Vue.js.

Créez le fichier `src/layouts/Default.vue` : 
~~~
<template>
  <div>
    <pre>src/layouts/Default.vue</pre>
    <slot/>
  </div>
</template>
~~~

C'est dans ce fichier que l'on pourras appeler les composants principaux de notre application web, comme la barre de navigation principale (Header) et le pied de page (Footer).

La balise HTML `<pre>` et son contenu ne sont là que pour nous aider à comprendre le fonctionement du design pattern de Gridsome, nous pourrons la supprimer par la suite.

Les autres composant seront automatiquement sélectionnés par [le routeur de Gridsome](https://gridsome.org/docs/dynamic-routing/) en fonction du contexte d'URL et distribués au travers [du Slot `<slot/>` Vue.js](https://fr.vuejs.org/v2/guide/components-slots.html) (par exemple, avec l'URL `http://monprojet.com/about` le routeur tenteras de charge le ficier situé à `src/pages/About.vue`).

### Charger le Layout

Spécifions à Gridsome de charger le fichier layout par défaut.

Créez le fichier `src/main.js` :

~~~
import DefaultLayout from '~/layouts/Default.vue'

export default function(Vue) {
  Vue.component('Layout', DefaultLayout)
}
~~~

Le fichier `src/main.js` est un fichier de base pour les applications Javascript. Ici nous nous contentons de charger un Layout, mais il est possible d'ajouter énormément de fonctionalités à notre application web via ce fichier.

## Première page

Pour afficher **une première page par défaut**, créont [un composant de page Gridsome](https://gridsome.org/docs/pages/) qui sera chargé lorsque l'URL sera "vide" (ou vaudras '/').

Créez le fichier `src/pages/Index.vue` (notez bien la première lettre du fichier en majuscule `Index.vue`) :

~~~
<template>
  <div>
    <pre>'src/pages/Index.vue'</pre>
  </div>
</template>
~~~

Ce fichier représente notre page d'accueil, nous y ajouterons tout ce qui est nécessaire à la page d'accueil de notre application web.

## Serveur de développement

Ajoutons finalement une commande NPM afin de nous faciliter la tâche pour démarrer le serveur de développement de Gridsome.

Dans le fichier `package.json`, ajoutez le script `dev`: 

~~~
"scripts": {
  "dev": "gridsome develop"
},
~~~

Il ne vous reste plus qu'à lancer le serveur de développement avec la commande :

~~~
$ npm run dev
~~~

Vous devriez voir les mesages de build, et l'adresse de votre serveur local (http://localhost:8081 par défaut).

## Source de données

Il nous faut maintenant une source de données pour alimenter [la couche de données GraphQL de Gridsome](https://gridsome.org/docs/data-layer/).

La source de données doit ête l'adresse d'un Wordpress dont la version correctement configuré (version récente avec [les pretty URL](https://wordpress.org/support/article/using-permalinks) corretement configuré) permettant d'expoiter la [REST API de Worpdress](https://developer.wordpress.org/rest-api/).

Dans un premier temps, interrompez le serveur local avec la commade de terminal `ctrl + c`

Puis, installez [le plugin Gridsome `gridsome-source-wordpress`](https://gridsome.org/plugins/gridsome-source-wordpress) :

~~~
$ npm install gridsome-source-wordpress
~~~

Configurez le modue via le fichier de configuration de Gridsome.

Créez le fichier `gridsome.config.js` : 
~~~
module.exports = {
  siteName: 'Worpdress Headless',
  plugins: [
    {
      use: 'gridsome-source-wordpress',
      options: {
        baseUrl: 'https://example.com',
      }
    }
  ],
  templates: {
    WordPressPost: '/blog/:slug'
  }
}
~~~

Notez que l'adresse de la source Worpdress peut très bien être un Worpdress en serveur local (avec MAMP, WAMP, etc.).

Comme les données GraphQL ne peuvent pas être rafraîchis à chaud (hot reloading), il faut relancer le serveur afin que Gridsome puisse constituer la base de données GraphQL à partir des données de l'API Worpdress spécifié. Gardez ça en tête, lorque vous éditerais du nouveau contenu, il sera nécessaire d recontruire la base de données GraphQL.

Relancer le serveur de développement avec la commande `npm run dev`.

Vous pouvez constater l'ajout des données provenant de Wordpress dans l'explorateur GraphQL à l'adresse indiqué dans le terminal (par défaut: `http://localhost:8081/___explore`) 

## GraphQL

Il est possible de multiplier les sources de données au travers de divers [plugins Gridsome](https://gridsome.org/plugins/). Ou via [des requêtes API personnalisé](https://gridsome.org/docs/fetching-data/).

L'intérêt d'exploiter les sources de données via [la couche GraphQL de Gridsome](https://gridsome.org/docs/data-layer/) est que l'accès aux données depuis les fichiers Vue.js devient identique peut importe la source de données. Cela permet également à Gridsome de compiler correctement les fichiers HTML lors du build [SSR](https://ssr.vuejs.org/).

Affichons quelques données sur la page d'accueil. Nous allons créer une requête grâce au block `<page-query>`, il s'agit d'un [bloc de requête](https://gridsome.org/docs/querying-data/) spécifique à Gridsome permettant d'utiliser [la syntaxe de GraphQL](https://graphql.org/).

Dans le fichier `src/pages/Index.vue`, ajoutons la requête :

~~~
<page-query>
query {
  allWordPressPost (
    filter: {
      sticky: { eq: true}
    }
  ) {
    edges {
      node {
        id
        path
        title
        featuredMedia {
          id
          sourceUrl
        }
      }
    }
  }
}
</page-query>
~~~

Cette requête peut être saisie dans l'explorateur de données (http://localhost:8081/___explore) pour constater les données récupérées.

Les articles (post Wordpress) sont requeté via les schéma `allWordPressPost`.

Le filre spécifié dans `filter` permet de récuprer que les articles Worpdress mis en avant.

`edges` correpond au groupe de données, chacune encapsuler dans un nœud `node`. Nous indiquont ensuite les données spécifique à récupérer (`id`, `title`, etc.). Notez `featuredMedia` qui correspont à un autre schéma (`WordPressAttachment`), dan ce cas il aut également spécifier les données de ce schéma à récupérer.

La donnée est maintenant disponible dans le contexte de cete page sous la variable `$page.allWordPressPost`, vous pouvez le constater via [Vue-DevTool](https://github.com/vuejs/vue-devtools).

Ajoutons le code suivant dans le template Vue.js pour afficher les données : 

~~~
<h2>Stickies</h2>
<article
  v-for="({ node: post }) in $page.allWordPressPost.edges"
  :key="post.id"
>
  <h3><g-link :to="post.path">{{ post.title }}</g-link></h3>
  <div v-if="post.featuredMedia">
    <figure
      v-if="post.featuredMedia.remoteLink"
    >
      <g-image
        :src="post.featuredMedia.remoteLink"
      />
    </figure>
  </div>
</article>
~~~

Nous avons une boucle (`v-for`) sur `edges` et la syntaxte `({ node: post })` permet d'extraire la données `node` et de l'attribuer à la variable `post`.

Les données sont affichées via la double paire d'accolades `{{}}` et [la syntaxe d'accès pointé de Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors).

La double structure conditionnelle `v-if` de Vue.js, permet de ne pas tenter d'afficher l'image en vedette (`featuredImage`) si celle-ci n'existe pas. Cette structure n'est pas très jolie, nous verrons par la suite comment améliorer ça.

## Générer les posts et les pages de Wordpress

Pour générer les fichiers repsésentant les posts et les pages de Worpdress, il est nécessaire de créer des [templates Gridsome](https://gridsome.org/docs/templates/) correspondant.

Pour générer les fichier correspondant au posts de Wordpress, créez le fichier de template correpondant `src/templates/WordPressPost.vue` : 

~~~
<template>
  <Layout>
    <article>
      <h1>{{ $page.post.title }}</h1>
      <div v-html="$page.post.content"></div>
    </article>
  </Layout>
</template>
<page-query>
query ($path: String) {
  post: wordPressPost(path: $path) {
    title
    content
  }
}
</page-query>
~~~

Comme pour la page d'index nous utilisons `<page-query>`, cette fois nous lui transmettons la variable de contexte `$path` généré grace à la coniguration de `templates`. Notez que pour nous simplifier la tâche, nous utilisons cette fois-ci un alias `post:`.

Vous pouvez faire de même pur générerez les fichiers représentant les pages de Worpdress.

Pour afficher un article saissisez l'adresse `http://localhost:8081/blog/slug-du-post`.

## La page d'index des posts

Pour afficher la page listant tous les posts de Worpdress génerons une nouvelle route (`/blog`) en créans le fichier `src/pages/Blog.vue`. Ce fichier sera très similaire au fichier `pages/Index.vue` pour ce qui est de l'affichage de la liste des posts. Comme les posts listés sous forme de résumé aurons la même présentationque sur la page d'accueil, profitons en pour exploiter le principe des composant de Vue.js pour nous simplfier le travail.

Dans premier temps aoutons le code suivant au fichier `src/pages/Blog.vue` :

~~~
<template>
  <Layout>
    <h1>Blog</h1>
    <PostAbstract
      v-for="({ node : post }) in $page.posts.edges"
      :key="post.id"
      :post="post"
    />
  </Layout>
</template>
<script>
import PostAbstract from '@/components/Post/Abstract.vue'
export default {
  components: {
    PostAbstract
  }
}
</script>
<page-query>
query {
  posts: allWordPressPost(limit: 25){
    edges {
      node {
        id
        path
        title
        featuredMedia {
          id
          link
          remoteLink(
            width: 600,
            height: 100
          )
          sourceUrl
        }
      }
    }
  }
}
</page-query>
~~~

La requête GraphQl est similaire à la page d'index, à part le filtre qui et remplacer par une limite `limit: 25` pour éviter de charger trop de contenu.

Le composant `<PostAbstract/>` remplace la boucle sur `<article>` et est instancier par le code de placé dans `<script>`, `import` pour importer le composant (module javascript) et la prorpiété `components` pour déclarer le composant.

Maintenant créons le composant qui représente la miniature du post, créez le fichier `src/components/Post/Abstract.vue` :

~~~
<template>
  <article>
    <h3><g-link :to="post.path">{{ post.title }}</g-link></h3>
    <figure
      v-if="hasRemoteLink"
    >
      <g-image
        v-if="post.featuredMedia.remoteLink"
        :src="post.featuredMedia.remoteLink"
      />
    </figure>  
  </article>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasRemoteLink() {
      const hasFeaturedMedia = this.post.featuredMedia !== null
      if (!hasFeaturedMedia) return false
      return this.post.featuredMedia.remoteLink ? true : false
    }
  }
}
</script>
~~~
 
Notez la partie `<script>` dans laquelle nous exigeons que la propriété `post` soit passée à ce composant. Également, nous profitons de ce composant rémployable pour y placer un code plus propre pour tester la présence du fichier d'image local.

`hasRemoteLink()` est déclaré comme [propriété calculée Vue.js](https://fr.vuejs.org/v2/guide/computed.html) `computed`, celle-ci sera résolue lors de la phase de rendu et ce compotera comme un propriéte locale du composant (propriété qui est intérrogé par le `v-if` dans notre composant).

## Pagination

Un point qui peut réclamer beaucoup d'effort dans la conception d'un site est la pagination. Nous allons voir comment [Gridsome peut nous simplifier la tâche](https://gridsome.org/docs/pagination/).

Sur le fichier `src/pages/Blog.vue`, commençons par modifier la requête GraphQL : 
~~~
query ($page: Int) {
  posts: allWordPressPost (perPage: 25, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        ...
      }
    }
  }
}
~~~

Nous avons remplacé `limit: 25` par `perPage: 25` qui représente le nombre d'article par page.

Le nom de la page courante est une données de contexte qui sera récupéré par le routeur depuis l'URL (par exemple pour la route `http://example.com/blog/3`, la variable `$page` vaudras 3). Cette valeur sera transmisse à GraphQL via `$page` (déclaré sur `Query`, psui passé à `allWordPressPost`)

`@paginate` est une directive pour GraphQL lui signalant de retourner un résultat paginé, les informations qui ont avec et surtout les diverses routes qui représentent les pages. Et `pageInfo` nous permet de récupérer le nombre de page total ainsi que la page courante.

Ajoutons maintenant le composant de pagination Gridsome : 

~~~
<template>
  <Layout>
    <h1>Blog</h1>
    <Pager :info="$page.posts.pageInfo"/>
    <PostAbstract
      v-for="({ node : post }) in $page.posts.edges"
      :key="post.id"
      :post="post"
    />
  </Layout>
</template>
<script>
import PostAbstract from '@/components/Post/Abstract.vue'
import { Pager } from 'gridsome'
export default {
  components: {
    PostAbstract,
    Pager
  }
}
</script>
~~~

Le composant `Pager` est mis en place de la même manière que notre `PostAbstract`, il est extrait de la librairie Gridsome avec la syntaxe `{ Pager } from 'gridsome'`. Les informations nécessaire à la génération de la pagination via `:info`.

Avec cet technique, nous avons créer une pagination complète (les pages, les liens, les route, etc.) à moindre frais.

Pour personnalisé la pagination vous pouvez passé divers paramètres à `Pager` (classes CSS, textes, etc.), consultez [la documentation du composant Pager](https://gridsome.org/docs/pagination/#pager-component)

## Un peu de design

Ne nous embarassons pas de framework CSS complexe, nous utiliserons [Chota CSS](https://jenil.github.io/chota/). Il s'agit dun mini framework sans pré-processeur CSS qui exploite judicieusement sélecteurs sémantiques et les variables CSS. Le code source état trè simple à comprendre, il est facile de l'etendre si besoin.

Commençez par téléchargez Chota et placer les fichiers sources `chota-master/src` dans le repertoire `src/assets/css/chota`.

Créez un fichier de style `src/assets/css/styles.css` dans lequel vous importez les dépendances deu Chot qui vou interesse : 
~~~
/*! chota.css v0.8.0 | MIT License | github.com/jenil/chota */
@import "chota/_base.css";
@import "chota/_grid.css";
@import "chota/_form.css";

@import "chota/_nav.css";
@import "chota/_card.css";
@import "chota/_tab.css";
@import "chota/_tag.css";
@import "chota/_dropdown.css";

@import "chota/_util.css";
~~~

Dans le fichier de chargement `src/main.js` importez le fichier CSS principal de cette manière : 

~~~
import '~/assets/css/styles.css'
~~~

Le design de Chota devrais s'appliquer.

Vous pouvez personnalisé les variables CSS via votre fichier `styles.css`, par exemple un typo personnalisé: 

~~~
:root {
  --font-family-sans: "PT Sans" sans-serif;
}
~~~

Utilisons la classe de conteneur de Chota sur le layout du site, dans le fichier `src/layouts/Default.vue`, ajouter la classe `container` au `div` principal :
~~~
<template>
  <div class="container">
    <slot/>
  </div>
</template>
~~~

Vous pouvez ajoutez des styles personnalisé en exploitant le principe de [composant de Vue.js](https://fr.vuejs.org/v2/guide/single-file-components.html). Par exemple, supprimer les marges par défaut de la balise `<figure>` sur toutes les pages du site :

~~~
<template>
  <div class="container">
    <slot/>
  </div>
</template>
<style>
figure {
  margin: 0;
}
</style>
~~~

## Construction du site

La phase de construction (build) permet de générer tout les fichiers statiques du site. Ces fichiers HTML, CSS, JS et autres assest (images, SVG, fontes, etc.) représentent toutes les dependances de votre site Web; si bien que vous pouvez les placer sur un serveur HTTP tel que pour mettre votre site en production.

Il est habituel de confier cette tâche à un service qui se charge de la mise en production (Gitlab CI/CD, Github Actions, Netlify, etc.). Dans premier temps, nous allons construire le site localement afin de voir les fichiers que produit Gridsome. 

Gridsome à une commande dédié au build `gridsome build`, mettons là en place parmis les scripts de NPM, dans le fichier `package.json`, ajoutez le script suivant :

~~~
  "scripts": {
    ...
    "build": "gridsome build"
  },
~~~

Lancez la commande :
~~~
$ npm run build
~~~

Une fois le build terminé, vous devriez voir le repperoitre `dist` dans votre projet, celui-ci contient tout ce qui est necessaire à la mise en production de votre site, vous pouvez le transérer tel que sur n serveur de production.

Nous pouvons tester cela localement avec [le serveur local HTTP Serve](https://www.npmjs.com/package/serve). Gardez en tête que cette étape n'as rien à voir avec le serveur de dévloppement de Gridsome qui lui ne sert pas les fichiers du build final, mais une application mono-fichier [SPA](https://fr.wikipedia.org/wiki/Application_web_monopage) (pour s'en convaincre, il suffit de regardez le code source servit par chacun des serveur avec la commande `cmd+u` (Outils > Développement Web > Code source de la page)).

Pour tester le build localement chargeons le paquet `serve` temporaiement à l'aide du [lanceur de paquet `npx`](https://nodejs.dev/learn/the-npx-nodejs-package-runner), faite la commande suivante : 

~~~
$ npx serve dist
~~~

NPM vas installer temporairement `serve` puis le lancer avec l'option de repertoire `dist`, suivez le lien du serveur local affiché dans le terminal (normalement http://localhost:5000).

Le site affiché dans vote navigateur est exactement celui qui sera mis en production (contairement à la commande `npm run develop` qui affiche une version "développement" du site).

Vous pouvez interrompre le serveur avec la commande `ctrl+c` dans votre termial.

## Optimisation

Bien que Gridsome compile le CSS et propose quelques outils pour optimiser le chargement des pages (`g-link` et `g-image`), il est possible d'aller un peu plus loin dans l'optimisation d'un site statique.

### Optimisation des images (responsive images)

Les images sont un point cruciale pour l'optimisation du chargement d'une page web. Sur une page web, le HTML, CSS et JS peuvent représenter quelques centaines d'octects ou quelques kilos octets; une image pèse rapidement de quelques centaines à quelques milleirs de kilos octets. Il est nécessaire de garder le contrôle sur la taille des images.

Le composant d'image `g-image` de Gridsome permet de retailler les images à la volée et de les afficher progressivement. La condition est que les images soient présente localement lors de la construction du site, ce qui n'est pas notre cas en exploitant des données provenant d'une API distante.

Il est cependant possibe de rapatrier les images lors du build avec le plugin `@noxify/gridsome-plugin-remote-image`. Attention cependant au site possédant un grosse base de données d'images (plusierus gigas), le processus de rapatriement peut mettre à genoux votre serveur local.

Installez le plugin :
~~~
$ npm install @noxify/gridsome-plugin-remote-image
~~~

Ajouter la confguration du plugin au fichier `gridsome.config.js` :
~~~
plugins: [
  {
    use: '@noxify/gridsome-plugin-remote-image',
    options: {
      forceHttps: false,
      typeName: 'WordPressAttachment',
      sourceField: 'sourceUrl',
      targetField: 'remoteLink',
      targetPath: './src/assets/remoteImages'
    }
  }  
]
~~~

Relancez le serveur local. Maintenant, toute les entrées du schéma `wordPressAttachment` possèdent un propriété supplémentaire `remoteLink`. Cette propriété est un objet qui représente l'image chargée localement, cet objet peut être directment pris en charge par `g-image`.

Pour ce faire, ajoutez `remoteLink` lors de vos requête GraphQL sur les entrées `wordPressAttachment`. Sur notre requête précedente `allWordPressPost`, nous sollicitions `featuredMedia` qui est justemment un schéma `wordPressAttachment`, ajoutons `remoteLink` à notre requête du ichier `src/pages/index.vue` : 

~~~
<page-query>
query {
  allWordPressPost (
    filter: {
      sticky: { eq: true}
    }
  ) {
    edges {
      node {
        id
        path
        title
        featuredMedia {
          id
          link
          remoteLink(
            width: 340,
            height: 260
          )
          sourceUrl
        }
      }
    }
  }
}
</page-query>
~~~

Vous remarquez que l'on passe des paramètres de largeur (`width`) et de hauteur (`height`) à `remoteLink`, de cette manière l'image sera retaillé par Gridsome. De cette manière, il est possible de configurer n'importe quel [paramètres de `g-image`](https://gridsome.org/docs/images/#options).

Sur le template du fichier, nous nous cotentions de passer un chaine représenant l'adresse distante ud fichier image, nous pouvons maintenant passer l'objet complet représenant l'image : 

~~~
<div v-if="featuredMedia">
  <figure
    v-if="post.featuredMedia.remoteLink"
  >
    <g-image
      :src="post.featuredMedia.remoteLink"
    />
  </figure>
</div>
~~~

Observez le code source produit (via l'inspecteur de code de votre navgateur), non seulement l'image à été retaillée, mais Gridsome à produit tout le code nécessaire au préchargement et à un affichage progressi et responsive.

#### Limitation

Les images qui sont intégrées dans le contenu des pages ne ont pas prise en charge par ce plugin. Il est tout à fait possible de créer notre propre algorithme pour géré cela, c'est un sujet un peu trop complexe pour ce cours.

Pour les visuels vectoriels en SVG, il est possible d'utiliser [SVGO](https://github.com/svg/svgo). Si les élements SVG sont utiliser pour l'interface (logo, icones), il est possible de les optimiser "à la main" lors du développement du site.

### Optimisation du CSS

Optimiser le CSS ne permet pas d'économiser autant de kilos octets que pour les images, mais cela este un procédure plus simple que pour les images et amélioreras tout même l'affichage de quelques centaines de millisecondes (de 60 à 80% de gain parfois).

Une stratégie moderne est d'utiliser PostCSS, il s'agit d'un processeur qui agit une fois le CSS produit (contrairement au pre-procésseur qui agissent en amont). PostCSS est basé sur toute [une série de plugins](https://www.postcss.parts/) agissant dans divers domaines.

Une approche intéressante est de ce passer des pre-processeur (SASS, LESS) et d'écrire du CSS "vanilla" moderne, [le plugin `preset-env`](https://github.com/csstools/postcss-preset-env) permet d'ajouter des [polyfills](https://fr.wikipedia.org/wiki/Polyfill) qui garantissent la compatibilité avec les navigateurs web.

Cela permet d'eploiter les spécification CSS du W3C qui sont encore en "Draft" ou "Experimental", comme par exemple [les variables CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/var()), ou [les directives media personnalisés](https://drafts.csswg.org/mediaqueries-5/#custom-mq) (CSS level 5).

Nous pourrons simplifier la gestion des dépendances liés aux fontes (`@font-face`) avec [font-magician](https://github.com/jonathantneal/postcss-font-magician) ([limité aux Google Font](https://github.com/jonathantneal/postcss-font-magician#foundries) par défaut).

Puis d'optimiser (trier, néttoyer, re-agencer les sélecteurs CSS) avec [CSSnano](https://github.com/cssnano/cssnano) ou [CSSO](https://github.com/css/csso).

Il est également possible d'y intégrer des linter (par exemple [Stylint](https://github.com/stylelint/stylelint)), pour interdire la mise en production d'un CSS qui serait "cassé". Pratique pour les grand projets ou l'on travail à plusieurs dévloppeur, je recommande l'usage du liner sur vos IDE (voici le moule pour [VisualCodeStudio](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) par exemple).

Mettons en place PostCSS pournotre projet. Dans un premier installez les paquets suivantes :

~~~
$ npm install postcss postcss-cli postcss-preset-env postcss-font-magician cssnano
~~~

Spécifier la prise ne charge par Webpack via le fichier de configuration de Gridsome `gridsome.config.js` (après `templates` par exemple):

~~~
  css: {
    loaderOptions: {
      postcss: {
        sourceMap: true,
        plugins: [
          require('postcss-preset-env'),
          require('postcss-font-magician'),
          require('cssnano'),
        ]
      }
    }
  }
~~~

## Mise en production
Pour la mise en production, vous pouvez suivre la partie déploiement sur Vercel de ce cours : https://github.com/ziopod/debuter-avec-gridsome#h%C3%A9bergemement-sur-vercel, ou encore en suivant la documentation sur [le déploiement de Gridsome](https://gridsome.org/docs/deploy-to-vercel/).

Voici par exemple le résultat du déploiement de cet exercice : https://wordpress-headless-git-main.ziopod.vercel.app/
