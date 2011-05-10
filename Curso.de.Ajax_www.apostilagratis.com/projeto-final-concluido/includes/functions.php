<?php
function formatData($data) { 
	// Esta fun��o tem o objetivo de evitar o SQL Injection
	// Consulte o Google [http://www.google.com.br/search?hl=pt-BR&q=sql+injection] para mais informa��es sobre o assunto.
	$data = strip_tags($data);
	$data = trim($data);
	$data = get_magic_quotes_gpc() == 0 ? addslashes($data) : $data;
	$data = preg_replace("@(--|\#|\*|;)@s", "", $data);
	return $data;
}
function formatDataAjax($data) {
	// Esta fun��o tem o objetivo de evitar o SQL Injection
	// Consulte o Google [http://www.google.com.br/search?hl=pt-BR&q=sql+injection] para mais informa��es sobre o assunto.
	// E trata os acentos que poder�o conter nos dados enviados atrav�s da URL
	$data = strip_tags($data);
	$data = trim($data);
	$data = get_magic_quotes_gpc() == 0 ? addslashes($data) : $data;
	$data = preg_replace("@(--|\#|\*|;)@s", "", $data);
	$data = urldecode($data);   // espec�fico no caso do Ajax
	$data = utf8_decode($data); // espec�fico no caso do Ajax
	return $data;
}
?>