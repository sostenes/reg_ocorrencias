/*
Sei que o texto aparenta ser longo mas n�o deixe de lelo pq nele est�o todas as explica��es nescess�rias para utilizar o arquivo e manipulalo de form geral.

Est� fun��o abaixo � responsavel pela exibi��o das divs.
Toda vez que voc� vir um * loga abaixo havera uma descri��o ou uma dica.

COMO FUNCIONA:
P�GINA HTML: (importando o arquivo javascript para o html)

<script language="javascript" src="NOME_DO_ARQUIV"></script>

P�GINA HTML: (montando a(s) div para serem exibidas)

<div ID="div1"* style="display:none"*>   #### CONTEUDO DA DIV ####    </div>

* O ID � imprecindivel. Se o id n�o estiver digitado e com um valor n�o funcionar�. Por ele vai servir como uma "ancora de sinaliza��o" para poder-mos manipular.

* Aconselho a colocar o style ap�s ter colocado todo o conteudo. Principalmente se vc utiliza o dreamweavr 8 que dependendo da vers�o da um bug e fecha ai vc perde tudo.


P�GINA HTML: (montando links para exibir a div)

<a href=#null onClick="FUN��O('ID')">MOSTRAR DIV</DIV>

O ID que aparece acima � o id da div que sera apresentada. E a  fun��o que aparece escrita � o nome da fun��o que � rresponsavel por esconder e exibir... ---- No nossso caso a fun��o � exibe.

EXEMPLO DE LINKS

<a href=#null onClick="exibe('div1')">MOSTRAR DIV</DIV>

PS: N�o tenha medo ou vergonha de pedir ajuda. Eu n�o ligo em ajudar a quem gosta de aprender, pois afinal conhecimento n�o � crime e ent�o deve ser passado por que o conhecimento junto a uma pessoa nada mais � do que um egoismo que logo mais ser� ultrapassado.

Espero que tenha explicado tuto certo.

Pe�o a vc que est� lendo este doc que caso useo em algum site coloque o arquivo com o texto explicativo pois afinal como disse acima o conhecimento deve ser passado.
Para entrar em contato comigo:

Vitor Dias
vitor_vdpaiva@yahoo.com.br

*/


function exibe(id){
	x=document.getElementById(id);
	
	/***********************************************/
	
	v1 = document.getElementById('1');
	v2 = document.getElementById('2');
	v3 = document.getElementById('3');
	v4 = document.getElementById('4');
	v5 = document.getElementById('5');
	
	if (v1.style.display!='none'){
		v1.style.display='none';
	}
	if (v2.style.display!='none'){
		v2.style.display='none';
	}
	if (v3.style.display!='none'){
		v3.style.display='none';
	}
	if (v4.style.display!='none'){
		v4.style.display='none';
	}
	if (v5.style.display!='none'){
		v5.style.display='none';
	}
	
	/*************************************************/
	
	
	
	if (x.style.display!='none'){
		x.style.display='none';
	}else{
		x.style.display='';
	}

	
	
	
}


/*Este script abaixo � s� uma brincadeira para enfeitas as celular que est�o com os links.
Tem quase o mesmo Principiu das divs mais muda que  utilizeis duas functios ao inver de uma � bem simples.


A primeira function (li), recebe o ID da CELULA e coloca uma imagem de fundo.

HTML - montando a celula

<table>
<tr>
	<td id="id_da_celula" onMouseOver="li('id_da_celula')" onMouseOut="lo('id_da_celula')">    #Conteudo#   </td>
</tr>
</table>

Lembrando que o ID � super nescess�rio.
EXEMPLO MIAS DEFINIDO

<table>
<tr>
	<td id="cel" onMouseOver="li('cel')" onMouseOut="lo('cel')">    #Conteudo#   	</td>
</tr>
</table>

*/



//////////////////////////////////////////////////////////////////////////////////
																				//
			function li(id){													//
				c=document.getElementById(id);									//
				c.background="images/fundo.png";								//
			}																	//
																				//
																				//
			function lo(id){													//
				c=document.getElementById(id);									//
				c.background="";												//
			}																	//
//////////////////////////////////////////////////////////////////////////////////