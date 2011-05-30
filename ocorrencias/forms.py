from django import forms
from django.forms import ModelForm
from defesaCivil.ocorrencias.models import *

class ocorrenciaForm(ModelForm):
	dataOcorrencia = forms.DateField(
							widget =  forms.DateInput(format="%d/%m/%y"),
									  input_formats = ['%d/%m/%y','%d/%m/%y'])
	dataFinal = forms.DateField(
							widget =  forms.DateInput(format="%d/%m/%y"),
									  input_formats = ['%d/%m/%y','%d/%m/%y'])
								
	class Meta:
		model = Ocorrencia
		



