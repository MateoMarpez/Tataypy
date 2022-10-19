from django.shortcuts import render
from django.http import HttpResponse

from ..models import Sale, Order, Seller
from ..serializers import OrderSerializer, SellerSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

class OrderListView(APIView):
    #serializer_class = OrderSerializer

    def get(self, request, format=None):
        orderQS = Order.objects.order_by('last_name').prefetch_related('seller')

        return Response(OrderSerializer(orderQS, many=True).data, status=status.HTTP_200_OK)