// FecharColuna()
// AbrirColuna()
// colunaSetter()

// terminarSessao()

// EventHandler()

// onload()




//************************************************************************** *//
// Guard de sessão (protege todas as páginas que carregam SiteBase.js)
// - Se não houver sessão iniciada, redireciona para index.html
// - Também valida se o utilizador existe no localStorage (evita crashes)
;(function sessionGuard() {
    try {
        // Inicializar estado base da sessão (mantém compatibilidade com o resto do código)
        if (sessionStorage.getItem('Logged') == null) sessionStorage.setItem('Logged', 'False')
        if (sessionStorage.getItem('CurrentUser') == null) sessionStorage.setItem('CurrentUser', 'None')

        const logged = sessionStorage.getItem('Logged') === 'True'
        const currentUser = sessionStorage.getItem('CurrentUser')

        // Sem sessão iniciada -> voltar ao login
        if (!logged || !currentUser || currentUser === 'None') {
            window.location.replace('index.html')
            return
        }

        // Sessão "True" mas sem utilizador persistido -> reset e voltar ao login
        const userRaw = localStorage.getItem(currentUser)
        if (!userRaw) {
            sessionStorage.setItem('Logged', 'False')
            sessionStorage.setItem('CurrentUser', 'None')
            window.location.replace('index.html')
            return
        }
    } catch (_) {
        try { window.location.replace('index.html') } catch (__) { }
    }
})()

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

// Evitar “ghost image drag” (arrastar imagens cria uma cópia/fantasma no cursor)
// Nota: isto NÃO impede selecionar/clicar; apenas bloqueia o drag nativo de <img>.
document.addEventListener('dragstart', function (e) {
    try {
        const t = e && e.target
        if (t && t.tagName === 'IMG') {
            e.preventDefault()
        }
    } catch (_) { }
}, true)

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
    let source, numero;
    let paginaAtual = document.getElementsByClassName('paginaAtual')[0].textContent.trim();
    let target = click.target || click.srcElement;

    // Garantir que temos o utilizador carregado (é usado em vários ramos abaixo)
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    // Tentar encontrar a imagem e o contentor LI de forma robusta
    let li = target.closest('li');
    let imgContainer = target.closest('.img') || target.closest('.imgMV');
    let img = (target.tagName === 'IMG') ? target : (li ? li.querySelector('img') : null);
    
    if (img) {
        source = img.src;
    }

    if (li) {
        numero = li.textContent.trim();
    }

    // Converter para número para garantir que a indexação no array funcione
    numero = parseInt(numero);

    // LIXO: abrir popup apenas com base no src clicado (não depender de índice)
    if (paginaAtual === 'Lixo') {
        // Só abrir para fotografias (no lixo também existem álbuns com capa)
        if (!target.closest('.img')) return
        if (!source) return

        const fundo = document.getElementsByClassName('fotoAbertaFundoClick')[0]
        const modal = document.getElementsByClassName('fotoAberta')[0]
        if (fundo) fundo.style.visibility = 'visible'
        if (modal) modal.style.visibility = 'visible'

        abrirFotografia(source)
        return
    }

    // Fallback: alguns <li> podem não ter texto utilizável; usar data-foto-index definido no handler
    if (Number.isNaN(numero) && imgContainer && imgContainer.dataset && typeof imgContainer.dataset.fotoIndex !== 'undefined') {
        numero = parseInt(imgContainer.dataset.fotoIndex)
    }

    // Se ainda não conseguimos obter um índice, abortar com segurança
    if (Number.isNaN(numero)) {
        console.warn('abrirBaseFotografia: índice inválido', { paginaAtual, target })
        return
    }

    if (paginaAtual === 'Fotografias') {
        maisVisualizacaoFotografias(numero)

        let encontrou = false
        currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

        for (let i = 0; i < currentUser.curtidas.length; i++) {
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

    } else if (paginaAtual === 'Álbuns') {
        maisVisualizacaoFotografiasAlbuns(numero)

        // Preferir o nome real guardado no dataset (evita problemas com CSS text-transform / uppercase)
        const tituloElem = document.getElementsByClassName('tituloMomento')[0]
        nomeAlbum = (tituloElem && tituloElem.dataset && tituloElem.dataset.nomeReal)
            ? tituloElem.dataset.nomeReal
            : (tituloElem ? tituloElem.innerText.slice(8) : '')

        indexAlbum = 0

        for (i = 0; i < currentUser.albuns.length; i++) {
            if (nomeAlbum && currentUser.albuns[i].nome && nomeAlbum.toLowerCase() == currentUser.albuns[i].nome.toLowerCase()) {
                indexAlbum = i

            }
        }

        // Validar bounds antes de aceder à fotografia
        if (!currentUser.albuns[indexAlbum] || !currentUser.albuns[indexAlbum].fotografias || !currentUser.albuns[indexAlbum].fotografias[numero]) {
            console.warn('abrirBaseFotografia: fotografia não encontrada no álbum', { indexAlbum, numero, nomeAlbum })
            return
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

    } else if (paginaAtual === 'Mais Vista') {

        document.getElementsByClassName('fotoAbertaFundoClick')[0].style.visibility = 'visible'
        document.getElementsByClassName('fotoAberta')[0].style.visibility = 'visible'

        let imgMVContainer = target.closest('.imgMV');

        if (imgMVContainer) {
            // É uma foto do Top 10
            // numero já foi extraído do LI (ex: "1mv" -> 1)
            let numeroTop = numero; 

            tops = JSON.parse(sessionStorage.getItem('top10'))

            indexFotografiaTop = -1

            for (k = 0; k < currentUser.fotografias.length; k++) {
                if (tops[numeroTop - 1] && tops[numeroTop - 1][0] == currentUser.fotografias[k].source) {
                    indexFotografiaTop = k
                }
            }

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
            // É uma foto das Curtidas
            verTop = false

            encontrou = false

            for (i = 0; i < currentUser.fotografias.length; i++) {
                if (currentUser.curtidas[numero] && currentUser.curtidas[numero].source == currentUser.fotografias[i].source) {
                    indexFotografiaCurtidas = i
                }
            }

            if (typeof indexFotografiaCurtidas !== 'undefined') {
                for (i = 0; i < currentUser.curtidas.length; i++) {
                    if (currentUser.curtidas[i].source == currentUser.fotografias[indexFotografiaCurtidas].source) {
                        encontrou = true
                    }
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

    let paginaAtual = document.getElementsByClassName('paginaAtual')[0].textContent.trim();

    if (paginaAtual === 'Fotografias') {
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


    } else if (paginaAtual === 'Álbuns') {
        maisVisualizacaoFotografiasAlbuns(novoNumero)

        nomeAlbum = document.getElementsByClassName('tituloMomento')[0].textContent.trim()

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
    } else if (paginaAtual === 'Mais Vista') {

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
    let paginaAtual = document.getElementsByClassName('paginaAtual')[0].textContent.trim();
    if (paginaAtual === 'Fotografias') {
        adicionarCurtidasFotografias()
    } else if (paginaAtual === 'Álbuns') {
        adicionarCurtidasAlbuns()
    } else if (paginaAtual === 'Mais Vista') {
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
    let paginaAtual = document.getElementsByClassName('paginaAtual')[0].textContent.trim();
    if (paginaAtual === 'Álbuns') {
        removerFotografiaAlbumIndividual()
    } else {
        apagarFotografiaDeFotografias()
    }
}

function abrirDetalhesFotografias() {

    //console.log("oioioi")
    let paginaAtual = document.getElementsByClassName('paginaAtual')[0].textContent.trim();
    if (paginaAtual === 'Fotografias') {
        abrirDetalhesFotografiaFotos()
    } else if (paginaAtual === 'Álbuns') {
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
    numMaximo = numeroMaximo

    // Na página "Mais Vista" o DOM é mais dinâmico; usar delegação para garantir
    // que os cliques nas fotos (Top10 e Curtidas) abrem sempre.
    const paginaAtual = document.getElementsByClassName('paginaAtual')[0]?.textContent?.trim()
    if (paginaAtual === 'Mais Vista') {
        if (!window.__maisVistaDelegationBound) {
            const container = document.getElementsByClassName('maisVistaPag')[0]
            if (container) {
                container.addEventListener('click', (e) => {
                    const t = e.target
                    if (t && (t.closest('.img') || t.closest('.imgMV'))) {
                        abrirBaseFotografia(e)
                    }
                })
                window.__maisVistaDelegationBound = true
            }
        }

        const fundo = document.getElementsByClassName('fotoAbertaFundoClick')[0]
        if (fundo) {
            fundo.removeEventListener('click', fecharFotografia)
            fundo.addEventListener('click', fecharFotografia)
        }
        return
    }

    // Ligar eventos às fotos que *existem* no DOM (evita erros quando numeroMaximo
    // não coincide com o número real de elementos .img).
    const imgs = document.getElementsByClassName('img')
    for (let i = 0; i < imgs.length; i++) {
        // Guardar o índice de forma robusta baseado no <li> (evita conflitos quando existem
        // outros elementos .img fora da grelha principal).
        const li = imgs[i].closest('li')
        const idx = li ? parseInt(li.textContent.trim()) : NaN
        if (!Number.isNaN(idx)) imgs[i].dataset.fotoIndex = String(idx)
        imgs[i].removeEventListener('click', abrirBaseFotografia)
        imgs[i].addEventListener('click', abrirBaseFotografia)
    }

    const fundo = document.getElementsByClassName('fotoAbertaFundoClick')[0]
    if (fundo) {
        fundo.removeEventListener('click', fecharFotografia)
        fundo.addEventListener('click', fecharFotografia)
    }
}

//************************************************************************** *//

function atualizarSetas(numero, numeroMaximo) {





    if (numeroMaximo > 1) {


        //console.log(numeroMaximo)
        //console.log(numero)
        if (verTop == true) {

            numeroFoto = parseInt(numero)

            if (parseInt(numero) > 1 && parseInt(numero) < 10) {
                anteriorSource = document.getElementsByClassName('imgMV')[parseInt(numero) - 2].querySelector('img').src
                proximoSource = document.getElementsByClassName('imgMV')[parseInt(numero)].querySelector('img').src


                document.getElementsByClassName('btnEsq')[0].addEventListener('click', clicarSetaTras)
                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)
            } else if (parseInt(numero) == 1) {
                proximoSource = document.getElementsByClassName('imgMV')[parseInt(numero)].querySelector('img').src



                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)

            } else if (parseInt(numero) == 10) {
                anteriorSource = document.getElementsByClassName('imgMV')[parseInt(numero) - 2].querySelector('img').src

                document.getElementsByClassName('btnEsq')[0].addEventListener('click', clicarSetaTras)
            }

            //console.log(proximoSource)
            //console.log(anteriorSource)


        } else {
            numeroFoto = numero

            numero = parseInt(numero) + 1

            //console.log(numero)

            if (parseInt(numero) > 1 && parseInt(numero) < numeroMaximo) {
                anteriorSource = document.getElementsByClassName('img')[parseInt(numero) - 2].querySelector('img').src
                proximoSource = document.getElementsByClassName('img')[parseInt(numero)].querySelector('img').src


                document.getElementsByClassName('btnEsq')[0].addEventListener('click', clicarSetaTras)
                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)

            } else if (parseInt(numero) == 1) {
                proximoSource = document.getElementsByClassName('img')[parseInt(numero)].querySelector('img').src


                document.getElementsByClassName('btnDir')[0].addEventListener('click', clicarSetaFrente)

            } else if (parseInt(numero) == numeroMaximo) {
                anteriorSource = document.getElementsByClassName('img')[parseInt(numero) - 2].querySelector('img').src

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


function mostrarCheck(posicao) {


    document.getElementsByClassName('importCheck')[posicao].style.visibility = "visible";
    document.getElementsByClassName('liUpload')[posicao].style.backgroundColor = "rgba(0, 128, 128, 0.2)";
    document.getElementsByClassName('liUpload')[posicao].style.borderColor = "rgba(0, 128, 128, 0.4)";

    for (i = 0; i < 6; i++) {
        if (i != posicao) {
            document.getElementsByClassName('importCheck')[i].style.visibility = "hidden";
            document.getElementsByClassName('liUpload')[i].style.backgroundColor = "rgba(255, 255, 255, 0)";
        }
    }

    document.getElementsByClassName('previewImportFotos')[0].style.visibility = "visible";
    document.getElementsByClassName('previewImportFotosGeral')[0].style.visibility = "visible";
    document.getElementsByClassName('previewImportFotosGeral')[0].style.opacity = "1";

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


    document.getElementsByClassName('liUpload')[0].onclick = function () { mostrarCheck(0) }
    document.getElementsByClassName('liUpload')[1].onclick = function () { mostrarCheck(1) }
    document.getElementsByClassName('liUpload')[2].onclick = function () { mostrarCheck(2) }
    document.getElementsByClassName('liUpload')[3].onclick = function () { mostrarCheck(3) }
    document.getElementsByClassName('liUpload')[4].onclick = function () { mostrarCheck(4) }
    document.getElementsByClassName('liUpload')[5].onclick = function () { mostrarCheck(5) }
    //document.getElementsByClassName('liUpload')[0].addEventListener('click', esconderCheck)

    document.getElementsByClassName('importImagens')[0].onclick = primeiroBtnUpload
    document.getElementsByClassName('selecionarTodas')[0].onclick = primeiroBtnUpload
    document.getElementsByClassName('desmarcarTodas')[0].onclick = primeiroBtnUpload

    // UX: ao abrir, escolher uma fonte por defeito (se houver fotos para importar)
    if (currentUser && Array.isArray(currentUser.fotografiasImportar) && currentUser.fotografiasImportar.length > 0) {
        mostrarCheck(0)
    }

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
    document.getElementsByClassName('fecharUpload')[0].addEventListener('click', fecharUpload)
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

    // Limpar preview anterior (evita acumular elementos / estados estranhos)
    const preview = document.getElementsByClassName('previewImportFotos')[0]
    while (preview && preview.firstChild) preview.removeChild(preview.lastChild)

    // Garantir compatibilidade com utilizadores antigos / estados vazios
    if (!currentUser.fotografiasImportar || !Array.isArray(currentUser.fotografiasImportar)) {
        currentUser.fotografiasImportar = []
        localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))
    }

    possiveisFotografias = currentUser.fotografiasImportar

    // Se nao houver fotos disponiveis, mostrar mensagem clara
    if (!possiveisFotografias || possiveisFotografias.length === 0) {
        document.getElementsByClassName('previewImportFotos')[0].style.visibility = "hidden";
        document.getElementsByClassName('previewImportFotosGeral')[0].style.visibility = "visible";
        document.getElementsByClassName('previewImportFotosGeral')[0].style.opacity = "1";
        document.getElementsByClassName('importErrado')[0].style.visibility = 'hidden'
        document.getElementsByClassName('importErrado2')[0].innerText = 'Não existem fotografias disponíveis para importar.'
        document.getElementsByClassName('importErrado2')[0].style.visibility = 'visible'
        return
    } else {
        document.getElementsByClassName('importErrado2')[0].style.visibility = 'hidden'
    }


    for (i = 0; i < possiveisFotografias.length; i++) {
        novoLi = document.createElement('li')
        novoDiv = document.createElement('div')
        novoImg = document.createElement('img')

        novoImg.src = possiveisFotografias[i].source

        novoDiv.appendChild(novoImg)

        novoLi.appendChild(novoDiv)

        novoLi.addEventListener('click', selecionarFotografiasImportar)

        document.getElementsByClassName('previewImportFotos')[0].appendChild(novoLi)
    }
}

function selecionarFotografiasImportar(click) {
    let li = click.target.closest('li')
    if (!li) return

    let allLis = Array.from(li.parentNode.children)
    let numFotografia = allLis.indexOf(li)

    if (listaFotografiasImportar.includes(numFotografia)) {
        listaFotografiasImportar = listaFotografiasImportar.filter(item => item !== numFotografia);
        li.classList.remove('photo-selected')
    } else {
        listaFotografiasImportar.push(numFotografia);
        li.classList.add('photo-selected')
    }
}

function selecionarTodasFotografiasImportar() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    listaFotografiasImportar = []

    let previewZona = document.getElementsByClassName('previewImportFotos')[0];
    let items = previewZona.children;

    for (let i = 0; i < currentUser.fotografiasImportar.length; i++) {
        listaFotografiasImportar.push(i);
        
        if (items[i]) {
            items[i].classList.add('photo-selected')
        }
    }
}

function desselecionarTodasFotografiasImportar() {
    listaFotografiasImportar = []

    let previewZona = document.getElementsByClassName('previewImportFotos')[0];
    let items = previewZona.children;

    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('photo-selected')
    }
}


function adicionarFotografiasImportar() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))


    if (listaFotografiasImportar.length > 0) {
        possiveisFotografias = currentUser.fotografiasImportar

        proximaListaFotografiasImportar = []

        for (i = 0; i < possiveisFotografias.length; i++) {
            if (listaFotografiasImportar.includes(i)) {
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