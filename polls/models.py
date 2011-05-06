from django.db import models

# Create your models here.

class Usuario(models.Model):
  login=models.CharField(max_length=100,null=False)
  senha=models.CharField(max_length=10,null=False)
  email=models.CharField(max_length=50)
  matricula=models.CharField(max_length=50,null=False)
  status=models.CharField(max_length=50)
  dataCriacao=models.DateField()
  def __unicode__(self):
    return self.login

class Solicitante(models.Model):
  nome=models.CharField(max_length=50)
  endRua=models.CharField(max_length=100)
  endNumero=models.IntegerField()
  def __unicode__(self):
    return self.nome
  



class Ocorrencia(models.Model):
  solicitante=models.ForeignKey(Solicitante)
  usuario=models.ForeignKey(Usuario)
  status=models.CharField(max_length=10)
  endRua=models.CharField(max_length=100)
  endNumero=models.IntegerField()
  dataOcorrencia=models.DateField()
  dataFinal=models.DateField()
  def __unicode__(self):
    return self.id


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
  
class Edificacao(models.Model):
  numeroPavimentos=models.IntegerField()
  areaConstruida=models.FloatField()
  tipoObra=models.ForeignKey(TipoObra)
  cobertura=models.ForeignKey(Cobertura)
  construcao=models.ForeignKey(ConstrucaoEncosta)
  nome=models.CharField(max_length=50)
  
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
    
    
    
class Piso(models.Model):
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
    
    
class PatologiaEstrutural(models.Model):
  parede=models.ForeignKey(Parede)
  laje=models.ForeignKey(Laje)
  piso=models.ForeignKey(Piso)
  coluna=models.ForeignKey(Coluna)
  telhado=models.ForeignKey(Telhado)


class Historico(models.Model):
  texto=models.CharField(max_length=1000)
  data=models.DateField()
  
