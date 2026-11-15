# ⚡ ÉLEC TERRAIN PRO — Application PWA (GitHub Pages)

Application métier autonome en français : clients, entreprise personnalisable, interventions, devis, factures **EUR (€)**, documents PDF, WhatsApp, schémas électriques intégrés, calculs électriques et solaire photovoltaïque.

## Publier sur GitHub Pages

1. Créez un dépôt GitHub, par exemple `elec-terrain-pro`.
2. Décompressez `ELEC_TERRAIN_PRO_PWA_GitHub.zip` sur votre ordinateur.
3. Envoyez **les fichiers extraits** dans la racine du dépôt en conservant le dossier `icons/`. **Ne téléversez pas seulement le ZIP** : GitHub Pages doit voir `index.html` à la racine.
4. Dans le dépôt GitHub, ouvrez **Settings → Pages → Build and deployment**.
5. Choisissez **Deploy from a branch**, puis **main** et **/(root)** ; enregistrez avec **Save**.
6. Ouvrez le site public : `https://VOTRE-NOM.github.io/elec-terrain-pro/` (remplacez le nom et le dépôt).
7. Dans Chrome ou Edge, utilisez **⬇ Installer**. Sur iOS : Safari → **Partager → Sur l’écran d’accueil**.

> **Important :** il faut ouvrir l'URL **GitHub Pages** (HTTPS). Ouvrir `index.html` en `file://` ne permet pas d'activer le service worker et l'installation PWA.

## Fichiers inclus

- `index.html` : application HTML/CSS/JS principale, toutes les fonctions métier.
- `manifest.webmanifest` : nom, icônes, écran de démarrage et paramètres d'installation PWA.
- `sw.js` : service worker, mise en cache de l'application pour le fonctionnement hors connexion.
- `icons/` : icônes adaptées aux écrans d'accueil Android, Windows et iOS.
- `.nojekyll` : empêche toute transformation Jekyll inattendue sur GitHub Pages.

## Hors connexion et confidentialité

**Disponibles hors connexion après un premier chargement réussi :** interface, devis et factures, calculs, bibliothèque des schémas intégrés, études solaires, fiches et données déjà enregistrées dans le navigateur.

**Internet indispensable :** WhatsApp, recherches de schémas sur Internet, ressources externes et premier chargement de la PWA.

Les informations de clients, prix, documents et autres données restent dans le **stockage local de chaque navigateur/appareil** ; il n'y a **aucune synchronisation automatique** entre téléphones et ordinateurs. Les données doivent être sauvegardées régulièrement avec **Sauvegardes → Export JSON** puis restaurées sur un autre appareil. La désinstallation ou la suppression des données du navigateur peut effacer ces informations. Les fichiers publics de GitHub ne doivent jamais contenir de sauvegarde JSON client, de vrais documents privés ou d'identifiants secrets.

## Mettre à jour

Remplacez les fichiers du dépôt puis attendez la publication GitHub Pages et actualisez l'application. Pour des modifications du cache, changez le numéro `APP_CACHE` dans `sw.js` à chaque nouvelle version publiée. **Ne changez pas la clé `elec-terrain-pro-v1` de localStorage** dans `index.html` sans prévoir une migration : elle contient les données déjà enregistrées.

## Vérifier localement (facultatif)

Dans le dossier des fichiers, exécutez `python -m http.server 8000` et ouvrez `http://localhost:8000/`. Le navigateur accepte aussi localhost pour les service workers.

Les schémas et dimensionnements servent d'aide : toute installation réelle exige une validation par un professionnel habilité et l'application des normes locales.
