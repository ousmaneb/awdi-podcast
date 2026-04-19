# Guide d'intégration — Awdi Podcast Website

## Structure des fichiers

```
Awdi Podcast/
├── index.html          → Page d'accueil
├── a-propos.html       → À propos
├── blog.html           → Liste des articles
├── article.html        → Article de blog (template)
├── videos.html         → Page vidéos YouTube
├── services.html       → Services & tarifs
├── rendez-vous.html    → Prise de RDV (Calendly)
├── contact.html        → Formulaire de contact
├── css/style.css       → Tous les styles
├── js/main.js          → JavaScript principal
└── assets/
    ├── logo-light.png  → Logo fond blanc (à placer ici)
    └── logo-dark.png   → Logo fond noir (à placer ici)
```

## 1. Logos

Placez vos logos dans le dossier `assets/` :
- `logo-light.png` → logo fond blanc (pour la navbar et hero)
- `logo-dark.png` → logo fond noir/sombre (pour la page À propos)

## 2. Calendly

Dans `rendez-vous.html`, remplacez le bloc `calendly-placeholder` par :

```html
<!-- Inline widget begin -->
<div class="calendly-inline-widget"
     data-url="https://calendly.com/VOTRE-NOM/session-decouverte"
     style="min-width:320px;height:700px;">
</div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Inline widget end -->
```

Remplacez `VOTRE-NOM/session-decouverte` par votre vrai lien Calendly.

## 3. Stripe — Paiements

Pour chaque service, remplacez le `onclick` des boutons par votre lien Stripe :

```html
<!-- Exemple pour la séance individuelle -->
<button onclick="window.location.href='https://buy.stripe.com/VOTRE_LIEN_STRIPE'">
  Réserver cette séance
</button>
```

Dans `js/main.js`, section "Stripe payment buttons", décommentez et ajoutez vos liens.

## 4. Formulaire de contact

Le formulaire (`contact.html`) simule l'envoi pour l'instant. Pour le rendre fonctionnel :

**Option A — Formspree (gratuit, simple) :**
```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
```

**Option B — EmailJS :**
Ajoutez le SDK EmailJS et configurez votre template.

**Option C — Backend (Node.js, PHP…) :**
Pointez l'action du formulaire vers votre endpoint.

## 5. Blog — Articles dynamiques

Actuellement les articles sont des pages HTML statiques. Pour un blog dynamique :
- **WordPress** avec thème headless
- **Ghost** (CMS léger, idéal podcast/blog)
- **Notion + API** pour gérer le contenu facilement

## 6. Couleurs — Personnalisation

Dans `css/style.css`, modifiez les variables CSS :

```css
:root {
  --green-primary: #2E9B5B;  /* Couleur principale */
  --green-light: #4CAF7D;    /* Vert clair */
  --green-dark: #1B6B3A;     /* Vert foncé */
}
```

## 7. Déploiement

Options recommandées :
- **Netlify** (gratuit) → glisser-déposer le dossier
- **Vercel** (gratuit) → git push
- **GitHub Pages** (gratuit)
- **OVH / Ionos** → hébergement FTP classique

## 8. SEO

Pour chaque page, personnalisez :
- `<title>` → titre unique
- `<meta name="description">` → description de 150-160 caractères
- Ajoutez `og:image` pour les réseaux sociaux (image 1200x630px)

## Numéros d'urgence affichés

Le bandeau d'urgence affiche :
- **3114** → Numéro national prévention suicide (France)
- **15** → SAMU
- **18** → Pompiers
- **112** → Urgences européennes

Ces numéros sont présents sur toutes les pages et dans le footer.
