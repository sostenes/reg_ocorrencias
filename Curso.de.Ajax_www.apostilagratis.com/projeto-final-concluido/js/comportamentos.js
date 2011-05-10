/* Curso iMasters - Criando Web Sites com Ajax - 2006 */
/* Autor: Leandro Vieira Pinho [ leandroimasters@plugsites.net ] */

// Esta fun��o instancia o objeto XMLHttpRequest
function openAjax() {
	var ajax;
	try {
		ajax = new XMLHttpRequest();
	} catch(ee) {
		try {
			ajax = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				ajax = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(E) {
				ajax = false;
			}
		}
	}
	return ajax;
}

// Chama a fun��o loadFunctions ao carregar a p�gina
window.onload = loadFunctions;

// Fun��o que chama outras fun��es
function loadFunctions() {
	focusNome();
	ativarBtnCadastro();
	ativarBtnEditarBtnExcluir();
}

// Utilizado para evitar de digitar: document.getElementById toda hora, tornando o processo mais pr�tico
function gE(ID) {
	return document.getElementById(ID);
}

// Utilizado para evitar de digitar: document.getElementsByTagName toda hora, tornando o processo mais pr�tico
function gEs(tag) {
	return document.getElementsByTagName(tag);
}

// Esta fun��o � utilizada para exibir o formul�rio quando o link/bot�o Cadastrar novo contato � clicado
function ativarBtnCadastro() {
	// Se n�o houver o bot�o/link aborta a fun��o
	if (!gE('btnNovoCadastro')) return false;
	// Ao clicar no bot�o ser� realizada uma a��o
	gE('btnNovoCadastro').onclick = function() {
		// Executa a fun��o que cria o fundo sobre p�gina
		exibirBgBody();
		// Cria um div - definida como boxCad - que armazenar� o formul�rio de cadastro
		boxCad();
		// Inicia o Ajax, atrav�s da vari�vel Ajax
		var ajax = openAjax();
		// A tag bgBody conter� o formul�rio de cadastro
		var recipiente = gE('boxCad');
		// Informamos o m�todo e a p�gina que ser� requisitada
		ajax.open('GET', 'formulario.php?ajax=true', true); 
		// bla
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 1) {
				// Cria o efeito de loading
				loading(true);	
			} // if->readyState->1
			if (ajax.readyState == 4) {
				if (ajax.status == 200) {
					// Remove o efeito de loading
					loading(false);
					// Pega o conte�do - HTML - da p�gina requisitada: formulario.php?ajax=true e coloca dentra da div definida na vari�vel recipiente
					recipiente.innerHTML = ajax.responseText;
					// Chama a fun��o que trabalha sobre os bot�es de Ok e Cancelar
					btnOkBtnCancelar();
					// Seta o focus no campo nome do cadastro
					focusNome();
				} // if-status->200
			} // if->readyState->4
		} // ajax->onreadystatechange
		// Envia a requisi��o
		ajax.send(null);
		// Evita o reload da p�gina
		return false;
	}
}

// Utilizado para criar o fundo sobre a p�gina (wiewport), body.
function exibirBgBody() {
	// Seleciona a tag body. item(0) por que s� existe uma tag body
	var tagBody = gEs('body').item(0);
	// Pega os tamanhos atuais da p�gina, como largura, altura, ...
	var sizesPage = getPageSize();
	// Vamos criar uma tag div
	var bgBody = document.createElement('div');
	// Setar o atributo ID a div criada
	bgBody.setAttribute('id','bgBody');
	// Essa div ter� o tamanho exato da p�gina
	bgBody.style.height = arrayPageSize[1] + 'px';
	// Essa div ter� a largura exata da p�gina
	bgBody.style.width = arrayPageSize[0] + 'px';
	// Evita criar a div novamente
	if (!gE('bgBody')) {
		tagBody.insertBefore(bgBody, tagBody.firstChild);
	}	
}

// Cria a div denominada como boxCad, a qual conter� o formul�rio de cadastro
function boxCad() {
	// Cria um 'container' que comportar� o formul�rio de cadastro.
	var objBody = gEs('body').item(0);
	var sizesPage = getPageSize();
	var boxCad = document.createElement('div');
	boxCad.setAttribute('id','boxCad');
	var wPage = arrayPageSize[0]; // Largura total da p�gina
	var hPage = arrayPageSize[1]; // tamanho total da p�gina
	/*boxCad.style.width = (wPage / 2) + 'px'; // metade da largura da p�gina*/
	boxCad.style.height = (wPage / 2) + 'px'; // metada da altura da p�gina
	boxCad.style.marginTop = -(wPage / 4) + 'px'; // 1 quarto da largura
	//boxCad.style.marginLeft = -(wPage / 4) + 'px'; // 1 quarto da altura
	objBody.insertBefore(boxCad, objBody.lastChild);
}

// Utilizado para criar o efeito de loading
function loading(opt) {
	if (opt == true) {
		// A tag que receber� a img de loading
		var refer = gE('bgBody');
		// O tamanho da referida tag
		var referHeight = refer.offsetHeight;
		// Dizemos que os elementos dentro dela ser� alinhado ao centro
		refer.style.textAlign = 'center';
		// Criamos uma imagem, img.
		var img = document.createElement('img');
		// Informamos o caminho da img
		img.setAttribute('src','img/imgLoading.gif');
		// Setamos um atributo ID na img criada
		img.setAttribute('id','loading');
		// Definimos seu tamanho
		img.setAttribute('width','126');
		// Dizemos que o margin-top ser� a metada do tamanho da div
		img.style.marginTop = (referHeight /2) + 'px';
		// Evita que seja criada duas ou mais img de loading
		if (!document.getElementById('loading')) {
			// Insere a img na tag informada na vari�vel refer
			refer.insertBefore(img, refer.firstChild);
		}
	} else if (opt == false) {
		// Referenciamos a img de login atrav�s de seu ID
		var imgLoading = gE('loading');
		// Removemos a img de loading
		if (imgLoading) {
			imgLoading.parentNode.removeChild(imgLoading);
		}
	}
}

// Fun��es que ser� vinculadas ao bot�o Ok e Cancelar do formul�rio
function btnOkBtnCancelar() {
	// Se n�o houver os bot�es aborta a fun��o
	if (!gE('btnOk')) return false;
	if (!gE('btnCancelar')) return false;

	gE('btnOk').onclick = function() {
		// Valida os dados informado, a fun��o retornar� false se houver erro, e true se estiver tudo ok.
		var validacao = validarForm();
		// Verifica o retorno da fun��o
		if (validacao == true) {
			var ajax = openAjax();
			ajax.open('POST', 'actions.php?ajax=true', true);
			ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4) {
					if (ajax.status == 200) {
						// Atualiza o relat�rio com os contatos cadastrados
						atualizaRelatorio();
					} // status ->200
				} // readyState->4
			} // ajax->onreadystatechange
			// Criaremos uma vari�vel que armazenar� os dados do formul�rio
			// Ser� um cadastro ou edi��o?
			var tipoAcao = gE('action').value;
			// Se for cadastro ...
			if (tipoAcao == 'cadastrar') {
				var dataPost = 'action=cadastrar';
			} else if (tipoAcao == 'editar') {
				var dataPost = 'action=editar&ID=' + gE('ID').value;
			}
			dataPost += '&nome=' + gE('nome').value;
			dataPost += '&obs=' + gE('obs').value;
			dataPost += '&ddd=' + gE('ddd').value;
			dataPost += '&tel=' + gE('tel').value;
			dataPost += '&cel=' + gE('cel').value;
			dataPost += '&email=' + gE('email').value;
			dataPost += '&blog=' + gE('blog').value;
			dataPost += '&msn=' + gE('msn').value;
			dataPost += '&gtalk=' + gE('gtalk').value;
			dataPost += '&skype=' + gE('skype').value;
			alert(dataPost);
			ajax.send(dataPost);
		} // validacao == true
		// Evita que o form seja enviado e d� o reload na p�gina
		return false;
	}
	
	gE('btnCancelar').onclick = function() {
		// Elimina o fundo criado para o body e a div - boxCad - que cont�m o formul�rio de cadastro.
		removerDivs();
		// Cancela a fun��o do bot�o de 'limpar' os dados preenchidos.
		return false;
	}
}


// Esta fun��o seta o focus ao campo nome do formul�rio
function focusNome() {
	// Se h�o houver o campo nome aborta a fun��o
	if (!gE('nome')) return false;
	// Concede o focus ao campo nome do cadastro
	gE('nome').focus();
}

// Esta fun��o valida os dados do formul�rio de preenchimento obrigat�rio
function validarForm() {
	// Se n�o houver o formul�rio com o ID frmCad aborta a fun��o
	if (!gE('frmCad')) return false;
	// Rela��o dos campos que devem ser preenchidos
	var nome = gE('nome');
	var ddd = gE('ddd');
	var tel = gE('tel');
	var email = gE('email');
	// Valida o campo nome, ou seja, ele n�o pode ficar em branco
	if (nome.value == '' || nome.value == null) {
		// Informa ao usu�rio o erro ocorrido
		alert('Ops! Informe o seu nome.');
		// Seta o focus no campo com erro
		nome.focus();
		// Retorna false, para a outra saber que algo est� errado e n�o liberar o cadastro
		return false;
	}
	// Valida o DDD e em seguida o telefone
	if (ddd.value == '' || ddd.value == null) {
		alert('Ops! Informe o seu DDD.');
		ddd.focus();
		return false;
	}
	if (tel.value == '' || tel.value == null) {
		alert('Ops! Informe o seu telefone.');
		tel.focus();
		return false;
	}
	// Verifica o e-mail informado, retornando false se ele for inv�lido e true se for v�lido
	var verificaEmail = validaEmail(email.value);
	// Se for inv�lido exibe o erro
	if (verificaEmail == false) {
		alert('Ops! O e-mail informado, ' + email.value + ', � inv�lido; verifique-o.');
		email.focus();
		return false;
	}
	return true;
}

// Fun��o que valida o e-mail informado
function validaEmail(email){
	return email.search(/(\w[\w\.\+]+)@(.+)\.(\w+)$/)==0;
}

// Esta fun��o � utilizada para atualizar o relat�rio com os registrados da agenda
function atualizaRelatorio() {
	var ajax = openAjax();
	ajax.open('GET', 'relatorio.php?ajax=true', true);
	ajax.onreadystatechange = function() {
		var conteudo = gE('conteudo');
		if (ajax.readyState == 1) {
			loading(true);
		}
		if (ajax.readyState == 4) {
			if (ajax.status == 200) {
				loading(false);
				removerDivs();
				conteudo.innerHTML = ajax.responseText;
				ativarBtnEditarBtnExcluir();
			} 
		}
	}
	ajax.send(null);
}

// Fun��o que ativa o bot�o de edi��o e exclus�o dos contatos
function ativarBtnEditarBtnExcluir() {
	// Seleciona todas as tags a, os links.
	var linksBtn = gEs('a');
	// Faz um loop por todos (links)
	for (var x = 0; x < linksBtn.length; x++) {
		// Cada link em si
		var linkBtn = linksBtn[x];
		// Cria uma vair�vel - atributoRel - com o valor do atributo rel do link
		var atributoRel = new String(linkBtn.getAttribute('rel'));
		// Verifico se o link ser� para edi��o dos dados
		if (atributoRel.substring(0,9) == 'btnEditar') {
			linkBtn.onclick = function() {
				// Pego o ID do registro, que coloquei no atributo rel
				// Se fazer sem a palavra-chave this, o script sempre pegar� o �ltimo da lista
				// O this neste caso � IMPORTANTISS�MO
				var ID = this.getAttribute('rel').split('-')[1];
				// Executa a fun��o que cria o fundo sobre p�gina
				exibirBgBody();
				// Cria um div - definida como boxCad - que armazenar� o formul�rio de cadastro
				boxCad();
				// Inicia o Ajax, atrav�s da vari�vel Ajax
				var ajax = openAjax();
				// A tag bgBody conter� o formul�rio de cadastro
				var recipiente = gE('boxCad');
				// Informamos o m�todo e a p�gina que ser� requisitada
				ajax.open('GET', 'formulario.php?ajax=true&editar=true&ID=' + ID, true); 
				// bla
				ajax.onreadystatechange = function() {
					if (ajax.readyState == 1) {
						// Cria o efeito de loading
						loading(true);	
					} // if->readyState->1
					if (ajax.readyState == 4) {
						if (ajax.status == 200) {
							// Remove o efeito de loading
							loading(false);
							// Pega o conte�do - HTML - da p�gina requisitada: formulario.php?ajax=true e coloca dentra da div definida na vari�vel recipiente
							recipiente.innerHTML = ajax.responseText;
							// Chama a fun��o que trabalha sobre os bot�es de Ok e Cancelar
							btnOkBtnCancelar();
							// Seta o focus no campo nome do cadastro
							focusNome();
						} // if-status->200
					} // if->readyState->4
				} // ajax->onreadystatechange
				// Envia a requisi��o
				ajax.send(null);
				// Evita o reload da p�gina
				return false;
			} // linkBtn.onclick
		} // if->btnEditar
		// Verifico se o link ser� para exclus�o de registro
		if (atributoRel.substring(0,10) == 'btnExcluir') {
			linkBtn.onclick = function() {
				// Pego o ID do registro, que coloquei no atributo rel
				var ID = this.getAttribute('rel').split('-')[1];
				// Confirma a exclus�o antes de execut�-la.
				var confirma = confirm('Voc� realmente deseja excluir este contato?');
				// Se realmente quiser excluir
				if (confirma == true) {
					// Inicia o Ajax, atrav�s da vari�vel Ajax
					var ajax = openAjax();
					// Informamos o m�todo e a p�gina que ser� requisitada
					ajax.open('GET', 'actions.php?ajax=true&excluir=true&ID=' + ID, true); 
					// bla
					ajax.onreadystatechange = function() {
						if (ajax.readyState == 4) {
							if (ajax.status == 200) {
								// Executa a fun��o que cria o fundo sobre p�gina
								exibirBgBody();
								// Atualiza a tabela de ralt�rio, agora sem o registro exclu�do
								atualizaRelatorio();
							} // if-status->200
						} // if->readyState->4
					} // ajax->onreadystatechange
					// Envia a requisi��o
					ajax.send(null);
				} // if->confirma->true
				// Evita o reload da p�gina
				return false;
			} // linkBtn.onclick
		} // if->btnExcluir
	} // for
}

// Esta fun��o elimina da p�gina o fundo criado sobre o body e o boxCad;
function removerDivs() {
	var bgBody = gE('bgBody');
	var boxCad = gE('boxCad');
	bgBody.parentNode.removeChild(bgBody);
	if (boxCad) { // Por que ao clicar X (para deletar um registro) cria-se somente o encobridor e n�o o boxCad	
		boxCad.parentNode.removeChild(boxCad);
	}
}

/* Fun��es de terceiros */
// getPageSize()
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org
// Edit for Firefox by pHaez
//
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 

}