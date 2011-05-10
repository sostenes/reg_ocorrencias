<?php
function formatData($data) { 
	// Esta funчуo tem o objetivo de evitar o SQL Injection
	// Consulte o Google [http://www.google.com.br/search?hl=pt-BR&q=sql+injection] para mais informaчѕes sobre o assunto.
	$data = strip_tags($data);
	$data = trim($data);
	$data = get_magic_quotes_gpc() == 0 ? addslashes($data) : $data;
	$data = preg_replace("@(--|\#|\*|;)@s", "", $data);
	return $data;
}
function formatDataAjax($data) {
	// Esta funчуo tem o objetivo de evitar o SQL Injection
	// Consulte o Google [http://www.google.com.br/search?hl=pt-BR&q=sql+injection] para mais informaчѕes sobre o assunto.
	// E trata os acentos que poderуo conter nos dados enviados atravщs da URL
	$data = strip_tags($data);
	$data = trim($data);
	$data = get_magic_quotes_gpc() == 0 ? addslashes($data) : $data;
	$data = preg_replace("@(--|\#|\*|;)@s", "", $data);
	$data = urldecode($data);   // especэfico no caso do Ajax
	$data = utf8_decode($data); // especэfico no caso do Ajax
	return $data;
}
?>