# ✅ Application Mariage – Checklist Projet

## 1. Mise en place technique
- [x] Création du monorepo Git
- [x] Mise en place du Docker Compose pour tous les services
- [x] Configuration de l’API Gateway (proxy, sécurité de base)
- [x] Configuration du backend d’authentification

## 2. Authentification & sécurité
- [ ] Inscription/connexion des invités (API, mobile)
- [ ] Génération et validation des tokens JWT
- [ ] Sécurisation des routes sensibles
- [ ] Gestion du consentement et RGPD

## 3. Application mobile
- [ ] Génération et affichage du QR code pour téléchargement
- [ ] Écran d’inscription/connexion
- [ ] Navigation principale (menu, accueil, etc.)
- [ ] Upload et affichage des photos
- [ ] Affichage des messages/livre d’or

## 4. Microservices et fonctionnalités
- [ ] Service gestion des invités
- [ ] Service gestion des photos (upload, stockage sécurisé, affichage)
- [ ] Service messagerie/livre d’or
- [ ] Service programme/infos pratiques

## 5. Stockage & sécurité des données
- [ ] Chiffrement des mots de passe (bcrypt)
- [ ] Validation des inputs côté backend
- [ ] Limitation des tailles d’upload (photos)
- [ ] Stockage sécurisé des photos (S3/local privé)
- [ ] Gestion des droits d’accès

## 6. Expérience vitrine & qualité
- [ ] README et documentation technique claire
- [ ] Mise en place de tests automatisés (backend, mobile)
- [ ] CI/CD (GitHub Actions ou autre)
- [ ] Design soigné de l’application mobile
- [ ] Version de démo (QR code test, compte démo)

---
## ⚠️ À prévoir pour la production
- [ ] Restreindre l’origine CORS au(x) domaine(s) front en production
- [ ] Utiliser une vraie clé secrète JWT et sécuriser toutes les variables sensibles en production

## 7. Monitoring & logs
- [ ] Centralisation des logs (gateway + backends)
- [ ] Mise en place d’un monitoring basique (ex : health checks, alertes)
