// Registar()
// Login()

// TerminarSessao()

// onload()

//************************************************************************** *//
// Guard de sessão (na página de login)
// - Se já houver sessão iniciada, redireciona automaticamente para Albuns.html
;(function sessionGuardLogin() {
    try {
        // Garantir valores por defeito (mantém compatibilidade com o resto do ficheiro)
        if (sessionStorage.getItem('Logged') == null) sessionStorage.setItem('Logged', 'False')
        if (sessionStorage.getItem('CurrentUser') == null) sessionStorage.setItem('CurrentUser', 'None')

        const logged = sessionStorage.getItem('Logged') === 'True'
        const currentUser = sessionStorage.getItem('CurrentUser')

        if (logged && currentUser && currentUser !== 'None' && localStorage.getItem(currentUser)) {
            window.location.replace('Albuns.html')
        }
    } catch (_) { }
})()

listaFotografias = []

let fotografia1 = {
    source: 'assets/img/albuns/amadora/amadora1.jpg',
    data: '28/12/2000',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia2 = {
    source: 'assets/img/albuns/amadora/amadora2.jpg',
    data: '13/01/2012',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia3 = {
    source: 'assets/img/albuns/amadora/amadora3.jpg',
    data: '28/12/2000',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia4 = {
    source: 'assets/img/albuns/coimbra/coimbra1.jpg',
    data: '13/01/2012',
    localizacao: 'Coimbra',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia5 = {
    source: 'assets/img/albuns/coimbra/coimbra2.jpg',
    data: '13/01/2012',
    localizacao: 'Coimbra',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia6 = {
    source: 'assets/img/albuns/coimbra/coimbra3.jpg',
    data: '05/09/1945',
    localizacao: 'Coimbra',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia7 = {
    source: 'assets/img/albuns/coimbra/coimbra4.jpg',
    data: '13/01/2012',
    localizacao: 'Coimbra',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia8 = {
    source: 'assets/img/albuns/lisboa/lisboa1.jpg',
    data: '05/09/1945',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia9 = {
    source: 'assets/img/albuns/lisboa/lisboa2.jpg',
    data: '25/04/1974',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia10 = {
    source: 'assets/img/albuns/lisboa/lisboa3.jpg',
    data: '05/09/1945',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia11 = {
    source: 'assets/img/albuns/londres/londres1.jpg',
    data: '25/04/1974',
    localizacao: 'Londres',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia12 = {
    source: 'assets/img/albuns/londres/londres2.jpg',
    data: '06/12/1979',
    localizacao: 'Londres',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia13 = {
    source: 'assets/img/albuns/londres/londres3.jpg',
    data: '04/12/1979',
    localizacao: 'Londres',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia14 = {
    source: 'assets/img/albuns/peixinhos/peixinho1.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 0
}

let fotografia15 = {
    source: 'assets/img/albuns/peixinhos/peixinho2.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 0
}

let fotografia16 = {
    source: 'assets/img/albuns/peixinhos/peixinho3.jpg',
    data: '05/05/2020',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 0
}

let fotografia17 = {
    source: 'assets/img/albuns/peixinhos/peixinho4.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 0
}

let fotografia18 = {
    source: 'assets/img/albuns/pessoas/GC/gc1.jpg',
    data: '05/05/2020',
    localizacao: 'Desconhecido',
    pessoas: 'George Clooney',
    visualizacoes: 0
}

let fotografia19 = {
    source: 'assets/img/albuns/pessoas/GC/gc2.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'George Clooney',
    visualizacoes: 0
}

let fotografia20 = {
    source: 'assets/img/albuns/pessoas/GC/gc3.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'George Clooney',
    visualizacoes: 0
}

let fotografia21 = {
    source: 'assets/img/albuns/pessoas/NC/nc1.jpg',
    data: '15/03/2009',
    localizacao: 'Desconhecido',
    pessoas: 'Nicolas Cage',
    visualizacoes: 0
}

let fotografia22 = {
    source: 'assets/img/albuns/pessoas/NC/nc2.jpg',
    data: '15/03/2007',
    localizacao: 'Desconhecido',
    pessoas: 'Nicolas Cage',
    visualizacoes: 0
}

let fotografia23 = {
    source: 'assets/img/albuns/pessoas/NC/nc3.jpg',
    data: '15/03/2007',
    localizacao: 'Desconhecido',
    pessoas: 'Nicolas Cage',
    visualizacoes: 0
}

let fotografia24 = {
    source: 'assets/img/albuns/pessoas/SU/su1.jpg',
    data: '15/03/2007',
    localizacao: 'Desconhecido',
    pessoas: 'Samuel Uria',
    visualizacoes: 0
}

let fotografia25 = {
    source: 'assets/img/albuns/pessoas/SU/su2.jpg',
    data: '13/07/1894',
    localizacao: 'Desconhecido',
    pessoas: 'Samuel Uria',
    visualizacoes: 0
}

let fotografia26 = {
    source: 'assets/img/albuns/pessoas/SU/su3.jpg',
    data: '13/07/1894',
    localizacao: 'Desconhecido',
    pessoas: 'Samuel Uria',
    visualizacoes: 0
}

let fotografia27 = {
    source: 'assets/img/albuns/pessoas/SU/su4.jpg',
    data: '13/08/2005',
    localizacao: 'Desconhecido',
    pessoas: 'Samuel Uria',
    visualizacoes: 0
}

let fotografia28 = {
    source: 'assets/img/albuns/porto/porto1.jpg',
    data: '13/08/2005',
    localizacao: 'Porto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia29 = {
    source: 'assets/img/albuns/porto/porto2.jpg',
    data: '19/01/2015',
    localizacao: 'Porto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia30 = {
    source: 'assets/img/albuns/porto/porto3.jpg',
    data: '19/01/2015',
    localizacao: 'Porto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia31 = {
    source: 'assets/img/albuns/porto/porto4.jpg',
    data: '13/07/1894',
    localizacao: 'Porto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia32 = {
    source: 'assets/img/albuns/peixinhos/peixinho5.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 0
}

let fotografia33 = {
    source: 'assets/img/albuns/amadora/amadora4.jpg',
    data: '28/12/2000',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia34 = {
    source: 'assets/img/albuns/amadora/amadora5.jpeg',
    data: '28/12/2000',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia35 = {
    source: 'assets/img/albuns/coimbra/coimbra5.jpg',
    data: '13/01/2012',
    localizacao: 'Coimbra',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia36 = {
    source: 'assets/img/albuns/coimbra/coimbra6.jpg',
    data: '13/01/2012',
    localizacao: 'Coimbra',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia37 = {
    source: 'assets/img/albuns/lisboa/lisboa4.jpg',
    data: '25/04/1974',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia38 = {
    source: 'assets/img/albuns/lisboa/lisboa5.jpg',
    data: '05/09/1945',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia39 = {
    source: 'assets/img/albuns/lisboa/lisboa6.jpg',
    data: '25/04/1974',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia40 = {
    source: 'assets/img/albuns/lisboa/lisboa7.jpg',
    data: '25/04/1974',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia41 = {
    source: 'assets/img/albuns/lisboa/lisboa8.jpg',
    data: '25/04/1974',
    localizacao: 'Lisboa',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia42 = {
    source: 'assets/img/albuns/londres/londres4.jpg',
    data: '04/12/1979',
    localizacao: 'Londres',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia43 = {
    source: 'assets/img/albuns/londres/londres5.jpg',
    data: '04/12/1979',
    localizacao: 'Londres',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia44 = {
    source: 'assets/img/albuns/londres/londres6.jpg',
    data: '04/12/1979',
    localizacao: 'Londres',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia45 = {
    source: 'assets/img/albuns/londres/londres7.jpg',
    data: '04/12/1979',
    localizacao: 'Londres',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia46 = {
    source: 'assets/img/albuns/pessoas/GC/gc4.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'George Clooney',
    visualizacoes: 0
}

let fotografia47 = {
    source: 'assets/img/albuns/pessoas/GC/gc5.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'George Clooney',
    visualizacoes: 0
}

let fotografia48 = {
    source: 'assets/img/albuns/pessoas/NC/nc4.jpg',
    data: '15/03/2007',
    localizacao: 'Desconhecido',
    pessoas: 'Nicolas Cage',
    visualizacoes: 0
}

let fotografia49 = {
    source: 'assets/img/albuns/pessoas/SU/su5.jpg',
    data: '13/08/2005',
    localizacao: 'Desconhecido',
    pessoas: 'Samuel Uria',
    visualizacoes: 0
}

let fotografia50 = {
    source: 'assets/img/albuns/porto/porto5.jpg',
    data: '13/07/1894',
    localizacao: 'Porto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia51 = {
    source: 'assets/img/albuns/porto/porto6.jpg',
    data: '13/07/1894',
    localizacao: 'Porto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia52 = {
    source: 'assets/img/albuns/porto/porto7.jpg',
    data: '13/07/1894',
    localizacao: 'Porto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia53 = {
    source: 'assets/img/albuns/amesterdao/amesterdao1.jpg',
    data: 'Desconhecida',
    localizacao: 'Amesterdao',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia54 = {
    source: 'assets/img/albuns/amesterdao/amesterdao2.jpg',
    data: 'Desconhecida',
    localizacao: 'Amesterdao',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia55 = {
    source: 'assets/img/albuns/amesterdao/amesterdao3.jpg',
    data: '13/07/1894',
    localizacao: 'Amesterdao',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia56 = {
    source: 'assets/img/albuns/amesterdao/amesterdao4.jpg',
    data: '19/01/2015',
    localizacao: 'Amesterdao',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia57 = {
    source: 'assets/img/albuns/amesterdao/amesterdao5.jpg',
    data: '19/01/2015',
    localizacao: 'Amesterdao',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia58 = {
    source: 'assets/img/albuns/kyoto/kyoto1.jpg',
    data: 'Desconhecida',
    localizacao: 'Kyoto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia59 = {
    source: 'assets/img/albuns/kyoto/kyoto2.jpg',
    data: 'Desconhecida',
    localizacao: 'Kyoto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia60 = {
    source: 'assets/img/albuns/kyoto/kyoto3.jpg',
    data: '13/01/2012',
    localizacao: 'Kyoto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia61 = {
    source: 'assets/img/albuns/kyoto/kyoto4.jpg',
    data: '13/01/2012',
    localizacao: 'Kyoto',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia62 = {
    source: 'assets/img/albuns/losangeles/losangeles1.jpg',
    data: '13/01/2012',
    localizacao: 'Los Angeles',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia63 = {
    source: 'assets/img/albuns/losangeles/losangeles2.jpg',
    data: '19/01/2015',
    localizacao: 'Los Angeles',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia64 = {
    source: 'assets/img/albuns/losangeles/losangeles3.jpg',
    data: '19/01/2015',
    localizacao: 'Los Angeles',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia65 = {
    source: 'assets/img/albuns/losangeles/losangeles4.jpg',
    data: '19/01/2015',
    localizacao: 'Los Angeles',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia66 = {
    source: 'assets/img/albuns/losangeles/losangeles5.jpg',
    data: '13/01/2012',
    localizacao: 'Los Angeles',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia67 = {
    source: 'assets/img/albuns/newyork/newyork1.jpg',
    data: '13/01/2012',
    localizacao: 'New York',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia68 = {
    source: 'assets/img/albuns/newyork/newyork2.jpg',
    data: '19/01/2015',
    localizacao: 'New York',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia69 = {
    source: 'assets/img/albuns/newyork/newyork3.jpg',
    data: '19/01/2015',
    localizacao: 'New York',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia70 = {
    source: 'assets/img/albuns/newyork/newyork4.jpg',
    data: '28/12/2000',
    localizacao: 'New York',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia71 = {
    source: 'assets/img/albuns/newyork/newyork5.jpg',
    data: '28/12/2000',
    localizacao: 'New York',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia72 = {
    source: 'assets/img/albuns/newyork/newyork6.jpg',
    data: 'Desconhecida',
    localizacao: 'New York',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia73 = {
    source: 'assets/img/albuns/paris/paris1.jpg',
    data: '04/12/1979',
    localizacao: 'Paris',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia74 = {
    source: 'assets/img/albuns/paris/paris2.jpg',
    data: '04/12/1979',
    localizacao: 'Paris',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia75 = {
    source: 'assets/img/albuns/paris/paris3.jpg',
    data: 'Desconhecida',
    localizacao: 'Paris',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia76 = {
    source: 'assets/img/albuns/paris/paris4.jpg',
    data: '28/12/2000',
    localizacao: 'Paris',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia77 = {
    source: 'assets/img/albuns/paris/paris5.jpg',
    data: 'Desconhecida',
    localizacao: 'Paris',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia78 = {
    source: 'assets/img/albuns/paris/paris6.jpg',
    data: '19/01/2015',
    localizacao: 'Paris',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia79 = {
    source: 'assets/img/albuns/peixinhos/peixinho6.jpg',
    data: '19/01/2015',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 10
}

let fotografia80 = {
    source: 'assets/img/albuns/peixinhos/peixinho7.jpg',
    data: 'Desconhecida',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 0
}

let fotografia81 = {
    source: 'assets/img/albuns/peixinhos/peixinho8.jpg',
    data: '04/12/1979',
    localizacao: 'Desconhecido',
    pessoas: 'Peixe',
    visualizacoes: 0
}

let fotografia82 = {
    source: 'assets/img/albuns/semnada/semnada1.jpg',
    data: 'Desconhecida',
    localizacao: 'Desconhecido',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia83 = {
    source: 'assets/img/albuns/semnada/semnada2.jpg',
    data: 'Desconhecida',
    localizacao: 'Desconhecido',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia84 = {
    source: 'assets/img/albuns/semnada/semnada3.jpg',
    data: 'Desconhecida',
    localizacao: 'Desconhecido',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia85 = {
    source: 'assets/img/albuns/semnada/semnada4.jpg',
    data: 'Desconhecida',
    localizacao: 'Desconhecido',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia86 = {
    source: 'assets/img/albuns/semnada/semnada5.jpg',
    data: 'Desconhecida',
    localizacao: 'Desconhecido',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia87 = {
    source: 'assets/img/albuns/cuba/cuba1.jpg',
    data: '04/12/1979',
    localizacao: 'Havana',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia88 = {
    source: 'assets/img/albuns/cuba/cuba2.jpg',
    data: '28/12/2000',
    localizacao: 'Havana',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia89 = {
    source: 'assets/img/albuns/cuba/cuba3.jpg',
    data: '28/12/2000',
    localizacao: 'Havana',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia90 = {
    source: 'assets/img/albuns/cuba/cuba4.jpg',
    data: 'Desconhecida',
    localizacao: 'Havana',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia91 = {
    source: 'assets/img/albuns/cuba/cuba5.jpg',
    data: '15/03/2007',
    localizacao: 'Desconhecido',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia92 = {
    source: 'assets/img/albuns/cuba/cuba6.jpg',
    data: '15/03/2007',
    localizacao: 'Desconhecido',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia93 = {
    source: 'assets/img/albuns/pessoas/JA/ja1.jpg',
    data: '15/03/2009',
    localizacao: 'Paris',
    pessoas: 'Jennifer Aniston',
    visualizacoes: 0
}

let fotografia94 = {
    source: 'assets/img/albuns/pessoas/JA/ja2.jpg',
    data: '15/03/2007',
    localizacao: 'New York',
    pessoas: 'Jennifer Aniston',
    visualizacoes: 0
}

let fotografia95 = {
    source: 'assets/img/albuns/pessoas/JA/ja3.jpeg',
    data: 'Desconhecida',
    localizacao: 'Los Angeles',
    pessoas: 'Jennifer Aniston',
    visualizacoes: 0
}

let fotografia96 = {
    source: 'assets/img/albuns/pessoas/SS/ss1.jpg',
    data: '15/03/2007',
    localizacao: 'New York',
    pessoas: 'Sara Sampaio',
    visualizacoes: 0
}

let fotografia97 = {
    source: 'assets/img/albuns/pessoas/SS/ss2.jpg',
    data: '15/03/2007',
    localizacao: 'New York',
    pessoas: 'Sara Sampaio',
    visualizacoes: 0
}

let fotografia98 = {
    source: 'assets/img/albuns/pessoas/SS/ss3.jpg',
    data: '15/03/2009',
    localizacao: 'New York',
    pessoas: 'Sara Sampaio',
    visualizacoes: 0
}

let fotografia99 = {
    source: 'assets/img/albuns/amadora/amadora5.jpg',
    data: '13/01/2012',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia100 = {
    source: 'assets/img/albuns/amadora/amadora6.jpg',
    data: '13/01/2012',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia101 = {
    source: 'assets/img/albuns/amadora/amadora7.jpg',
    data: '15/03/2007',
    localizacao: 'Amadora',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia102 = {
    source: 'assets/img/albuns/pessoas/AG/ag1.jpg',
    data: '15/03/2009',
    localizacao: 'Desconhecido',
    pessoas: 'Ariana Grande',
    visualizacoes: 0
}

let fotografia103 = {
    source: 'assets/img/albuns/pessoas/AG/ag2.jpeg',
    data: '15/03/2009',
    localizacao: 'Los Angeles',
    pessoas: 'Ariana Grande',
    visualizacoes: 0
}

let fotografia104 = {
    source: 'assets/img/albuns/pessoas/AG/ag3.jpg',
    data: '15/03/2009',
    localizacao: 'Los Angeles',
    pessoas: 'Ariana Grande',
    visualizacoes: 0
}

let fotografia105 = {
    source: 'assets/img/albuns/pessoas/AG/ag4.jpg',
    data: 'Desconhecida',
    localizacao: 'Paris',
    pessoas: 'Ariana Grande',
    visualizacoes: 0
}

let fotografia106 = {
    source: 'assets/img/albuns/abudhabi/abudhabi1.png',
    data: '15/03/2009',
    localizacao: 'Abu Dhabi',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia107 = {
    source: 'assets/img/albuns/abudhabi/abudhabi2.jpg',
    data: 'Desconhecida',
    localizacao: 'Abu Dhabi',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia108 = {
    source: 'assets/img/albuns/abudhabi/abudhabi3.jpg',
    data: 'Desconhecida',
    localizacao: 'Abu Dhabi',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia109 = {
    source: 'assets/img/albuns/abudhabi/abudhabi4.jpg',
    data: '15/03/2009',
    localizacao: 'Abu Dhabi',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia110 = {
    source: 'assets/img/albuns/abudhabi/abudhabi5.jpg',
    data: 'Desconhecida',
    localizacao: 'Abu Dhabi',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia111 = {
    source: 'assets/img/albuns/abudhabi/abudhabi6.jpg',
    data: 'Desconhecida',
    localizacao: 'Abu Dhabi',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}

let fotografia112 = {
    source: 'assets/img/albuns/abudhabi/abudhabi7.jpg',
    data: 'Desconhecida',
    localizacao: 'Abu Dhabi',
    pessoas: 'Sem pessoas',
    visualizacoes: 0
}


listaFotografias = listaFotografias.concat(fotografia1)
listaFotografias = listaFotografias.concat(fotografia2)
listaFotografias = listaFotografias.concat(fotografia3)
listaFotografias = listaFotografias.concat(fotografia4)
listaFotografias = listaFotografias.concat(fotografia5)
listaFotografias = listaFotografias.concat(fotografia6)
listaFotografias = listaFotografias.concat(fotografia7)
listaFotografias = listaFotografias.concat(fotografia8)
listaFotografias = listaFotografias.concat(fotografia9)
listaFotografias = listaFotografias.concat(fotografia10)
listaFotografias = listaFotografias.concat(fotografia11)
listaFotografias = listaFotografias.concat(fotografia12)
listaFotografias = listaFotografias.concat(fotografia13)
listaFotografias = listaFotografias.concat(fotografia14)
listaFotografias = listaFotografias.concat(fotografia15)
listaFotografias = listaFotografias.concat(fotografia16)
listaFotografias = listaFotografias.concat(fotografia17)
listaFotografias = listaFotografias.concat(fotografia18)
listaFotografias = listaFotografias.concat(fotografia19)
listaFotografias = listaFotografias.concat(fotografia20)
listaFotografias = listaFotografias.concat(fotografia21)
listaFotografias = listaFotografias.concat(fotografia22)
listaFotografias = listaFotografias.concat(fotografia23)
listaFotografias = listaFotografias.concat(fotografia24)
listaFotografias = listaFotografias.concat(fotografia25)
listaFotografias = listaFotografias.concat(fotografia26)
listaFotografias = listaFotografias.concat(fotografia27)
listaFotografias = listaFotografias.concat(fotografia28)
listaFotografias = listaFotografias.concat(fotografia29)
listaFotografias = listaFotografias.concat(fotografia30)
listaFotografias = listaFotografias.concat(fotografia31)
listaFotografias = listaFotografias.concat(fotografia32)
listaFotografias = listaFotografias.concat(fotografia33)
listaFotografias = listaFotografias.concat(fotografia34)
listaFotografias = listaFotografias.concat(fotografia35)
listaFotografias = listaFotografias.concat(fotografia36)
listaFotografias = listaFotografias.concat(fotografia37)
listaFotografias = listaFotografias.concat(fotografia38)
listaFotografias = listaFotografias.concat(fotografia39)
listaFotografias = listaFotografias.concat(fotografia40)
listaFotografias = listaFotografias.concat(fotografia41)
listaFotografias = listaFotografias.concat(fotografia42)
listaFotografias = listaFotografias.concat(fotografia43)
listaFotografias = listaFotografias.concat(fotografia44)
listaFotografias = listaFotografias.concat(fotografia45)
listaFotografias = listaFotografias.concat(fotografia46)
listaFotografias = listaFotografias.concat(fotografia47)
listaFotografias = listaFotografias.concat(fotografia48)
listaFotografias = listaFotografias.concat(fotografia49)
listaFotografias = listaFotografias.concat(fotografia50)
listaFotografias = listaFotografias.concat(fotografia51)
listaFotografias = listaFotografias.concat(fotografia52)
listaFotografias = listaFotografias.concat(fotografia53)
listaFotografias = listaFotografias.concat(fotografia54)
listaFotografias = listaFotografias.concat(fotografia55)
listaFotografias = listaFotografias.concat(fotografia56)
listaFotografias = listaFotografias.concat(fotografia57)
listaFotografias = listaFotografias.concat(fotografia58)
listaFotografias = listaFotografias.concat(fotografia59)
listaFotografias = listaFotografias.concat(fotografia60)
listaFotografias = listaFotografias.concat(fotografia61)
listaFotografias = listaFotografias.concat(fotografia62)
listaFotografias = listaFotografias.concat(fotografia63)
listaFotografias = listaFotografias.concat(fotografia64)
listaFotografias = listaFotografias.concat(fotografia65)
listaFotografias = listaFotografias.concat(fotografia66)
listaFotografias = listaFotografias.concat(fotografia67)
listaFotografias = listaFotografias.concat(fotografia68)
listaFotografias = listaFotografias.concat(fotografia69)
listaFotografias = listaFotografias.concat(fotografia70)
listaFotografias = listaFotografias.concat(fotografia71)
listaFotografias = listaFotografias.concat(fotografia72)
listaFotografias = listaFotografias.concat(fotografia73)
listaFotografias = listaFotografias.concat(fotografia74)
listaFotografias = listaFotografias.concat(fotografia75)
listaFotografias = listaFotografias.concat(fotografia76)
listaFotografias = listaFotografias.concat(fotografia77)
listaFotografias = listaFotografias.concat(fotografia78)
listaFotografias = listaFotografias.concat(fotografia79)
listaFotografias = listaFotografias.concat(fotografia80)
listaFotografias = listaFotografias.concat(fotografia81)
listaFotografias = listaFotografias.concat(fotografia82)
listaFotografias = listaFotografias.concat(fotografia83)
listaFotografias = listaFotografias.concat(fotografia84)
listaFotografias = listaFotografias.concat(fotografia85)
listaFotografias = listaFotografias.concat(fotografia86)
listaFotografias = listaFotografias.concat(fotografia87)
listaFotografias = listaFotografias.concat(fotografia88)
listaFotografias = listaFotografias.concat(fotografia89)
listaFotografias = listaFotografias.concat(fotografia90)
listaFotografias = listaFotografias.concat(fotografia91)
listaFotografias = listaFotografias.concat(fotografia92)
listaFotografias = listaFotografias.concat(fotografia93)
listaFotografias = listaFotografias.concat(fotografia94)
listaFotografias = listaFotografias.concat(fotografia95)
listaFotografias = listaFotografias.concat(fotografia96)
listaFotografias = listaFotografias.concat(fotografia97)
listaFotografias = listaFotografias.concat(fotografia98)
listaFotografias = listaFotografias.concat(fotografia99)
listaFotografias = listaFotografias.concat(fotografia100)
listaFotografias = listaFotografias.concat(fotografia101)
listaFotografias = listaFotografias.concat(fotografia102)
listaFotografias = listaFotografias.concat(fotografia103)
listaFotografias = listaFotografias.concat(fotografia104)
listaFotografias = listaFotografias.concat(fotografia105)
listaFotografias = listaFotografias.concat(fotografia106)
listaFotografias = listaFotografias.concat(fotografia107)
listaFotografias = listaFotografias.concat(fotografia108)
listaFotografias = listaFotografias.concat(fotografia109)
listaFotografias = listaFotografias.concat(fotografia110)
listaFotografias = listaFotografias.concat(fotografia111)
listaFotografias = listaFotografias.concat(fotografia112)

listaFotografias.sort(function (a, b) {

    if (a.data == 'Desconhecida') {
        return 1
    } else if (b.data == 'Desconhecida') {
        return -1
    }

    if (parseInt(a.data.slice(6, 10)) > parseInt(b.data.slice(6, 10))) {
        return 1
    } else if (parseInt(a.data.slice(6, 10)) == parseInt(b.data.slice(6, 10))) {
        if (parseInt(a.data.slice(3, 5)) > parseInt(b.data.slice(3, 5))) {
            return 1
        } else if (parseInt(a.data.slice(3, 5)) == parseInt(b.data.slice(3, 5))) {
            if (parseInt(a.data.slice(0, 2)) > parseInt(b.data.slice(0, 2))) {
                return 1
            } else if (parseInt(a.data.slice(0, 2)) == parseInt(b.data.slice(0, 2))) {
                return 0
            } else {
                return -1
            }
        } else {
            return -1
        }
    } else {
        return -1
    }
})


//************************************************************************** *//

function Registar() {
    nome = document.getElementById('nomeURegisto').value
    email = document.getElementById('emailRegisto').value
    passwordFirst = document.getElementById('passwordFirstRegisto').value
    passwordSecond = document.getElementById('passwordSecondRegisto').value


    if (sessionStorage.Logged == "False") {

        if (localStorage.getItem(nome) == null) {

            if (passwordFirst == passwordSecond) {


                let user = {
                    userName: nome,
                    email: email,
                    password: passwordFirst,
                    profilePicture: "assets/img/fotoCabeca/fotoCabeca3.png",
                    albuns: [],
                    lixo: [],
                    fotografias: [],
                    fotografiasImportar: listaFotografias,
                    organizacaoFotografias: 'Data',
                    curtidas: []
                }

                localStorage.setItem(nome, JSON.stringify(user))
                sessionStorage.setItem("Logged", "True")
                sessionStorage.setItem("CurrentUser", nome)

                return true

            } else {
                alert("Passwords não coincidem!")
            }
        } else {
            alert("Nome de Utilizador indisponível!")
        }
    } else {
        alert("Já tens sessão iniciada!")
    }
    return false
}

function Login() {
    nome = document.getElementById('nomeULogin').value
    password = document.getElementById('passwordLogin').value

    if (sessionStorage.Logged == "False") {

        if (localStorage.getItem(nome) != null) {

            if (JSON.parse(localStorage.getItem(nome)).password == password) {

                sessionStorage.setItem("Logged", "True")
                sessionStorage.setItem("CurrentUser", nome)

                return true

            } else {
                alert("Utilizador e/ou password incorretos!")
            }
        } else {
            alert("Utilizador e/ou password incorretos!")
        }
    } else {
        alert("Já tens sessão iniciada!")
    }
    return false

}

//************************************************************************** *//

function TerminarSessao() {
    sessionStorage.setItem('CurrentUser', 'None')
    sessionStorage.setItem('Logged', "False")
}

//************************************************************************** *//


function onload() {

    if (sessionStorage.Logged == null) {
        sessionStorage.setItem("Logged", "False")
        sessionStorage.setItem("CurrentUser", "None")
    }

}




window.addEventListener('load', onload)
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('loginForm').classList.add('fade-in');
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('registerForm').classList.remove('fade-in');
    document.getElementsByClassName('tabBtn')[0].classList.add('active');
    document.getElementsByClassName('tabBtn')[1].classList.remove('active');
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('loginForm').classList.remove('fade-in');
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('registerForm').classList.add('fade-in');
    document.getElementsByClassName('tabBtn')[0].classList.remove('active');
    document.getElementsByClassName('tabBtn')[1].classList.add('active');
}
