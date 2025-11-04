# Incidentplan

## 1. Syfte

Denna plan beskriver hur vi hanterar incidenter som påverkar Julreceptsajtens tillgänglighet, funktionalitet eller säkerhet.  
Målet är att snabbt återställa normal drift och minimera påverkan för användare.

---

## 2. Vanliga incidenter och åtgärder

### API eller databas nere

- Data kan inte hämtas

**Åtgärd:**  
Testa API-endpoint i webbläsaren. Om ingen respons → visa felmeddelande och kontakta läraren.

---

### Hostingplattform (Netlify) nere

- Sidan laddas inte
- Netlify visar fel eller timeout

**Åtgärd:**  
Kontrollera Netlify-status. Om felet kvarstår, överväg backuplösning.

---

### Obehöriga API-anrop orsakar överbelastning

- API:t svarar ej eller blir långsamt

**Åtgärd:**  
Visa användarvänligt felmeddelande samt kontakta lärare.

---

### Obehöriga API-anrop orsakar oönskad eller skadlig data

- Sidan visar oönskade recept eller kommentarer
- Sidan blir utsatt för skadlig kod via API:t

**Åtgärd:**  
Stäng ner sidan temporärt, sanera i API:t, kontakta lärare.
