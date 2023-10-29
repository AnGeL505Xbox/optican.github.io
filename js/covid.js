window.onload = () => {
    //a=Normalmente b=aveces c=Raramente d=Nunca
    var sintomasCovid = {
        frecuently: [
            "Dolor de cabeza", "Tos seca", "Cansancio", "Perdida del gusto/olfato", "Malestar fisico",
            "Dolor de garganta", "Congestion nasal", "Fiebre"
        ], //10
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
    }; //14 //12
    var sintomasFlu = {
        frecuently: [
            "Tos con flemas", "Tos seca", "Estornudos", "Dolor de garganta", "Congestion nasal"
        ], //5
        sometimes: [
            "Malestar fisico", "Cansancio", "Fiebre", "Perdida del gusto/olfato"/* Solamente cuando esta con congestion nasal*/
        ], //4
        rarely: [
            "Dolor de Cabeza", "Dolor de pecho", "Dificultad para respirar"
        ],
        never: [
            "Diarrea", "Nauseas o vomitos"
        ]
    } //12

    var listaSintomas = document.querySelector("#sintomas-comunes");
    var btn = document.querySelector("#btnConsole");
    var analisis = document.querySelector("#analisis-sintomas");
    var resultados = document.querySelector("#resultados")

    var sin = [];
    
    

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