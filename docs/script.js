let chartInstance = null;

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
   ANALYSE STARTEN
--------------------------*/

async function analyse(){

    const loading = document.getElementById("loading");
    

    try{

        const party = document.getElementById("SelectParty").value;

        // 🔥 toon loader meteen
        loading.style.display = "block";

        const response = await fetch(
        `[link]/analyse/${party}` // link nog invullen zodra server draait
        );

        if (!response.ok){
            throw new Error(`HTTP fout: ${response.status}`);
        }

        const result = await response.json();

        //  als cached → loader direct weg
        if(result.cached){
            loading.style.display = "none";
        } else {
            // kleine delay zodat loader zichtbaar blijft bij echte berekening
            await new Promise(resolve => setTimeout(resolve, 300));
            loading.style.display = "none";
        }

        showAnalysisResult(result.data, result.cached);

    }
    catch(error){

        console.error(error);
        alert("Er is een fout opgetreden bij het ophalen van de analyse.");
        loading.style.display = "none";

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
   EXTRA: INTERACTIEVE LOADER
--------------------------*/
document.addEventListener("DOMContentLoaded", function() {

    // 1. Initialiseer Tom Select met logo functionaliteit
    new TomSelect("#SelectParty",{
        create: false,
        sortField: { field: "text", direction: "asc" },
        render: {
            // Deze functie bepaalt hoe de opties in het dropdown menu eruit zien
            option: function(data, escape) {
                let logoHtml = data.logo ? `<img class="party-logo-select" src="${escape(data.logo)}" alt="${escape(data.text)} logo">` : '';
                return `<div>${logoHtml} <span>${escape(data.text)}</span></div>`;
            },
            // Deze functie bepaalt hoe het geselecteerde item eruit ziet
            item: function(data, escape) {
                let logoHtml = data.logo ? `<img class="party-logo-select" style="margin-right:8px; vertical-align:middle;" src="${escape(data.logo)}" alt="${escape(data.text)} logo">` : '';
                return `<div>${logoHtml} ${escape(data.text)}</div>`;
            }
        }
    });

    // 2. Elementen ophalen
    const analyseBtn = document.getElementById('analyseBtn');
    const loadingDiv = document.getElementById('loading');
    const selectBox = document.getElementById('SelectParty');
    const resultSection = document.getElementById('resultSection');
    
    // Elementen voor de interactieve loader
    const loadingStepText = document.getElementById('loadingStep');
    const progressBar = document.getElementById('progressBar');
    const loadingFactText = document.getElementById('loadingFact');

    // Feitjes array
    const politiekeFeitjes = [
        "De Tweede Kamer telt 150 zetels, terwijl de Eerste Kamer er 75 heeft.",
        "In 1917 kregen mannen kiesrecht, en in 1919 kregen vrouwen dat ook.",
        "Het woord 'motie' betekent een formeel voorstel aan de Kamer om een uitspraak te doen.",
        "De langstzittende premier van Nederland was Mark Rutte.",
        "Het Binnenhof in Den Haag is het oudste parlementsgebouw ter wereld dat nog in gebruik is.",
        "Wetten moeten altijd goedgekeurd worden door zowel de Tweede als de Eerste Kamer."
    ];

    // 3. Analyse knop logica
    analyseBtn.addEventListener('click', function() {
        if (!selectBox.value) {
            alert("Selecteer eerst een partij!");
            return;
        }

        // Verberg knop, toon lader
        analyseBtn.style.display = "none";
        loadingDiv.style.display = "block";
        resultSection.hidden = true; 
        resultSection.classList.remove('show');

        // Reset loader status
        progressBar.style.width = "0%";
        
        // Start feitjes carrousel
        let factIndex = 0;
        const factInterval = setInterval(() => {
            factIndex = (factIndex + 1) % politiekeFeitjes.length;
            loadingFactText.innerText = politiekeFeitjes[factIndex];
        }, 4000); // Wissel elke 4 seconden

        // Simuleer de voortgang van de API en AI (hier komt in de toekomst je echte API call)
        setTimeout(() => {
            loadingStepText.innerText = "Verkiezingsprogramma ophalen...";
            progressBar.style.width = "25%";
        }, 1000);

        setTimeout(() => {
            loadingStepText.innerText = "Laatste 250 moties scannen...";
            progressBar.style.width = "50%";
        }, 3000);

        setTimeout(() => {
            loadingStepText.innerText = "AI analyseert stemgedrag...";
            progressBar.style.width = "75%";
        }, 6000);

        setTimeout(() => {
            loadingStepText.innerText = "Conclusie genereren...";
            progressBar.style.width = "100%";
        }, 8000);

        // Afronden na 9 seconden (Simulatie eindigt)
        setTimeout(() => {
            clearInterval(factInterval); // Stop de feitjes
            
            // Verberg loader, toon resultaat en reset knop
            loadingDiv.style.display = "none";
            analyseBtn.style.display = "block";
            
            // Toon de resultaatsectie
            resultSection.hidden = false;
            resultSection.classList.add('show');
            
            // Update hieronder de DOM elementen met je echte resultaten
            document.getElementById('partyName').innerText = `Resultaat voor: ${selectBox.options[selectBox.selectedIndex].text}`;
            
            // Tip: Roep hier je Chart.js functie aan
            
        }, 9000); 
    });

});