# Pretty - Entraineur de multiplications

Cette application React + TypeScript propose un petit exercice de calcul mental.

## Application en ligne

Lien GitHub Pages: https://bjalon.github.io/pretty/

## QR codes

### Depot GitHub

[![QR code depot GitHub](./public/qr-github.png)](https://github.com/bjalon/pretty)

### Application en ligne

[![QR code application en ligne](./public/qr-app.png)](https://bjalon.github.io/pretty/)

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
