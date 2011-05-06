/*
Sei que o texto aparenta ser longo mas não deixe de lelo pq nele estão todas as explicações nescessárias para utilizar o arquivo e manipulalo de form geral.

Está função abaixo é responsavel pela exibição das divs.
Toda vez que você vir um * loga abaixo havera uma descrição ou uma dica.

COMO FUNCIONA:
PÁGINA HTML: (importando o arquivo javascript para o html)

<script language="javascript" src="NOME_DO_ARQUIV"></script>

PÁGINA HTML: (montando a(s) div para serem exibidas)

<div ID="div1"* style="display:none"*>   #### CONTEUDO DA DIV ####    </div>

* O ID é imprecindivel. Se o id não estiver digitado e com um valor não funcionará. Por ele vai servir como uma "ancora de sinalização" para poder-mos manipular.

* Aconselho a colocar o style após ter colocado todo o conteudo. Principalmente se vc utiliza o dreamweavr 8 que dependendo da versão da um bug e fecha ai vc perde tudo.


PÁGINA HTML: (montando links para exibir a div)

<a href=#null onClick="FUNÇÃO('ID')">MOSTRAR DIV</DIV>

O ID que aparece acima é o id da div que sera apresentada. E a  função que aparece escrita é o nome da função que é rresponsavel por esconder e exibir... ---- No nossso caso a função é exibe.

EXEMPLO DE LINKS

<a href=#null onClick="exibe('div1')">MOSTRAR DIV</DIV>

PS: Não tenha medo ou vergonha de pedir ajuda. Eu não ligo em ajudar a quem gosta de aprender, pois afinal conhecimento não é crime e então deve ser passado por que o conhecimento junto a uma pessoa nada mais é do que um egoismo que logo mais será ultrapassado.

Espero que tenha explicado tuto certo.

Peço a vc que está lendo este doc que caso useo em algum site coloque o arquivo com o texto explicativo pois afinal como disse acima o conhecimento deve ser passado.
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


/*Este script abaixo é só uma brincadeira para enfeitas as celular que estão com os links.
Tem quase o mesmo Principiu das divs mais muda que  utilizeis duas functios ao inver de uma é bem simples.


A primeira function (li), recebe o ID da CELULA e coloca uma imagem de fundo.

HTML - montando a celula

<table>
<tr>
	<td id="id_da_celula" onMouseOver="li('id_da_celula')" onMouseOut="lo('id_da_celula')">    #Conteudo#   </td>
</tr>
</table>

Lembrando que o ID é super nescessário.
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