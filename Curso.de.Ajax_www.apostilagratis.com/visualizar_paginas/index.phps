<?php @require_once('includes/class.MySQL.php'); ?>
<?php @require_once('includes/functions.php'); ?>
<?php @include('actions.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=iso-8859-1" />
	<title>Agenda de contatos</title>
	<script type="text/javascript" src="js/comportamentos.js"></script>
	<style type="text/css">
	/*<![CDATA[*/
	<!--
		@import "css/apresentacao.css";
	-->
	/*]]>*/
	</style>
</head>

<body>

	<h1>Agenda de contatos</h1>
	
	<p><a href="index.php?exibirFormulario=true" title="Cadastrar um novo contato na agenda" id="btnNovoCadastro" class="btn">Cadastrar novo contato</a></p>

<?php if (isset($_GET['exibirFormulario'])) { ?>
<?php @include('formulario.php'); ?>
<?php } ?>

	<div id="conteudo">
<?php @include('relatorio.php'); ?>
	</div>
	
</body>
</html>