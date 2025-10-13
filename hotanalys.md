# Hotanalys för Receptsajt enligt OWASP Top Ten (2021)

Hotanalys som går igenom OWASP:s tio och bedömer relevansen för vår receptsajt.  
För varje punkt anges relevansnivå, risk och möjliga åtgärder.

---

## 1. Broken Access Control

Fel i behörigheter, t.ex. att någon kan komma åt admin-funktioner utan att vara inloggad.

- **Relevans:** Medelhög
- **Risk:** Vi har ingen inloggning, men vi har en `/CLEAR` endpoint som vem som helst kan anropa för att ta bort all data. Detta är en säkerhetsrisk eftersom vi inte kontrollerar vem som använder den.
- **Åtgärd:** Fråga API skapare om den endpointen kanske ska ha en grupp-unik API-nyckel, för databas resets.

---

## 2. Cryptographic Failures (tidigare "Sensitive Data Exposure")

Brist på kryptering, t.ex. lösenord som sparas i klartext eller ingen HTTPS.

- **Relevans:** Ingen
- **Risk:** Vi har ingen inloggning och sparar inga lösenord i databasen.

---

## 3. Injection

SQL/NoSQL Injection där användare kan köra skadlig kod via formulär.

- **Relevans:** Hög
- **Risk:** Sajten kommer ha ett formulär för kommentarer, vilket kan utnyttjas för SQL Injection om det inte hanteras korrekt.
- **Åtgärd:** Använd parameteriserade queries/prepared statements och validera användarinmatning.

---

## 4. Insecure Design

Dålig grunddesign där säkerheten inte är inbyggd från början.

- **Relevans:** Låg
- **Risk:** Vi kommer att ha ett kommentars-fält som kan leda till spam/missbruk.
- **Åtgärd:** Begränsa funktionalitet som kan missbrukas.

---

## 5. Security Misconfiguration

Felaktiga serverinställningar, debug-lägen eller oskyddade endpoints.

- **Relevans:** Låg
- **Risk:** Eftersom API:et ligger öppet så har vi endpoints som är oskyddade.
- **Åtgärd:** Det vi skulle göra är att ta bort dessa endpoints, men för projektet gör vi inget.

---

## 6. Vulnerable and Outdated Components

Bibliotek, ramverk eller plugins som är utdaterade och sårbara.

- **Relevans:** Medelhög
- **Risk:** Vi använder npm-paket, och dessa kan innehålla kända säkerhetshål.
- **Åtgärd:** Kör `npm audit` regelbundet. Använd `package-lock.json` för att låsa versioner och håll beroenden uppdaterade.

---

## 7. Identification and Authentication Failures

Problem med inloggning, sessionshantering eller svaga lösenord.

- **Relevans:** Låg
- **Risk:** Vi har ingen inloggning eller konton, så detta är inte aktuellt.
- **Åtgärd:** Ingen.

---

## 8. Software and Data Integrity Failures

När man litar på osäkra uppdateringar eller externa resurser.

- **Relevans:** Låg
- **Risk:** Om vi laddar in externa resurser (t.ex. JavaScript från okända CDN:er) finns risk för manipulerat innehåll.
- **Åtgärd:** Använd endast betrodda källor, signera uppdateringar om möjligt.

---

## 9. Security Logging and Monitoring Failures

Avsaknad av loggning → man märker inte attacker.

- **Relevans:** Låg
- **Risk:** Vi loggar inte försök till attacker (t.ex. SQL-injections i formulär). Det gör det svårt att upptäcka intrång.
- **Åtgärd:** Ej prioriterat för projektet, men i en produktionssajt bör man logga misslyckade inloggningar, injektionsförsök och misstänkta mönster.

---

## 10. Server-Side Request Forgery (SSRF)

När servern luras att göra förfrågningar till oönskade resurser.

- **Relevans:** Låg
- **Risk:** Om vi låter användare ange bild-URL:er i recept kan servern försöka hämta resurser från interna nätverk.
- **Åtgärd:** Validera URL:er och begränsa vilka adresser servern får anropa.

---
