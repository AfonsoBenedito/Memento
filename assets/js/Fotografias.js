
var listaSelecionadas = []
var aparecerSelecionar = 1

function mostrarFotografias(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    document.getElementById('numFotografias').innerText = currentUser.fotografias.length

    criterio = currentUser.organizacaoFotografias

    listaCriterio = []

    novaListaDeFotografias = []

    for (k = 0; k < currentUser.fotografias.length ;k++){

        if (criterio == 'Localidade'){
            indexC = listaCriterio.indexOf(currentUser.fotografias[k].localizacao)
            //console.log(novaListaDeFotografias)
            if (indexC != -1){
                novaListaDeFotografias[indexC] = novaListaDeFotografias[indexC].concat(currentUser.fotografias[k])
            } else {
                novaListaDeFotografias = novaListaDeFotografias.concat([[currentUser.fotografias[k]]])
                listaCriterio = listaCriterio.concat(currentUser.fotografias[k].localizacao)
            }
        } else if (criterio == 'Data'){
            indexC = listaCriterio.indexOf(currentUser.fotografias[k].data)
            if (indexC != -1){
                novaListaDeFotografias[indexC] = novaListaDeFotografias[indexC].concat(currentUser.fotografias[k])
            } else {
                novaListaDeFotografias = novaListaDeFotografias.concat([[currentUser.fotografias[k]]])
                listaCriterio = listaCriterio.concat(currentUser.fotografias[k].data)
            }
        } else {
            indexC = listaCriterio.indexOf(currentUser.fotografias[k].pessoas)
            if (indexC != -1){
                novaListaDeFotografias[indexC] = novaListaDeFotografias[indexC].concat(currentUser.fotografias[k])
            } else {
                novaListaDeFotografias = novaListaDeFotografias.concat([[currentUser.fotografias[k]]])
                listaCriterio = listaCriterio.concat(currentUser.fotografias[k].pessoas)
            }
        }
    }

    contador = 0

    for (i = 0; i < listaCriterio.length; i++){
        
        novoUl = document.createElement('ul')
        novoDivTit = document.createElement('div')
        novoDivSepTit = document.createElement('div')

        novoUl.setAttribute('class', 'SepOrdenacao')
        novoDivTit.setAttribute('class', 'tituloOrdenacao')
        novoDivSepTit.setAttribute('class','sepTituloOrdenacao')

        novoDivTit.innerText = listaCriterio[i]

        novoUl.appendChild(novoDivTit)
        novoUl.appendChild(novoDivSepTit)
        
        for (j = 0; j < novaListaDeFotografias[i].length; j++){

            novaLi = document.createElement('li')
            novaDiv = document.createElement('div')
            novaImg = document.createElement('img')

            novaImg.src = novaListaDeFotografias[i][j].source

            novaDiv.setAttribute('class', 'img')
            novaLi.setAttribute('class','fotosOrdenacao')
            novaLi.innerText = contador

            novaDiv.appendChild(novaImg)
            novaLi.appendChild(novaDiv)

            novoUl.appendChild(novaLi)

            contador +=1
        }

        document.getElementsByClassName('posicaoFotografias')[0].appendChild(novoUl)
    }

    

    // for (i = 0; i < currentUser.fotografias.length; i++){
        
    //     novaLi = document.createElement('li')
    //     novaDiv = document.createElement('div')
    //     novaImg = document.createElement('img')

    //     novaImg.src = currentUser.fotografias[i].source

    //     novaDiv.setAttribute('class', 'img')
    //     novaLi.innerText = i

    //     novaDiv.appendChild(novaImg)
    //     novaLi.appendChild(novaDiv)

    //     document.getElementsByClassName('posicaoFotografias')[0].appendChild(novaLi)

    // }
    
    fotosEventHandler(currentUser.fotografias.length)
    opcoesFotosHandlers()
}

function aparecerSelecionarFotografias(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    document.getElementsByClassName('popUpSelecionar')[0].style.visibility = 'visible'
    document.getElementsByClassName('popUpSelecionarFundo')[0].style.visibility = 'visible'

    document.getElementsByClassName('btnPartilharSelecao')[0].addEventListener('click',partilharSelecionadas)
    document.getElementsByClassName('btnLixoSelecao')[0].addEventListener('click',apagarSelecionadas)
    document.getElementsByClassName('popUpSelecionarFundo')[0].addEventListener('click', fecharSelecionarFotografias)

    if (aparecerSelecionar == 1){
        for (i = 0; i < currentUser.fotografias.length; i++){
            novaLi = document.createElement('li')
            novaDiv = document.createElement('div')
            novaImg = document.createElement('img')

            novaLi.innerText = i

            novaImg.src = currentUser.fotografias[i].source
            novaDiv.setAttribute('class','imagemSelecionar')

            novaDiv.appendChild(novaImg)
            novaLi.appendChild(novaDiv)

            novaLi.addEventListener('click', selecionarFotografia)

            document.getElementsByClassName('zonaSelecao')[0].appendChild(novaLi)
        }

        aparecerSelecionar = 0
    }
}

function fecharSelecionarFotografias(){
    document.getElementsByClassName('popUpSelecionar')[0].style.visibility = 'hidden'
    document.getElementsByClassName('popUpSelecionarFundo')[0].style.visibility = 'hidden'
}

function selecionarFotografia(click){

    //console.log(click.srcElement.parentNode.parentNode.innerText)

    numeroFotografia = click.srcElement.parentNode.parentNode.innerText


    if (listaSelecionadas.includes(numeroFotografia)){
        index = listaSelecionadas.indexOf(numeroFotografia)
        listaSelecionadas.splice(index, 1)
        click.srcElement.parentNode.parentNode.style.border =  'none'
    } else {
        listaSelecionadas = listaSelecionadas.concat(numeroFotografia)
        click.srcElement.parentNode.parentNode.style.border =  '5px solid teal'
    }

    
}

function partilharSelecionadas(){
    
}

function apagarSelecionadas(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    fotografiasRemover = []

    //console.log("oi")

    //console.log(listaSelecionadas[0])

    for (j = 0; j < currentUser.fotografias.length; j++){
        if(listaSelecionadas.includes(JSON.stringify(j))){
            
            fotografiasRemover = fotografiasRemover.concat(currentUser.fotografias[j])
        }
    }

    //console.log(fotografiasRemover.includes(currentUser.fotografias[8]))

    
    for (k=0; k < fotografiasRemover.length; k++){
        apagarFotografia(fotografiasRemover[k])
    }


    listaSelecionadas = []

    location.reload()

    fecharSelecionarFotografias()
}

function apagarFotografia(fotografia){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    //console.log(fotografia.source)

    for (i = 0; i < currentUser.fotografias.length; i++){
        if (fotografia.source == currentUser.fotografias[i].source){

            paraLixo = currentUser.fotografias.splice(i, 1)

            
            currentUser.lixo = currentUser.lixo.concat(paraLixo)
        }
    }

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
}

function organizarFotografias(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    listaOrganizar = currentUser.fotografias

    tipoOrganizar = document.getElementById('ordenacaoFotografia').value

    listaOrganizar = organizarFotografiasGeral(listaOrganizar, tipoOrganizar)

    currentUser.fotografias = listaOrganizar

    currentUser.organizacaoFotografias = tipoOrganizar

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()
}

function definirOpcoesOrganizar(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))


    novaOpcaoData = document.createElement('option')
    novaOpcaoLocalidade = document.createElement('option')
    novaOpcaoPessoas = document.createElement('option')

    novaOpcaoData.setAttribute('value', 'Data')
    novaOpcaoData.innerText = 'Data'
    

    novaOpcaoLocalidade.setAttribute('value', 'Localidade')
    novaOpcaoLocalidade.innerText = 'Localidade'
    

    novaOpcaoPessoas.setAttribute('value', 'Pessoas')
    novaOpcaoPessoas.innerText = 'Pessoas'
    

    if (currentUser.organizacaoFotografias == 'Data'){

        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoData)
        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoLocalidade)
        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoPessoas)

    } else if (currentUser.organizacaoFotografias == 'Localidade'){

        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoLocalidade)
        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoData)
        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoPessoas)

    } else if (currentUser.organizacaoFotografias == 'Pessoas'){

        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoPessoas)
        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoData)
        document.getElementById('ordenacaoFotografia').appendChild(novaOpcaoLocalidade)
        
    }

    document.getElementById('ordenacaoFotografia').addEventListener('change', organizarFotografias)
    
}

function onload(){
    mostrarFotografias()
    definirOpcoesOrganizar()
    document.getElementsByClassName('apagarAlbuns')[0].addEventListener('click', aparecerSelecionarFotografias)
}

window.addEventListener('load', onload)

