from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('list/', index),
    path('create_sale/', index),
    path('list', index),
    path('balance/', index)
]
