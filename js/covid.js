window.onload = () => {
    //a=Normalmente b=aveces c=Raramente d=Nunca
    var sintomasCovid = {
        frecuently: [
            "Dolor de cabeza", "Tos seca", "Cansancio", "Perdida del gusto/olfato", "Malestar fisico",
            "Dolor de garganta", "Congestion nasal", "Fiebre"
        ], //8
        sometimes: [
            "Diarrea", "Nauseas o vomitos"
        ],
        rarely: [
            "Estornudos"
        ],
        never: [
            "Tos con flemas"
        ],
        unique: [
            "Dolor de pecho", "Dificultad para respirar"
        ]
    };
    var sintomasFlu = {
        frecuently: [
            "Tos con flemas", "Tos seca", "Estornudos", "Dolor de garganta", "Congestion nasal"
        ],
        sometimes: [
            "Malestar fisico", "Cansancio", "Fiebre", "Perdida del gusto/olfato"/* Solamente cuando esta con congestion nasal*/
        ],
        rarely: [
            "Dolor de Cabeza", "Dolor de pecho", "Dificultad para respirar"
        ],
        never: [
            "Diarrea", "Nauseas o vomitos"
        ]
    }

    var selectSin = document.querySelector("#sintomas-comunes");
    var btn = document.querySelector("#btnConsole");
    var analisis = document.querySelector("#analisis-sintomas");
    var resultados = document.querySelector("#resultados")
    var porcentaje = document.querySelector("#porcentaje");

    var lista_sintomas = [];

    //COVID variables
    var COVIDunique = 0;
    var countCOVID = 0;
    var cvd = 0.0; //0=No .25=Talvez-no .75=Talvez-si 1=Si
    var neverCOVID = false;

    //Flu variables
    var FLUunique = 0;
    var countFLU = 0;
    var flu = 0.0; //0=No .25=Talvez-no .75=Talvez-si 1=Si
    var neverFLU = false;

    btn.addEventListener('click', () => {
        COVIDunique = 0;
        countCOVID = 0;
        cvd = 0.0;
        neverCOVID = false;

        FLUunique = 0;
        countFLU = 0;
        flu = 0.0;
        neverFLU = false;

        let sintomaSeleccionado = selectSin.options[selectSin.selectedIndex].text;
        lista_sintomas.push(sintomaSeleccionado);
        //Elimina todos los valores repetidos
        if (lista_sintomas.length > 1) {
            for (var i = 0; i < lista_sintomas.length; i++) {
                for (var j = i + 1; j < lista_sintomas.length; j++) {
                    if (lista_sintomas[i] == lista_sintomas[j]) lista_sintomas.splice(j, 1);
                };
            };
        };
        //Agrega todas los sintomas en una lista
        analisis.innerHTML = "";

        for (let i = 0; i < lista_sintomas.length; i++) analisis.innerHTML = analisis.innerHTML + `<li>${lista_sintomas[i]}</li>`;

        COVIDanalyzer(lista_sintomas);
        FLUanalyzer(lista_sintomas);

        switch (cvd) {
            case 1.0:
                switch (flu) {
                    case 1.0:
                        porcentaje.innerHTML = "COVID-19: %50, Resfriado: %50"
                        break;
                    case 0.75:
                        porcentaje.innerHTML = "COVID-19: %65, Resfriado: %35"
                        break;
                    case 0.25:
                        porcentaje.innerHTML = "COVID-19: %85, Resfriado: %15"
                        break;
                    case 0.0:
                        porcentaje.innerHTML = "COVID-19: %100, Resfriado: %0"
                        break;
                };
                break;
            case 0.75:
                switch (flu) {
                    case 1.0:
                        porcentaje.innerHTML = "COVID-19: %35, Resfriado: %65"
                        break;
                    case 0.75:
                        porcentaje.innerHTML = "COVID-19: %50, Resfriado: %50"
                        break;
                    case 0.25:
                        porcentaje.innerHTML = "COVID-19: %65, Resfriado: %35"
                        break;
                    case 0.0:
                        porcentaje.innerHTML = "COVID-19: %85, Resfriado: %15"
                        break;
                };
                break;
            case 0.25:
                switch (flu) {
                    case 1.0:
                        porcentaje.innerHTML = "COVID-19: %15, Resfriado: %85"
                        break;
                    case 0.75:
                        porcentaje.innerHTML = "COVID-19: %35, Resfriado: %65"
                        break;
                    case 0.25:
                        porcentaje.innerHTML = "COVID-19: %50, Resfriado: %50"
                        break;
                    case 0.0:
                        porcentaje.innerHTML = "COVID-19: %65, Resfriado: %35"
                        break;
                };
                break;
            case 0.0:
                switch (flu) {
                    case 1.0:
                        porcentaje.innerHTML = "COVID-19: %0, Resfriado: %100"
                        break;
                    case 0.75:
                        porcentaje.innerHTML = "COVID-19: %15, Resfriado: %85"
                        break;
                    case 0.25:
                        porcentaje.innerHTML = "COVID-19: %35, Resfriado: %65"
                        break;
                    case 0.0:
                        porcentaje.innerHTML = "COVID-19: %50, Resfriado: %50"
                        break;
                };
                break;
        }
    })

    function COVIDanalyzer(sintomas) {
        //Analizar sintomas
        for (let i = 0; i < sintomas.length; i++) {
            if (sintomas[i] == "Dolor de pecho" || sintomas[i] == "Dificultad para respirar") {
                COVIDunique++;
            }
            //Frecuente
            for (let j = 0; j < sintomasCovid.frecuently.length; j++) {
                if (sintomas[i] == sintomasCovid.frecuently[j]) countCOVID++;
            }
            for (let j = 0; j < sintomasCovid.sometimes.length; j++) {
                if (sintomas[i] == sintomasCovid.sometimes[j]) countCOVID++;
            }

            if (sintomas[i] == "Tos con flemas") neverCOVID = true;
        }
        //Calcular resultados
        if (COVIDunique > 0 && neverCOVID == false) {
            console.log("Es muy Probable de que tengas COVID-19 - Deberias de ir rapido con un medico");
            cvd = 1.0;
        } else if (neverCOVID == true) {
            console.log("Es muy probable que no tengas COVID-19");
            cvd = 0.0;
        } else {
            if (countCOVID >= 4) {
                console.log("Probablemente Si tengas COVID-19");
                cvd = 0.75;
            }
            else {
                console.log("Probablemente No tengas COVID-19");
                cvd = 0.25;
            }
        }
    };

    function FLUanalyzer(sintomas) {
        //Analizar sintomas
        for (let i = 0; i < sintomas.length; i++) {
            if (sintomas[i] == "Diarrea" || sintomas[i] == "Nauseas o vomitos") {
                neverFLU = true;
            }

            for (let j = 0; j < sintomasFlu.frecuently.length; j++) {
                if (sintomas[i] == sintomasFlu.frecuently[j]) countFLU++;
            }
            for (let j = 0; j < sintomasFlu.sometimes.length; j++) {
                if (sintomas[i] == sintomasFlu.sometimes[j]) countFLU++;
            }

            if (sintomas[i] == "Tos con flemas" || sintomas[i] == "Perdida del gusto/olfato") FLUunique++;
        }
        //Calcular resultados
        if (neverFLU == true) {
            flu = 0.0;
        } else if (neverFLU == false && FLUunique == 2) {
            flu = 1.0;
        } else if (neverFLU == false && FLUunique == 1) {
            flu = 0.75
        } else {
            if (countFLU >= 4) {
                flu = 0.75
            } else {
                flu = 0.25
            }
        }
        /*
        let neverCOVID;
        //Analizar sintomas
        for (let i=0;i>sintomas.length;i++){
            if (sintomas == "Dolor de pecho" || sintomas == "Dificultad para respirar"){
                COVIDunique++;
            }
            //Frecuente
            for(let j=0;j>sintomasCovid.frecuently.length;j++){
                if(sintomas[i] == sintomasCovid.frecuently[j]) countCOVID++;
            }

            if (sintomas == "Tos con flemas") neverCOVID = true;
        }

        if(COVIDunique >= 1 && neverCOVID == true){
            console.log("Es muy Probable de que tengas COVID-19 - Deberias de ir rapido con un medico");
            cvd = 1.0;
        }
        
        if(countCOVID >= 4){
            console.log("Probablemente Si tengas COVID-19");
            cvd = 0.75;
        }
        else if(countCOVID < 4){
            console.log("Probablemente No tengas COVID-19");
            cvd = 0.25;
        }
        */
    };

    /*
    //Variables COVID
    var contA = 0;
    var contB = 0;
    var contC = 0;

    var covidUnique = 0;
    var isCovid = 0;//0:Probablemente no 1:Probablemente si 2:Definitivamente si



    btn.addEventListener('click', () => {
        contA = 0;
        contB = 0;
        contC = 0;

        covidUnique = 0;
        isCovid = 0;
        let sintomaSeleccionado = listaSintomas.options[listaSintomas.selectedIndex].text;
        sin.push(sintomaSeleccionado);
        //Elimina todos los valores repetidos
        if (sin.length > 1) {
            for (var i = 0; i < sin.length; i++) {
                for (var j = i + 1; j < sin.length; j++) {
                    if (sin[i] == sin[j]) sin.splice(j, 1);
                };
            };
        };
        //Agrega todas los sintomas en una lista
        analisis.innerHTML = "";

        for (let i = 0; i < sin.length; i++) analisis.innerHTML = analisis.innerHTML + `<li>${sin[i]}</li>`;

        CovidAnalyzer(sin);
    })

    function CovidAnalyzer(listSintoms) {
        //Analizar Sintomas
        for (let i = 0; i < listSintoms.length; i++) {
            //Bloque A
            for (let j = 0; j < sintomasCovid.a.length; j++) {
                if (listSintoms[i] == sintomasCovid.a[j]) {
                    contA++;
                    break;
                }
            }
            //Bloque B
            for (let j = 0; j < sintomasCovid.b.length; j++) {
                if (listSintoms[i] == sintomasCovid.b[j]) {
                    contB++;
                    break;
                }
            }
            //Bloque C
            for (let j = 0; j < sintomasCovid.c.length; j++) {
                if (listSintoms[i] == sintomasCovid.c[j]) {
                    contC++;
                    break;
                }
            }
            if (listSintoms[i] == "Perdida del gusto/olfato" || listSintoms[i] == "Dolor de pecho" || listSintoms[i] == "Dificultad para respirar") covidUnique++;
        }
        
        //Evalua si hay sintomas COVID unicos
        if (covidUnique >= 2) isCovid = 2;
        else if (contA > 0 && (contB > 0 || contC > 0)) isCovid = 1;

        //Crea un diagnostico general del COVID
        if (isCovid == 2){
            resultados.innerHTML = "Es muy Probable de que tengas COVID-19 - Deberias de ir rapido con un medico"
        }
        else if (isCovid == 1){
            resultados.innerHTML = "Probablemente Si tengas COVID-19"
        }
        else{
            resultados.innerHTML = "Probablemente no tengas COVID-19"
        }
    }
    */
}