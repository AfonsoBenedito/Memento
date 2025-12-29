// FecharColuna()
// AbrirColuna()
// colunaSetter()

// terminarSessao()

// EventHandler()

// onload()




// Migration fix for legacy paths across the site
try {
    if (sessionStorage.CurrentUser && sessionStorage.CurrentUser !== 'None') {
        let user = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser));
        if (user && user.profilePicture && user.profilePicture.startsWith('Imagens/')) {
            user.profilePicture = user.profilePicture.replace('Imagens/', 'assets/img/');
            localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(user));
        }
    }
} catch (e) { console.error("Migration error:", e); }

//************************************************************************** *//

var numeroFoto = 0
var numMaximo = 0
var anteriorSource = "nenhum"
var proximoSource = "nenhum"
var verTop = false

function FecharColuna(animate = true) {
    let col = document.getElementsByClassName('colunaOpcoes')[0];
    let colMini = document.getElementsByClassName('colunaOpcoesReduzida')[0];
    let content = document.getElementsByClassName('planoAcao')[0];

    if (animate === false) {
        col.style.transition = 'none';
        colMini.style.transition = 'none';
        content.style.transition = 'none';
    }

    document.body.classList.add('sidebar-closed');
    document.body.classList.remove('sidebar-open');

    if (animate === false) {
        // Force reflow
        col.offsetHeight;
        // Restore transitions
        col.style.transition = '';
        colMini.style.transition = '';
        content.style.transition = '';
    }

    sessionStorage.setItem("estadoColuna", "Fechada")
}

function AbrirColuna(animate = true) {
    let col = document.getElementsByClassName('colunaOpcoes')[0];
    let colMini = document.getElementsByClassName('colunaOpcoesReduzida')[0];
    let content = document.getElementsByClassName('planoAcao')[0];

    if (animate === false) {
        col.style.transition = 'none';
        colMini.style.transition = 'none';
        content.style.transition = 'none';
    }

    document.body.classList.add('sidebar-open');
    document.body.classList.remove('sidebar-closed');

    if (animate === false) {
        // Force reflow
        col.offsetHeight;
        // Restore transitions
        col.style.transition = '';
        colMini.style.transition = '';
        content.style.transition = '';
    }

    sessionStorage.setItem("estadoColuna", "Aberta")
}

function colunaSetter() {
    if (sessionStorage.getItem('estadoColuna') == null) {
        sessionStorage.setItem('estadoColuna', "Fechada")
    }

    if (sessionStorage.getItem('estadoColuna') == "Aberta") {
        AbrirColuna(false)
    } else if (sessionStorage.getItem('estadoColuna') == "Fechada") {
        FecharColuna(false)
    }
}

//************************************************************************** *//

function terminarSessao() {
    sessionStorage.setItem('CurrentUser', 'None')
    sessionStorage.setItem('Logged', "False")
}

//************************************************************************** *//



function resetLixo() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    currentUser.lixo = []

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

}

//************************************************************************** *//
//************************************************************************** *//


function maisVisualizacaoFotografias(numero) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    currentUser.fotografias[numero].visualizacoes += 1

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

}

function maisVisualizacaoFotografiasAlbuns(numero) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)

    for (i = 0; i < currentUser.albuns.length; i++) {


        if (currentUser.albuns[i].nome == nomeAlbum) {
            currentUser.albuns[i].fotografias[numero].visualizacoes += 1
        }

    }

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
}


function abrirBaseFotografia(click) {

    if (click.srcElement.src == null) {
        source = click.srcElement.firstChild.src

        numero = click.srcElement.parentNode.innerText

    } else {
        source = click.srcElement.src

        numero = click.srcElement.parentNode.parentNode.innerText

    }


    if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Fotografias') {
        maisVisualizacaoFotografias(numero)

        encontrou = false

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.fotografias[numero].source) {
                encontrou = true
            }
        }

        if (encontrou == true) {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
        } else {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
        }

        document.getElementsByClassName('fotoAbertaFundoClick')[0].style.visibility = 'visible'
        document.getElementsByClassName('fotoAberta')[0].style.visibility = 'visible'

        abrirFotografia(source)
        atualizarSetas(numero, numMaximo)

    } else if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Álbuns') {
        maisVisualizacaoFotografiasAlbuns(numero)

        nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

        nomeAlbum = nomeAlbum.slice(8)

        indexAlbum = 0

        for (i = 0; i < currentUser.albuns.length; i++) {
            if (nomeAlbum == currentUser.albuns[i].nome) {
                indexAlbum = i

            }
        }

        encontrou = false

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.albuns[indexAlbum].fotografias[numero].source) {
                encontrou = true
            }
        }

        if (encontrou == true) {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
        } else {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
        }

        document.getElementsByClassName('fotoAbertaFundoClick')[0].style.visibility = 'visible'
        document.getElementsByClassName('fotoAberta')[0].style.visibility = 'visible'

        abrirFotografia(source)
        atualizarSetas(numero, numMaximo)

    } else if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Mais Vista') {


        //numeroTeste = click.srcElement.parentNode.parentNode.parentNode.innerText
        //console.log("bla")

        //console.log(numeroTeste)

        document.getElementsByClassName('fotoAbertaFundoClick')[0].style.visibility = 'visible'
        document.getElementsByClassName('fotoAberta')[0].style.visibility = 'visible'

        if (click.srcElement.parentNode.parentNode.className == 'imgMV') {

            numeroTeste = click.srcElement.parentNode.parentNode.parentNode.innerText

            numeroTop = numeroTeste.substring(0, numeroTeste.length - 2)

            //console.log("mmm")

            tops = JSON.parse(sessionStorage.getItem('top10'))

            //console.log(tops)

            indexFotografiaTop = -1

            for (k = 0; k < currentUser.fotografias.length; k++) {

                if (tops[parseInt(numeroTop) - 1][0] == currentUser.fotografias[k].source) {

                    indexFotografiaTop = k

                }
            }

            //console.log(indexFotografiaTop)

            encontrou = false

            if (indexFotografiaTop != -1) {
                for (i = 0; i < currentUser.curtidas.length; i++) {
                    if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaTop].source) {
                        encontrou = true
                    }
                }
            }

            if (encontrou == true) {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
            } else {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
            }





            verTop = true

            abrirFotografia(source)
            atualizarSetas(numeroTop, 10)

        } else {

            if (click.srcElement.src) {
                numeroTeste = click.srcElement.parentNode.parentNode.innerText
            } else {
                numeroTeste = click.srcElement.parentNode.innerText
            }


            verTop = false

            numero = parseInt(numeroTeste)

            //console.log(numero)


            encontrou = false

            for (i = 0; i < currentUser.fotografias.length; i++) {
                if (currentUser.curtidas[numero].source == currentUser.fotografias[i].source) {
                    indexFotografiaCurtidas = i
                }
            }

            for (i = 0; i < currentUser.curtidas.length; i++) {
                if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaCurtidas].source) {
                    encontrou = true
                }
            }

            if (encontrou == true) {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
            } else {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
            }



            abrirFotografia(source)
            atualizarSetas(numero, numMaximo)
        }


    }



}

function abrirFotografia(source) {

    document.getElementById('fotografiaAberta').src = source
}

function mudarFotografia(source, mudanca) {
    document.getElementById('fotografiaAberta').src = source

    novoNumero = parseInt(numeroFoto) + mudanca

    //console.log("novo" + novoNumero)


    if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Fotografias') {
        maisVisualizacaoFotografias(novoNumero)

        encontrou = false

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.fotografias[novoNumero].source) {
                encontrou = true
            }
        }

        if (encontrou == true) {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
        } else {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
        }


    } else if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Álbuns') {
        maisVisualizacaoFotografiasAlbuns(novoNumero)

        nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

        nomeAlbum = nomeAlbum.slice(8)

        indexAlbum = 0

        for (i = 0; i < currentUser.albuns.length; i++) {
            if (nomeAlbum == currentUser.albuns[i].nome) {
                indexAlbum = i

            }
        }

        encontrou = false

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.albuns[indexAlbum].fotografias[novoNumero].source) {
                encontrou = true
            }
        }

        if (encontrou == true) {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
        } else {
            document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
        }
    } else if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Mais Vista') {

        //console.log("bra")

        if (verTop == true) {

            indexFotografiaTop = -1

            for (k = 0; k < currentUser.fotografias.length; k++) {

                if (tops[parseInt(novoNumero) - 1][0] == currentUser.fotografias[k].source) {

                    indexFotografiaTop = k

                }
            }

            //console.log(indexFotografiaTop)

            encontrou = false

            if (indexFotografiaTop != -1) {
                for (i = 0; i < currentUser.curtidas.length; i++) {
                    if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaTop].source) {
                        encontrou = true
                    }
                }
            }

            if (encontrou == true) {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
            } else {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
            }


        } else {

            encontrou = false

            for (i = 0; i < currentUser.fotografias.length; i++) {
                if (currentUser.curtidas[novoNumero].source == currentUser.fotografias[i].source) {
                    indexFotografiaCurtidas = i
                }
            }

            for (i = 0; i < currentUser.curtidas.length; i++) {
                if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaCurtidas].source) {
                    encontrou = true
                }
            }

            if (encontrou == true) {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"
            } else {
                document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
            }
        }

    }

    removeEventSetas()
    atualizarSetas(novoNumero, numMaximo)



    fecharPopUps()
}

function adicionarCurtidas() {
    if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Fotografias') {
        adicionarCurtidasFotografias()
    } else if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Álbuns') {
        adicionarCurtidasAlbuns()
    } else if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Mais Vista') {
        if (verTop == true) {
            adicionarCurtidasMaisVistasTop()
        } else {
            adicionarCurtidasMaisVistasCurtidas()
        }
    }
}

function adicionarCurtidasFotografias() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    pertence = false
    //console.log(numeroFoto)

    for (i = 0; i < currentUser.curtidas.length; i++) {
        if (currentUser.curtidas[i].source == currentUser.fotografias[numeroFoto].source) {


            pertence = true
        }
    }

    if (pertence == false) {

        currentUser.curtidas = currentUser.curtidas.concat(currentUser.fotografias[numeroFoto])

        document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"

    } else {


        index = currentUser.curtidas.indexOf(currentUser.fotografias[numeroFoto])

        index = -1

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.fotografias[numeroFoto].source) {
                index = i
            }
        }

        currentUser.curtidas.splice(index, 1)

        document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
    }


    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
}

function adicionarCurtidasAlbuns() {

    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)

    indexAlbum = 0

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (nomeAlbum == currentUser.albuns[i].nome) {
            indexAlbum = i

        }
    }

    pertence = false

    for (i = 0; i < currentUser.curtidas.length; i++) {
        if (currentUser.curtidas[i].source == currentUser.albuns[indexAlbum].fotografias[numeroFoto].source) {

            pertence = true
        }
    }

    if (!pertence) {
        currentUser.curtidas = currentUser.curtidas.concat(currentUser.albuns[indexAlbum].fotografias[numeroFoto])

        document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"


    } else {

        index = -1

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.albuns[indexAlbum].fotografias[numeroFoto].source) {
                index = i
            }
        }

        currentUser.curtidas.splice(index, 1)

        document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
    }


    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

}

function adicionarCurtidasMaisVistasTop() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    pertence = false
    //console.log(numeroFoto)

    tops = JSON.parse(sessionStorage.getItem('top10'))

    indexFotografiaTop = -1

    for (k = 0; k < currentUser.fotografias.length; k++) {

        if (tops[parseInt(numeroFoto) - 1][0] == currentUser.fotografias[k].source) {

            indexFotografiaTop = k

        }
    }

    //console.log(indexFotografiaTop)

    for (i = 0; i < currentUser.curtidas.length; i++) {
        if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaTop].source) {


            pertence = true
        }
    }

    if (pertence == false) {

        currentUser.curtidas = currentUser.curtidas.concat(currentUser.fotografias[indexFotografiaTop])

        document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"

    } else {


        index = -1

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaTop].source) {
                index = i
            }
        }

        currentUser.curtidas.splice(index, 1)

        document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
    }


    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
}

function adicionarCurtidasMaisVistasCurtidas() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    pertence = false

    indexFotografiaCurtidas = -1

    for (i = 0; i < currentUser.fotografias.length; i++) {
        if (currentUser.curtidas[numeroFoto].source == currentUser.fotografias[i].source) {
            indexFotografiaCurtidas = i
        }
    }



    for (i = 0; i < currentUser.curtidas.length; i++) {
        if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaCurtidas].source) {


            pertence = true
        }
    }

    if (pertence == false) {

        currentUser.curtidas = currentUser.curtidas.concat(currentUser.fotografias[indexFotografiaCurtidas])

        document.getElementById('curtidasOnOff').src = "assets/img/curtidas.png"

    } else {


        index = currentUser.curtidas.indexOf(currentUser.fotografias[indexFotografiaCurtidas])

        index = -1

        for (i = 0; i < currentUser.curtidas.length; i++) {
            if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaCurtidas].source) {
                index = i
            }
        }

        currentUser.curtidas.splice(index, 1)

        document.getElementById('curtidasOnOff').src = "assets/img/curtidasOff.png"
    }


    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
}

function lixoIconHandlers() {
    if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Álbuns') {
        removerFotografiaAlbumIndividual()
    } else {
        apagarFotografiaDeFotografias()
    }
}

function abrirDetalhesFotografias() {

    //console.log("oioioi")
    if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Fotografias') {
        abrirDetalhesFotografiaFotos()
    } else if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Álbuns') {
        abrirDetalhesFotografiaAlbuns()
    }
}

function abrirDetalhesFotografiaFotos() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))




    document.getElementsByClassName('detalheData')[0].innerText = currentUser.fotografias[numeroFoto].data
    document.getElementsByClassName('detalheLocal')[0].innerText = currentUser.fotografias[numeroFoto].localizacao
    document.getElementsByClassName('detalhePessoa')[0].innerText = currentUser.fotografias[numeroFoto].pessoas
    document.getElementsByClassName('detalheVisualizacao')[0].innerText = currentUser.fotografias[numeroFoto].visualizacoes
}

function abrirDetalhesFotografiaAlbuns() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)

    indexAlbum = 0

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (nomeAlbum == currentUser.albuns[i].nome) {
            indexAlbum = i

        }
    }

    document.getElementsByClassName('detalheData')[0].innerText = " " + currentUser.albuns[indexAlbum].fotografias[numero].data
    document.getElementsByClassName('detalheLocal')[0].innerText = " " + currentUser.albuns[indexAlbum].fotografias[numero].localizacao
    document.getElementsByClassName('detalhePessoa')[0].innerText = " " + currentUser.albuns[indexAlbum].fotografias[numero].pessoas
    document.getElementsByClassName('detalheVisualizacao')[0].innerText = " " + currentUser.albuns[indexAlbum].fotografias[numero].visualizacoes
}
//************************************************************************** *//

function fecharFotografia() {

    document.getElementsByClassName('fotoAbertaFundoClick')[0].style.visibility = 'hidden'
    document.getElementsByClassName('fotoAberta')[0].style.visibility = 'hidden'

    removeEventSetas()
    fecharPopUps()

}

function fecharPopUps() {
    document.getElementById('partilharIcon').removeEventListener('click', fecharPopUps)
    document.getElementById('editarIcon').removeEventListener('click', fecharPopUps)
    document.getElementById('curtidasIcon').removeEventListener('click', fecharPopUps)
    document.getElementById('lixoIcon').removeEventListener('click', fecharPopUps)
    document.getElementById('detalhesIcon').removeEventListener('click', fecharPopUps)
    document.getElementsByClassName('zonaFotoAberta')[0].removeEventListener('click', fecharPopUps)

    document.getElementsByClassName('partilhaPopUp')[0].style.visibility = 'hidden'
    // document.getElementsByClassName('editarPopUp')[0].style.visibility = 'hidden'
    // document.getElementsByClassName('curtidasPopUp')[0].style.visibility = 'hidden'
    // document.getElementsByClassName('lixoPopUp')[0].style.visibility = 'hidden'  
    document.getElementsByClassName('detalhesPopUp')[0].style.visibility = 'hidden'

}

//************************************************************************** *//

function fotosEventHandler(numeroMaximo) {
    console.log(numeroMaximo)
    numMaximo = numeroMaximo
    for (i = 0; i < numeroMaximo; i++) {
        document.getElementsByClassName('img')[i].addEventListener('click', abrirBaseFotografia)
    }

    if (document.getElementsByClassName('paginaAtual')[0].innerText == 'Mais Vista') {
        for (k = 0; k < 10; k++) {
            console.log(document.getElementsByClassName('imgMV')[k].firstChild.firstChild)
            document.getElementsByClassName('imgMV')[k].addEventListener('click', abrirBaseFotografia)
        }

    }
    document.getElementsByClassName('fotoAbertaFundoClick')[0].addEventListener('click', fecharFotografia)
}

//************************************************************************** *//

function atualizarSetas(numero, numeroMaximo) {





    if (numeroMaximo > 1) {


        //console.log(numeroMaximo)
        //console.log(numero)
        if (verTop == true) {

            numeroFoto = parseInt(numero)

            if (parseInt(numero) > 1 && parseInt(numero) < 10) {
                anteriorSource = document.getElementsByClassName('imgMV')[parseInt(numero) - 2].firstChild.firstChild.src
                proximoSource = document.getElementsByClassName('imgMV')[parseInt(numero)].firstChild.firstChild.src


                document.getElementsByClassName('btnEsq')[0].addEventListener('click', clicarSetaTras)
                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)
            } else if (parseInt(numero) == 1) {
                proximoSource = document.getElementsByClassName('imgMV')[parseInt(numero)].firstChild.firstChild.src



                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)

            } else if (parseInt(numero) == 10) {
                anteriorSource = document.getElementsByClassName('imgMV')[parseInt(numero) - 2].firstChild.firstChild.src

                document.getElementsByClassName('btnEsq')[0].addEventListener('click', clicarSetaTras)
            }

            //console.log(proximoSource)
            //console.log(anteriorSource)


        } else {
            numeroFoto = numero

            numero = parseInt(numero) + 1

            //console.log(numero)

            if (parseInt(numero) > 1 && parseInt(numero) < numeroMaximo) {
                anteriorSource = document.getElementsByClassName('img')[parseInt(numero) - 2].firstChild.src
                proximoSource = document.getElementsByClassName('img')[parseInt(numero)].firstChild.src


                document.getElementsByClassName('btnEsq')[0].addEventListener('click', clicarSetaTras)
                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)

            } else if (parseInt(numero) == 1) {
                proximoSource = document.getElementsByClassName('img')[parseInt(numero)].firstChild.src


                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)

            } else if (parseInt(numero) == numeroMaximo) {
                anteriorSource = document.getElementsByClassName('img')[parseInt(numero) - 2].firstChild.src

                document.getElementsByClassName('btnEsq')[0].addEventListener('click', clicarSetaTras)
            }
        }


    }



}

function clicarSetaFrente() {
    mudarFotografia(proximoSource, 1)
}

function clicarSetaTras() {
    mudarFotografia(anteriorSource, -1)
}

function removeEventSetas() {
    document.getElementsByClassName('btnEsq')[0].removeEventListener('click', clicarSetaTras)
    document.getElementsByClassName('btnDir')[0].removeEventListener('click', clicarSetaFrente)
}

//************************************************************************** *//


function abrirPartilhadoComSucesso(click) {
    document.getElementsByClassName('partilhaFotosRedes')[0].style.visibility = 'visible'
    document.getElementsByClassName('partilhaFotosRedes')[0].style.opacity = '1'

    //console.log(click.srcElement.innerText)


    if (click.srcElement.src) {
        numeroRede = click.srcElement.parentNode.parentNode.innerText
    } else {
        numeroRede = click.srcElement.innerText
    }

    fecharPopUps()

    numeroRede = parseInt(numeroRede.slice(0, 1))


    switch (numeroRede) {
        case 0:
            document.getElementsByClassName('fundoIconPartilha')[0].src = "assets/img/wppFundo.png"
            rede = "Whatsapp"
            break
        case 1:
            document.getElementsByClassName('fundoIconPartilha')[0].src = "assets/img/facebookFundo.png"
            rede = "Facebook"
            break
        case 2:
            document.getElementsByClassName('fundoIconPartilha')[0].src = "assets/img/instagramFundo.png"
            rede = "Instagram"
            break
        case 3:
            document.getElementsByClassName('fundoIconPartilha')[0].src = "assets/img/twitterFundo.png"
            rede = "Twitter"
            break
        case 4:
            document.getElementsByClassName('fundoIconPartilha')[0].src = "assets/img/emailFundo.png"
            rede = "E-mail"
            break
    }

    document.getElementsByClassName('redeParaPartilha')[0].innerText = rede

    //timeout de 1s
    setTimeout(fecharPartilhadoComSucesso, 1500)

}

function fecharPartilhadoComSucesso() {
    document.getElementsByClassName('partilhaFotosRedes')[0].style.visibility = 'hidden'
    document.getElementsByClassName('partilhaFotosRedes')[0].style.opacity = '0'
}



function abrirPartilharFotografia() {
    document.getElementsByClassName('partilhaPopUp')[0].style.visibility = 'visible'
    for (i = 0; i < 5; i++) {
        document.getElementsByClassName('redeSocial')[i].addEventListener('click', abrirPartilhadoComSucesso)
    }
    removerPopUpsClick()
}

function abrirEditarFotografia() {
    document.getElementsByClassName('editarPopUp')[0].style.visibility = 'visible'
    removerPopUpsClick()
}

function abrirCurtidasFotografia() {
    document.getElementsByClassName('curtidasPopUp')[0].style.visibility = 'visible'
    removerPopUpsClick()
}

function abrirLixoFotografia() {
    document.getElementsByClassName('lixoPopUp')[0].style.visibility = 'visible'
    removerPopUpsClick()
}

function abrirDetalhesFotografia() {
    document.getElementsByClassName('detalhesPopUp')[0].style.visibility = 'visible'
    abrirDetalhesFotografias()
    removerPopUpsClick()
}

//************************************************************************** *//

function removerPopUpsClick() {
    document.getElementById('partilharIcon').addEventListener('click', fecharPopUps)
    document.getElementById('editarIcon').addEventListener('click', fecharPopUps)
    document.getElementById('curtidasIcon').addEventListener('click', fecharPopUps)
    document.getElementById('lixoIcon').addEventListener('click', fecharPopUps)
    document.getElementById('detalhesIcon').addEventListener('click', fecharPopUps)
    document.getElementsByClassName('zonaFotoAberta')[0].addEventListener('click', fecharPopUps)
}

function opcoesFotosHandlers() {
    document.getElementById('partilharIcon').addEventListener('click', abrirPartilharFotografia)
    // document.getElementById('editarIcon').addEventListener('click', abrirEditarFotografia)
    document.getElementById('curtidasIcon').addEventListener('click', adicionarCurtidas)
    document.getElementById('lixoIcon').addEventListener('click', lixoIconHandlers)
    document.getElementById('detalhesIcon').addEventListener('click', abrirDetalhesFotografia)

}

//************************************************************************** *//


function mostrarCheck(click) {


    if (click.srcElement.src) {
        posicao = click.srcElement.parentNode.innerText[0]
    } else if (click.srcElement.className != 'liUpload') {
        posicao = click.srcElement.parentNode.innerText[0]
    } else {
        posicao = click.srcElement.innerText[0]
    }



    document.getElementsByClassName('importCheck')[posicao].style.visibility = "visible";
    document.getElementsByClassName('liUpload')[posicao].style.backgroundColor = "#404042e3";

    for (i = 0; i < 6; i++) {
        if (i != posicao) {
            document.getElementsByClassName('importCheck')[i].style.visibility = "hidden";
            document.getElementsByClassName('liUpload')[i].style.backgroundColor = "rgba(255, 255, 255, 0)";
        }
    }

    document.getElementsByClassName('previewImportFotos')[0].style.visibility = "visible";
    document.getElementsByClassName('previewImportFotos')[0].style.visibility = "inherit";

    document.getElementsByClassName('importErrado')[0].style.visibility = 'hidden'



    document.getElementsByClassName('importImagens')[0].removeEventListener('click', primeiroBtnUpload)
    document.getElementsByClassName('selecionarTodas')[0].removeEventListener('click', primeiroBtnUpload)
    document.getElementsByClassName('desmarcarTodas')[0].removeEventListener('click', primeiroBtnUpload)

    document.getElementsByClassName('importImagens')[0].addEventListener('click', adicionarFotografiasImportar)
    document.getElementsByClassName('selecionarTodas')[0].addEventListener('click', selecionarTodasFotografiasImportar)
    document.getElementsByClassName('desmarcarTodas')[0].addEventListener('click', desselecionarTodasFotografiasImportar)


}

//function esconderCheck(){
//  document.getElementsByClassName('importCheck')[0].style.visibility = "hidden";
//document.getElementsByClassName('liUpload')[0].style.backgroundColor = "none";
//}


function abrirUpload() {

    fotografiasParaUpload()

    document.getElementsByClassName('Upload')[0].style.visibility = "visible";
    document.getElementsByClassName('FundoUpload')[0].style.visibility = "visible";


    document.getElementsByClassName('liUpload')[0].addEventListener('click', mostrarCheck)
    document.getElementsByClassName('liUpload')[1].addEventListener('click', mostrarCheck)
    document.getElementsByClassName('liUpload')[2].addEventListener('click', mostrarCheck)
    document.getElementsByClassName('liUpload')[3].addEventListener('click', mostrarCheck)
    document.getElementsByClassName('liUpload')[4].addEventListener('click', mostrarCheck)
    document.getElementsByClassName('liUpload')[5].addEventListener('click', mostrarCheck)
    //document.getElementsByClassName('liUpload')[0].addEventListener('click', esconderCheck)

    document.getElementsByClassName('importImagens')[0].addEventListener('click', primeiroBtnUpload)
    document.getElementsByClassName('selecionarTodas')[0].addEventListener('click', primeiroBtnUpload)
    document.getElementsByClassName('desmarcarTodas')[0].addEventListener('click', primeiroBtnUpload)

}

function fecharUpload() {
    location.reload()
}

function primeiroBtnUpload() {
    document.getElementsByClassName('importErrado')[0].style.visibility = 'visible'
}

//************************************************************************** *//

function EventHandler() {
    document.getElementById('CloseImg').addEventListener('click', FecharColuna)
    document.getElementById('OpenImg').addEventListener('click', AbrirColuna)
    document.getElementsByClassName('btnLogout')[0].addEventListener('click', terminarSessao)
    document.getElementsByClassName('off')[0].addEventListener('click', terminarSessao)

    document.getElementsByClassName('btnUpload')[0].addEventListener('click', abrirUpload)
    document.getElementsByClassName('FundoUpload')[0].addEventListener('click', fecharUpload)
}

//************************************************************************** *//





//************************************************************************** *//

function updateFotoPerfil() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    document.getElementsByClassName('imagemUtilizador')[0].src = currentUser.profilePicture
    document.getElementsByClassName('imagemUtilizador')[1].src = currentUser.profilePicture
}



function onload() {
    updateFotoPerfil()
    colunaSetter()
    EventHandler()
    document.getElementsByClassName('nomeUtilizador')[0].innerText = sessionStorage.CurrentUser
    document.getElementsByClassName('nomeUtilizador')[1].innerText = sessionStorage.CurrentUser



    //criarPossiveisFotografias()
}


window.addEventListener('load', onload)



//************************************************************************** *//

listaFotografiasImportar = []



function organizarFotografiasGeral(listaParaOrganizar, tipoOrganizacao) {
    //currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    valueSortOption = tipoOrganizacao

    listaOriginal = listaParaOrganizar

    if (valueSortOption == 'Data') {
        listaOriginal.sort(function (a, b) {

            if (a.data == 'Desconhecida') {
                return 1
            } else if (b.data == 'Desconhecida') {
                return -1
            }

            if (parseInt(a.data.slice(6, 10)) > parseInt(b.data.slice(6, 10))) {
                return -1
            } else if (parseInt(a.data.slice(6, 10)) == parseInt(b.data.slice(6, 10))) {
                if (parseInt(a.data.slice(3, 5)) > parseInt(b.data.slice(3, 5))) {
                    return -1
                } else if (parseInt(a.data.slice(3, 5)) == parseInt(b.data.slice(3, 5))) {
                    if (parseInt(a.data.slice(0, 2)) > parseInt(b.data.slice(0, 2))) {
                        return -1
                    } else if (parseInt(a.data.slice(0, 2)) == parseInt(b.data.slice(0, 2))) {
                        return 0
                    } else {
                        return 1
                    }
                } else {
                    return 1
                }
            } else {
                return 1
            }
        })
    } else if (valueSortOption == 'Localidade') {
        listaOriginal.sort(function (a, b) {
            if (a.localizacao == 'Desconhecido') {
                return 1
            } else if (b.localizacao == 'Desconhecido') {
                return -1
            }

            if (a.localizacao > b.localizacao) {
                return 1
            } else if (a.localizacao == b.localizacao) {
                return 0
            } else {
                return -1
            }
        })

    } else if (valueSortOption == 'Pessoas') {
        listaOriginal.sort(function (a, b) {

            if (a.pessoas == 'Sem pessoas') {
                return 1
            } else if (b.pessoas == 'Sem pessoas') {
                return -1
            }

            if (a.pessoas > b.pessoas) {
                return 1
            } else if (a.pessoas == b.pessoas) {
                return 0
            } else {
                return -1
            }
        })
    }

    //localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
    return listaOriginal


}


function removerFotografiaAlbumIndividual() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    nomeAlbum = document.getElementsByClassName('tituloMomento')[0].innerText

    nomeAlbum = nomeAlbum.slice(8)

    indexAlbum = 0

    for (i = 0; i < currentUser.albuns.length; i++) {
        if (nomeAlbum == currentUser.albuns[i].nome) {
            indexAlbum = i
        }
    }

    currentUser.albuns[indexAlbum].fotografias.splice(numeroFoto, 1)

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    fecharFotografia()
    desaparerReaparecerFotografiasAlbum()
}

function apagarFotografiaDeFotografias() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    // console.log(currentUser.fotografias[numeroFoto])

    apagarFotografia(currentUser.fotografias[numeroFoto])

    location.reload()
}

function fotografiasParaUpload() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    possiveisFotografias = currentUser.fotografiasImportar


    for (i = 0; i < possiveisFotografias.length; i++) {
        novoLi = document.createElement('li')
        novoDiv = document.createElement('div')
        novoImg = document.createElement('img')

        novoLi.innerText = i

        novoImg.src = possiveisFotografias[i].source

        novoDiv.appendChild(novoImg)

        novoLi.appendChild(novoDiv)

        novoLi.addEventListener('click', selecionarFotografiasImportar)

        document.getElementsByClassName('previewImportFotos')[0].appendChild(novoLi)
    }
}

function selecionarFotografiasImportar(click) {
    fotografia = click.srcElement

    if (fotografia.src) {
        fotografia = click.srcElement
    } else {
        fotografia = click.srcElement.firstChild
    }

    numFotografia = fotografia.parentNode.parentNode.innerText

    if (listaFotografiasImportar.includes(numFotografia)) {
        index = fotografia.parentNode.parentNode.innerText
        listaFotografiasImportar.splice(index, 1)
        fotografia.parentNode.style.border = 'none'
        fotografia.style.opacity = '1'
    } else {
        listaFotografiasImportar = listaFotografiasImportar.concat(numFotografia)
        fotografia.parentNode.style.border = '4px solid teal'
        fotografia.style.opacity = '0.8'
    }


}

function selecionarTodasFotografiasImportar() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    listaFotografiasImportar = []

    for (i = 0; i < currentUser.fotografiasImportar.length; i++) {
        listaFotografiasImportar = listaFotografiasImportar.concat(JSON.stringify(i))


    }
    // console.log(listaFotografiasImportar)

    for (j = 1; j < document.getElementsByClassName('previewImportFotos')[0].childNodes.length; j++) {

        document.getElementsByClassName('previewImportFotos')[0].childNodes[j].childNodes[1].style.border = '4px solid teal'
        document.getElementsByClassName('previewImportFotos')[0].childNodes[j].childNodes[1].style.opacity = '0.8'
    }
}

function desselecionarTodasFotografiasImportar() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    listaFotografiasImportar = []

    for (j = 1; j < document.getElementsByClassName('previewImportFotos')[0].childNodes.length; j++) {
        document.getElementsByClassName('previewImportFotos')[0].childNodes[j].childNodes[1].style.border = 'none'
        document.getElementsByClassName('previewImportFotos')[0].childNodes[j].childNodes[1].style.opacity = '1'
    }

}


function adicionarFotografiasImportar() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))


    if (listaFotografiasImportar.length > 0) {
        possiveisFotografias = currentUser.fotografiasImportar

        proximaListaFotografiasImportar = []

        for (i = 0; i < possiveisFotografias.length; i++) {
            if (listaFotografiasImportar.includes(JSON.stringify(i))) {
                currentUser.fotografias = currentUser.fotografias.concat(possiveisFotografias[i])
            } else {
                proximaListaFotografiasImportar = proximaListaFotografiasImportar.concat(possiveisFotografias[i])
            }
        }

        currentUser.fotografias = organizarFotografiasGeral(currentUser.fotografias, currentUser.organizacaoFotografias)

        possiveisFotografias = proximaListaFotografiasImportar
        listaFotografiasImportar = []

        currentUser.fotografiasImportar = proximaListaFotografiasImportar



        //localStorage.setItem('fotografiasImportar', JSON.stringify(proximaListaFotografiasImportar))
        localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

        location.reload()
    } else {
        document.getElementsByClassName('importErrado2')[0].style.visibility = 'visible'
    }


}



//************************************************************************** *//

function barraDeBusca() {
    valorPesquisado = document.getElementsByClassName('zonaPesquisa')[0].value

    if (valorPesquisado.length > 0) {
        sessionStorage.setItem('busca', valorPesquisado)
        location.href = "Busca.html"
    } else {
        console.log("barra vazia")
    }

}