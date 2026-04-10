let chartInstance = null;

// Feitjes array (bovenaan gezet zodat de analyse functie erbij kan)
const politiekeFeitjes = [
    "De Tweede Kamer telt 150 zetels, terwijl de Eerste Kamer er 75 heeft.",
    "In 1917 kregen mannen algemeen kiesrecht, en in 1919 kregen ook vrouwen actief kiesrecht.",
    "Het woord 'motie' betekent een formeel voorstel aan de Kamer om een uitspraak te doen.",
    "De langstzittende premier van Nederland was Mark Rutte.",
    "Het Binnenhof in Den Haag is het oudste parlementsgebouw ter wereld dat nog in gebruik is.",
    "Wetten moeten altijd goedgekeurd worden door zowel de Tweede als de Eerste Kamer.",
    "De voorzitter van de Tweede Kamer leidt de debatten en bewaart de orde.",
    "Sinds 1983 is Amsterdam de officiële hoofdstad, maar de regering zit in Den Haag.",
    "Een 'amendement' is een voorstel van een Kamerlid om een wetsontwerp te wijzigen.",
    "Prinsjesdag vindt elk jaar plaats op de derde dinsdag van september.",
    "Op Prinsjesdag spreekt de Koning de Troonrede uit in de Ridderzaal of de Koninklijke Schouwburg.",
    "De Miljoenennota wordt traditioneel aangeboden in een speciaal koffertje.",
    "Suze Groeneweg was in 1918 de eerste vrouw die in de Tweede Kamer werd gekozen.",
    "Leden van de Eerste Kamer worden niet direct gekozen, maar via de Provinciale Staten en de kiescolleges.",
    "De minister-president heeft zijn werkkamer in het bekende 'Torentje'.",
    "Nederland is een constitutionele monarchie: de macht van de Koning is vastgelegd in de Grondwet.",
    "Een 'coalitie' is een samenwerking tussen partijen om een regering te vormen.",
    "De 'oppositie' zijn de partijen die niet in de regering zitten.",
    "Johan Rudolf Thorbecke wordt gezien als de architect van de Nederlandse democratie (1848).",
    "De stoelen in de Tweede Kamer zijn blauw en hebben de vorm van een tulp.",
    "Een kabinet is 'demissionair' als het ontslag heeft genomen maar nog de lopende zaken afhandelt.",
    "Het 'Vragenuurtje' is elke dinsdagmiddag en is live te volgen op televisie.",
    "Er is in de Nederlandse landelijke politiek geen kiesdrempel, alleen een kiesdeler.",
    "Een 'fractie' zijn alle Kamerleden die bij dezelfde politieke partij horen.",
    "De Raad van State is het belangrijkste adviesorgaan van de regering.",
    "Elke burger van 18 jaar of ouder met de Nederlandse nationaliteit heeft actief kiesrecht.",
    "Passief kiesrecht betekent dat je jezelf verkiesbaar mag stellen (vanaf 18 jaar).",
    "Nederland heeft 20 kieskringen voor de Tweede Kamerverkiezingen.",
    "De 'handelingen' zijn de letterlijke verslagen van alles wat in de Kamer wordt gezegd.",
    "Een 'interpellatiedebat' is een debat over een actueel onderwerp dat door een Kamerlid wordt aangevraagd.",
    "De Algemene Rekenkamer controleert of de overheid het publieke geld zinnig en rechtmatig uitgeeft.",
    "In de plenaire zaal van de Tweede Kamer hangt een groot kunstwerk van Rudi van de Wint dat een landschap verbeeldt.",
    "De 'Gouden Koets' wordt momenteel niet gebruikt; de 'Glazen Koets' is het alternatief.",
    "Stemmen met een rood potlood is een traditie die stamt uit de tijd voor de stemcomputers.",
    "De SGP is de oudste politieke partij van Nederland (opgericht in 1918).",
    "Een staatssecretaris voert een specifiek deel van de taken van een minister uit.",
    "De 'formateur' stelt de nieuwe ploeg van ministers en staatssecretarissen samen.",
    "De 'informateur' onderzoekt welke partijen samen een coalitie kunnen vormen.",
    "Een 'regeerakkoord' bevat de belangrijkste afspraken voor de komende kabinetsperiode.",
    "In 1992 verhuisde de Tweede Kamer naar de huidige moderne vergaderzaal.",
    "De burgemeester van een gemeente wordt in Nederland niet gekozen, maar benoemd door de Kroon.",
    "Een 'burgerinitiatief' kan een onderwerp op de agenda zetten bij 40.000 geldige handtekeningen.",
    "De 'Staten-Generaal' is de verzamelnaam voor de Eerste en Tweede Kamer samen.",
    "Petities worden vaak op dinsdag aangeboden in de Statenpassage van de Kamer.",
    "De ministerraad vergadert elke vrijdag, meestal in de Trêveszaal aan het Binnenhof.",
    "Een 'hoofdelijke stemming' gebeurt als Kamerleden één voor één 'voor' of 'tegen' roepen.",
    "Nederland was het eerste land ter wereld dat het burgerlijk huwelijk openstelde voor paren van hetzelfde geslacht (2001).",
    "De Nationale Ombudsman helpt burgers bij conflicten met de overheid.",
    "De 'kiesdeler' is het totaal aantal uitgebrachte geldige stemmen gedeeld door 150 zetels.",
    "Het 'dualisme' betekent dat de Kamer en de regering gescheiden taken en verantwoordelijkheden hebben.",
    "Kamerleden hebben 'parlementaire onschendbaarheid' voor wat ze in de vergadering zeggen of schrijven.",
    "Er zijn verschillende vaste Kamercommissies die wetsvoorstellen en beleid per ministerie voorbereiden.",
    "De bodes dragen de ceremoniële staf wanneer de voorzitter de vergadering van de Kamer opent.",
    "Een minister zonder portefeuille heeft wel een plek in het kabinet, maar geen eigen ministerie.",
    "Het Binnenhof was vroeger een ommuurd jachtslot van de graven van Holland.",
    "In de Eerste Kamer wordt vooral getoetst of nieuwe wetten rechtmatig, uitvoerbaar en handhaafbaar zijn.",
    "De Koning ondertekent alle wetten, maar de ministers zijn verantwoordelijk.",
    "Nederland heeft een stelsel van evenredige vertegenwoordiging.",
    "Een 'lijsttrekker' is de persoon die bovenaan de kandidatenlijst staat.",
    "Restzetels worden verdeeld via het systeem van de grootste gemiddelden.",
    "De 'Statenpassage' is de grote centrale hal van het Tweede Kamergebouw.",
    "Kamerleden mogen interrupties plegen: korte vragen of opmerkingen tijdens het betoog van een ander.",
    "De Troonrede wordt geschreven door de ministers, niet door de Koning zelf.",
    "Een 'motie van wantrouwen' leidt volgens staatsrechtelijk gebruik tot het ontslag van de betrokken bewindspersoon.",
    "Een 'motie van afkeuring' spreekt een formele afkeuring uit over het beleid van een minister.",
    "Lobbyisten proberen de mening van Kamerleden te beïnvloeden namens een organisatie of achterban.",
    "De 'parlementaire enquête' is het zwaarste onderzoeksmiddel van de Tweede Kamer.",
    "In 1815 kreeg Nederland zijn eerste tweekamerstelsel.",
    "De 'griffier' adviseert de Kamer over juridische en procedurele zaken.",
    "De bodes in de Kamer zorgen voor de logistiek en de orde in de zaal en de wandelgangen.",
    "Op maandag zijn er vaak geen debatten, omdat Kamerleden dan fractievergaderingen hebben of in hun regio werken.",
    "Het woord 'parlement' komt van het Franse 'parler', wat praten betekent.",
    "Sinds 1956 heeft de Tweede Kamer 150 zetels; daarvoor waren het er 100.",
    "Een 'hoorzitting' is een bijeenkomst waar experts of belanghebbenden hun mening geven aan de Kamer.",
    "De 'Kiesraad' is het centraal stembureau en adviseert over de uitvoering van verkiezingen.",
    "Een stembus is de bak waar de officiële stembiljetten in gaan.",
    "Partijen moeten een waarborgsom betalen als ze voor het eerst meedoen aan de verkiezingen.",
    "Politieke partijen krijgen subsidie op basis van hun aantal leden en het aantal zetels.",
    "De 'Verenigde Vergadering' is een bijeenkomst van de Eerste en Tweede Kamer samen.",
    "Het kabinet-Rutte IV had met 299 dagen de langste formatieperiode ooit.",
    "Wim Kok was de eerste premier van een 'paars' kabinet (zonder christendemocratische partijen).",
    "De ministers leggen hun eed of belofte af aan de Koning.",
    "Een 'extraparlementair kabinet' bestaat vaak uit vakexperts die een lossere band met de fracties hebben.",
    "In de wandelgangen van de Kamer wordt veel 'off the record' met journalisten gepraat.",
    "De 'Regeling van Werkzaamheden' bepaalt de agenda van de vergaderdag.",
    "Een 'dertigledendebat' kan worden aangevraagd met de steun van 30 Kamerleden.",
    "Schriftelijke vragen moeten meestal binnen drie weken beantwoord worden door de minister.",
    "De 'algemene beschouwingen' zijn de belangrijkste politieke debatten die volgen op Prinsjesdag.",
    "Een 'monistische' verhouding kenmerkt zich door een nauwe verwevenheid tussen de coalitiefracties en het kabinet.",
    "De 'commissaris van de Koning' is de voorzitter van zowel de Provinciale Staten als de Gedeputeerde Staten.",
    "Nederland kent 12 provincies, elk met een eigen gekozen bestuur (Provinciale Staten).",
    "Waterschappen zijn de oudste democratische organen van Nederland.",
    "De 'Kieswet' regelt de organisatie en procedure van de verkiezingen in Nederland.",
    "De 'Grondwet' kan alleen gewijzigd worden na twee lezingen en tussentijdse verkiezingen.",
    "Het 'presidium' is het bestuur van de Tweede Kamer.",
    "Op het gebouw van de Tweede Kamer wordt de vlag gehesen wanneer de Kamer vergadert.",
    "De Nationale Jeugdraad (NJR) is een koepelorganisatie die jongeren een stem in de politiek geeft.",
    "Elke dinsdag is er een 'petitie-uurtje' voor burgers om petities aan te bieden.",
    "StemDetective analyseert stemgedrag en moties om de politiek transparanter te maken.",
    "Jouw stem telt, ook na de verkiezingen!"
];

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("analyseBtn");
    const resetBtn = document.getElementById("newAnalysisBtn");

    if(button){
        button.addEventListener("click", analyse);
    }

    if(resetBtn){
        resetBtn.addEventListener("click", resetAnalysis);
    }
});

/* -------------------------
   ANALYSE STARTEN (MET INTERACTIEVE LOADER INGEBOUWD)
--------------------------*/

async function analyse(){
    const loading = document.getElementById("loading");
    const button = document.getElementById("analyseBtn");
    const resultSection = document.getElementById("resultSection");
    
    // UI elementen
    const loadingStepText = document.getElementById('loadingStep');
    const progressBar = document.getElementById('progressBar');
    const loadingFactText = document.getElementById('loadingFact');

    try{
        const party = document.getElementById("SelectParty").value;

        if (!party) {
            alert("Selecteer eerst een partij!");
            return;
        }

        // 🔥 UI voorbereiden op de laadstatus
        button.style.display = "none";
        loading.style.display = "block";
        if(resultSection) {
            resultSection.hidden = true; 
            resultSection.classList.remove('show');
        }
        
        // Reset loader status
        progressBar.style.width = "0%";
        loadingStepText.innerText = "Verbinding maken met server...";
        
        // Start feitjes carrousel
        let factIndex = 0;
        loadingFactText.innerText = politiekeFeitjes[factIndex];
        const factInterval = setInterval(() => {
            factIndex = (factIndex + 1) % politiekeFeitjes.length;
            loadingFactText.innerText = politiekeFeitjes[factIndex];
        }, 4000); // Wissel elke 4 seconden

        // Timers voor de fake progress steps
        const stepTimeouts = [];
        stepTimeouts.push(setTimeout(() => { loadingStepText.innerText = "Verkiezingsprogramma ophalen..."; progressBar.style.width = "25%"; }, 1000));
        stepTimeouts.push(setTimeout(() => { loadingStepText.innerText = "Laatste 250 moties scannen..."; progressBar.style.width = "50%"; }, 3000));
        stepTimeouts.push(setTimeout(() => { loadingStepText.innerText = "AI analyseert stemgedrag..."; progressBar.style.width = "75%"; }, 6000));
        
        // Blijft op 90% hangen tot de server antwoordt!
        stepTimeouts.push(setTimeout(() => { loadingStepText.innerText = "Conclusie genereren..."; progressBar.style.width = "90%"; }, 10000));

        console.log("Request word verzonden...");

        const response = await fetch(`https://stemdetective.onrender.com/analyse/${party}`);

        if (!response.ok){
            console.log("API response niet ok:", response.status);
            throw new Error(`HTTP fout: ${response.status}`);
        }

        const result = await response.json();

        // 🛑 SERVER IS KLAAR: Stop timers & animaties
        clearInterval(factInterval);
        stepTimeouts.forEach(clearTimeout);

        //  Afhandeling caching en 100% balk
        if(result.cached){
            progressBar.style.width = "100%";
            loadingStepText.innerText = "Data direct uit cache geladen!";
            await new Promise(resolve => setTimeout(resolve, 400));
            loading.style.display = "none";
        } else {
            progressBar.style.width = "100%";
            loadingStepText.innerText = "Analyse succesvol afgerond!";
            await new Promise(resolve => setTimeout(resolve, 800)); // kleine delay zodat 100% zichtbaar is
            loading.style.display = "none";
        }

        button.style.display = "block"; // Zorg dat knop weer terugkomt
        showAnalysisResult(result.data, result.cached);

    }
    catch(error){
        console.error(error);
        
        // Stop animaties bij fout
        if (typeof factInterval !== 'undefined') clearInterval(factInterval);
        
        alert("Er is een fout opgetreden bij het ophalen van de analyse.");
        loading.style.display = "none";
        button.style.display = "block";
    }
}

/* -------------------------
   RESULTAAT TONEN
--------------------------*/

function showAnalysisResult(data, cached){

    const percentage = Math.round((data.overall_score + 1) * 50);
    const notMatch = 100 - percentage;

    // party name fix + caching indicator
    let title = "Analyse van " + data.party;

    if(cached){
        console.log("Cached geladen");    
    }

    document.getElementById("partyName").innerText = title;

    /* -------------------------
       TOPICS TOOLTIP DATA
    --------------------------*/

    let topicDetails = [];

    if(data.topics){
        for(const [topic,info] of Object.entries(data.topics)){
            topicDetails.push(
                topic + ": " +
                Math.round(info.average_score * 100) +
                "% (" + info.moties_analyzed + " moties)"
            );
        }
    }

    /* -------------------------
       DOUGHNUT CHART
    --------------------------*/

    const ctx = document.getElementById("resultChart");

    if(chartInstance){
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type:"doughnut",
        data:{
            labels:["Komt overeen","Komt niet overeen"],
            datasets:[{
                data:[percentage,notMatch],
                backgroundColor:["#3b82f6","#f87171"],
                borderWidth:0
            }]
        },
        options:{
            cutout:"65%",
            plugins:{
                legend:{
                    position:"bottom"
                },
                tooltip:{
                    callbacks:{
                        afterBody:function(){
                            if(topicDetails.length === 0){
                                return "";
                            }
                            return ["","Scores per onderwerp:",...topicDetails];
                        }
                    }
                }
            }
        }
    });

    /* -------------------------
       CONCLUSIE
    --------------------------*/

    let conclusion;

    if(percentage < 50){
        conclusion =
        "Volgens onze geautomatiseerde analyse komt het stemgedrag van deze partij in minder dan de helft van de onderzochte moties overeen met het verkiezingsprogramma.";
    }
    else{
        conclusion =
        "Volgens onze geautomatiseerde analyse komt het stemgedrag van deze partij in een meerderheid van de onderzochte moties overeen met het verkiezingsprogramma.";
    }

    document.getElementById("conclusion").innerText = conclusion;

    /* -------------------------
       TOPICS BLOKKEN TONEN
    --------------------------*/

    const topicsContainer = document.getElementById("topicsContainer");
    topicsContainer.innerHTML = "";

    if(data.topics && data.topics_details){
        for(const [topicId, info] of Object.entries(data.topics_details)){

            const topicBlock = document.createElement("div");
            topicBlock.className = "topic-item";

            const header = document.createElement("button");
            header.className = "topic-header";
            header.innerHTML = info.title + ' <span class="arrow">▶</span>';

            const content = document.createElement("div");
            content.className = "topic-content";

            const position = document.createElement("p");
            position.innerHTML = `<strong>Standpunt:</strong> ${info.position}`;
            content.appendChild(position);

            if(info.solutions && info.solutions.length > 0){
                const ul = document.createElement("ul");
                info.solutions.forEach(sol => {
                    const li = document.createElement("li");
                    li.textContent = sol;
                    ul.appendChild(li);
                });
                content.appendChild(ul);
            }

            topicBlock.appendChild(header);
            topicBlock.appendChild(content);
            topicsContainer.appendChild(topicBlock);

            header.addEventListener("click", () => {
                content.classList.toggle("show");
                header.classList.toggle("open");
            });
        }
    }

    document.getElementById("resultSection").classList.add("show");

}

/* -------------------------
   RESET ANALYSE
--------------------------*/

function resetAnalysis(){
    document.getElementById("resultSection").classList.remove("show");
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

// Service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker geregistreerd:', reg.scope))
            .catch(err => console.error('Service Worker registratie mislukt:', err));
    });
}

/* -------------------------
   TOM SELECT INITIALISATIE
--------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    new TomSelect("#SelectParty",{
        create: false,
        sortField: { field: "text", direction: "asc" },
        render: {
            option: function(data, escape) {
                let logoHtml = data.logo ? `<img class="party-logo-select" src="${escape(data.logo)}" alt="${escape(data.text)} logo">` : '';
                return `<div>${logoHtml} <span>${escape(data.text)}</span></div>`;
            },
            item: function(data, escape) {
                let logoHtml = data.logo ? `<img class="party-logo-select" style="margin-right:8px; vertical-align:middle;" src="${escape(data.logo)}" alt="${escape(data.text)} logo">` : '';
                return `<div>${logoHtml} ${escape(data.text)}</div>`;
            }
        }
    });
});

// =========================
// COOKIE BANNER LOGICA
// =========================
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptCookiesBtn');

if (!localStorage.getItem('cookiesGeaccepteerd')) {
    setTimeout(() => {
        cookieBanner.style.display = 'block';
        setTimeout(() => cookieBanner.classList.add('show'), 10);
    }, 1000); 
}

acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesGeaccepteerd', 'true');
    cookieBanner.classList.remove('show');
    setTimeout(() => {
        cookieBanner.style.display = 'none';
    }, 400);
});

const privacyLink = document.getElementById('privacyLink');
if(privacyLink) {
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert("Privacyverklaring:\n\nWij slaan geen persoonlijke gegevens op. De analyses worden anoniem uitgevoerd. Enige data die op je apparaat wordt opgeslagen is een 'vlaggetje' om te onthouden dat je deze melding hebt gezien.");
    });
}