// Application PDCA Collect - Gestion Agriculteurs & Coopératives
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let agriculteurs = [];
    let cooperatives = [];
    let editIndex = -1;
    let editIndexCoop = -1;
    let currentMode = 'agriculteur'; // 'agriculteur' ou 'cooperative'

    const traductions = {"PDCA Collect": "PDCA Collect", "Système de collecte des données agricoles": "نظام جمع البيانات الفلاحية", "Agriculteurs": "الفلاحون", "Coopératives": "التعاونيات", "Formulaire d'inscription - Agriculteurs": "استمارة تسجيل الفلاحين", "Nom *": "الاسم *", "Prénom *": "الاسم الشخصي *", "CIN *": "رقم البطاقة الوطنية *", "Genre *": "الجنس *", "Homme (m)": "ذكر", "Femme (f)": "أنثى", "Date de naissance *": "تاريخ الازدياد *", "Adresse": "العنوان", "Téléphone *": "الهاتف *", "Coordonnées": "الإحداثيات", "X:": "X:", "Y:": "Y:", "ID Commune *": "رمز الجماعة *", "Douar *": "الدوار *", "Ajouter Agriculteur": "إضافة فلاح", "Exporter CSV Agriculteurs": "تصدير بيانات الفلاحين CSV", "Exporter Word Agriculteurs": "تصدير بيانات الفلاحين Word", "Exporter PDF Agriculteurs": "تصدير بيانات الفلاحين PDF", "Effacer Formulaire": "مسح الاستمارة", "Formulaire d'inscription - Coopératives": "استمارة تسجيل التعاونيات", "Nom Coopérative *": "اسم التعاونية *", "Nom Président *": "اسم الرئيس *", "Nombre d'adhérents *": "عدد المنخرطين *", "Date de création *": "تاريخ التأسيس *", "Fax Coopérative": "فاكس التعاونية", "Téléphone Président *": "هاتف الرئيس *", "Fonctionnelle *": "هل التعاونية نشيطة؟ *", "OUI": "نعم", "NON": "لا", "Conformité Loi 112-12 *": "مطابقة القانون 112-12 *", "Filière *": "الشعبة *", "Ajouter Coopérative": "إضافة تعاونية", "Exporter CSV Coopératives": "تصدير بيانات التعاونيات CSV", "Exporter Word Coopératives": "تصدير بيانات التعاونيات Word", "Exporter PDF Coopératives": "تصدير بيانات التعاونيات PDF", "Agriculteurs Saisis (": "الفلاحون المسجلون (", "Coopératives Saisies (": "التعاونيات المسجلة (", "Nom": "الاسم", "Prénom": "الاسم الشخصي", "CIN": "رقم البطاقة", "Genre": "الجنس", "Date Naiss.": "تاريخ الازدياد", "Téléphone": "الهاتف", "Commune": "الجماعة", "Douar": "الدوار", "Actions": "الإجراءات", "Aucun agriculteur saisi pour le moment.": "لا يوجد فلاحون مسجلون حاليا.", "Nom Président": "اسم الرئيس", "Nbr Adhérents": "عدد المنخرطين", "Date Création": "تاريخ التأسيس", "Fax": "الفاكس", "Tél Président": "هاتف الرئيس", "Fonctionnelle": "نشطة", "Conformité Loi": "مطابقة القانون", "Commune ID": "رمز الجماعة", "Filière": "الشعبة", "Aucune coopérative saisie pour le moment.": "لا توجد تعاونيات مسجلة حاليا.", "OK": "موافق", "Ex: Benmohammed": "مثال: بنمحمد", "Ex: Mina": "مثال: مينة", "Ex: AB0099": "مثال: AB0099", "JJ/MM/AAAA (Ex: 03/09/1980)": "يوم/شهر/سنة (مثال: 03/09/1980)", "Adresse complète": "العنوان الكامل", "Ex: 600000000": "مثال: 600000000", "x": "x", "y": "y", "Ex: 302": "مثال: 302", "Ex: Douar principal": "مثال: الدوار الرئيسي", "Ex: Coopérative Test": "مثال: تعاونية نموذجية", "Ex: Président Coopérative": "مثال: رئيس التعاونية", "Ex: 34": "مثال: 34", "Ex: 6554323345": "مثال: 6554323345", "Ex: 655443345": "مثال: 655443345", "Ex: 303": "مثال: 303", "Ex: 15": "مثال: 15", "Rechercher dans les agriculteurs...": "ابحث في لائحة الفلاحين...", "Commune (toutes)": "كل الجماعات", "Tous les genres": "كل الأجناس", "Homme": "ذكر", "Femme": "أنثى", "Rechercher dans les coopératives...": "ابحث في لائحة التعاونيات...", "Toutes les communes": "كل الجماعات", "Toutes": "الكل", "Oui": "نعم", "Non": "لا", "Aucun résultat correspondant.": "لا توجد نتائج مطابقة.", "Langue": "اللغة", "Champs manquants": "حقول ناقصة", "Veuillez remplir tous les champs obligatoires (*).": "يرجى ملء جميع الحقول الإلزامية (*).", "Date invalide": "تاريخ غير صحيح", "Le format de date doit être JJ/MM/AAAA (ex: 03/09/1980).": "يجب أن يكون تنسيق التاريخ يوم/شهر/سنة (مثال: 03/09/1980).", "Le format de date doit être JJ/MM/AAAA.": "يجب أن يكون تنسيق التاريخ يوم/شهر/سنة.", "Succès": "تم بنجاح", "Supprimé": "تم الحذف", "Agriculteur supprimé.": "تم حذف الفلاح.", "Coopérative supprimée.": "تم حذف التعاونية.", "Export impossible": "تعذر التصدير", "Aucun agriculteur à exporter.": "لا يوجد فلاحون لتصديرهم.", "Aucune coopérative à exporter.": "لا توجد تعاونيات لتصديرها.", "Export CSV réussi": "تم تصدير CSV بنجاح", "Export Word réussi": "تم تصدير Word بنجاح", "Export PDF réussi": "تم تصدير PDF بنجاح", "Erreur": "خطأ", "Impossible d'exporter en Word.": "تعذر التصدير إلى Word.", "Impossible d'exporter en PDF.": "تعذر التصدير إلى PDF.", "Données chargées": "تم تحميل البيانات", "PDCA Collect initialisé": "تم تشغيل PDCA Collect", "Formulaire agriculteur effacé": "تم مسح استمارة الفلاح", "Formulaire coopérative effacé": "تم مسح استمارة التعاونية", "Modifier": "تعديل", "Supprimer": "حذف", "Coordonnées GPS": "الإحداثيات الجغرافية", "Obtenir ma position GPS": "تحديد موقعي عبر GPS", "Voir sur Google Maps": "عرض على خرائط Google", "X – Longitude": "X – خط الطول", "Y – Latitude": "Y – خط العرض", "Avec ou sans Internet : saisissez X et Y manuellement si nécessaire.": "مع أو بدون إنترنت: أدخل X وY يدويا عند الحاجة."};
    let langue = localStorage.getItem('pdcaLangue') || 'fr';
    function traduire(texte) {
        if (langue !== 'ar' || !texte) return texte;
        if (traductions[texte]) return traductions[texte];
        let m;
        if ((m = texte.match(/^Agriculteur (.+) ajouté\\.$/))) return `تمت إضافة الفلاح: ${m[1]}`;
        if ((m = texte.match(/^Agriculteur (.+) modifié\\.$/))) return `تم تعديل بيانات الفلاح: ${m[1]}`;
        if ((m = texte.match(/^Coopérative (.+) ajoutée\\.$/))) return `تمت إضافة التعاونية: ${m[1]}`;
        if ((m = texte.match(/^Coopérative (.+) modifiée\\.$/))) return `تم تعديل بيانات التعاونية: ${m[1]}`;
        if ((m = texte.match(/^(\\d+) agriculteurs exportés\\.$/))) return `تم تصدير ${m[1]} فلاح`;
        if ((m = texte.match(/^(\\d+) coopératives exportées\\.$/))) return `تم تصدير ${m[1]} تعاونية`;
        return texte;
    }

    function appliquerLangue(nouvelleLangue) {
        langue = nouvelleLangue === 'ar' ? 'ar' : 'fr';
        document.documentElement.lang = langue;
        document.documentElement.dir = langue === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('rtl-mode', langue === 'ar');
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const cle = el.getAttribute('data-i18n');
            el.textContent = langue === 'ar' ? (traductions[cle] || cle) : cle;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const cle = el.getAttribute('data-i18n-placeholder');
            el.placeholder = langue === 'ar' ? (traductions[cle] || cle) : cle;
        });
        const selectLang = document.getElementById('languageSelect');
        if (selectLang) selectLang.value = langue;
        localStorage.setItem('pdcaLangue', langue);
        mettreAJourTableauAgriculteurs();
        mettreAJourTableauCooperatives();
        mettreAJourStatut(langue === 'ar' ? 'تم تحميل اللغة العربية' : 'Langue française activée');
    }

    function normaliserRecherche(valeur) {
        return String(valeur || '').toLocaleLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
    }

    function appliquerFiltres(type) {
        const prefixe = type === 'agri' ? 'agri' : 'coop';
        const corps = document.getElementById(type === 'agri' ? 'tableBodyAgriculteurs' : 'tableBodyCooperatives');
        const recherche = normaliserRecherche(document.getElementById(prefixe + 'Search').value);
        const commune = normaliserRecherche(document.getElementById(prefixe + 'Commune').value);
        const filtre = document.getElementById(prefixe + 'Filter').value;
        let visibles = 0;
        corps.querySelectorAll('tr').forEach(ligne => {
            const texte = normaliserRecherche(ligne.textContent);
            const okRecherche = !recherche || texte.includes(recherche);
            const okCommune = !commune || normaliserRecherche(ligne.dataset.commune).includes(commune);
            const okFiltre = filtre === 'all' ||
                (type === 'agri' ? ligne.dataset.genre === filtre :
                    (filtre === 'yes' ? ligne.dataset.fonctionnelle === 'OUI' : ligne.dataset.fonctionnelle === 'NON'));
            const afficher = okRecherche && okCommune && okFiltre;
            ligne.style.display = afficher ? '' : 'none';
            if (afficher) visibles++;
        });
        const message = document.getElementById(type === 'agri' ? 'tableMessageAgriculteurs' : 'tableMessageCooperatives');
        const total = corps.querySelectorAll('tr').length;
        if (total > 0 && visibles === 0) message.textContent = traduire('Aucun résultat correspondant.');
        else if (total > 0) message.textContent = langue === 'ar' ? `النتائج المعروضة: ${visibles} من ${total}` : `Résultats affichés : ${visibles} sur ${total}`;
    }

    
    // Éléments du DOM
    const formAgriculteur = document.getElementById('formAgriculteur');
    const formCooperative = document.getElementById('formCooperative');
    const listAgriculteur = document.getElementById('listAgriculteur');
    const listCooperative = document.getElementById('listCooperative');
    
    const tableBodyAgriculteurs = document.getElementById('tableBodyAgriculteurs');
    const tableBodyCooperatives = document.getElementById('tableBodyCooperatives');
    
    const countAgriculteurs = document.getElementById('countAgriculteurs');
    const countCooperatives = document.getElementById('countCooperatives');
    
    const tableMessageAgriculteurs = document.getElementById('tableMessageAgriculteurs');
    const tableMessageCooperatives = document.getElementById('tableMessageCooperatives');
    const statusMessage = document.getElementById('statusMessage');
    
    // Boutons de sélection
    const btnAgriculteur = document.getElementById('btnAgriculteur');
    const btnCooperative = document.getElementById('btnCooperative');
    
    // Boutons Agriculteur
    const btnAjouterAgriculteur = document.getElementById('btnAjouterAgriculteur');
    const btnExporterCSVAgriculteur = document.getElementById('btnExporterCSVAgriculteur');
    const btnExporterWordAgriculteur = document.getElementById('btnExporterWordAgriculteur');
    const btnExporterPDFAgriculteur = document.getElementById('btnExporterPDFAgriculteur');
    const btnEffacerAgriculteur = document.getElementById('btnEffacerAgriculteur');
    
    // Boutons Coopérative
    const btnAjouterCooperative = document.getElementById('btnAjouterCooperative');
    const btnExporterCSVCooperative = document.getElementById('btnExporterCSVCooperative');
    const btnExporterWordCooperative = document.getElementById('btnExporterWordCooperative');
    const btnExporterPDFCooperative = document.getElementById('btnExporterPDFCooperative');
    const btnEffacerCooperative = document.getElementById('btnEffacerCooperative');
    
    // Modal
    const modal = document.getElementById('messageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalClose = document.getElementById('modalClose');
    
    // Initialiser jsPDF
    const { jsPDF } = window.jspdf;
    
    // Fonctions utilitaires
    function validerDate(dateStr) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        if (!regex.test(dateStr)) {
            return false;
        }
        
        const parts = dateStr.split('/');
        const jour = parseInt(parts[0], 10);
        const mois = parseInt(parts[1], 10);
        const annee = parseInt(parts[2], 10);
        
        const date = new Date(annee, mois - 1, jour);
        return date.getDate() === jour && 
               date.getMonth() === mois - 1 && 
               date.getFullYear() === annee;
    }
    
    function afficherMessage(titre, message) {
        modalTitle.textContent = traduire(titre);
        modalMessage.textContent = traduire(message);
        modal.style.display = 'flex';
        mettreAJourStatut(titre);
    }
    
    function mettreAJourStatut(message) {
        const total = agriculteurs.length + cooperatives.length;
        statusMessage.innerHTML = `<i class="fas fa-info-circle"></i> ${traduire(message)} - ${agriculteurs.length} ${langue === 'ar' ? 'فلاح' : 'agriculteurs'}, ${cooperatives.length} ${langue === 'ar' ? 'تعاونية' : 'coopératives'}`;
    }
    
    // Sauvegarde dans localStorage
    function sauvegarderDonnees() {
        localStorage.setItem('pdcaAgriculteurs', JSON.stringify(agriculteurs));
        localStorage.setItem('pdcaCooperatives', JSON.stringify(cooperatives));
    }
    
    function chargerDonnees() {
        // Charger agriculteurs
        const agriculteursSauvegardes = localStorage.getItem('pdcaAgriculteurs');
        if (agriculteursSauvegardes) {
            try {
                agriculteurs = JSON.parse(agriculteursSauvegardes);
                mettreAJourTableauAgriculteurs();
            } catch (e) {
                console.error('Erreur chargement agriculteurs:', e);
            }
        }
        
        // Charger coopératives
        const cooperativesSauvegardes = localStorage.getItem('pdcaCooperatives');
        if (cooperativesSauvegardes) {
            try {
                cooperatives = JSON.parse(cooperativesSauvegardes);
                mettreAJourTableauCooperatives();
            } catch (e) {
                console.error('Erreur chargement coopératives:', e);
            }
        }
        
        mettreAJourStatut('Données chargées');
    }
    
    // Gestion du mode (agriculteur/coopérative)
    function changerMode(mode) {
        currentMode = mode;
        
        if (mode === 'agriculteur') {
            formAgriculteur.classList.add('active-form');
            formCooperative.classList.remove('active-form');
            listAgriculteur.classList.add('active-list');
            listCooperative.classList.remove('active-list');
            btnAgriculteur.classList.add('type-active');
            btnCooperative.classList.remove('type-active');
        } else {
            formAgriculteur.classList.remove('active-form');
            formCooperative.classList.add('active-form');
            listAgriculteur.classList.remove('active-list');
            listCooperative.classList.add('active-list');
            btnAgriculteur.classList.remove('type-active');
            btnCooperative.classList.add('type-active');
        }
    }
    
    // === GESTION DES AGRICULTEURS ===
    function validerFormulaireAgriculteur() {
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const cin = document.getElementById('cin').value.trim();
        const dateNaissance = document.getElementById('date_naissance').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const communeId = document.getElementById('commune_id').value.trim();
        const douar = document.getElementById('douar').value.trim();
        
        if (!nom || !prenom || !cin || !dateNaissance || !telephone || !communeId || !douar) {
            afficherMessage('Champs manquants', 'Veuillez remplir tous les champs obligatoires (*).');
            return false;
        }
        
        if (!validerDate(dateNaissance)) {
            afficherMessage('Date invalide', 'Le format de date doit être JJ/MM/AAAA (ex: 03/09/1980).');
            return false;
        }
        
        return true;
    }
    
    function ajouterAgriculteur() {
        if (!validerFormulaireAgriculteur()) {
            return;
        }
        
        const agriculteur = {
            nom: document.getElementById('nom').value.trim(),
            prenom: document.getElementById('prenom').value.trim(),
            cin: document.getElementById('cin').value.trim(),
            genre: document.querySelector('input[name="genre"]:checked').value,
            date_naissance: document.getElementById('date_naissance').value.trim(),
            adresse: document.getElementById('adresse').value.trim(),
            telephone: document.getElementById('telephone').value.trim(),
            x: document.getElementById('x').value.trim() || 'x',
            y: document.getElementById('y').value.trim() || 'y',
            commune_id: document.getElementById('commune_id').value.trim(),
            douar: document.getElementById('douar').value.trim(),
            signature: '' // Signature vide
        };
        
        if (editIndex === -1) {
            agriculteurs.push(agriculteur);
            afficherMessage('Succès', `Agriculteur ${agriculteur.prenom} ${agriculteur.nom} ajouté.`);
        } else {
            agriculteurs[editIndex] = agriculteur;
            editIndex = -1;
            btnAjouterAgriculteur.innerHTML = `<i class="fas fa-plus"></i> ${langue === 'ar' ? 'إضافة فلاح' : 'Ajouter Agriculteur'}`;
            afficherMessage('Succès', `Agriculteur ${agriculteur.prenom} ${agriculteur.nom} modifié.`);
        }
        
        sauvegarderDonnees();
        mettreAJourTableauAgriculteurs();
        effacerFormulaireAgriculteur();
    }
    
    function modifierAgriculteur(index) {
        const agriculteur = agriculteurs[index];
        
        document.getElementById('nom').value = agriculteur.nom;
        document.getElementById('prenom').value = agriculteur.prenom;
        document.getElementById('cin').value = agriculteur.cin;
        
        const genreRadio = document.querySelector(`input[name="genre"][value="${agriculteur.genre}"]`);
        if (genreRadio) genreRadio.checked = true;
        
        document.getElementById('date_naissance').value = agriculteur.date_naissance;
        document.getElementById('adresse').value = agriculteur.adresse || '';
        document.getElementById('telephone').value = agriculteur.telephone;
        document.getElementById('x').value = agriculteur.x;
        document.getElementById('y').value = agriculteur.y;
        document.getElementById('commune_id').value = agriculteur.commune_id;
        document.getElementById('douar').value = agriculteur.douar;
        
        editIndex = index;
        btnAjouterAgriculteur.innerHTML = `<i class="fas fa-save"></i> ${langue === 'ar' ? 'حفظ التعديلات' : 'Enregistrer modifications'}`;
        changerMode('agriculteur');
    }
    
    function supprimerAgriculteur(index) {
        if (confirm(langue === 'ar' ? `هل تريد حذف ${agriculteurs[index].prenom} ${agriculteurs[index].nom}؟` : `Supprimer ${agriculteurs[index].prenom} ${agriculteurs[index].nom} ?`)) {
            agriculteurs.splice(index, 1);
            sauvegarderDonnees();
            mettreAJourTableauAgriculteurs();
            afficherMessage('Supprimé', 'Agriculteur supprimé.');
        }
    }
    
    function mettreAJourTableauAgriculteurs() {
        tableBodyAgriculteurs.innerHTML = '';
        countAgriculteurs.textContent = agriculteurs.length;
        
        if (agriculteurs.length === 0) {
            tableMessageAgriculteurs.textContent = langue === 'ar' ? 'لا يوجد فلاحون مسجلون.' : 'Aucun agriculteur saisi.';
            return;
        }
        
        tableMessageAgriculteurs.textContent = '';
        
        agriculteurs.forEach((agriculteur, index) => {
            const row = document.createElement('tr');
            const genreIcon = agriculteur.genre === 'm' ? '♂️' : '♀️';
            row.dataset.commune = agriculteur.commune_id || '';
            row.dataset.genre = agriculteur.genre || '';
            
            row.innerHTML = `
                <td>${agriculteur.nom}</td>
                <td>${agriculteur.prenom}</td>
                <td>${agriculteur.cin}</td>
                <td>${genreIcon} (${langue === 'ar' ? (agriculteur.genre === 'm' ? 'ذكر' : 'أنثى') : agriculteur.genre})</td>
                <td>${agriculteur.date_naissance}</td>
                <td>${agriculteur.telephone}</td>
                <td>${agriculteur.commune_id}</td>
                <td>${agriculteur.douar}</td>
                <td>
                    <button onclick="app.modifierAgriculteur(${index})" class="action-btn" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="app.supprimerAgriculteur(${index})" class="action-btn" style="background-color: #f44336; margin-left: 5px;" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            tableBodyAgriculteurs.appendChild(row);
        });
        appliquerFiltres('agri');
    }
    
    function effacerFormulaireAgriculteur() {
        document.getElementById('agriculteurForm').reset();
        document.getElementById('x').value = 'x';
        document.getElementById('y').value = 'y';
        editIndex = -1;
        btnAjouterAgriculteur.innerHTML = `<i class="fas fa-plus"></i> ${langue === 'ar' ? 'إضافة فلاح' : 'Ajouter Agriculteur'}`;
        mettreAJourStatut('Formulaire agriculteur effacé');
    }
    
    function exporterCSVAgriculteur() {
        if (agriculteurs.length === 0) {
            afficherMessage('Export impossible', 'Aucun agriculteur à exporter.');
            return;
        }
        
        // En-têtes selon exemple.csv
        const headers = ['nom', 'prenom', 'cin', 'genre', 'date_naissance', 'adresse', 'telephone', 'x', 'y', 'commune_id', 'douar'];
        
        let csvContent = headers.join(';') + '\n';
        
        agriculteurs.forEach(agriculteur => {
            const row = [
                agriculteur.nom,
                agriculteur.prenom,
                agriculteur.cin,
                agriculteur.genre,
                agriculteur.date_naissance,
                agriculteur.adresse || '',
                agriculteur.telephone,
                agriculteur.x,
                agriculteur.y,
                agriculteur.commune_id,
                agriculteur.douar
            ].map(value => `"${value}"`).join(';');
            
            csvContent += row + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        link.setAttribute('href', url);
        link.setAttribute('download', `agriculteurs_pdca_${date}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        afficherMessage('Export CSV réussi', `${agriculteurs.length} agriculteurs exportés.`);
    }
    
    async function exporterWordAgriculteur() {
        if (agriculteurs.length === 0) {
            afficherMessage('Export impossible', 'Aucun agriculteur à exporter.');
            return;
        }
        
        try {
            const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel } = window.docx;
            
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            text: "Liste des Agriculteurs - PDCA Collect",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 200 }
                        }),
                        new Paragraph({
                            text: `Généré le ${new Date().toLocaleDateString('fr-FR')} - ${agriculteurs.length} agriculteurs`,
                            spacing: { after: 400 }
                        }),
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            rows: [
                                new TableRow({
                                    children: [
                                        'Nom', 'Prénom', 'CIN', 'Genre', 'Date Naiss.', 'Téléphone', 'Commune', 'Douar', 'Signature'
                                    ].map(text => new TableCell({
                                        children: [new Paragraph({ text, bold: true })],
                                        shading: { fill: "E0E0E0" }
                                    }))
                                }),
                                ...agriculteurs.map(agriculteur => new TableRow({
                                    children: [
                                        agriculteur.nom,
                                        agriculteur.prenom,
                                        agriculteur.cin,
                                        agriculteur.genre === 'm' ? 'Homme' : 'Femme',
                                        agriculteur.date_naissance,
                                        agriculteur.telephone,
                                        agriculteur.commune_id,
                                        agriculteur.douar,
                                        '___________________' // Signature vide pour manuscrite
                                    ].map(text => new TableCell({
                                        children: [new Paragraph(text)]
                                    }))
                                }))
                            ]
                        })
                    ]
                }]
            });
            
            const blob = await Packer.toBlob(doc);
            const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            saveAs(blob, `agriculteurs_pdca_${date}.docx`);
            
            afficherMessage('Export Word réussi', `${agriculteurs.length} agriculteurs exportés.`);
            
        } catch (error) {
            console.error('Erreur export Word:', error);
            afficherMessage('Erreur', 'Impossible d\'exporter en Word.');
        }
    }
    
    function exporterPDFAgriculteur() {
        if (agriculteurs.length === 0) {
            afficherMessage('Export impossible', 'Aucun agriculteur à exporter.');
            return;
        }
        
        try {
            const doc = new jsPDF();
            
            doc.setFontSize(18);
            doc.setTextColor(46, 125, 50);
            doc.text("Liste des Agriculteurs - PDCA Collect", 105, 20, { align: 'center' });
            
            doc.setFontSize(11);
            doc.setTextColor(100, 100, 100);
            doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} - ${agriculteurs.length} agriculteurs`, 105, 30, { align: 'center' });
            
            const tableData = agriculteurs.map(agriculteur => [
                agriculteur.nom,
                agriculteur.prenom,
                agriculteur.cin,
                agriculteur.genre === 'm' ? 'Homme' : 'Femme',
                agriculteur.date_naissance,
                agriculteur.telephone,
                agriculteur.commune_id,
                agriculteur.douar,
                '___________________' // Signature vide pour manuscrite
            ]);
            
            const headers = [['Nom', 'Prénom', 'CIN', 'Genre', 'Date Naiss.', 'Téléphone', 'Commune', 'Douar', 'Signature']];
            
            doc.autoTable({
                startY: 40,
                head: headers,
                body: tableData,
                theme: 'grid',
                headStyles: { fillColor: [46, 125, 50] },
                styles: { fontSize: 9, cellPadding: 3 },
                margin: { left: 10, right: 10 }
            });
            
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(150, 150, 150);
                doc.text(`Page ${i} sur ${pageCount} - PDCA Collect`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
            }
            
            const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            doc.save(`agriculteurs_pdca_${date}.pdf`);
            
            afficherMessage('Export PDF réussi', `${agriculteurs.length} agriculteurs exportés.`);
            
        } catch (error) {
            console.error('Erreur export PDF:', error);
            afficherMessage('Erreur', 'Impossible d\'exporter en PDF.');
        }
    }
    
    // === GESTION DES COOPÉRATIVES ===
    function validerFormulaireCooperative() {
        const nom_cooperative = document.getElementById('nom_cooperative').value.trim();
        const nom_president = document.getElementById('nom_president').value.trim();
        const nombre_adherents = document.getElementById('nombre_adherents').value.trim();
        const dateCreation = document.getElementById('dateCreation').value.trim();
        const tel_president = document.getElementById('tel_president').value.trim();
        const commune_id = document.getElementById('commune_id_coop').value.trim();
        const filiere = document.getElementById('filiere').value.trim();
        
        if (!nom_cooperative || !nom_president || !nombre_adherents || !dateCreation || !tel_president || !commune_id || !filiere) {
            afficherMessage('Champs manquants', 'Veuillez remplir tous les champs obligatoires (*).');
            return false;
        }
        
        if (!validerDate(dateCreation)) {
            afficherMessage('Date invalide', 'Le format de date doit être JJ/MM/AAAA.');
            return false;
        }
        
        return true;
    }
    
    function ajouterCooperative() {
        if (!validerFormulaireCooperative()) {
            return;
        }
        
        const cooperative = {
            nom_cooperative: document.getElementById('nom_cooperative').value.trim(),
            nom_president: document.getElementById('nom_president').value.trim(),
            nombre_adherents: document.getElementById('nombre_adherents').value.trim(),
            dateCreation: document.getElementById('dateCreation').value.trim(),
            fax_cooperative: document.getElementById('fax_cooperative').value.trim(),
            tel_president: document.getElementById('tel_president').value.trim(),
            fonctionnelle: document.getElementById('fonctionnelle').value,
            conformite_loi_112_12: document.getElementById('conformite_loi_112_12').value,
            commune_id: document.getElementById('commune_id_coop').value.trim(),
            genre: document.querySelector('input[name="genre_coop"]:checked').value,
            filiere: document.getElementById('filiere').value.trim(),
            x: document.getElementById('x_coop').value.trim(),
            y: document.getElementById('y_coop').value.trim(),
            signature: '' // Signature vide
        };
        
        if (editIndexCoop === -1) {
            cooperatives.push(cooperative);
            afficherMessage('Succès', `Coopérative ${cooperative.nom_cooperative} ajoutée.`);
        } else {
            cooperatives[editIndexCoop] = cooperative;
            editIndexCoop = -1;
            btnAjouterCooperative.innerHTML = `<i class="fas fa-plus"></i> ${langue === 'ar' ? 'إضافة تعاونية' : 'Ajouter Coopérative'}`;
            afficherMessage('Succès', `Coopérative ${cooperative.nom_cooperative} modifiée.`);
        }
        
        sauvegarderDonnees();
        mettreAJourTableauCooperatives();
        effacerFormulaireCooperative();
    }
    
    function modifierCooperative(index) {
        const cooperative = cooperatives[index];
        
        document.getElementById('nom_cooperative').value = cooperative.nom_cooperative;
        document.getElementById('nom_president').value = cooperative.nom_president;
        document.getElementById('nombre_adherents').value = cooperative.nombre_adherents;
        document.getElementById('dateCreation').value = cooperative.dateCreation;
        document.getElementById('fax_cooperative').value = cooperative.fax_cooperative || '';
        document.getElementById('tel_president').value = cooperative.tel_president;
        document.getElementById('fonctionnelle').value = cooperative.fonctionnelle;
        document.getElementById('conformite_loi_112_12').value = cooperative.conformite_loi_112_12;
        document.getElementById('commune_id_coop').value = cooperative.commune_id;
        document.getElementById('filiere').value = cooperative.filiere;
        document.getElementById('x_coop').value = cooperative.x || '';
        document.getElementById('y_coop').value = cooperative.y || '';
        
        const genreRadio = document.querySelector(`input[name="genre_coop"][value="${cooperative.genre}"]`);
        if (genreRadio) genreRadio.checked = true;
        
        editIndexCoop = index;
        btnAjouterCooperative.innerHTML = `<i class="fas fa-save"></i> ${langue === 'ar' ? 'حفظ التعديلات' : 'Enregistrer modifications'}`;
        changerMode('cooperative');
    }
    
    function supprimerCooperative(index) {
        if (confirm(langue === 'ar' ? `هل تريد حذف ${cooperatives[index].nom_cooperative}؟` : `Supprimer ${cooperatives[index].nom_cooperative} ?`)) {
            cooperatives.splice(index, 1);
            sauvegarderDonnees();
            mettreAJourTableauCooperatives();
            afficherMessage('Supprimé', 'Coopérative supprimée.');
        }
    }
    
    function mettreAJourTableauCooperatives() {
        tableBodyCooperatives.innerHTML = '';
        countCooperatives.textContent = cooperatives.length;
        
        if (cooperatives.length === 0) {
            tableMessageCooperatives.textContent = langue === 'ar' ? 'لا توجد تعاونيات مسجلة.' : 'Aucune coopérative saisie.';
            return;
        }
        
        tableMessageCooperatives.textContent = '';
        
        cooperatives.forEach((cooperative, index) => {
            const row = document.createElement('tr');
            const genreIcon = cooperative.genre === 'm' ? '♂️' : '♀️';
            row.dataset.commune = cooperative.commune_id || '';
            row.dataset.genre = cooperative.genre || '';
            row.dataset.fonctionnelle = cooperative.fonctionnelle || '';
            
            row.innerHTML = `
                <td>${cooperative.nom_cooperative}</td>
                <td>${cooperative.nom_president}</td>
                <td>${cooperative.nombre_adherents}</td>
                <td>${cooperative.dateCreation}</td>
                <td>${cooperative.fax_cooperative || ''}</td>
                <td>${cooperative.tel_president}</td>
                <td>${cooperative.fonctionnelle}</td>
                <td>${cooperative.conformite_loi_112_12}</td>
                <td>${cooperative.commune_id}</td>
                <td>${genreIcon} (${langue === 'ar' ? (cooperative.genre === 'm' ? 'ذكر' : 'أنثى') : cooperative.genre})</td>
                <td>${cooperative.filiere}</td>
                <td>
                    <button onclick="app.modifierCooperative(${index})" class="action-btn" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="app.supprimerCooperative(${index})" class="action-btn" style="background-color: #f44336; margin-left: 5px;" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            tableBodyCooperatives.appendChild(row);
        });
        appliquerFiltres('coop');
    }
    
    function effacerFormulaireCooperative() {
        document.getElementById('cooperativeForm').reset();
        editIndexCoop = -1;
        btnAjouterCooperative.innerHTML = `<i class="fas fa-plus"></i> ${langue === 'ar' ? 'إضافة تعاونية' : 'Ajouter Coopérative'}`;
        mettreAJourStatut('Formulaire coopérative effacé');
    }
    
    function exporterCSVCooperative() {
        if (cooperatives.length === 0) {
            afficherMessage('Export impossible', 'Aucune coopérative à exporter.');
            return;
        }
        
        // En-têtes selon exemple_cooperative.csv
        const headers = ['nom_cooperative', 'nom_president', 'nombre_adherents', 'dateCreation', 'fax_cooperative', 'tel_president', 'fonctionnelle', 'conformite_loi_112_12', 'commune_id', 'genre', 'filiere', 'x', 'y'];
        
        let csvContent = headers.join(';') + '\n';
        
        cooperatives.forEach(cooperative => {
            const row = [
                cooperative.nom_cooperative,
                cooperative.nom_president,
                cooperative.nombre_adherents,
                cooperative.dateCreation,
                cooperative.fax_cooperative || '',
                cooperative.tel_president,
                cooperative.fonctionnelle,
                cooperative.conformite_loi_112_12,
                cooperative.commune_id,
                cooperative.genre,
                cooperative.filiere,
                cooperative.x || '',
                cooperative.y || ''
            ].map(value => `"${value}"`).join(';');
            
            csvContent += row + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        link.setAttribute('href', url);
        link.setAttribute('download', `cooperatives_pdca_${date}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        afficherMessage('Export CSV réussi', `${cooperatives.length} coopératives exportées.`);
    }
    
    async function exporterWordCooperative() {
        if (cooperatives.length === 0) {
            afficherMessage('Export impossible', 'Aucune coopérative à exporter.');
            return;
        }
        
        try {
            const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel } = window.docx;
            
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            text: "Liste des Coopératives Agricoles - PDCA Collect",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 200 }
                        }),
                        new Paragraph({
                            text: `Généré le ${new Date().toLocaleDateString('fr-FR')} - ${cooperatives.length} coopératives`,
                            spacing: { after: 400 }
                        }),
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            rows: [
                                new TableRow({
                                    children: [
                                        'Nom Coop', 'Président', 'Adhérents', 'Date Création', 'Fax', 'Tél Président', 
                                        'Fonctionnelle', 'Conformité Loi', 'Commune ID', 'Genre', 'Filière', 'X Longitude', 'Y Latitude', 'Signature'
                                    ].map(text => new TableCell({
                                        children: [new Paragraph({ text, bold: true })],
                                        shading: { fill: "E0E0E0" }
                                    }))
                                }),
                                ...cooperatives.map(cooperative => new TableRow({
                                    children: [
                                        cooperative.nom_cooperative,
                                        cooperative.nom_president,
                                        cooperative.nombre_adherents,
                                        cooperative.dateCreation,
                                        cooperative.fax_cooperative || '',
                                        cooperative.tel_president,
                                        cooperative.fonctionnelle,
                                        cooperative.conformite_loi_112_12,
                                        cooperative.commune_id,
                                        cooperative.genre === 'm' ? 'Homme' : 'Femme',
                                        cooperative.filiere,
                                        cooperative.x || '',
                                        cooperative.y || '',
                                        '___________________' // Signature vide pour manuscrite
                                    ].map(text => new TableCell({
                                        children: [new Paragraph(text)]
                                    }))
                                }))
                            ]
                        })
                    ]
                }]
            });
            
            const blob = await Packer.toBlob(doc);
            const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            saveAs(blob, `cooperatives_pdca_${date}.docx`);
            
            afficherMessage('Export Word réussi', `${cooperatives.length} coopératives exportées.`);
            
        } catch (error) {
            console.error('Erreur export Word:', error);
            afficherMessage('Erreur', 'Impossible d\'exporter en Word.');
        }
    }
    
    function exporterPDFCooperative() {
        if (cooperatives.length === 0) {
            afficherMessage('Export impossible', 'Aucune coopérative à exporter.');
            return;
        }
        
        try {
            const doc = new jsPDF('landscape');
            
            doc.setFontSize(18);
            doc.setTextColor(46, 125, 50);
            doc.text("Liste des Coopératives Agricoles - PDCA Collect", 148, 20, { align: 'center' });
            
            doc.setFontSize(11);
            doc.setTextColor(100, 100, 100);
            doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} - ${cooperatives.length} coopératives`, 148, 30, { align: 'center' });
            
            const tableData = cooperatives.map(cooperative => [
                cooperative.nom_cooperative,
                cooperative.nom_president,
                cooperative.nombre_adherents,
                cooperative.dateCreation,
                cooperative.fax_cooperative || '',
                cooperative.tel_president,
                cooperative.fonctionnelle,
                cooperative.conformite_loi_112_12,
                cooperative.commune_id,
                cooperative.genre === 'm' ? 'Homme' : 'Femme',
                cooperative.filiere,
                cooperative.x || '',
                cooperative.y || '',
                '___________________' // Signature vide pour manuscrite
            ]);
            
            const headers = [['Nom Coop', 'Président', 'Adhérents', 'Date Création', 'Fax', 'Tél Président', 
                             'Fonctionnelle', 'Conformité Loi', 'Commune ID', 'Genre', 'Filière', 'X Longitude', 'Y Latitude', 'Signature']];
            
            doc.autoTable({
                startY: 40,
                head: headers,
                body: tableData,
                theme: 'grid',
                headStyles: { fillColor: [46, 125, 50] },
                styles: { fontSize: 8, cellPadding: 2 },
                margin: { left: 10, right: 10 }
            });
            
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(150, 150, 150);
                doc.text(`Page ${i} sur ${pageCount} - PDCA Collect`, 148, doc.internal.pageSize.height - 10, { align: 'center' });
            }
            
            const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            doc.save(`cooperatives_pdca_${date}.pdf`);
            
            afficherMessage('Export PDF réussi', `${cooperatives.length} coopératives exportées.`);
            
        } catch (error) {
            console.error('Erreur export PDF:', error);
            afficherMessage('Erreur', 'Impossible d\'exporter en PDF.');
        }
    }
    
    // Géolocalisation : GPS du téléphone, saisie manuelle toujours disponible.
    function statutGeo(id, message) {
        const el = document.getElementById(id);
        if (el) el.textContent = message;
    }

    function obtenirPosition(prefixe) {
        const isAr = langue === 'ar';
        const xId = prefixe === 'Agri' ? 'x' : 'x_coop';
        const yId = prefixe === 'Agri' ? 'y' : 'y_coop';
        const statusId = prefixe === 'Agri' ? 'geoStatusAgri' : 'geoStatusCoop';
        if (!navigator.geolocation) {
            statutGeo(statusId, isAr ? 'المتصفح لا يدعم تحديد الموقع. أدخل الإحداثيات يدويا.' : 'Géolocalisation non prise en charge. Saisissez les coordonnées manuellement.');
            return;
        }
        statutGeo(statusId, isAr ? 'جارٍ تحديد الموقع... يرجى السماح بالوصول إلى GPS.' : 'Localisation en cours… autorisez l’accès à la position GPS.');
        navigator.geolocation.getCurrentPosition(position => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            document.getElementById(xId).value = longitude.toFixed(6);
            document.getElementById(yId).value = latitude.toFixed(6);
            const precision = Math.round(position.coords.accuracy);
            statutGeo(statusId, isAr ? `تم تحديد الموقع. الدقة التقريبية: ${precision} متر.` : `Position obtenue. Précision estimée : ± ${precision} m.`);
        }, error => {
            let msgFr = 'Impossible de récupérer la position. Vérifiez les autorisations GPS et la localisation du téléphone.';
            let msgAr = 'تعذر تحديد الموقع. تحقق من إذن GPS وإعدادات الموقع في الهاتف.';
            if (error.code === 1) { msgFr = 'Autorisation refusée. Autorisez la localisation pour l’application.'; msgAr = 'تم رفض الإذن. اسمح للتطبيق بالوصول إلى الموقع.'; }
            if (error.code === 2) { msgFr = 'Position indisponible. Activez le GPS ou saisissez les coordonnées manuellement.'; msgAr = 'الموقع غير متاح. فعّل GPS أو أدخل الإحداثيات يدويا.'; }
            if (error.code === 3) { msgFr = 'Délai dépassé. Réessayez à l’extérieur ou saisissez les coordonnées manuellement.'; msgAr = 'انتهت مهلة تحديد الموقع. أعد المحاولة أو أدخل الإحداثيات يدويا.'; }
            statutGeo(statusId, isAr ? msgAr : msgFr);
        }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 });
    }

    function ouvrirGoogleMaps(prefixe) {
        const xId = prefixe === 'Agri' ? 'x' : 'x_coop';
        const yId = prefixe === 'Agri' ? 'y' : 'y_coop';
        const x = document.getElementById(xId).value.trim().replace(',', '.');
        const y = document.getElementById(yId).value.trim().replace(',', '.');
        const statusId = prefixe === 'Agri' ? 'geoStatusAgri' : 'geoStatusCoop';
        if (!x || !y || !Number.isFinite(Number(x)) || !Number.isFinite(Number(y))) {
            statutGeo(statusId, langue === 'ar' ? 'أدخل خط الطول X وخط العرض Y أولا.' : 'Renseignez d’abord une longitude X et une latitude Y valides.');
            return;
        }
        if (Number(x) < -180 || Number(x) > 180 || Number(y) < -90 || Number(y) > 90) {
            statutGeo(statusId, langue === 'ar' ? 'الإحداثيات خارج النطاق الصحيح.' : 'Coordonnées hors limites : X de -180 à 180 et Y de -90 à 90.');
            return;
        }
        window.open(`https://www.google.com/maps?q=${encodeURIComponent(y + ',' + x)}`, '_blank');
    }

    // Événements
    document.getElementById('btnGpsAgri').addEventListener('click', () => obtenirPosition('Agri'));
    document.getElementById('btnGpsCoop').addEventListener('click', () => obtenirPosition('Coop'));
    document.getElementById('btnMapAgri').addEventListener('click', () => ouvrirGoogleMaps('Agri'));
    document.getElementById('btnMapCoop').addEventListener('click', () => ouvrirGoogleMaps('Coop'));

    btnAgriculteur.addEventListener('click', () => changerMode('agriculteur'));
    btnCooperative.addEventListener('click', () => changerMode('cooperative'));
    
    // Agriculteurs
    btnAjouterAgriculteur.addEventListener('click', ajouterAgriculteur);
    btnExporterCSVAgriculteur.addEventListener('click', exporterCSVAgriculteur);
    btnExporterWordAgriculteur.addEventListener('click', exporterWordAgriculteur);
    btnExporterPDFAgriculteur.addEventListener('click', exporterPDFAgriculteur);
    btnEffacerAgriculteur.addEventListener('click', effacerFormulaireAgriculteur);
    
    // Coopératives
    btnAjouterCooperative.addEventListener('click', ajouterCooperative);
    btnExporterCSVCooperative.addEventListener('click', exporterCSVCooperative);
    btnExporterWordCooperative.addEventListener('click', exporterWordCooperative);
    btnExporterPDFCooperative.addEventListener('click', exporterPDFCooperative);
    btnEffacerCooperative.addEventListener('click', effacerFormulaireCooperative);
    
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Exposer les fonctions globalement
    window.app = {
        modifierAgriculteur: modifierAgriculteur,
        supprimerAgriculteur: supprimerAgriculteur,
        modifierCooperative: modifierCooperative,
        supprimerCooperative: supprimerCooperative
    };
    
    // Recherche et filtres
    ['agriSearch', 'agriCommune', 'agriFilter'].forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => appliquerFiltres('agri'));
        element.addEventListener('change', () => appliquerFiltres('agri'));
    });
    ['coopSearch', 'coopCommune', 'coopFilter'].forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => appliquerFiltres('coop'));
        element.addEventListener('change', () => appliquerFiltres('coop'));
    });
    document.getElementById('languageSelect').addEventListener('change', e => appliquerLangue(e.target.value));

    // Initialiser
    appliquerLangue(langue);
    chargerDonnees();
    mettreAJourStatut('PDCA Collect initialisé');
    
    console.log('Application PDCA Collect initialisée avec succès!');
});