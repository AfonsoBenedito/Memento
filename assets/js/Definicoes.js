// MudarPassword()
// MudarEmail()
// MudarUtilizador()



//************************************************************************** *//

function MudarPassword() {
    atual = document.getElementById('mudPassFirst').value
    nova1 = document.getElementById('mudPassSecond').value
    nova2 = document.getElementById('mudPassThird').value

    currentUser = sessionStorage.CurrentUser

    user = JSON.parse(localStorage.getItem(currentUser))

    if (user.password == atual) {
        if (nova1 == nova2) {

            user.password = nova1

            localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(user))

            alert('Password alterada com sucesso!')

        } else {
            alert('Password não coincidem!')
        }
    } else {
        alert('Password incorreta')
    }
}

function MudarEmail() {
    emailNovo = document.getElementById('mudEmailNovo').value
    password = document.getElementById('mudEmailPass').value

    currentUser = sessionStorage.CurrentUser

    user = JSON.parse(localStorage.getItem(currentUser))

    if (user.password == password) {

        user.email = emailNovo

        localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(user))

        alert('Email alterado com sucesso')
    } else {
        alert('Password incorreta')
    }
}

function MudarUtilizador() {
    novoUtil = document.getElementById('mudUtiNovo').value
    password = document.getElementById('mudUtiPass').value

    currentUser = sessionStorage.CurrentUser

    user = JSON.parse(localStorage.getItem(currentUser))

    if (user.password == password) {

        localStorage.removeItem(user.userName)

        user.userName = novoUtil

        sessionStorage.setItem("CurrentUser", novoUtil)

        localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(user))



        alert('Nome de Utilizador alterado com sucesso')
    } else {
        alert('Password incorreta')
    }
}

function aparecerMudarFoto() {
    const overlay = document.getElementsByClassName('fundoAlterarFotoPerfil')[0]
    const modal = document.getElementsByClassName('alterarFotoPerfil')[0]

    // fechar ao clicar fora do modal
    overlay.onclick = desaparecerMudarFoto
    modal.onclick = function (e) { e.stopPropagation() }

    // botão de fechar
    const closeBtn = document.getElementsByClassName('afpClose')[0]
    if (closeBtn) closeBtn.onclick = desaparecerMudarFoto

    // tabs
    document.getElementsByClassName('fotosPredefinidas')[0].onclick = aparecerFotosPredefinidas
    document.getElementsByClassName('fotosSuasFotos')[0].onclick = aparecerFotosSuasFotos

    // abrir (novo) + fallback (legado)
    overlay.classList.add('is-open')
    overlay.setAttribute('aria-hidden', 'false')
    overlay.style.visibility = 'visible'
    modal.style.visibility = 'visible'

    // ESC fecha
    document.addEventListener('keydown', fecharAoEsc)

    if (closeBtn && typeof closeBtn.focus === 'function') closeBtn.focus()
    aparecerFotosPredefinidas()
}

function desaparecerMudarFoto() {
    const overlay = document.getElementsByClassName('fundoAlterarFotoPerfil')[0]
    const modal = document.getElementsByClassName('alterarFotoPerfil')[0]

    overlay.classList.remove('is-open')
    overlay.setAttribute('aria-hidden', 'true')

    // fallback (legado)
    overlay.style.visibility = 'hidden'
    modal.style.visibility = 'hidden'

    document.removeEventListener('keydown', fecharAoEsc)

}

function aparecerFotosPredefinidas() {
    const tabPred = document.getElementsByClassName('fotosPredefinidas')[0]
    const tabSuas = document.getElementsByClassName('fotosSuasFotos')[0]
    const panelPred = document.getElementsByClassName('fotosPredefinidasDrop')[0]
    const panelSuas = document.getElementsByClassName('fotosSuasFotosDrop')[0]

    tabPred.classList.add('is-active')
    tabSuas.classList.remove('is-active')
    tabPred.setAttribute('aria-selected', 'true')
    tabSuas.setAttribute('aria-selected', 'false')

    panelPred.classList.add('is-active')
    panelSuas.classList.remove('is-active')

    // fallback (legado)
    panelPred.style.visibility = 'inherit'
    panelSuas.style.visibility = 'hidden'

    //<li>1<div class="fotosPredPlace"><img src="#"></div></li>


}

function aparecerFotosSuasFotos() {
    const tabPred = document.getElementsByClassName('fotosPredefinidas')[0]
    const tabSuas = document.getElementsByClassName('fotosSuasFotos')[0]
    const panelPred = document.getElementsByClassName('fotosPredefinidasDrop')[0]
    const panelSuas = document.getElementsByClassName('fotosSuasFotosDrop')[0]

    tabPred.classList.remove('is-active')
    tabSuas.classList.add('is-active')
    tabPred.setAttribute('aria-selected', 'false')
    tabSuas.setAttribute('aria-selected', 'true')

    panelPred.classList.remove('is-active')
    panelSuas.classList.add('is-active')

    // fallback (legado)
    panelPred.style.visibility = 'hidden'
    panelSuas.style.visibility = 'inherit'

}

function listagemFotosPredefinidas() {
    for (i = 0; i < 10; i++) {
        novoLi = document.createElement('li')
        novoDiv = document.createElement('div')
        novoImg = document.createElement('img')

        novoDiv.setAttribute('class', "fotosPredPlace")
        novoImg.setAttribute('src', 'assets/img/fotoCabeca/fotoCabeca' + i + '.png')
        novoLi.dataset.index = String(i)

        novoDiv.appendChild(novoImg)
        novoLi.appendChild(novoDiv)

        novoLi.addEventListener('click', atualizarFotografiaPerfilPredefinidas)

        document.getElementsByClassName('zonaFotosPred')[0].appendChild(novoLi)


    }
}

function listagemFotosSuas() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    for (i = 0; i < currentUser.fotografias.length; i++) {

        novoLi = document.createElement('li')
        novoDiv = document.createElement('div')
        novoImg = document.createElement('img')

        novoDiv.setAttribute('class', "fotosSuasPlace")
        novoImg.setAttribute('src', currentUser.fotografias[i].source)
        novoLi.dataset.index = String(i)

        novoDiv.appendChild(novoImg)
        novoLi.appendChild(novoDiv)

        novoLi.addEventListener('click', atualizarFotografiaPerfilSuas)

        document.getElementsByClassName('zonaFotosSuas')[0].appendChild(novoLi)
    }
}

function updateFotoPerfilDefs() {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    document.getElementById('fotoPerfilDef').src = currentUser.profilePicture
}

function atualizarFotografiaPerfilPredefinidas(click) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    const li = click.currentTarget
    numero = (li && li.dataset && li.dataset.index) ? li.dataset.index : li.innerText

    currentUser.profilePicture = 'assets/img/fotoCabeca/fotoCabeca' + numero + '.png'

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()
}

function atualizarFotografiaPerfilSuas(click) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))

    const li = click.currentTarget
    numero = (li && li.dataset && li.dataset.index) ? li.dataset.index : li.innerText

    currentUser.profilePicture = currentUser.fotografias[numero].source

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()

}

function onload() {
    // Migration fix for legacy paths in localStorage
    try {
        if (sessionStorage.CurrentUser && sessionStorage.CurrentUser !== 'None') {
            let user = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser));
            if (user && user.profilePicture && user.profilePicture.startsWith('Imagens/')) {
                user.profilePicture = user.profilePicture.replace('Imagens/', 'assets/img/');
                localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(user));
            }
        }
    } catch (e) { console.error("Migration error:", e); }

    listagemFotosSuas()
    listagemFotosPredefinidas()
    updateFotoPerfilDefs()
    document.getElementById('btnAlterarPerfil').addEventListener('click', aparecerMudarFoto)
}



window.addEventListener('load', onload)

function fecharAoEsc(e) {
    if (e && (e.key === 'Escape' || e.key === 'Esc')) {
        desaparecerMudarFoto()
    }
}