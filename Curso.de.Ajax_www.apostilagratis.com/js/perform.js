/* Curso iMasters - Web Sites com Ajax */
/* Autor: Leandro Vieira Pinho [ leandro@plugsites.net ] */
// Frame Scroll
function loadFunctions() {
	showHideMenu('linkCap1','cap1');
	showHideMenu('linkCap2','cap2');
	showHideMenu('linkCap3','cap3');
	showHideMenu('linkCap4','cap4');
	showHideMenu('linkCap5','cap5');
	showHideMenu('linkCap6','cap6');
	openMenuCapAtivo();
	verifyFrameScroll();
	optFrameScroll();
	verifyFontSize();
	backToCourse();
	ocultaTagsNoScript();
}
window.onload = loadFunctions;

function openMenuCapAtivo() {
	if(document.getElementsByTagName) {
		var totalLinks = document.getElementsByTagName('a');
		for (a = 0; a < totalLinks.length; a++) {
			var links = totalLinks[a];
			if(links.getAttribute('id') && links.getAttribute('id').substring(0,10) == 'linkNavCap') {
				var capAtivo = links.getAttribute('id').substring(10,15);
				links.onclick = function() {
					var cookieCapAtivo = 'cap' + capAtivo;
					for (var x = 1; x <= 6; x++) {
						eraseCookie('cap' + x);
					}
					createCookie(cookieCapAtivo,'true',30);
				}
			}
		}
	}
}

function changeFontSize() {
	var c = document.getElementById('conteudo');
	if(c.style.fontSize == '' || c.style.fontSize == 'small') {
		c.style.fontSize = 'medium';
		createCookie('fontSizeCursoImasters','medium',30);
	} else if(c.style.fontSize == 'medium') {
		c.style.fontSize = 'large';
		createCookie('fontSizeCursoImasters','large',30);
	} else if(c.style.fontSize == 'large') {
		c.style.fontSize = 'x-small';
		createCookie('fontSizeCursoImasters','x-small',30);
	} else {
		c.style.fontSize = 'small';
		createCookie('fontSizeCursoImasters','small',30);
	}
}

function verifyFontSize() {
	var cookie = readCookie('fontSizeCursoImasters')
	
	if(cookie) {
		document.getElementById('conteudo').style.fontSize = cookie;
	}
}

function verifyFrameScroll() {
	var cookie = readCookie('frameScroll');
	var sideBar = document.getElementById('sideBar');
	var header = document.getElementById('header');
	var conteudo = document.getElementById('conteudo');
	var global = document.getElementById('global');

	if(cookie) {
		sideBar.style.display = 'none';
		header.style.width = '759px';
		conteudo.style.width = '684px';
		global.style.backgroundImage = 'url(img/bg/bg_global_frame_scroll.gif)';
	}	
}

function optFrameScroll() {
	var sideBar = document.getElementById('sideBar');
	var header = document.getElementById('header');
	var conteudo = document.getElementById('conteudo');
	var global = document.getElementById('global');
	var linkAtivador = document.getElementById('optFrameScroll');
	
	linkAtivador.onclick = function() {
		if(sideBar.style.display == "") {
			sideBar.style.display = 'none';
			header.style.width = '759px';
			conteudo.style.width = '684px';
			global.style.backgroundImage = 'url(img/bg/bg_global_frame_scroll.gif)';
			createCookie('frameScroll','hide',30);
		} else {
			sideBar.style.display = '';
			header.style.width = '559px';
			conteudo.style.width = '484px';
			global.style.backgroundImage = 'url(img/bg/bg_global.gif)';
			eraseCookie('frameScroll');
		}
		return false;
	}
}
	
function showHideMenu(_linkCap,_cap) {
	
	var linkCap = document.getElementById(_linkCap); // Link que o usuário clicará.
	var cap = document.getElementById(_cap); // Capítulo desejado.

	cap.className = 'hide'; // Para garantir a acessibilidade ao menu, ele fica oculta através do js.
	
	var cookie = readCookie(_cap); // Consulta qual submenu ficará aberto.
	
	if(cookie == 'true') { // Se exister o cookie, ...
		cap.className = 'show'; // ...  o menu do capítulo permanece aberto.
	}

	if (linkCap == null || cap == null) return;
	
	linkCap.onclick = function() { // Ao clicar no link, chama a função.
		if(cap.className == 'hide') { // Verifica a classe default.
			cap.className = 'show'; // Se estiver com a default (que oculta), exibe.
			for (var x = 1; x <= 6; x++) {
				eraseCookie('cap' + x);
			}
			createCookie(_cap,'true',30); // Seta o cookie (por 30 dias) para permancer aberto.
		} else {
			cap.className = 'hide'; // Oculta.
			eraseCookie(_cap); // Deleta o cookie.
		}
		return false; // Evita o reload na página.
	}
}

function closeBoxBackToCourse() {
	document.getElementById('boxBackToCourse').style.display = 'none';
}

function backToCourse() {
	var stringURL = window.location.search;
	if(stringURL) {
		var elimina = "?pg=";
		var pgToBack = stringURL.slice(elimina.length);
		
		var refer = document.getElementById('curso');

		var tagP, linkBack, linkClose;
		
		tagP = document.createElement('p');
		tagP.setAttribute('id','boxBackToCourse');
		
		linkBack = document.createElement('a');
		linkBack.appendChild(document.createTextNode('Ao finalizar a sua leitura, utilize este link para voltar à página em que você estava.'));
		linkBack.setAttribute('href',pgToBack);
		
		linkClose = document.createElement('a');
		linkClose.appendChild(document.createTextNode('X - Fechar'));
		linkClose.setAttribute('id','linkClose');
		linkClose.setAttribute('href','javascript:closeBoxBackToCourse();');
		
		tagP.appendChild(linkBack);
		tagP.appendChild(linkClose);
		
		refer.appendChild(tagP);
		
	}
}

function ocultaTagsNoScript() {
	// Esta função foi necessária por causa do IE, pra variar.
	var tag = document.getElementsByTagName('noscript');
	for (var x = 0; x <= tag.length; x++) {
		_tag = tag[x];
		if (_tag) {
			_tag.className = 'hide'
		}
	}
}
/* Funções para cookie */

function createCookie(name, value, days) {
	if(days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} 
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}