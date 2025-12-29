
let listaSelecionadasLixo = []

function mostrarLixo(){
    
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    document.getElementById('numFotografias').innerText = currentUser.lixo.length

    for (i = 0; i < currentUser.lixo.length; i++){
        
        novaLi = document.createElement('li')
        novaDiv = document.createElement('div')
        novaImg = document.createElement('img')
        novaDivTituloLixo = document.createElement('div')

        

        //novaImg.src = currentUser.lixo[i].source


        if (currentUser.lixo[i].source){
            novaImg.src = currentUser.lixo[i].source
            novaLi.setAttribute('class', 'foto')
            novaDiv.setAttribute('class', 'img')

        } else {
            
            novaImg.src = currentUser.lixo[i].capa
            novaDivTituloLixo.innerText = currentUser.lixo[i].nome
            novaDivTituloLixo.setAttribute('class', 'albumTitle')

            novaLi.setAttribute('class', 'album')
            novaDiv.setAttribute('class', 'albumDoLixo')
            
            novaLi.appendChild(novaDivTituloLixo)
            //console.log(novaDivTituloLixo)
        }

        

        //novaLi.innerText = i

        novaDiv.appendChild(novaImg)
        novaLi.appendChild(novaDiv)

        // console.log(novaLi)

        document.getElementsByClassName('posicaoFotosLixo')[0].appendChild(novaLi)

    }
    
    // fotosEventHandler(currentUser.fotografias.length)
    // opcoesFotosHandlers()
}

function apagarPermanente(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    for (let i = 0; i < listaSelecionadasLixo.length; i++){
        const idx = parseInt(listaSelecionadasLixo[i])
        if (currentUser.lixo[idx] && currentUser.lixo[idx].source){
            currentUser.fotografiasImportar = currentUser.fotografiasImportar.concat(currentUser.lixo[idx])
        }
    }

    listaSelecionadasLixo.sort(function(a,b){
        if(parseInt(a) > parseInt(b)){
            return -1
        } else {
            return 1
        }
    })

    for (i = 0; i < listaSelecionadasLixo.length; i++){
        currentUser.lixo.splice(parseInt(listaSelecionadasLixo[i]),1)
    }

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()
}

function restaurar(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))


    for (i = 0; i < listaSelecionadasLixo.length; i++){
        if (currentUser.lixo[parseInt(listaSelecionadasLixo[i])].source){
            currentUser.fotografias = currentUser.fotografias.concat(currentUser.lixo[parseInt(listaSelecionadasLixo[i])])
        } else {
            currentUser.albuns = currentUser.albuns.concat(currentUser.lixo[parseInt(listaSelecionadasLixo[i])])
        }
    }


    listaSelecionadasLixo.sort(function(a,b){
        if(parseInt(a) > parseInt(b)){
            return -1
        } else {
            return 1
        }
    })

    for (i = 0; i < listaSelecionadasLixo.length; i++){
        currentUser.lixo.splice(parseInt(listaSelecionadasLixo[i]),1)
    }

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()
}

function aparecerLixoSelecionar(){
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    const popUp = document.getElementById('popUpSelecionar')
    const fundo = document.getElementById('popUpSelecionarFundo')
    const zona = document.getElementsByClassName('zonaSelecao')[0]

    if (!popUp || !fundo || !zona) return

    // Mostrar (mesmo comportamento/visual do popup padrão)
    popUp.style.display = 'flex'
    fundo.style.display = 'block'
    popUp.style.visibility = 'visible'
    fundo.style.visibility = 'visible'

    // Listeners (sem duplicar)
    document.getElementsByClassName('btnLixoSelecao')[0].onclick = apagarPermanente
    document.getElementsByClassName('btnPartilharSelecao')[0].onclick = restaurar
    fundo.onclick = fecharLixoSelecionar
    const fecharBtn = popUp.querySelector('.fecharPopUpSelecionar')
    if (fecharBtn) fecharBtn.onclick = fecharLixoSelecionar

    // Reconstruir lista sempre que abre
    while (zona.firstChild) zona.removeChild(zona.lastChild)
    listaSelecionadasLixo = []

    for (let i = 0; i < currentUser.lixo.length; i++){
        const item = currentUser.lixo[i]
        const li = document.createElement('li')
        li.dataset.index = String(i)

        const div = document.createElement('div')
        div.setAttribute('class', 'imagemSelecionar')

        const img = document.createElement('img')
        if (item && item.source){
            img.src = item.source
        } else {
            img.src = (item && item.capa) ? item.capa : "assets/img/defaultFolder.png"
        }

        // Se for álbum sem capa/default, aplicar estilo default
        if (!item?.source && (item?.capa === "None" || item?.capa === "assets/img/defaultFolder.png" || !item?.capa)) {
            img.src = "assets/img/defaultFolder.png"
            img.classList.add('default-capa')
        }

        div.appendChild(img)

        if (!item?.source) {
            const p = document.createElement('p')
            p.setAttribute('class', 'pSelecionar')
            p.innerText = item?.nome || 'Álbum'
            div.appendChild(p)
        }

        li.appendChild(div)
        li.addEventListener('click', selecionarItemLixo)
        zona.appendChild(li)
    }
}

function fecharLixoSelecionar(){
    const popUp = document.getElementById('popUpSelecionar')
    const fundo = document.getElementById('popUpSelecionarFundo')
    if (!popUp || !fundo) return

    popUp.style.visibility = 'hidden'
    fundo.style.visibility = 'hidden'
    popUp.style.display = 'none'
    fundo.style.display = 'none'
}

function selecionarItemLixo(click){
    const li = click.target.closest('li')
    if (!li) return

    const idx = li.dataset.index
    if (idx == null) return

    if (listaSelecionadasLixo.includes(idx)){
        const pos = listaSelecionadasLixo.indexOf(idx)
        listaSelecionadasLixo.splice(pos, 1)
        li.classList.remove('photo-selected')
    } else {
        listaSelecionadasLixo.push(idx)
        li.classList.add('photo-selected')
    }
}



function onload(){
    mostrarLixo()
    document.getElementsByClassName('apagarAlbuns')[0].addEventListener('click', aparecerLixoSelecionar)

    // Permitir abrir o popup da fotografia ao clicar nas fotos do lixo
    const numFotos = document.getElementsByClassName('img').length
    fotosEventHandler(numFotos)
}

window.addEventListener('load', onload)