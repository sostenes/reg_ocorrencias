from django.http import HttpResponse,HttpResponseRedirect
from django.template import Context, loader, RequestContext
from django.shortcuts import render_to_response
from datetime import datetime
from defesaCivil.ocorrencias.models import *
from defesaCivil.ocorrencias.forms import *
from django.forms.models import modelformset_factory

from django.core.exceptions import ObjectDoesNotExist
#from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required

from django.shortcuts import get_object_or_404
from django.db.models import Count
from datetime import datetime





def index(request):
    bairros_list = Bairro.objects.all()
    t = loader.get_template('ocorrencias/index.html')
    c = Context({
        'Lista_de_bairros': bairros_list,
    })
    return HttpResponse(t.render(c))

def loggedout(request):
    return HttpResponseRedirect("/ocorrencias/loggedout")
    

def sair(request):
    try:
        del request.session['member_id']
    	return HttpResponseRedirect("/login")
    except KeyError:
        pass
        return HttpResponseRedirect("/ocorrencias/buscar")


#funcao que cuida da parte de autenticacao de usuarios
def login(request):
    if request.method == "POST":
      csrf_token = Context.get('csrf_token', '')
      if csrf_token == 'NOTPROVIDED':
        return ''
        return u'<div style="display:none"><input type="hidden" name="csrfmiddlewaretoken" value="%s" /></div>' % (csrf_token)

        user = User.object.get(username = request.POST['username'])
        if user.password ==request.POST['password'] :
            return HttpResponseRedirect("/ocorrencias/buscar/")
        
        else:
            mensagem = "Login Invalido!"
            t = loader.get_template('registration/login.html')
            c = RequestContext(request,{'mensagem' :mensagem})
            return HttpResponse(t.render(c))

    else:
       mensagem=""
        #AS DUAS LINHAS ABAIXO SAO NECESSARIAS PARA RENDERIZAR A PAGINA... NAO ENCONTREI OUTRA FORMA
       t = loader.get_template('registration/login.html')
       c = Context({'mensagem':mensagem})
       return HttpResponse(t.render(c))
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/login/")


@login_required()
def historico(request, object_id):
	lista_historico = Historico.objects.all()
	lista_historico = lista_historico.filter(id_ocorrencia = object_id)
	id_ocorrencia = object_id
	t = loader.get_template('ocorrencias/historico.html')
	c = Context({'lista_historico' :lista_historico,
	'id_ocorrencia' :id_ocorrencia, 
	})
	
	return HttpResponse(t.render(c))





@login_required()
def novoHistorico(request, object_id):
	historicoFormSet =  modelformset_factory(Historico) 
	if request.method == 'POST':
		formset = historicoFormSet(request.POST,request.FILES)
		
		if(formset.is_valid):
			formset.save()
			return HttpResponseRedirect("/ocorrencias/buscar")
			
		else:
			return HttpResponseRedirect("/ocorrencias/buscar")
	formset = historicoFormSet()
	return render_to_response('ocorrencias/historico_novo.html', {'formset':formset})	

@login_required()
def Imprimir(request, object_id):
	ocorrencia = get_object_or_404(Ocorrencia, pk=object_id)
	lista_pareceres = Parecer.objects.filter(ocorrencia = ocorrencia)

	dados_template = {'titulo' :'Lista de Pareceres',
			'lista_pareceres' :lista_pareceres,
			'ocorrencia' :ocorrencia,}
	
	return render_to_response('ocorrencias/imprimir.html', dados_template)

@login_required()
def registrarParecer(request, object_id):
	if request.method == 'POST':
		try:
		
			ocorrencia = get_object_or_404(Ocorrencia, pk=object_id)
			ocorrencia.pareceres.create(texto=request.POST['texto'], usuarioRegistrador = UsuarioRegistrador.objects.get(id=request.POST['registrador']),data = datetime.now(), status = ocorrencia.status)
			return HttpResponseRedirect("/ocorrencias/"+object_id+"/parecer/")
		
		except Exception, e:
			print str(e)
			return HttpResponseRedirect("/ocorrencias/"+object_id+"/parecer/")
	else:		
		ocorrencia = get_object_or_404(Ocorrencia, pk=object_id)
		ocorrencia_id = object_id
		lista_parecer = Parecer.objects.filter(ocorrencia=ocorrencia)
		registradores = UsuarioRegistrador.objects.all()
		mensagem = "Hello World"
	
		dados_template = {'titulo' :'Lista de Pareceres',
			'mensagem' :mensagem,
			'lista_parecer' :lista_parecer,
			'registradores' :registradores,
			'ocorrencia_id' :ocorrencia_id,}
		return render_to_response('ocorrencias/parecer.html', dados_template)




#O objeto relatorio 1 eh de suma importancia nos relatorios, pois ele eh o que proporciona
#um relacionamento entre os bairros e os assuntos ocorridos nesses bairros de forma simples
#e organizada
#Obs: o atributo ocorrencias vai ter papel de ocorrencias de determinado assunto que aconteceram 
#em um bairro
class ObjetoRelatorio1:
	bairro = None
	assunto = None
	
	ocorrencias = None
	
	def __init__(self, bairro,assunto,ocorrencias):
		self.bairro = bairro
		self.ocorrencias  =  ocorrencias
		self.assunto = assunto
	
	
	
	
@login_required
def rel_ocorrenciaBairro(request):
	
	lista_bairros = Bairro.objects.all().annotate(ocorrencias = Count('ocorrencia'))
	lista_ocorrencias = Ocorrencia.objects.all()
	lista_assuntos = Assunto.objects.all()
	
	ocorrencias = [] 		
	
	
	for bairro in lista_bairros:
		for assunto in lista_assuntos:
			o = len(Ocorrencia.objects.filter(bairro=bairro,assunto=assunto))
			ocorrencias = ocorrencias + [ObjetoRelatorio1(bairro,assunto,o)]
	
	
	

	t = loader.get_template('ocorrencias/rel_ocorrenciaBairro.html')
	c = Context({'lista_bairros' :lista_bairros,'ocorrencias' : ocorrencias,
		})
	
	return HttpResponse(t.render(c))

@login_required
def rel_ocorrenciaAssunto(request):
	#por enquanto isso esta retornando o bairro seu o numero de ocorrencias respectivo
	#dah pra fazer um grafico de pizza com isso
	lista_assuntos = Assunto.objects.all().annotate(ocorrencias = Count('ocorrencia'))
	lista_ocorrencias = Ocorrencia.objects.all()
	lista_bairros = Bairro.objects.all()
	
	#lista vazia de ocorrencias
	ocorrencias = [] 		
	
	
	
	
	if request.method == 'POST':
	
		data1 = request.POST['data1']
		data2 = request.POST['data2']
		
		if data1 != "" and data2 != "":
		
			dia = data1[0:2]
			mes = data1[3:5]
			ano = data1[6:10]
			data1 = ano+"-"+mes+"-"+dia
			
			dia = data2[0:2]
			mes = data2[3:5]
			ano = data2[6:10]
			data2 = ano+"-"+mes+"-"+dia
			
			for bairro in lista_bairros:
				for assunto in lista_assuntos:
					o = len(Ocorrencia.objects.filter(bairro=bairro,assunto=assunto, dataOcorrencia__gte=data1, dataOcorrencia__lte=data2))
					ocorrencias = ocorrencias + [ObjetoRelatorio1(bairro,assunto,o)]
		
			
		elif data1 != "":
			dia = data2[0:2]
			mes = data2[3:5]
			ano = data2[6:10]
			data1 = ano+"-"+mes+"-"+dia
			
			for bairro in lista_bairros:
				for assunto in lista_assuntos:
					o = len(Ocorrencia.objects.filter(bairro=bairro,assunto=assunto, dataOcorrencia__gte=data1))
					ocorrencias = ocorrencias + [ObjetoRelatorio1(bairro,assunto,o)]
			
		elif data2 != "":
			dia = data2[0:2]
			mes = data2[3:5]
			ano = data2[6:10]
			data2 = ano+"-"+mes+"-"+dia
			
			for bairro in lista_bairros:
				for assunto in lista_assuntos:
					o = len(Ocorrencia.objects.filter(bairro=bairro,assunto=assunto, dataOcorrencia__lte=data2))
					ocorrencias = ocorrencias + [ObjetoRelatorio1(bairro,assunto,o)]
	
	else:
		
		for bairro in lista_bairros:
			for assunto in lista_assuntos:
				o = len(Ocorrencia.objects.filter(bairro=bairro,assunto=assunto))
				#adicao de elementos ocorrencia a lista...
				ocorrencias = ocorrencias + [ObjetoRelatorio1(bairro,assunto,o)]
	
	t = loader.get_template('ocorrencias/rel_ocorrenciaAssunto.html')
	c = Context({'lista_assuntos' :lista_assuntos,'ocorrencias' : ocorrencias,
	})
	
	return HttpResponse(t.render(c))
	
	
	
	
	
	
	
	

		
	


@login_required()
def escolherRelatorio(request):
	if request.method =="POST":
		if request.POST['relatorio']=="1":
			return HttpResponseRedirect("/ocorrencias/relatorio/bairro")
		
		if request.POST['relatorio'] == "2":
			return HttpResponseRedirect("/ocorrencias/relatorio/assunto")

	return render_to_response('ocorrencias/relatorios.html',)


@login_required()
def Consulta(request):
	lista_status = Status.objects.all()
	lista_users = User.objects.all()
	lista_bairros = Bairro.objects.all()
	lista_situacao = Situacao.objects.all()
	lista_assunto = Assunto.objects.all()
	lista_ocorrencias  = Ocorrencia.objects.all().order_by('-dataOcorrencia','solicitante')[:24]
	mensagem='Mostrando as ultimas Ocorrencias'
	n_registros =lista_ocorrencias.count()

	usuario = request.user.first_name
				

	if request.method == 'POST':
		try:
			lista_ocorrencias = Ocorrencia.objects.filter(solicitante__icontains=request.POST['solicitante'], endRua__icontains=request.POST['endRua']).order_by("-dataOcorrencia")
			
			if request.POST['status'] != "0":
				lista_ocorrencias =lista_ocorrencias.filter(status=request.POST['status'])
				
			if request.POST['endNum'] !="":
			   lista_ocorrencias = lista_ocorrencias.filter(endNumero__contains=int(request.POST['endNum']))	
			
			if request.POST['usuario'] !="0":
				lista_ocorrencias = lista_ocorrencias.filter(usuario=request.POST['usuario'])			
		
			if request.POST['bairro'] != "0":
				lista_ocorrencias = lista_ocorrencias.filter(bairro=request.POST['bairro'])
			
				
			if request.POST['assunto'] !="0":
				lista_ocorrencias =lista_ocorrencias.filter(assunto=request.POST['assunto'])
			
			if request.POST['situacao'] !="0":
				lista_ocorrencias = lista_ocorrencias.filter(situacao = request.POST['situacao'])
			#filtragem por data			
			
			dataFim = request.POST['dataFinal']
			dataInicio = request.POST['dataOcorrencia']
				
			if  dataFim !="" and dataInicio !="":
	
			    dia = dataInicio[0:2]
			    mes = dataInicio[3:5]
			    ano = dataInicio[6:10]
			    data1=ano+"-"+mes+"-"+dia
			    
			    dia = dataFim[0:2]
			    mes = dataFim[3:5]
			    ano = dataFim[6:10]
			    data2=ano+"-"+mes+"-"+dia

			    lista_ocorrencias=lista_ocorrencias.filter(dataOcorrencia__gte=data1, dataOcorrencia__lte=data2)
			
			elif dataFim !="":
				dia = dataFim[0:2]
				mes = dataFim[3:5]
				ano = dataFim[6:10]
				data2=ano+"-"+mes+"-"+dia
				lista_ocorrencias=lista_ocorrencias.filter(dataOcorrencia__lte=data2)
			    
			elif dataInicio !="":
				dia = dataInicio[0:2]
				mes = dataInicio[3:5]
				ano = dataInicio[6:10]
				data2=ano+"-"+mes+"-"+dia
				lista_ocorrencias=lista_ocorrencias.filter(dataOcorrencia__gte=data2)
			    
				
			
			
			n_registros =lista_ocorrencias.count()
			if n_registros == 0:
				mensagem = "Nenhum Registro Encontrado."
			else:	
				mensagem =  str(n_registros) + " Registro(s) Encontrado(s)."
				
			if request.POST['saida'] == "1":
				dados_template = {'titulo' :'Consulta Ocorrencias',
				'mensagem' :mensagem,
				'lista_ocorrencias' :lista_ocorrencias,
				'lista_status' :lista_status,
				'lista_users' :lista_users,
				'n_registros' :n_registros,
				'lista_bairros' :lista_bairros,
				'lista_situacao' :lista_situacao,
				'lista_assunto' :lista_assunto,
				'usuario' :usuario,}
	
				return render_to_response('ocorrencias/ocorrencia_relatorio.html', dados_template)


			
		except ObjectDoesNotExist:
			mensagem ='Nenhum resultado encontrado!'
			n_registros = '0'	 

	dados_template = {'titulo' :'Consulta Ocorrencias',
		'mensagem' :mensagem,
		'lista_ocorrencias' :lista_ocorrencias,
		'lista_status' :lista_status,
		'lista_users' :lista_users,
		'n_registros' :n_registros,
		'lista_bairros' :lista_bairros,
		'lista_situacao' :lista_situacao,
		'lista_assunto' :lista_assunto,
		'usuario' :usuario,}
	
	return render_to_response('ocorrencias/ocorrencia_consulta.html', dados_template)



@login_required()
def RelatorioPorBairro(request):
	lista_ocorrencias= Ocorrencias.objects.all()
	





@login_required()
def EditarOcorrencia(request, ocorrencia_id):
	ocorrencia = get_object_or_404(Ocorrencia,pk=ocorrencia_id)
	if request.method == "POST":
		form = OcorrenciaForm(request.POST, request.FILES, instance=ocorrencia)
		if form.is_valid():
			form.save()
			return render_to_response('ocorrencias/salvo.html',{})
			
		
	try:	
		form = OcorrenciaForm(instance=ocorrencia)
		return render_to_response("ocorrencias/formulario.html",{'form': form,'ocorrencia_id':ocorrencia_id },context_instance=RequestContext(request))
		
	except Exception, e:
		print str(e)
		print "oi"
		form = OcorrenciaForm(instance=ocorrencia)
		return render_to_response("ocorrencias/formulario.html",{'form': form,'ocorrencia_id':ocorrencia_id},context_instance=RequestContext(request))



@login_required()
def AddOcorrencia(request):
	if request.method=="POST":
		form = OcorrenciaForm(request.POST, request.FILES)
		if form.is_valid():
			form.save()
			return render_to_response('ocorrencias/salvo.html',{})
			
		else:
			#form = OcorrenciaForm()
			return render_to_response("ocorrencias/formulario.html", {'form':form}, 
			context_instance = RequestContext(request))
			
			
	form = OcorrenciaForm()
	return render_to_response("ocorrencias/formulario.html", {'form':form},context_instance = RequestContext(request))



