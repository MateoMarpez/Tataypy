from django.http import HttpResponse
from .models import Seller
from fuzzywuzzy import fuzz, process
from django.db.models import Case, When


"""
def ApplyFilter(response):	
	set_ramas = set()
	if response.POST.get('manada') == 'check':
		set_ramas.add('MANADA')
	if response.POST.get('unidad') == 'check':
		set_ramas.add('UNIDAD')
	if response.POST.get('caminante') == 'check':
		set_ramas.add('CAMINANTES')
	if response.POST.get('rover') == 'check':
		set_ramas.add('ROVERS')
	if set_ramas == {}:
		set_ramas = {'MANADA', 'UNIDAD', 'CAMINANTES', 'ROVERS'}
	
	print(set_ramas)
	none_qs = Vendedor.objects.none()
	for r in set_ramas:		
		qs_rama = Vendedor.objects.filter(rama=r)
		none_qs = none_qs.union(qs_rama)
		#lista_rama = GetListaRama(r)
		#lista_vendedor.append(lista_rama)
	
	lista_vendedor = none_qs.order_by('apellido')
	

	return lista_vendedor

def ApplyFilterDjango(response):
	form = CreateForm(response.POST)
	search_text = response.POST.get('search')
	set_ramas = set()
	if form.is_valid():
		if form.cleaned_data["manada"] == True:
			set_ramas.add('MANADA')
		if form.cleaned_data["unidad"] == True:
			set_ramas.add('UNIDAD')
		if form.cleaned_data["caminante"] == True:
			set_ramas.add('CAMINANTES')
		if form.cleaned_data["rover"] == True:
			set_ramas.add('ROVERS')
	if response.POST.get('tipo') == 'CLIENTE':
		lista_final = Pedido.objects.all().order_by('apellido')
	else:
		if len(set_ramas) == 0:
			#set_ramas.add('MANADA', 'UNIDAD', 'CAMINANTES', 'ROVERS')
			lista_final = Vendedor.objects.all().order_by('apellido')
		else:
			lista_final = Vendedor.objects.filter(rama__in=set_ramas).order_by('apellido')
		
	return searchFilter(search_text, lista_final)

"""

def searchFilter(search_text, qs_pedido ):
	if search_text == '':
		return qs_pedido
	else:
		lista_apellido = {}
		lista_nombre = {}
		for pedido in qs_pedido:
			lista_apellido[pedido.pk] = pedido.last_name
			lista_nombre[pedido.pk] = pedido.name
		matches = process.extractBests(search_text, lista_apellido, limit=30, score_cutoff = 65)
		matches_n = process.extractBests(search_text, lista_nombre, limit=30, score_cutoff = 65)
		match_list = []
		for match in matches:
			match_list.append(match[2])
		for match in matches_n:
			match_list.append(match[2])
		preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(match_list)])
		lista_pedido = qs_pedido.filter(pk__in=match_list).order_by(preserved)
	return lista_pedido