from django import forms
from django.forms import ModelForm
from defesaCivil.ocorrencias.models import *

class OcorrenciaForm(ModelForm):
	dataOcorrencia = forms.DateField(
							widget =  forms.DateInput(format="%d/%m/%Y"),
									  input_formats = ['%d/%m/%Y','%d/%m/%Y'])
	dataFinal = forms.DateField(
							widget =  forms.DateInput(format="%d/%m/%Y"),
									  input_formats = ['%d/%m/%Y','%d/%m/%Y'])
	
	
	
	class Meta:
		model = Ocorrencia
		



