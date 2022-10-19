from django.shortcuts import render
from django.http import HttpResponse
import json
from rest_framework.decorators import api_view, renderer_classes
from ..models import Sale, Order, Seller
from ..serializers import OrderSerializer, SellerSerializer, SellerIdSerializer, SearchSerializer, OrderIdSerializer
from ..filters import searchFilter
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

@api_view(('POST',))
def altSearch(request):
    if request.method == 'POST':
        searchTerm = request.POST.get('name')
        if (searchTerm == None):
            searchTerm = ""
        typeQS = request.POST.get('type')
        if (typeQS == 'seller'):
            sellerQS = Seller.objects.prefetch_related('order_set')
            sellerIdQS = searchFilter(searchTerm, sellerQS)
            return Response(SellerIdSerializer(sellerIdQS, many=True).data, status=status.HTTP_200_OK)
        else:
            orderQS = Order.objects.all()
            orderIdQS = searchFilter(searchTerm, orderQS)
            return Response(OrderIdSerializer(orderIdQS, many=True).data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

class SearchView(APIView):
    serializer_class = SearchSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if request.method == 'POST':
            searchTerm = request.POST.get('name')
            if (searchTerm == None):
                searchTerm = ""
            typeQS = request.POST.get('type')
            if (typeQS == 'seller'):
                sellerQS = Seller.objects.prefetch_related('order_set')
                sellerIdQS = searchFilter(searchTerm, sellerQS)
                return Response(SellerIdSerializer(sellerIdQS, many=True).data, status=status.HTTP_200_OK)
            else:
                orderQS = Order.objects.all()
                orderIdQS = searchFilter(searchTerm, orderQS)
                return Response(OrderIdSerializer(orderIdQS, many=True).data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        