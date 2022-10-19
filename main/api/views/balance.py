from django.shortcuts import render
from django.http import HttpResponse

from ..models import Sale, Order, Seller
from ..serializers import OrderSerializer, SellerSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

class BalanceView(APIView):

    def get(self, request, format=None):
        
        pass