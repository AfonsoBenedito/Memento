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
    document.getElementsByClassName('fundoAlterarFotoPerfil')[0].addEventListener('click', desaparecerMudarFoto)

    document.getElementsByClassName('fotosPredefinidas')[0].addEventListener('click', aparecerFotosPredefinidas)
    document.getElementsByClassName('fotosSuasFotos')[0].addEventListener('click', aparecerFotosSuasFotos)

    document.getElementsByClassName('fundoAlterarFotoPerfil')[0].style.visibility = 'visible'
    document.getElementsByClassName('alterarFotoPerfil')[0].style.visibility = 'visible'

    aparecerFotosPredefinidas()
}

function desaparecerMudarFoto() {
    document.getElementsByClassName('fundoAlterarFotoPerfil')[0].style.visibility = 'hidden'
    document.getElementsByClassName('alterarFotoPerfil')[0].style.visibility = 'hidden'

}

function aparecerFotosPredefinidas() {
    document.getElementsByClassName('fotosPredefinidas')[0].style.backgroundColor = 'rgba(58, 58, 59, 0.75)'
    document.getElementsByClassName('fotosSuasFotos')[0].style.backgroundColor = 'rgba(58, 58, 59, 0)'

    document.getElementsByClassName('fotosPredefinidas')[0].style.color = 'teal'
    document.getElementsByClassName('fotosSuasFotos')[0].style.color = 'white'

    document.getElementsByClassName('fotosPredefinidas')[0].style.borderBottom = "1px solid rgba(255, 255, 255, 0.6)"
    document.getElementsByClassName('fotosSuasFotos')[0].style.borderBottom = "none"

    document.getElementsByClassName('fotosPredefinidasDrop')[0].style.visibility = 'visible'
    document.getElementsByClassName('fotosPredefinidasDrop')[0].style.visibility = 'inherit'
    document.getElementsByClassName('fotosSuasFotosDrop')[0].style.visibility = 'hidden'

    //<li>1<div class="fotosPredPlace"><img src="#"></div></li>


}

function aparecerFotosSuasFotos() {


    document.getElementsByClassName('fotosPredefinidas')[0].style.backgroundColor = 'rgba(58, 58, 59, 0)'
    document.getElementsByClassName('fotosSuasFotos')[0].style.backgroundColor = 'rgba(58, 58, 59, 0.75)'

    document.getElementsByClassName('fotosPredefinidas')[0].style.color = 'white'
    document.getElementsByClassName('fotosSuasFotos')[0].style.color = 'teal'

    document.getElementsByClassName('fotosPredefinidas')[0].style.borderBottom = "none"
    document.getElementsByClassName('fotosSuasFotos')[0].style.borderBottom = "1px solid rgba(255, 255, 255, 0.6)"

    document.getElementsByClassName('fotosPredefinidasDrop')[0].style.visibility = 'hidden'
    document.getElementsByClassName('fotosSuasFotosDrop')[0].style.visibility = 'visible'
    document.getElementsByClassName('fotosSuasFotosDrop')[0].style.visibility = 'inherit'

}

function listagemFotosPredefinidas() {
    for (i = 0; i < 10; i++) {
        novoLi = document.createElement('li')
        novoDiv = document.createElement('div')
        novoImg = document.createElement('img')

        novoDiv.setAttribute('class', "fotosPredPlace")
        novoImg.setAttribute('src', 'assets/img/fotoCabeca/fotoCabeca' + i + '.png')
        novoLi.innerText = i

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
        novoLi.innerText = i

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


    if (click.srcElement.src) {
        numero = click.srcElement.parentNode.parentNode.innerText
    } else {
        numero = click.srcElement.innerText
    }

    currentUser.profilePicture = 'assets/img/fotoCabeca/fotoCabeca' + numero + '.png'

    localStorage.setItem(sessionStorage.CurrentUser, JSON.stringify(currentUser))

    location.reload()
}

function atualizarFotografiaPerfilSuas(click) {
    currentUser = JSON.parse(localStorage.getItem(sessionStorage.CurrentUser))


    if (click.srcElement.src) {
        numero = click.srcElement.parentNode.parentNode.innerText
    } else {
        numero = click.srcElement.innerText
    }

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