from django.conf.urls.defaults import *

#as proximas linhas habilitam as views genericas
from django.views.generic import list_detail
from django.views.generic import create_update
from defesaCivil.ocorrencias.models import *
from defesaCivil.ocorrencias.views import Consulta, historico, novoHistorico, login, sair, loggedout  
from defesaCivil.ocorrencias.views import index,rel_ocorrenciaBairro,rel_ocorrenciaAssunto,escolherRelatorio, registrarParecer
from django.contrib.auth.decorators import login_required
from django.conf import settings



from django.contrib.auth.views import logout

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()



params_novo_ocorrencia = {
            'model' : Ocorrencia,
            'post_save_redirect' : '/ocorrencias/',
}


params_novo_ocorrencia2 = {
            'model' : Ocorrencia,
            'post_save_redirect' : '/ocorrencia/buscar',
}



urlpatterns = patterns('',
    # Example:
    # (r'^defesaCivil/', include('defesaCivil.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    #arquivos estaticos css,imagens js e etc
    (r'^site_media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    
    
    
    # Uncomment the next line to enable the admin:
    
    (r'^$','django.contrib.auth.views.login',{'template_name': 'registration/login.html'}),
    (r'^admin/', include(admin.site.urls)),
    (r'^ocorrencia/buscar/$',Consulta),
    (r'^ocorrencias/relatorios/', escolherRelatorio),
    (r'^ocorrencias/relatorio/bairro/$', rel_ocorrenciaBairro),
    (r'^ocorrencias/relatorio/assunto/$', rel_ocorrenciaAssunto),
    (r'^index/$',index),
    (r'^ocorrencias/novo/$', login_required(create_update.create_object), params_novo_ocorrencia, 'nova_ocorrencia'),     
    (r'^ocorrencias/$', login_required(list_detail.object_list), { 'queryset' : Ocorrencia.objects.all(), 'paginate_by' :2 }, 'lista_ocorrencias'),
    (r'^ocorrencias/(?P<object_id>\d+)/$', login_required(list_detail.object_detail), { 'queryset' : Ocorrencia.objects.all() }, 'ver_ocorrencia'),
    (r'ocorrencias/(?P<object_id>\d+)/editar/$', login_required(create_update.update_object), params_novo_ocorrencia2, 'editar_ocorrencia'),
    ('^logout/$',logout , {'template_name': 'registration/logout.html'}),
    ('^login/$', 'django.contrib.auth.views.login',{'template_name': 'registration/login.html'}),
    
    (r'ocorrencias/(?P<object_id>\d+)/parecer/$', registrarParecer),
   
   
)
