from tkinter import CASCADE
from django.db import models

from datetime import date

# Create your models here.

class SaleManager(models.Manager):
    def create_sale(self, order_price):
        sale_date = date.today() 
        sale = self.create(date=sale_date, total_orders=0, delivered_orders=0, payed_orders=0, order_price=order_price)
        return sale

class Sale(models.Model):
    date = models.DateField()
    total_orders = models.SmallIntegerField()
    delivered_orders = models.SmallIntegerField()
    payed_orders = models.SmallIntegerField()
    order_price = models.SmallIntegerField()

    objects = SaleManager()

class SellerManager(models.Manager):
    def create_seller(self, name, last_name, group, sale):
        seller = self.create(name=name, last_name=last_name, group=group, sale=sale)
        return seller
    

class Seller(models.Model):
    name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30)
    group = models.CharField(max_length=30)
    sale = models.ForeignKey('Sale', on_delete=models.CASCADE, null=True)

    objects = SellerManager()

    def __str__(self):
        return self.last_name

class OrderManager(models.Manager):
    def create_order(self, name, last_name, amount, sale, seller):
        order = self.create(name=name, last_name=last_name, amount=amount, payed=False, delivered=False, sale=sale, seller=seller)
        return order

class Order(models.Model):
    #seller = models.ForeignKey('Seller', on_delete=models.CASCADE, null=True)
    #sale = models.ForeignKey('Sale', on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    amount = models.SmallIntegerField()
    payed = models.BooleanField()
    #payed_amount = models.IntegerField()
    #payed_state = models.CharField(max_length=10) 
    delivered = models.BooleanField()
    #delivered_state = models.CharField(max_length=10)
    #states "TOTAL" "PARCIAL" "NULO"

    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, null=True)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, null=True)

    objects = OrderManager()

    def __str__(self):
        return self.last_name
