from django.contrib import admin
from .models import Sale, Seller, Order 

# Register your models here.

admin.site.register(Sale)
admin.site.register(Seller)
admin.site.register(Order)