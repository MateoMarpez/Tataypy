from django.urls import path
from .views import *

urlpatterns = [
    path('', main),
    path('create-sale/', CreateSaleView.as_view()),
    path('list', ListView.as_view()),
    path('order-list', OrderListView.as_view()),
    path('search/', SearchView.as_view()),
    path('pay-order/', PayOrderView.as_view()),
    path('deliver-order/', DeliverOrderView.as_view()),
    path('create-order/', CreateOrderView.as_view()),
    path('edit-order/', EditOrderView.as_view()),
    path('delete-order/', DeleteOrderView.as_view()),
    path('balance/', BalanceView.as_view())
]