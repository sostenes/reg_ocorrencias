<?php
// Este primeiro header, corrigi o problema de acentuação dos caracteres.
header('Content-Type: text/html; charset=iso-8859-1');
// Os dois headers seguintes, evitam que a página seja armazenada em cache no navegador.
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
?> 
<?php
if (isset($_GET['ajax'])) {
	require('includes/class.MySQL.php');
}
// Seleciona os dados dos contatos cadastrados
$rsContatos = $mySQL->runQuery("SELECT *, date_format(cont_data_cad, '%d/%m/%Y') AS cont_data_cad FROM agenda_contatos ORDER BY cont_nome");
$row_rsContatos = mysql_fetch_assoc($rsContatos);
$totalContatos = mysql_num_rows($rsContatos);
?>
		<table summary="Relatório dos cadastrados na agenda de contatos">
			<caption>Relatório dos cadastrados na agenda de contatos</caption>
			
			<thead>
				<tr>
					<th scope="col">Nome</th>
					<th scope="col">(DDD) Telefone / Celular</th>
					<th scope="col">E-mail</th>
					<th scope="col">Data do cadastro</th>
					<th scope="col" colspan="2">Funções</th>
				</tr>
			</thead>
			<tbody>
	<?php if ($totalContatos > 0) { // Exibiremo somente se houver alguém cadastrados ?>
	<?php do { // Início do loop ?>
				<tr>
					<td><?php echo $row_rsContatos['cont_nome']; ?></td>
					<td>(<?php echo $row_rsContatos['cont_ddd']; ?>) <?php echo $row_rsContatos['cont_tel']; ?> / <?php echo $row_rsContatos['cont_cel']; ?></td>
					<td><a href="mailto:<?php echo $row_rsContatos['cont_email']; ?>"><?php echo $row_rsContatos['cont_email']; ?></a></td>
					<td><?php echo $row_rsContatos['cont_data_cad']; ?></td>
					<td>
						<a href="index.php?exibirFormulario=true&amp;editar=true&amp;ID=<?php echo $row_rsContatos['cont_id']; ?>" title="" rel="btnEditar-<?php echo $row_rsContatos['cont_id']; ?>">
							<img src="img/btnEditar.gif" width="16" height="16" alt="" />
						</a>
					</td>
					<td>
						<a href="index.php?excluir=true&amp;ID=<?php echo $row_rsContatos['cont_id']; ?>" title="" rel="btnExcluir-<?php echo $row_rsContatos['cont_id']; ?>">
							<img src="img/btnDelete.gif" width="16" height="16" alt="" />
						</a>
					</td>
				</tr>
	<?php } while($row_rsContatos = mysql_fetch_assoc($rsContatos)); // Término do loop?>
	<?php } else { // Exibiremos uma mensagem se não houver ninguém cadastrado ?>
				<tr>
					<td colspan="6">No momento não há contatos cadastrados.</td>
				</tr>
	<?php } ?>
				<tr>
					<td colspan="6"><strong>Total de contatos cadastrados: <?php echo $totalContatos; // Informamos o total de cadastrados ?></strong></td>
				</tr>
			</tbody>
		</table>
