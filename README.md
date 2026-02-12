# Pretty - Entraineur de multiplications

Cette application React + TypeScript propose un petit exercice de calcul mental.

## Application en ligne

Lien GitHub Pages: https://bjalon.github.io/pretty/

## QR codes

### Depot GitHub

<a href="https://github.com/bjalon/pretty">
  <img src="./public/qr-github.png" alt="QR code depot GitHub" width="170" />
</a>

### Application en ligne

<a href="https://bjalon.github.io/pretty/">
  <img src="./public/qr-app.png" alt="QR code application en ligne" width="170" />
</a>

## Ce que fait l'application

- Affiche une multiplication aléatoire entre deux nombres de 0 a 10.
- Permet de saisir la reponse dans un champ texte.
- Verifie en direct si la reponse est correcte.
- Si la reponse est juste, une nouvelle multiplication est generee automatiquement.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichee par Vite (generalement `http://localhost:5173`).

## Deploiement GitHub Pages

Le deploiement est automatise via GitHub Actions (`.github/workflows/deploy-pages.yml`) a chaque push sur `main`.
