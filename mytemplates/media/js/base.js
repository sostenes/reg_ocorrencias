
function limpar(obj){
	document.getElementById(obj).value="";
	}






$(document).ready(function(){
$('#data1').click(function (){limpar('data1');});
$('#data2').click(function (){limpar('data2');});
$('#solicitante').click(function (){limpar('solicitante');});
$('#endRua').click(function (){limpar('endRua');});
$('#endNum').click(function (){limpar('endNum');});

/*....Mascaras...*/
$('#dataOcorrencia').mask("99/99/9999");
$('#dataFinal').mask("99/99/9999");

});



