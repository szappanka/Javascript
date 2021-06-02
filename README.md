# Javascript

Az én házimat a Koronavírus ihlette, hátha jobban kidolgozva segíthet a karanténban ragadt embereknek. A felhasználók posztokban megadhatják, hogy mások miben segítsenek nekik, mivel ők nem tudnak kijutni például bevásárolni. A két entitás a „felhasználó” és a „poszt” lenne. 
Az elképzelés, hogy az emberekhez tartozó adatok:
- vezetéknév, keresztnév, e-mail cím, telefonszám, város + irányítószám (ezek megadása mind kötelező) 

Egy poszthoz tartozó adatok:
- bevásárlólista (kötelező), megjegyzés (opcionális), időpont, igaz-hamis érték (hogy kész van-e)

A főoldalon a felhasználó kiválaszthatja, hogy ő épp karanténban van, vagy segíteni szeretne valakinek. 
Amennyiben karanténban van, egy felugró fülben vagy megadja, hogy új felhasználó, és ez egy form-ra vezeti, ahol ki kell töltenie az adatait így regisztrál, vagy megadja az email-címét és eljut a profiljára.
Itt az első fülön látszódnak az adatai, és a többin pedig a posztjai találhatók. Az adatok alatti gombbal új posztot adhat hozzá, ami egy form-ra vezeti. Itt megadja a megfelelő adatokat és kész az új poszt. A profil oldalon a posztoknál lehet ezeket törölni is. 

A „Hero” opciót választva a felhasználó bejelentkezés nélkül látni fogja az összes posztot névvel ellátva és itt választhatja ki, melyik embernek segíthet. A pipára kattintva felugrik a beteg telefonszáma is, és a profilján lévő posztok bal felső sarkánál a karika telivé válik, ezután fogják felvenni egymással a kapcsolatot. Ameddig egy posztra nem kattintanak rá, addig a profilon azt üres karika jelzi.

Ha felvette egymással a kapcsolatot a két felhasználó, a karanténban lévő törölheti a posztot a profilnál. 
