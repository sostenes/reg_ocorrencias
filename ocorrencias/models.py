from django.db import models
from django.contrib.auth.models import User

# Create your models here.


#class Usuario(models.Model):
#  login=models.CharField(max_length=100,null=False)
#  senha=models.CharField(max_length=10,null=False)
#  email=models.CharField(max_length=50)
#  matricula=models.CharField(max_length=50,null=False)
#  status=models.CharField(max_length=50)
#  dataCriacao=models.DateField()
#  def __unicode__(self):
#    return self.login


class Status(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
     return self.nome

class Situacao(models.Model):
	nome=models.CharField(max_length=50)
	def __unicode__(self):
		return self.nome
		

class Assunto(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
   return self.nome
  
class Bairro(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
    
class Cobertura(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
    
    
class Coluna(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
    
    
class ConstrucaoEncosta(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome

class TipoObra(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome

class EstadoConstrucao(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
  

class Parede(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
    
    
class Laje(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
    
class ModoConstrutivo(models.Model):
	nome=models.CharField(max_length=50)
	def __unicode__(self):
		return self.nome    
    
class Piso(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome


class Viga(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome


class Telhado(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
    
class Coluna(models.Model):
  nome=models.CharField(max_length=50)
  def __unicode__(self):
    return self.nome
    
    
class Origem(models.Model):
	nome = models.CharField(max_length = 50)
	
	def __unicode__(self):
		return self.nome

#depois tenho que terminar essa questao do protocolo
class Protocolo(models.Model):
	numero = models.IntegerField()
	ano = models.IntegerField()
	
	def __unicode__(self):
		return str(self.numero)+"/"+str(self.ano)
	

class Ocorrencia(models.Model):
  solicitante=models.CharField( max_length=50, null=True, blank=True)
  enderecoSolicitante=models.CharField(max_length=100, null=True, blank=True)
  numero=models.IntegerField(null=True, blank=True)
  bairro=models.ForeignKey(Bairro, null=True, blank=True)
  pReferencia = models.CharField(max_length = 200, null=True, blank=True)
  usuario=models.ForeignKey(User)
  status=models.ForeignKey(Status)
  situacao=models.ForeignKey(Situacao)
  assunto=models.ForeignKey(Assunto)
  
  #Se a ocorrencia eh espontanea ou dirigida
  origem = models.ForeignKey(Origem)
  
  #coloquei como charfield para guardar no formato DDD/DDDDD
  #onde DDD eh o numero da ocorrencia e DDDDD eh o ano em que ela ocorreu
  #numOcorrencia = models.ForeignKey(Protocolo, unique=True, null=True, blank=True)
  
  #propriedades da ocorrencia
  endRua=models.CharField(max_length=100)
  endNumero=models.IntegerField()
  dataOcorrencia=models.DateField()
  dataFinal=models.DateField(null=True, blank=True)

  numeroPavimentos=models.IntegerField(null=True, blank=True)
  areaConstruida=models.FloatField(null=True, blank=True)
  tipoObra=models.ForeignKey(TipoObra, null=True, blank=True)
  cobertura=models.ForeignKey(Cobertura, null=True, blank=True)
  construcaoEncosta=models.ForeignKey(ConstrucaoEncosta, null=True, blank=True)
  estadoConstrucao=models.ForeignKey(EstadoConstrucao, null=True, blank=True)
  modoConstrutivo=models.ForeignKey(ModoConstrutivo, null=True, blank=True)

  viga=models.ForeignKey(Viga, null=True, blank=True)
  parede=models.ForeignKey(Parede, null=True, blank=True)
  laje=models.ForeignKey(Laje, null=True, blank=True)
  piso=models.ForeignKey(Piso, null=True, blank=True)
  coluna=models.ForeignKey(Coluna, null=True, blank=True)
  telhado=models.ForeignKey(Telhado, null=True, blank=True)
  historico= models.TextField(null=True, blank=True)



  def __unicode__(self):
    return self.solicitante



class UsuarioRegistrador(models.Model):
	nome = models.CharField(max_length=100)
	
	def __unicode__(self):
		return self.nome




class Parecer(models.Model):
#a ligacao entre essa classe e a classe Ocorrencia eh dada pela
#chave estrangeira "ocorrencia",
#para criar um novo parecer de uma ocorrencia eh necessario
#acessar a ocorrencia da seguinte forma:
#o = Ocorrencia.objects.get(id=1)
#o.parecer.create("aqui colocando todos os campos do parecer")
  ocorrencia = models.ForeignKey(Ocorrencia, related_name='pareceres')
  texto=models.TextField(max_length=1000)
  data=models.DateField()
  status=models.ForeignKey(Status)
  usuarioRegistrador = models.ForeignKey(UsuarioRegistrador)
  
  def __unicode__(self):
  	return str(self.texto)
  




