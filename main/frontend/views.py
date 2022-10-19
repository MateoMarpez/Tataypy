from django.shortcuts import render
from django.template import RequestContext
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.

@ensure_csrf_cookie
def index(request, *args, **kwargs):
    #context = RequestContext(request)
    return render(request, 'frontend/index.html')
