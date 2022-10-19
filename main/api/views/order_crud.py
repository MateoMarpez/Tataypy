from django.shortcuts import render
from django.http import HttpResponse

from ..models import Sale, Order, Seller
from ..serializers import (
    OrderSerializer, PDSerializer, EditOrderSerializer, CreateOrderSerializer, DeleteOrderSerializer
)
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

class PayOrderView(APIView):
    serializer_class = PDSerializer

    def post(self, request, format=None):
        if request.method == 'POST':
            id = request.POST.get('id')
            payed = request.POST.get('result')            
            order = Order.objects.get(pk=id)
            order.payed = (payed == 'true')
            order.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

class DeliverOrderView(APIView):
    serializer_class = PDSerializer

    def post(self, request, format=None):
        if request.method == 'POST':
            id = request.POST.get('id')
            delivered = request.POST.get('result')
            order = Order.objects.get(pk=id)
            order.delivered = (delivered == 'true')
            order.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

class CreateOrderView(APIView):
    serializer_class = CreateOrderSerializer

    def post(self, request, format=None):
        if request.method == 'POST':
            id = request.POST.get('id')
            amount = request.POST.get('amount')
            delivered = request.POST.get('delivered')
            payed = request.POST.get('payed')
            name = request.POST.get('name')
            last_name = request.POST.get('last_name')

            seller = Seller.objects.get(pk=id)
            sale = Sale.objects.first()
            order = Order.objects.create_order(name=name, last_name=last_name, amount=amount, sale=sale, seller=seller)
            order.delivered = (delivered == 'true')
            order.payed = (payed == 'true')
            order.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

class EditOrderView(APIView):
    serializer_class = EditOrderSerializer

    def post(self, request, format=None):
        if request.method == 'POST':
            id = request.POST.get('id')
            amount = request.POST.get('amount')
            delivered = request.POST.get('delivered')
            payed = request.POST.get('payed')
            order = Order.objects.get(pk=id)
            order.amount = amount
            order.delivered = (delivered == 'true')
            order.payed = (payed == 'true')
            order.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

class DeleteOrderView(APIView):
    serializer_class = DeleteOrderSerializer

    def post(self, request, format=None):
        if request.method == 'POST':
            id = request.POST.get('id')
            order = Order.objects.get(pk=id)
            order.delete()
            return Response(status=status.HTTP_200_OK)