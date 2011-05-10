<?php
// Esta classe realize diversas operações envolvendo o banco de dados, 
//como: conectar, realizar instruções SQL e resultados

class MySQL {
	/* Altere com os seus dados */
	var $host = '67.15.236.106'; // Servidor MySQL
	var $usr = 'imasters_leandro'; // Usuário do banco
	var $pw  = 'WocC63t8'; // Senho do banco
	var $db  = 'imasters_exemplos'; // Nome do banco de dados

	// Variáveis que desempenham as principais juntamente ao banco
	// Não altere daqui para baixo.
	
	var $sql; // Query - instrução SQL
	var $conn; // Conexão ao bano
	var $resultado; // Resultado de uma consulta (query)

	function MySQL() {
	}
	
	// Esta função conecta-se ao banco de dados e o seleciona
	function connMySQL() {
		$this->conn = mysql_connect($this->host,$this->usr,$this->pw);
		if(!$this->conn) {
			echo "<p>Nâo foi possível conectar-se ao servidor MySQL.</p>\n" 
				 .
				 "<p><strong>Erro MySQL: " . mysql_error() . "</strong></p>\n";
				 exit();
		} elseif (!mysql_select_db($this->db,$this->conn)) {
			echo "<p>Não foi possível selecionar o Banco de Dados desejado.</p>\n"
				 .
				 "<p><strong>Erro MySQL: " . mysql_error() . "</strong></p>\n";
				 exit();
		}
	}
	
	function runQuery($sql) {
		$this->connMySQL();
		$this->sql = $sql;
		if($this->resultado = mysql_query($this->sql)) {
			$this->closeConnMySQL();
			return $this->resultado;
		} else {
			//<p>Não foi possível executar a seguinte instrução instrução SQL:</p><p><strong>$sql</strong></p>
			exit("<p>Erro MySQL: " . mysql_error() . "</p>");
			$this->closeConnMySQL();
		}
	}
	
	function closeConnMySQL() {
		return mysql_close($this->conn);
	}
	
} // Finaliza a classe MySQL

$mySQL = new MySQL;

?>