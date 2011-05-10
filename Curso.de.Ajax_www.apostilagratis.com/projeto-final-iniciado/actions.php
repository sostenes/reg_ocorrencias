<?php
// Incluiremos tais páginas se: existir a variável ajax ou editar na URL e não exisitr a variável exibirFormulario

if ( isset($_GET['ajax']) || isset($_GET['editar']) && !isset($_GET['exibirFormulario']) ) {
	require('includes/class.MySQL.php');
	require('includes/functions.php');
}

// Pegaremos os dados informados no formulário e executaremos uma das funções: inserir/editar somente se o formulário for submetido
// Para tal verificamos se a variável de requisição action exisite
if (isset($_REQUEST['action'])) {
	
	# Dados informados no formulário de cadastro / edição
	
	// Se tiver trabalhando baseado em Ajax - isset($_GET['ajax'] - utilizaremos a funçao formatDataAjax, caso contrário formatData
	
	$nome = isset($_GET['ajax']) ? formatDataAjax($_POST['nome']) : formatData($_POST['nome']);
	$obs = isset($_GET['ajax']) ? formatDataAjax($_POST['obs']) : formatData($_POST['obs']);
	$ddd = isset($_GET['ajax']) ? formatDataAjax($_POST['ddd']) : formatData($_POST['ddd']);
	$tel = isset($_GET['ajax']) ? formatDataAjax($_POST['tel']) : formatData($_POST['tel']);
	$cel = isset($_GET['ajax']) ? formatDataAjax($_POST['cel']) : formatData($_POST['cel']);
	$email = isset($_GET['ajax']) ? formatDataAjax($_POST['email']) : formatData($_POST['email']);
	$blog = isset($_GET['ajax']) ? formatDataAjax($_POST['blog']) : formatData($_POST['blog']);
	$msn = isset($_GET['ajax']) ? formatDataAjax($_POST['msn']) : formatData($_POST['msn']);
	$gtalk = isset($_GET['ajax']) ? formatDataAjax($_POST['gtalk']) : formatData($_POST['gtalk']);
	$skype = isset($_GET['ajax']) ? formatDataAjax($_POST['skype']) : formatData($_POST['skype']);
	
	# Dado informado no campo oculto. Para sabermos se será um cadatro ou edição de contato.
	
	$action = $_POST['action'];
	
	# Processo de validação dos dados obrigatórios: nome, ddd, telefone e e-mail.
	
	$erro = '';
	
	$erro .= empty($nome) ? "<li>Ops! Você esqueceu de informar o nome do contato.</li>\n" : "";
	$erro .= empty($ddd) ? "<li>Ops! Você deve informar o DDD do contato $nome.</li>\n" : "";
	$erro .= empty($tel) ? "<li>Ops! Informe o telefone do contato $nome.</li>\n" : "";
	$erro .= ereg("^([0-9,a-z,A-Z]+)([.,_]([0-9,a-z,A-Z]+))*[@]([0-9,a-z,A-Z]+)([.,_,-]([0-9,a-z,A-Z]+))*[.]([0-9,a-z,A-Z]){2}([0-9,a-z,A-Z])?$", $email) ? "" : "<li>Ops! O e-mail informado, $email, é invalido; verifique-o.</li>\n";	
	
	// Se não houver erros, prosseguimos...
	if ($erro == '') {
		switch($action) {
			case 'cadastrar' :
				// Cadastramos um novo contato na tabela
				$cadastro = $mySQL->runQuery("INSERT INTO agenda_contatos () VALUES ('','$nome','$obs','$ddd','$tel','$cel','$email','$blog','$msn','$gtalk','$skype',NOW())");
				// Se não tivermos trabalhando com Ajax, encaminharemos o usuário a página index.php
				if (!isset($_GET['ajax'])) {
					header('Location: index.php');
				}
			break;
			case 'editar' :
				// Pegamos o ID do contato, para sabermos os dados de quem será editado
				$ID = isset($_GET['ajax']) ? formatDataAjax($_POST['ID']) : formatData($_POST['ID']);
				// Editamos os dados do contato informado
				$edicao = $mySQL->runQuery("UPDATE agenda_contatos SET cont_nome = '$nome', cont_obs = '$obs', cont_ddd = '$ddd', cont_tel = '$tel', cont_cel = '$cel', cont_email = '$email', cont_blog = '$blog', cont_msn = '$msn', cont_gtalk = '$gtalk', cont_skype = '$skype' WHERE cont_id = '$ID'");
				// Se não tivermos trabalhando com Ajax, encaminharemos o usuário a página index.php
				if (!isset($_GET['ajax'])) {
					header('Location: index.php');
				}
			break;
		} // switch->action
	} // if->erro->''
		
} // if->isset->request->action

if (isset($_GET['excluir'])) {
	// Pegamos o ID do contato, para sabermos quem será excluido
	$ID = isset($_GET['ajax']) ? formatDataAjax($_GET['ID']) : formatData($_GET['ID']);
	// Excluímos o contato informado
	$excluir = $mySQL->runQuery("DELETE FROM agenda_contatos WHERE cont_id = '$ID'");
	// Se não tivermos trabalhando com Ajax, encaminharemos o usuário a página index.php
	if (!isset($_GET['ajax'])) {
		header('Location: index.php');
	}
} // if->isset->excluir
?>