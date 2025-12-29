// onload() 

topVisualizadas = []

function onload(){
    // Carregar utilizador atual de forma segura (evita que a página "morra" e não ligue clicks)
    const currentKey = sessionStorage.CurrentUser
    if (!currentKey) {
        console.warn('MaisVistas: sem sessionStorage.CurrentUser; a página pode não ter sessão iniciada.')
        return
    }

    currentUser = JSON.parse(localStorage.getItem(currentKey))
    if (!currentUser) {
        console.warn('MaisVistas: currentUser inválido no localStorage.')
        return
    }

    // Garantir estruturas mínimas
    currentUser.curtidas = currentUser.curtidas || []
    
    

    document.getElementsByClassName('btnTopDir')[0].addEventListener('click', direita)
    document.getElementsByClassName('btnTopEsq')[0].addEventListener('click', esquerda)

    document.getElementsByClassName('curtidas')[0].addEventListener('click',() =>  document.getElementsByClassName('maisVistaPag')[0].scrollTo({
        top:'280',
        behavior: 'smooth',
    }))

    document.getElementsByClassName('maisVisto')[0].addEventListener('click',() =>  document.getElementsByClassName('maisVistaPag')[0].scrollTo({
        top:'0',
        behavior: 'smooth',
    }))


    aparecerCurtidas()
    mostrarTop()

    fotosEventHandler(currentUser.curtidas.length)
    opcoesFotosHandlers()
}

function direita(){
    document.getElementById('colecao').style.left="-85%";
}

function esquerda(){
    document.getElementById('colecao').style.left="2%";
}

function criarListaVisualizacoes(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    listaMaisVistas = [[],[]]


    for (i = 0; i < currentUser.albuns.length; i++){
        for (j = 0; j < currentUser.albuns[i].fotografias.length; j++){

            
            if (listaMaisVistas[0].includes(currentUser.albuns[i].fotografias[j].source)){
                indexMudar = listaMaisVistas[0].indexOf(currentUser.albuns[i].fotografias[j].source)

                listaMaisVistas[1][indexMudar] += currentUser.albuns[i].fotografias[j].visualizacoes
            } else {
                
                listaMaisVistas[0] = listaMaisVistas[0].concat(currentUser.albuns[i].fotografias[j].source)
                listaMaisVistas[1] = listaMaisVistas[1].concat(currentUser.albuns[i].fotografias[j].visualizacoes)
            }
        }
    }

    for (k = 0; k < currentUser.fotografias.length; k++){
        if (listaMaisVistas[0].includes(currentUser.fotografias[k].source)){

            indexMudar = listaMaisVistas[0].indexOf(currentUser.fotografias[k].source)


            listaMaisVistas[1][indexMudar] += currentUser.fotografias[k].visualizacoes
        } else {
            listaMaisVistas[0] = listaMaisVistas[0].concat(currentUser.fotografias[k].source)
            
            listaMaisVistas[1] = listaMaisVistas[1].concat(currentUser.fotografias[k].visualizacoes)
        }
    }

    novaLista = []
    
    for (i = 0; i < listaMaisVistas[0].length; i++){

        novaLista = novaLista.concat([[listaMaisVistas[0][i], listaMaisVistas[1][i]]])
    }

    return novaLista
}

function criarTop(lista){
    lista.sort(function(a,b){
        if (a[1] > b[1]){
            return -1
        } else if (a[1] == b[1]){
            return 0
        } else {
            return 1
        }
    })

    lista = lista.splice(0,10)
    
    topVisualizadas = lista

    return topVisualizadas

}

function mostrarTop(){
    tops = criarTop(criarListaVisualizacoes())
    const colecao = document.getElementsByClassName('colecao')[0]
    if (!colecao) return

    const slots = colecao.querySelectorAll('.imgMV')
    const max = Math.min(10, slots.length, tops.length)

    for (let i = 0; i < max; i++){
        const img = slots[i].querySelector('img')
        if (img && tops[i] && tops[i][0]) img.src = tops[i][0]
    }

    sessionStorage.setItem('top10', JSON.stringify(tops))
    
}

function aparecerCurtidas(){
    const currentKey = sessionStorage.CurrentUser
    currentUser = JSON.parse(localStorage.getItem(currentKey))
    if (!currentUser) return
    currentUser.curtidas = currentUser.curtidas || []

    // fotosEventHandler
    //console.log(currentUser.curtidas.length)

    for (i = 0; i < currentUser.curtidas.length; i++){
        //<li><div class="centrarCurtidas"><img src="#""></div></li>

        novoLi = document.createElement('li')
        novoDiv = document.createElement('div')
        novoImg = document.createElement('img')

        novoLi.innerText = i

        novoDiv.setAttribute('class', 'img')
        novoImg.src = currentUser.curtidas[i].source

        novoDiv.appendChild(novoImg)
        novoLi.appendChild(novoDiv)

        document.getElementsByClassName('posicaoFotosCurtidas')[0].appendChild(novoLi)
    }
}

function descerPagina(){
    document.getElementsByClassName('maisVistaPag')[0].style.behaviour = 'smooth'
    document.getElementsByClassName('maisVistaPag')[0].scrollTo(0, 290)
    
}

window.addEventListener('load',onload)