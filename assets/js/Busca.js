listaCriteriosData = []
listaFotografiasData = []

listaCriteriosLocalizacao = []
listaFotografiasLocalizacao = []

listaCriteriosPessoa = []
listaFotografiasPessoa = []



function busca(palavraProcurada){
    

    document.getElementsByClassName('procurada')[0].innerText = palavraProcurada
    

    procuraNaData(palavraProcurada)

    procuraNaLocalizacao(palavraProcurada)

    procuraNaPessoa(palavraProcurada)

    // Ficar na lista de resultados só o index da fotografia no currentUser.fotografias em vez de ficar [objeto fotografia , index]
    // Neste momento está da maneira descrita anterior para ficar melhor visualização

    
    document.getElementsByClassName('resultadosCriteriosData')[0].innerText = JSON.stringify(listaCriteriosData)
    document.getElementsByClassName('resultadosFotografiasData')[0].innerText = JSON.stringify(listaFotografiasData)

    document.getElementsByClassName('resultadosCriteriosLocal')[0].innerText = JSON.stringify(listaCriteriosLocalizacao)
    document.getElementsByClassName('resultadosFotografiasLocal')[0].innerText = JSON.stringify(listaFotografiasLocalizacao)

    document.getElementsByClassName('resultadosCriteriosPessoa')[0].innerText = JSON.stringify(listaCriteriosPessoa)
    document.getElementsByClassName('resultadosFotografiasPessoa')[0].innerText = JSON.stringify(listaFotografiasPessoa)
}



function procuraNaData(palavraProcurada){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    palavraProcuradaL = palavraProcurada.toLowerCase()
    palavraProcuradaU = palavraProcurada[0].toUpperCase() + palavraProcurada.substring(1).toLowerCase()


    for (i = 0; i < currentUser.fotografias.length; i++){
        indexCriteriosData = listaCriteriosData.indexOf(currentUser.fotografias[i].data)


        if (currentUser.fotografias[i].data.includes(palavraProcuradaL) || currentUser.fotografias[i].data.includes(palavraProcuradaU)){


            if (indexCriteriosData == -1){

                listaCriteriosData = listaCriteriosData.concat(currentUser.fotografias[i].data)

                
                listaFotografiasData = listaFotografiasData.concat([[currentUser.fotografias[i], i]])
            } else {

                listaFotografiasData[indexCriteriosData] = listaFotografiasData[indexCriteriosData].concat([currentUser.fotografias[i], i])

            }
        }
    }
}

function procuraNaLocalizacao(palavraProcurada){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    palavraProcuradaL = palavraProcurada.toLowerCase()
    palavraProcuradaU = palavraProcurada[0].toUpperCase() + palavraProcurada.substring(1).toLowerCase()
    


    for (i = 0; i < currentUser.fotografias.length; i++){
        indexCriteriosLocalizacao = listaCriteriosLocalizacao.indexOf(currentUser.fotografias[i].localizacao)

        if (currentUser.fotografias[i].localizacao.includes(palavraProcuradaL) || currentUser.fotografias[i].localizacao.includes(palavraProcuradaU)){


            if (indexCriteriosLocalizacao == -1){

                listaCriteriosLocalizacao = listaCriteriosLocalizacao.concat(currentUser.fotografias[i].localizacao)

                
                listaFotografiasLocalizacao = listaFotografiasLocalizacao.concat([[currentUser.fotografias[i], i]])
            } else {

                listaFotografiasLocalizacao[indexCriteriosLocalizacao] = listaFotografiasLocalizacao[indexCriteriosLocalizacao].concat([currentUser.fotografias[i], i])

            }
        }
    }
}

function procuraNaPessoa(palavraProcurada){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    palavraProcuradaL = palavraProcurada.toLowerCase()
    palavraProcuradaU = palavraProcurada[0].toUpperCase() + palavraProcurada.substring(1).toLowerCase()

    

    for (i = 0; i < currentUser.fotografias.length; i++){
        indexCriteriosPessoa = listaCriteriosPessoa.indexOf(currentUser.fotografias[i].pessoas)

        if (currentUser.fotografias[i].pessoas.includes(palavraProcuradaL) || currentUser.fotografias[i].pessoas.includes(palavraProcuradaU)){



            if (indexCriteriosPessoa == -1){

                listaCriteriosPessoa = listaCriteriosPessoa.concat(currentUser.fotografias[i].pessoas)

                
                listaFotografiasPessoa = listaFotografiasPessoa.concat([[currentUser.fotografias[i], i]])
            } else {

                listaFotografiasPessoa[indexCriteriosPessoa] = listaFotografiasPessoa[indexCriteriosPessoa].concat([currentUser.fotografias[i], i])

            }
        }
    }
}

function procuraManual(palavra){
    sessionStorage.setItem('busca', palavra)

    location.reload()
}

function onload(){

    palavra = sessionStorage.getItem('busca')

    if (sessionStorage.busca){
        busca(sessionStorage.getItem('busca'))
    } else {
        document.getElementsByClassName('procurada')[0].innerText = "Nenhuma Palavra Procurada"
    }
    
}

window.addEventListener('load',onload)