
listaSelecionadasLixo = []

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

    for (i = 0; i < listaSelecionadasLixo.length; i++){
        if (currentUser.lixo[i].source){
            currentUser.fotografiasImportar = currentUser.fotografiasImportar.concat(currentUser.lixo[parseInt(listaSelecionadasLixo[i])])
        } 
    }

    listaSelecionadasLixo.sort(function(a,b){
        if(parseInt(a) > parseInt(b)){
            return -1
        } else {
            return 1
        }
    })

    console.log(listaSelecionadasLixo)

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

    document.getElementsByClassName('popUpItensFundo')[0].style.visibility = 'visible'
    document.getElementsByClassName('popUpItens')[0].style.visibility = 'visible'

    document.getElementsByClassName('popUpItensFundo')[0].addEventListener('click', desaparecerLixoSelecionar)

    document.getElementsByClassName('btnLixoItens')[0].addEventListener('click',apagarPermanente)
    document.getElementsByClassName('btnRestaurarItens')[0].addEventListener('click',restaurar)

    //<li><div class="imagemItens"><img src="#"></div></li>
    for (i = 0; i < currentUser.lixo.length; i++){
        novoLi = document.createElement('li')
        novoDivPrim = document.createElement('div')
        novoDivSeg = document.createElement('div')
        novoImg = document.createElement('img')

        novoLi.innerText = i
        //console.log(currentUser.lixo[i])

        if (currentUser.lixo[i].source){
            novoImg.src = currentUser.lixo[i].source
            novoDivPrim.setAttribute('class', 'imagemItens')

            novoDivPrim.appendChild(novoImg)
            novoLi.appendChild(novoDivPrim)

        } else {
            novoImg.src = currentUser.lixo[i].capa
            novoDivPrim.setAttribute('class', 'imagemItens itemAlbum')
            novoDivSeg.setAttribute('class', 'titleItem')
            novoDivSeg.innerText = currentUser.lixo[i].nome

            novoDivPrim.appendChild(novoImg)
            novoLi.appendChild(novoDivPrim)
            novoLi.appendChild(novoDivSeg)
        }


        novoLi.addEventListener('click', selecionarFotografiaLixo)

        document.getElementsByClassName('zonaItensPara')[0].appendChild(novoLi)
    }
}

function desaparecerLixoSelecionar(){
    document.getElementsByClassName('popUpItensFundo')[0].style.visibility = 'hidden'
    document.getElementsByClassName('popUpItens')[0].style.visibility = 'hidden'
}

function selecionarFotografiaLixo(click){
    //console.log(click.srcElement)

    if (click.srcElement.src){
        if (click.srcElement.parentNode.parentNode.childNodes.length > 2){
            

            numero =  parseInt(click.srcElement.parentNode.parentNode.innerText).toString()
            
        } else {
            numero = click.srcElement.parentNode.parentNode.innerText
        }
        
    } else if (click.srcElement.className == 'titleItem' || click.srcElement.className == 'imagemItens itemAlbum'){
        //console.log("oi")
        if(click.srcElement.parentNode.childNodes.length > 2){
            
            numero = parseInt(click.srcElement.parentNode.innerText).toString()
        } else {

            numero = click.srcElement.parentNode.innerText
        }
        
    }

    //console.log(numero)

    if (numero){

        if (!listaSelecionadasLixo.includes(numero)){
            listaSelecionadasLixo = listaSelecionadasLixo.concat(numero)
            click.srcElement.parentNode.parentNode.style.border =  '5px solid teal'
        } else {
            index = listaSelecionadasLixo.indexOf(numero)
            listaSelecionadasLixo.splice(index, 1)
            click.srcElement.parentNode.parentNode.style.border = 'none'
            
        }
        //console.log(listaSelecionadasLixo)
    }
}



function onload(){
    mostrarLixo()
    document.getElementsByClassName('apagarAlbuns')[0].addEventListener('click', aparecerLixoSelecionar)
}

window.addEventListener('load', onload)