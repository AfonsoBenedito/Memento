// criarAlbum()
// apagarAlbum(nome)

// adicionarFotografia(album, url, data = "0/0/0000", localizacao="Desconhecida", pessoas="Nenhuma")
// apagarFotografia(album, url)

// mostrarAlbuns()
// mostrarFotografias(album)

// entrarAlbum(click)

// resetLixo()

// onload()



//************************************************************************** *//

var capaEscolhida = "assets/img/defaultFolder.png"
var listaSelecionadas = []
var aparecerSelecionar = 1
var selecionadoFotos = 1
var listaSelecionadasFotografias = []

function criarAlbum(nomeAlbum, capaAlbum = 'None', descricaoAlbum = 'None', fotografias = []) {
    //nomeAlbum = document.getElementById('nomeNovoAlbum').value

    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    let novoAlbum = {
        nome: nomeAlbum,
        fotografias: fotografias,
        capa: capaAlbum,
        organizacao: "Data",
        descricao: descricaoAlbum
    }




    currentUser.albuns = currentUser.albuns.concat(novoAlbum)


    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()
}

function apagarAlbum(album) {

    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    for (i = 0; i < currentUser.albuns.length; i++) {
        //console.log(currentUser.albuns[i].nome == album.nome)
        if (currentUser.albuns[i].nome == album.nome) {
            paraLixo = currentUser.albuns.splice(i, 1)
        }
    }



    currentUser.lixo = currentUser.lixo.concat(paraLixo)



    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

}

//************************************************************************** *//

function adicionarFotografia(album, url, data = "0/0/0000", localizacao = "Desconhecida", pessoas = "Nenhuma") {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    let fotografia = {
        source: url,
        data: data,
        localizacao: localizacao,
        pessoas: pessoas
    }

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (currentUser.albuns[i].nome == album) {
            albumAtual = currentUser.albuns[i]


            albumAtual.fotografias = albumAtual.fotografias.concat(fotografia)


            currentUser.albuns[i] = albumAtual
        }
    }

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

}

function apagarFotografia(album, url) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (currentUser.albuns[i].nome == album) {

            albumAtual = currentUser.albuns[i]


            for (j = 0; j < albumAtual.fotografias.length; j++) {

                if (url == albumAtual.fotografias[j].source) {


                    paraLixo = albumAtual.fotografias.splice(j, 1)




                    currentUser.lixo = currentUser.lixo.concat(paraLixo)


                }
            }

            currentUser.albuns[i] = albumAtual

        }
    }

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

}

function adicionarCapa(album, fotografia) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (currentUser.albuns[i].nome == album) {
            // console.log(currentUser.albuns[i])
            currentUser.albuns[i].capa = fotografia
        }
    }

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()

}

//************************************************************************** *//

function mostrarAlbuns() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    //console.log(currentUser.albuns)

    listaAlbuns = currentUser.albuns

    if (listaAlbuns != []) {
        for (i = 0; i < listaAlbuns.length; i++) {

            novaDivImg = document.createElement('div')

            novaDivTitulo = document.createElement('div')

            capaAlbum = document.createElement('img')


            novaDivImg.setAttribute('class', 'album')

            novaDivTitulo.setAttribute('class', 'albumTitle')

            novaDivTitulo.innerText = listaAlbuns[i].nome



            if (listaAlbuns[i].capa == "None" || listaAlbuns[i].capa == "assets/img/defaultFolder.png") {
                capaAlbum.src = "assets/img/defaultFolder.png"
                capaAlbum.classList.add('default-capa')
            } else {
                capaAlbum.src = listaAlbuns[i].capa
            }

            novoAlbum = document.createElement('li')
            novaDivImg.appendChild(capaAlbum)
            novaDivImg.appendChild(novaDivTitulo) // Mover título para dentro da div album
            novoAlbum.appendChild(novaDivImg)

            document.getElementsByClassName('posicaoAlbum')[0].appendChild(novoAlbum)

        }

        document.getElementById('numAlbuns').innerText = listaAlbuns.length

        numFotografias = 0

        numFotografias = currentUser.fotografias.length

        document.getElementById('numFotografias').innerText = numFotografias
    }
}

function mostrarFotografias(album) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    albunsUtilizador = currentUser.albuns

    for (i = 0; i < albunsUtilizador.length; i++) {
        if (album == albunsUtilizador[i].nome) {
            for (j = 0; albunsUtilizador[i].length; j++) {
                //Display fotografia
            }
        }
    }
}

//************************************************************************** *//

function entrarAlbum(click) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    let albumDiv = click.srcElement.closest('.album');
    if (!albumDiv) return;

    let li = albumDiv.parentNode;
    let nomeAlbum = albumDiv.querySelector('.albumTitle').innerText;

    document.getElementsByClassName('zonaAlbum')[0].style.display = 'none'

    let tituloElem = document.getElementsByClassName('tituloMomento')[0];
    tituloElem.innerText = "Álbum - " + nomeAlbum;
    tituloElem.dataset.nomeReal = nomeAlbum; // Guarda o nome original sem transformação CSS

    for (i = 0; i < currentUser.albuns.length; i++) {


            if (currentUser.albuns[i].nome == nomeAlbum) {
                albumSelecionado = currentUser.albuns[i]
            }

        }
        numFotografias = albumSelecionado.fotografias.length
        document.getElementsByClassName('subTituloMomento')[0].innerHTML = numFotografias + " fotografias \xa0\xa0\xa0\xa0\xa0•\xa0\xa0\xa0\xa0\xa0" + albumSelecionado.descricao

        aparecerFotografiasAlbum()

        document.getElementsByClassName('posicaoFotosAlbunsAbertosGeral')[0].style.zIndex = 5
        document.getElementsByClassName('posicaoFotosAlbunsAbertosGeral')[0].style.display = 'block'
        document.getElementsByClassName('posicaoFotosAlbunsAbertosGeral')[0].style.visibility = 'visible'

        document.getElementsByClassName('btnExtraTopPag')[0].style.visibility = 'visible'
        // document.getElementsByClassName('reloadAlbum')[0].style.visibility = 'visible'
        document.getElementsByClassName('reloadAlbum')[0].addEventListener('click', reloadPage)

        fotosEventHandler(albumSelecionado.fotografias.length)
        opcoesFotosHandlers()

        document.getElementsByClassName('btnPopUpMudarNome')[0].addEventListener('click', aparecerMudarNomeAlbum)
        // document.getElementsByClassName('btnPopUpMudarNome')[0].style.visibility = 'visible'

        definirOpcoesOrganizar()

        document.getElementsByClassName('apagarAlbuns')[0].style.visibility = 'hidden'
        document.getElementsByClassName('apagarFotos')[0].style.visibility = 'visible'
        document.getElementsByClassName('apagarFotos')[0].style.display = 'flex'

}

function aparecerFotografiasAlbum() {

    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)

    for (i = 0; i < currentUser.albuns.length; i++) {


        if (currentUser.albuns[i].nome == nomeAlbum) {
            albumSelecionado = currentUser.albuns[i]
        }

    }


    for (i = 0; i < albumSelecionado.fotografias.length; i++) {
        // <li>1<div class="img"><img src="assets/img/fotosExemplo/fotoExemplo1.jpg"></div> </li>

        novaLi = document.createElement('li')
        novaDiv = document.createElement('div')
        novaImg = document.createElement('img')

        novaImg.src = albumSelecionado.fotografias[i].source

        novaDiv.setAttribute('class', 'img')
        novaLi.innerText = i

        novaDiv.appendChild(novaImg)
        novaLi.appendChild(novaDiv)

        document.getElementsByClassName('posicaoFotosAlbunsAbertos')[0].appendChild(novaLi)

    }
}

function desaparerReaparecerFotografiasAlbum() {
    divRemover = document.getElementsByClassName('posicaoFotosAlbunsAbertos')[0]


    while (divRemover.firstChild) {
        divRemover.removeChild(divRemover.lastChild)
    }

    aparecerFotografiasAlbum()
    fotosEventHandler(albumSelecionado.fotografias.length)
    opcoesFotosHandlers()
}

function definirOpcoesOrganizar() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)


    indexAlbum = 0

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (nomeAlbum == currentUser.albuns[i].nome) {
            indexAlbum = i

        }
    }


    novaOpcaoData = document.createElement('option')
    novaOpcaoLocalidade = document.createElement('option')
    novaOpcaoPessoas = document.createElement('option')

    novaOpcaoData.setAttribute('value', 'Data')
    novaOpcaoData.innerText = 'Data'


    novaOpcaoLocalidade.setAttribute('value', 'Localidade')
    novaOpcaoLocalidade.innerText = 'Localidade'


    novaOpcaoPessoas.setAttribute('value', 'Pessoas')
    novaOpcaoPessoas.innerText = 'Pessoas'


    if (currentUser.albuns[indexAlbum].organizacao == 'Data') {

        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoData)
        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoLocalidade)
        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoPessoas)

    } else if (currentUser.albuns[indexAlbum].organizacao == 'Localidade') {

        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoLocalidade)
        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoData)
        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoPessoas)

    } else if (currentUser.albuns[indexAlbum].organizacao == 'Pessoas') {

        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoPessoas)
        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoData)
        document.getElementById('ordenacaoFotoAlbum').appendChild(novaOpcaoLocalidade)

    }

    document.getElementById('ordenacaoFotoAlbum').addEventListener('change', organizarFotografias)

}


//************************************************************************** *//

function aparecerCriarAlbum() {

    document.getElementsByClassName('btnProximo')[0].addEventListener('click', avisoCriarAlbum)

    document.getElementsByClassName('slide')[0].style.transition = '0.7s cubic-bezier(0.4, 0, 0.2, 1)'

    // Garantir que os botões da página 1 estão visíveis e os da página 2 escondidos
    const btnAnteriores = document.getElementsByClassName('btnAnterior');
    const btnProximos = document.getElementsByClassName('btnProximo');

    btnAnteriores[0].style.display = 'flex';
    btnAnteriores[0].style.visibility = 'visible';
    btnProximos[0].style.display = 'flex';
    btnProximos[0].style.visibility = 'visible';

    btnAnteriores[1].style.display = 'none';
    btnAnteriores[1].style.visibility = 'hidden';
    btnProximos[1].style.display = 'none';
    btnProximos[1].style.visibility = 'hidden';

    // Mostrar barra de progresso inicial
    const progressBars = document.getElementsByClassName('barraProgresso');
    for (let i = 0; i < progressBars.length; i++) {
        progressBars[i].style.visibility = 'visible';
    }

    document.getElementsByClassName('menuCriarAlbum')[0].style.visibility = 'visible'
    document.getElementsByClassName('fundoCriarAlbum')[0].style.visibility = 'visible'

    // Cruz de fecho integrada no card
    const fecharBtnCard = document.querySelector('.menuCriarAlbum .fecharCriarAlbum')
    if (fecharBtnCard) {
        fecharBtnCard.onclick = (e) => {
            e.stopPropagation()
            fecharCriarAlbum()
        }
    }

    document.getElementById('checkData').addEventListener('click', verificaCheck)
    document.getElementById('checkLocal').addEventListener('click', verificaCheck)
    document.getElementById('checkPessoa').addEventListener('click', verificaCheck)

    document.getElementsByClassName('btnAnterior')[0].addEventListener('click', fecharCriarAlbum)
    document.getElementsByClassName('fundoCriarAlbum')[0].addEventListener('click', fecharCriarAlbum)
    document.getElementsByClassName('btnAnterior')[1].addEventListener('click', slideAnteriorCriarAlbum)

    document.getElementsByClassName('btnProximo')[1].addEventListener('click', recolherInfoAlbum)
}

function OpcoesCriterios() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    datas = []
    locais = []
    persons = []

    for (i = 0; i < currentUser.fotografias.length; i++) {
        if (!(datas.includes(currentUser.fotografias[i].data))) {
            datas = datas.concat(currentUser.fotografias[i].data)
        }

        if (!(locais.includes(currentUser.fotografias[i].localizacao))) {
            locais = locais.concat(currentUser.fotografias[i].localizacao)
        }

        if (!(persons.includes(currentUser.fotografias[i].pessoas))) {
            persons = persons.concat(currentUser.fotografias[i].pessoas)
        }

    }

    for (j = 0; j < datas.length; j++) {
        novaOptionData = document.createElement('option')
        novaOptionData.setAttribute('value', datas[j])
        novaOptionData.innerText = datas[j]

        document.getElementById('inputData').appendChild(novaOptionData)
    }

    for (j = 0; j < locais.length; j++) {
        novaOptionLocal = document.createElement('option')
        novaOptionLocal.setAttribute('value', locais[j])
        novaOptionLocal.innerText = locais[j]

        document.getElementById('inputLocal').appendChild(novaOptionLocal)
    }

    for (j = 0; j < persons.length; j++) {
        novaOptionPessoa = document.createElement('option')
        novaOptionPessoa.setAttribute('value', persons[j])
        novaOptionPessoa.innerText = persons[j]

        document.getElementById('inputPessoa').appendChild(novaOptionPessoa)
    }
}

function slideProximoCriarAlbum() {
    document.getElementsByClassName('avisoProximo')[0].style.visibility = 'hidden'

    document.getElementsByClassName('slide')[0].style.left = "-100%"

    document.getElementsByClassName('progEsq')[0].style.backgroundColor = "#4646497c"

    document.getElementsByClassName('progDir')[0].style.backgroundColor = "#464649da"

    // Esconder botões da página 1
    document.getElementsByClassName('btnAnterior')[0].style.display = 'none'
    document.getElementsByClassName('btnProximo')[0].style.display = 'none'
    
    // Mostrar botões da página 2
    document.getElementsByClassName('btnAnterior')[1].style.display = 'flex'
    document.getElementsByClassName('btnProximo')[1].style.display = 'flex'
    
    setTimeout(() => {
        document.getElementsByClassName('btnAnterior')[1].style.visibility = 'visible'
        document.getElementsByClassName('btnProximo')[1].style.visibility = 'visible'
    }, 50);

    document.getElementById('btnEscolherFoto').addEventListener('click', abrirEscolherCapa)

}

function slideAnteriorCriarAlbum() {

    verificaCheck()

    while (document.getElementsByClassName('zonaDasFotos')[0].firstChild) {
        document.getElementsByClassName('zonaDasFotos')[0].removeChild(document.getElementsByClassName('zonaDasFotos')[0].lastChild)
    }

    document.getElementsByClassName('slide')[0].style.left = "0%"

    document.getElementsByClassName('progEsq')[0].style.backgroundColor = "#464649da"

    document.getElementsByClassName('progDir')[0].style.backgroundColor = "#4646497c"

    // Esconder botões da página 2
    document.getElementsByClassName('btnAnterior')[1].style.display = 'none'
    document.getElementsByClassName('btnProximo')[1].style.display = 'none'
    document.getElementsByClassName('btnAnterior')[1].style.visibility = 'hidden'
    document.getElementsByClassName('btnProximo')[1].style.visibility = 'hidden'

    // Mostrar botões da página 1
    document.getElementsByClassName('btnAnterior')[0].style.display = 'flex'
    document.getElementsByClassName('btnProximo')[0].style.display = 'flex'
    document.getElementsByClassName('btnAnterior')[0].style.visibility = 'visible'
    document.getElementsByClassName('btnProximo')[0].style.visibility = 'visible'

    document.getElementById('btnEscolherFoto').removeEventListener('click', abrirEscolherCapa)

    //sessionStorage.setItem('albumEsboco', JSON.stringify([]))
}

function fecharCriarAlbum() {
    // Esconder tudo imediatamente
    document.getElementsByClassName('menuCriarAlbum')[0].style.visibility = 'hidden'
    document.getElementsByClassName('fundoCriarAlbum')[0].style.visibility = 'hidden'
    document.getElementsByClassName('avisoProximo')[0].style.visibility = 'hidden'

    // Esconder dropdowns especificamente (para evitar que persistam devido ao comportamento de visibility: visible)
    document.getElementById('inputData').style.visibility = 'hidden'
    document.getElementById('inputLocal').style.visibility = 'hidden'
    document.getElementById('inputPessoa').style.visibility = 'hidden'

    // Uncheck as checkboxes para o próximo uso
    document.getElementById('checkData').checked = false
    document.getElementById('checkLocal').checked = false
    document.getElementById('checkPessoa').checked = false

    const btnAnteriores = document.getElementsByClassName('btnAnterior');
    const btnProximos = document.getElementsByClassName('btnProximo');

    // Esconder todos os botões para garantir que nada fica no ecrã
    for (let i = 0; i < btnAnteriores.length; i++) {
        btnAnteriores[i].style.visibility = 'hidden';
        btnProximos[i].style.visibility = 'hidden';
    }

    // Resetar o slide para a primeira página sem animação
    document.getElementsByClassName('slide')[0].style.transition = 'none'
    document.getElementsByClassName('slide')[0].style.left = "0%"

    // Resetar barra de progresso
    const progressBars = document.getElementsByClassName('barraProgresso');
    for (let i = 0; i < progressBars.length; i++) {
        progressBars[i].style.visibility = 'hidden';
    }

    document.getElementsByClassName('progEsq')[0].style.backgroundColor = "#00d4d4"
    document.getElementsByClassName('progDir')[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)"
}

function avisoCriarAlbum() {
    // console.log("aaa")
    document.getElementsByClassName('avisoProximo')[0].style.visibility = 'visible'
}

function abrirEscolherCapa() {
    document.getElementsByClassName('zonaSelecaoFotos')[0].style.visibility = 'visible'
    document.getElementsByClassName('zonaSelecaoFotosFundo')[0].style.visibility = 'visible'
    document.getElementsByClassName('zonaSelecaoFotosFundo1')[0].style.visibility = 'visible'

    document.getElementsByClassName('zonaSelecaoFotosFundo')[0].addEventListener('click', fecharEscolherCapa)
    document.getElementsByClassName('zonaSelecaoFotosFundo1')[0].addEventListener('click', fecharEscolherCapa)


    if (document.getElementsByClassName('zonaDasFotos')[0].childNodes.length > 1) {
        paiLi = document.getElementsByClassName('liCapa')[0].parentNode

        for (i = 0; i < paiLi.childNodes.length - 1; i++) {

            document.getElementsByClassName('liCapa')[i].addEventListener('click', escolherCapa)
        }
    } else {
        document.getElementsByClassName('defaultSemFotos')[0].style.visibility = 'visible'
    }
}

function escolherCapa(click) {
    srcFoto = click.srcElement.src

    capaEscolhida = srcFoto

    document.getElementById('imgCapaEscolhida').src = srcFoto

    fecharEscolherCapa()
}

function fecharEscolherCapa() {
    document.getElementsByClassName('zonaSelecaoFotos')[0].style.visibility = 'hidden'
    document.getElementsByClassName('zonaSelecaoFotosFundo')[0].style.visibility = 'hidden'
    document.getElementsByClassName('zonaSelecaoFotosFundo1')[0].style.visibility = 'hidden'
    document.getElementsByClassName('defaultSemFotos')[0].style.visibility = 'hidden'

}

function recolherInfoAlbum() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    document.getElementsByClassName('btnProximo')[1].removeEventListener('click', recolherInfoAlbum)

    descricao = ""


    if (document.getElementById('checkData').checked) {
        descricao += " Data:\xa0" + data + "\xa0\xa0\xa0\xa0\xa0•\xa0\xa0\xa0\xa0\xa0"
    }
    if (document.getElementById('checkLocal').checked) {
        descricao += " Local:\xa0" + local + "\xa0\xa0\xa0\xa0\xa0•\xa0\xa0\xa0\xa0\xa0"
    }
    if (document.getElementById('checkPessoa').checked) {
        descricao += " Pessoa:\xa0" + pessoa + "\xa0\xa0\xa0\xa0\xa0•\xa0\xa0\xa0\xa0\xa0"
    }

    if (document.getElementById('inputNome').value != "") {
        nome = document.getElementById('inputNome').value
        cont = 1

        for (i = 0; i < currentUser.albuns.length; i++) {
            if (currentUser.albuns[i].nome == nome) {
                cont += 1
            }
            if (cont > 1) {
                nome = nome + cont
            }

        }

    } else {
        nome = 'Álbum'
        cont = 1
        // console.log(currentUser.albuns.length)
        for (i = 0; i < currentUser.albuns.length; i++) {
            if (currentUser.albuns[i].nome == nome) {
                cont += 1
            }
            if (cont > 1) {
                nome = "Álbum" + cont
            }

        }
        if (nome == "Álbum1") {
            nome = 'Álbum'
        }

    }
    if (document.getElementById('inputDescricao').value != '') {
        descricao += "   " + document.getElementById('inputDescricao').value + "."
    } else {
        descricao += "\xa0\xa0\xa0Álbum sem descrição."
    }

    capa = capaEscolhida


    fotografiasFiltradas = JSON.parse(sessionStorage.getItem('albumEsboco'))
    criarAlbum(nome, capa, descricao, fotografiasFiltradas)
}

function recolherPrimeirasInfo() {
    document.getElementsByClassName('btnProximo')[0].removeEventListener('click', recolherPrimeirasInfo)

    data = "0/0/0000"
    local = "Desconhecida"
    pessoa = "Nenhuma"

    if (document.getElementById('checkData').checked) {
        data = document.getElementById('inputData').value
    }
    if (document.getElementById('checkLocal').checked) {
        local = document.getElementById('inputLocal').value
    }
    if (document.getElementById('checkPessoa').checked) {
        pessoa = document.getElementById('inputPessoa').value
    }

    fotografiasFiltradas = filtrarFotografias(data, local, pessoa)

    sessionStorage.setItem('albumEsboco', JSON.stringify(fotografiasFiltradas))


    for (i = 0; i < fotografiasFiltradas.length; i++) {

        novoLi = document.createElement('li')
        novaImg = document.createElement('img')
        novaDiv = document.createElement('div')


        novoLi.setAttribute('class', 'liCapa')
        novaImg.src = fotografiasFiltradas[i].source
        novaDiv.setAttribute('class', 'sitioFoto')

        novaDiv.appendChild(novaImg)
        novoLi.appendChild(novaDiv)

        document.getElementsByClassName('zonaDasFotos')[0].appendChild(novoLi)
    }

}

function verificaCheck() {

    if (document.getElementById('checkData').checked) {
        document.getElementById('inputData').style.visibility = 'visible'
    } else {
        document.getElementById('inputData').style.visibility = 'hidden'
    }

    if (document.getElementById('checkLocal').checked) {
        document.getElementById('inputLocal').style.visibility = 'visible'
    } else {
        document.getElementById('inputLocal').style.visibility = 'hidden'
    }

    if (document.getElementById('checkPessoa').checked) {
        document.getElementById('inputPessoa').style.visibility = 'visible'
    } else {
        document.getElementById('inputPessoa').style.visibility = 'hidden'
    }

    if (document.getElementById('checkData').checked || document.getElementById('checkLocal').checked || document.getElementById('checkPessoa').checked) {
        document.getElementsByClassName('btnProximo')[0].addEventListener('click', slideProximoCriarAlbum)
        document.getElementsByClassName('btnProximo')[0].addEventListener('click', recolherPrimeirasInfo)
        document.getElementsByClassName('btnProximo')[0].removeEventListener('click', avisoCriarAlbum)
    } else {
        // Texto de avisar que tem de preencher pelo menos 1 critério!
        document.getElementsByClassName('btnProximo')[0].removeEventListener('click', slideProximoCriarAlbum)
        document.getElementsByClassName('btnProximo')[0].removeEventListener('click', recolherPrimeirasInfo)
        document.getElementsByClassName('btnProximo')[0].addEventListener('click', avisoCriarAlbum)
    }
}

//************************************************************************** *//

function filtrarFotografias(data, local, pessoa) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    fotografiasComuns = []

    possiveisFotografiasData = []
    possiveisFotografiasLocal = []
    possiveisFotografiasPessoa = []



    for (i = 0; i < currentUser.fotografias.length; i++) {
        if (currentUser.fotografias[i].data == data) {
            possiveisFotografiasData = possiveisFotografiasData.concat(currentUser.fotografias[i])
        }
    }


    for (i = 0; i < currentUser.fotografias.length; i++) {
        if (currentUser.fotografias[i].localizacao == local) {
            possiveisFotografiasLocal = possiveisFotografiasLocal.concat(currentUser.fotografias[i])
        }
    }



    for (i = 0; i < currentUser.fotografias.length; i++) {
        if (currentUser.fotografias[i].pessoas == pessoa) {

            possiveisFotografiasPessoa = possiveisFotografiasPessoa.concat(currentUser.fotografias[i])

        }
    }




    if (possiveisFotografiasData.length != 0) {
        if (possiveisFotografiasLocal.length != 0) {
            if (possiveisFotografiasPessoa.length != 0) {

                for (i = 0; i < possiveisFotografiasData.length; i++) {
                    if (possiveisFotografiasLocal.includes(possiveisFotografiasData[i]) && possiveisFotografiasPessoa.includes(possiveisFotografiasData[i])) {
                        fotografiasComuns = fotografiasComuns.concat(possiveisFotografiasData[i])
                    }
                }
            } else {
                for (i = 0; i < possiveisFotografiasData.length; i++) {
                    if (possiveisFotografiasLocal.includes(possiveisFotografiasData[i])) {
                        fotografiasComuns = fotografiasComuns.concat(possiveisFotografiasData[i])
                    }
                }
            }
        } else if (possiveisFotografiasPessoa.length != 0) {

            for (i = 0; i < possiveisFotografiasData.length; i++) {
                if (possiveisFotografiasPessoa.includes(possiveisFotografiasData[i])) {
                    fotografiasComuns = fotografiasComuns.concat(possiveisFotografiasData[i])
                }
            }
        } else {
            fotografiasComuns = fotografiasComuns.concat(possiveisFotografiasData)
        }
    } else if (possiveisFotografiasLocal.length != 0) {

        if (possiveisFotografiasPessoa.length != 0) {

            for (i = 0; i < possiveisFotografiasLocal.length; i++) {
                if (possiveisFotografiasPessoa.includes(possiveisFotografiasLocal[i])) {
                    fotografiasComuns = fotografiasComuns.concat(possiveisFotografiasLocal[i])
                }
            }
        } else {
            fotografiasComuns = fotografiasComuns.concat(possiveisFotografiasLocal)
        }
    } else {
        fotografiasComuns = fotografiasComuns.concat(possiveisFotografiasPessoa)
    }

    // console.log(fotografiasComuns)
    return fotografiasComuns
}

//************************************************************************** *//

function aparecerSelecionarAlbuns() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    const popUp = document.getElementsByClassName('popUpSelecionar')[0]
    const fundo = document.getElementsByClassName('popUpSelecionarFundo')[0]

    popUp.style.display = 'flex'
    fundo.style.display = 'block'
    popUp.style.visibility = 'visible'
    fundo.style.visibility = 'visible'

    // Evitar duplicar listeners a cada abertura
    document.getElementsByClassName('btnPartilharSelecao')[0].onclick = partilharSelecionadas
    document.getElementsByClassName('btnLixoSelecao')[0].onclick = apagarSelecionadas
    fundo.onclick = fecharSelecionarAlbuns

    const fecharBtn = popUp.querySelector('.fecharPopUpSelecionar')
    if (fecharBtn) fecharBtn.onclick = fecharSelecionarAlbuns

    // Comportamento igual ao "Selecionar Fotos": reconstruir sempre a lista para garantir consistência
    listaSelecionadas = []

    const zona = document.getElementsByClassName('zonaSelecao')[0]
    if (!zona) return
    while (zona.firstChild) zona.removeChild(zona.lastChild)

    for (let i = 0; i < currentUser.albuns.length; i++) {
        const novaLi = document.createElement('li')
        const novaDiv = document.createElement('div')
        const novaImg = document.createElement('img')
        const novoP = document.createElement('p')

        novaLi.dataset.albumName = currentUser.albuns[i].nome

        novoP.innerText = currentUser.albuns[i].nome
        novoP.setAttribute('class', 'pSelecionar')

        if (currentUser.albuns[i].capa == "None" || currentUser.albuns[i].capa == "assets/img/defaultFolder.png") {
            novaImg.src = "assets/img/defaultFolder.png"
            novaImg.classList.add('default-capa')
        } else {
            novaImg.src = currentUser.albuns[i].capa
        }

        novaDiv.setAttribute('class', 'imagemSelecionar')
        novaDiv.appendChild(novaImg)
        novaDiv.appendChild(novoP)
        novaLi.appendChild(novaDiv)

        novaLi.addEventListener('click', selecionarAlbum)
        zona.appendChild(novaLi)
    }

}

function fecharSelecionarAlbuns() {
    const popUp = document.getElementsByClassName('popUpSelecionar')[0]
    const fundo = document.getElementsByClassName('popUpSelecionarFundo')[0]

    popUp.style.visibility = 'hidden'
    fundo.style.visibility = 'hidden'
    popUp.style.display = 'none'
    fundo.style.display = 'none'

}

function selecionarAlbum(click) {
    const li = (click.target || click.srcElement).closest('li')
    if (!li) return

    const albumName = li.dataset.albumName || (li.querySelector('.pSelecionar') ? li.querySelector('.pSelecionar').innerText : '')
    if (!albumName) return

    if (listaSelecionadas.includes(albumName)) {
        const index = listaSelecionadas.indexOf(albumName)
        if (index >= 0) listaSelecionadas.splice(index, 1)
        li.classList.remove('photo-selected')
    } else {
        listaSelecionadas.push(albumName)
        li.classList.add('photo-selected')
    }
}

function partilharSelecionadas() {

}

function apagarSelecionadas() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    albunsRemover = []

    for (j = 0; j < currentUser.albuns.length; j++) {

        if (listaSelecionadas.includes(currentUser.albuns[j].nome)) {
            albunsRemover = albunsRemover.concat(currentUser.albuns[j])
        }
    }

    for (k = 0; k < albunsRemover.length; k++) {
        apagarAlbum(albunsRemover[k])
    }


    listaSelecionadas = []

    location.reload()

    fecharSelecionarAlbuns()
}

/******************************************/

function aparecerSelecionarFotos() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    const fundo = document.getElementsByClassName('popUpSelecionarFotosFundo')[0]
    const popUp = document.getElementsByClassName('popUpSelecionarFotos')[0]

    popUp.style.display = 'flex'
    fundo.style.display = 'block'
    fundo.style.visibility = 'visible'
    popUp.style.visibility = 'visible'

    // Evitar duplicar listeners a cada abertura
    fundo.onclick = desaparecerSelecionarFotos
    const fecharBtn = popUp.querySelector('.fecharPopUpSelecionar')
    if (fecharBtn) fecharBtn.onclick = desaparecerSelecionarFotos

    document.getElementsByClassName('btnLixoSelecaoFotografias')[0].onclick = removerFotografiaAlbum

    const titulo = document.getElementsByClassName('tituloMomento')[0]
    let nomeAlbum = (titulo && titulo.dataset && titulo.dataset.nomeReal) ? titulo.dataset.nomeReal : (titulo ? titulo.innerText : "")
    nomeAlbum = (nomeAlbum || "").replace(/^Álbum\s*-\s*/i, "").trim()

    const zona = document.getElementsByClassName('zonaSelecaoFotografias')[0]
    if (!zona) return

    // Reconstroi sempre a lista para garantir que mostra as fotos do album atual
    while (zona.firstChild) zona.removeChild(zona.lastChild)

    let indexAlbum = currentUser.albuns.findIndex(a => a.nome === nomeAlbum)
    let album = indexAlbum >= 0 ? currentUser.albuns[indexAlbum] : (typeof albumSelecionado !== 'undefined' ? albumSelecionado : null)
    if (!album || !album.fotografias) return

    for (let i = 0; i < album.fotografias.length; i++) {
        const novoLi = document.createElement('li')
        const novoDiv = document.createElement('div')
        const novoImg = document.createElement('img')

        novoImg.src = album.fotografias[i].source

        novoDiv.setAttribute('class', 'imagemSelecionarFotografias')
        novoLi.innerText = i

        novoDiv.appendChild(novoImg)
        novoLi.appendChild(novoDiv)

        novoLi.addEventListener('click', selecionarFotografiaRemover)
        zona.appendChild(novoLi)
    }

    selecionadoFotos = 0
}

function desaparecerSelecionarFotos() {
    const fundo = document.getElementsByClassName('popUpSelecionarFotosFundo')[0]
    const popUp = document.getElementsByClassName('popUpSelecionarFotos')[0]

    fundo.style.visibility = 'hidden'
    popUp.style.visibility = 'hidden'
    fundo.style.display = 'none'
    popUp.style.display = 'none'
}

function selecionarFotografiaRemover(click) {
    let li = click.srcElement.closest('li');
    let photoIndex = li.innerText;

    if (!listaSelecionadasFotografias.includes(photoIndex)) {
        li.classList.add('photo-selected');
        listaSelecionadasFotografias.push(photoIndex);
    } else {
        li.classList.remove('photo-selected');
        let indexRemover = listaSelecionadasFotografias.indexOf(photoIndex)
        listaSelecionadasFotografias.splice(indexRemover, 1)
    }
}

function removerFotografiaAlbum() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)

    indexAlbum = 0

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (nomeAlbum == currentUser.albuns[i].nome) {
            indexAlbum = i

        }
    }

    listaSelecionadasFotografias.sort(function (a, b) {
        if (parseInt(a) > parseInt(b)) {
            return -1
        } else {
            return 1
        }
    })

    for (i = 0; i < listaSelecionadasFotografias.length; i++) {
        currentUser.albuns[indexAlbum].fotografias.splice(listaSelecionadasFotografias[i], 1)
    }



    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    desaparecerSelecionarFotos()
    desaparerReaparecerFotografiasAlbum()

    listaSelecionadasFotografias = []
    selecionadoFotos = 1

    while (document.getElementsByClassName('zonaSelecaoFotografias')[0].firstChild) {
        document.getElementsByClassName('zonaSelecaoFotografias')[0].removeChild(document.getElementsByClassName('zonaSelecaoFotografias')[0].lastChild)
    }



}



/******************************************/

function aparecerMudarNomeAlbum() {
    document.getElementsByClassName('popUpMudarNomeFundo')[0].style.display = 'block'
    document.getElementsByClassName('popUpMudarNome')[0].style.display = 'flex'

    document.getElementsByClassName('popUpMudarNomeFundo')[0].style.visibility = 'visible'
    document.getElementsByClassName('popUpMudarNome')[0].style.visibility = 'visible'
}

function desaparecerMudarNomeAlbum() {
    document.getElementsByClassName('popUpMudarNomeFundo')[0].style.visibility = 'hidden'
    document.getElementsByClassName('popUpMudarNome')[0].style.visibility = 'hidden'

    document.getElementsByClassName('popUpMudarNomeFundo')[0].style.display = 'none'
    document.getElementsByClassName('popUpMudarNome')[0].style.display = 'none'

    document.getElementById('inputMudarNome').value = ''
}

function mudarNomeAlbum() {
    let currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    let tituloElem = document.getElementsByClassName('tituloMomento')[0];
    let nomeAtual = tituloElem.dataset.nomeReal; // Recupera o nome original do atributo data
    let novoNome = document.getElementById('inputMudarNome').value.trim()

    if (novoNome === "") {
        alert("Por favor, insira um nome para o álbum.")
        return
    }

    if (novoNome === nomeAtual) {
        desaparecerMudarNomeAlbum()
        return
    }

    let possivel = true
    for (let i = 0; i < currentUser.albuns.length; i++) {
        if (novoNome.toLowerCase() === currentUser.albuns[i].nome.toLowerCase() && novoNome.toLowerCase() !== nomeAtual.toLowerCase()) {
            alert('Já existe um álbum com esse nome!')
            possivel = false
            break
        }
    }

    if (possivel) {
        let encontrado = false
        for (let j = 0; j < currentUser.albuns.length; j++) {
            if (nomeAtual === currentUser.albuns[j].nome) {
                currentUser.albuns[j].nome = novoNome
                encontrado = true
                break
            }
        }

        if (encontrado) {
            localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
            tituloElem.innerText = "Álbum - " + novoNome
            tituloElem.dataset.nomeReal = novoNome; // Atualiza o atributo data com o novo nome
            
            desaparecerMudarNomeAlbum()
        } else {
            alert("Erro ao encontrar o álbum para renomear.")
        }
    }
}

function organizarFotografias() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)

    indexAlbum = 0

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (nomeAlbum == currentUser.albuns[i].nome) {
            indexAlbum = i
        }
    }


    listaOrganizar = currentUser.albuns[indexAlbum].fotografias

    tipoOrganizar = document.getElementById('ordenacaoFotoAlbum').value

    listaOrganizar = organizarFotografiasGeral(listaOrganizar, tipoOrganizar)

    currentUser.albuns[indexAlbum].fotografias = listaOrganizar

    currentUser.albuns[indexAlbum].organizacao = tipoOrganizar

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    desaparerReaparecerFotografiasAlbum()

}


//************************************************************************** *//

function onload() {
    mostrarAlbuns()
    OpcoesCriterios()
    document.getElementsByClassName('posicaoAlbum')[0].addEventListener('click', entrarAlbum)
    document.getElementsByClassName('criarNovoAlbum')[0].addEventListener('click', aparecerCriarAlbum)
    document.getElementsByClassName('apagarAlbuns')[0].addEventListener('click', aparecerSelecionarAlbuns)
    document.getElementsByClassName('apagarFotos')[0].addEventListener('click', aparecerSelecionarFotos)
    document.getElementsByClassName('finalizarMudarNome')[0].addEventListener('click', mudarNomeAlbum)

    // Por defeito, so mostrar "Selecionar Fotos" quando estamos dentro de um album
    const btnSelecionarFotos = document.getElementsByClassName('apagarFotos')[0]
    if (btnSelecionarFotos) {
        btnSelecionarFotos.style.visibility = 'hidden'
        btnSelecionarFotos.style.display = 'none'
    }

    // Listeners para fechar o pop up de mudar nome do álbum
    document.getElementsByClassName('popUpMudarNomeFundo')[0].addEventListener('click', desaparecerMudarNomeAlbum)
    document.getElementsByClassName('fecharPopUpMudarNome')[0].addEventListener('click', desaparecerMudarNomeAlbum)
}

function reloadPage() {
    location.reload()
}

window.addEventListener('load', onload)