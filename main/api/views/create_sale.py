from django.shortcuts import render
from django.http import HttpResponse

from ..models import Sale
from ..serializers import SaleSerializer, CreateSaleSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .formImporter import iniciate
# Create your views here.

class SaleView(generics.ListAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

class CreateSaleView(APIView):
    serializer_class = CreateSaleSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            order_price = serializer.data.get('order_price')
            #sale = Sale.objects.create_sale(order_price=order_price)
            
            #sale = iniciate(order_price)
            sale = Sale.objects.all()[:1].get()
            return Response(SaleSerializer(sale).data, status=status.HTTP_201_CREATED)


def main(request):
    return HttpResponse("<h1>HELLO</h1>")



def createSale(request):
    pass