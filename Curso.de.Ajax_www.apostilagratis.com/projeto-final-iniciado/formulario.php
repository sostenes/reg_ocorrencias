<?php
// Este primeiro header, corrigi o problema de acentuação dos caracteres.
header('Content-Type: text/html; charset=iso-8859-1');
// Os dois headers seguintes, evitam que a página seja armazenada em cache no navegador.
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
?> 
<?php
if ( isset($_GET['ajax']) || isset($_GET['editar']) && !isset($_GET['exibirFormulario']) ) {
	require('includes/class.MySQL.php');
	require('includes/functions.php');
}

if (isset($_GET['editar'])) {
	$ID = isset($_GET['ajax']) ? formatDataAjax($_GET['ID']) : formatData($_GET['ID']);
	$rsDadosContato = $mySQL->runQuery("SELECT * FROM agenda_contatos WHERE cont_id = '$ID'");
	$row_rsDadosContato = mysql_fetch_assoc($rsDadosContato);
}
?>

	<h2>Cadastro de contatos</h2>

	<form id="frmCad" method="post" action="index.php?exibirFormulario=true">

<?php if(isset($erro) && $erro != '') { ?>
		<fieldset>
			<legend>Observações</legend>
			
			<ul>
<?php echo $erro; ?>
			</ul>	
		</fieldset>
<?php } ?>

		<p>
			<label for="nome">Nome: </label>
			<input type="text" name="nome" id="nome" maxlength="150" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_nome'] : ''; ?>" />
		</p>
		<p>
			<label for="obs">Observações: </label>
			<input type="text" name="obs" id="obs" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_obs'] : ''; ?>" />
		</p>
		
		<hr />
		
		<p>
			<label for="ddd">DDD: </label>
			<input type="text" name="ddd" id="ddd" maxlength="2" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_ddd'] : ''; ?>" />
			
			<label for="tel" class="inline">Telefone: </label>
			<input type="text" name="tel" id="tel" maxlength="9" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_tel'] : ''; ?>" />
			
			<label for="cel" class="inline">Celular: </label>
			<input type="text" name="cel" id="cel" maxlength="9" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_cel'] : ''; ?>" />
		</p>
		
		<hr />
		
		<p>
			<label for="email">E-mail: </label>
			<input type="text" name="email" id="email" maxlength="64" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_email'] : ''; ?>" />
		</p>
		<p>
			<label for="blog">Blog / site: </label>
			<input type="text" name="blog" id="blog" maxlength="255" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_blog'] : ''; ?>" />
		</p>
		<p>
			<label for="msn">MSN: </label>
			<input type="text" name="msn" id="msn" maxlength="64" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_msn'] : ''; ?>" />
		</p>
		<p>
			<label for="gtalk">gTalk: </label>
			<input type="text" name="gtalk" id="gtalk" maxlength="64" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_gtalk'] : ''; ?>" />
		</p>
		<p>
			<label for="skype">Skype: </label>
			<input type="text" name="skype" id="skype" maxlength="32" value="<?php echo isset($_GET['editar']) ? $row_rsDadosContato['cont_skype'] : ''; ?>" />
		</p>
		<p>
			<input type="submit" class="btn" id="btnOk" value="Concluir" />

<?php if (!isset($_GET['ajax'])) { ?>
		<a href="index.php" title="Cancelar o cadastro" class="btnCancelar">Cancelar o cadastro</a>
<?php } else { ?>
			<input type="reset" class="btn" id="btnCancelar" value="Cancelar">
<?php } ?>


<?php if (!isset($_GET['editar'])) { ?>
			<input type="hidden" name="action" id="action" value="cadastrar" />
<?php } else { ?>
			<input type="hidden" name="action" id="action" value="editar">
			<input type="hidden" name="ID" id="ID" value="<?php echo $_GET['ID']; ?>">
<?php } ?>

		</p>
	</form>
