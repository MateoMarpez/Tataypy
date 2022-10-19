from rest_framework import serializers
from .models import Sale, Order, Seller

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('id', 'date', 'total_orders', 'delivered_orders', 'payed_orders', 'order_price')

class CreateSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('order_price', )


#ORDER SERIALIZERS
class RelatedSellerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Seller
        fields = ('id', 'name', 'last_name', 'group', )

class OrderSerializer(serializers.ModelSerializer):
    seller = RelatedSellerSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'name', 'last_name','amount', 'payed', 'delivered', 'seller', )

class OrderIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', )


#SELLER SERIALIZERS
class RelatedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'name', 'last_name','amount','payed', 'delivered', )

class SellerSerializer(serializers.ModelSerializer):
    order_set = RelatedOrderSerializer(many=True, read_only=True)
    
    class Meta:
        model = Seller
        fields = ('id', 'name', 'last_name', 'group', 'order_set')

class SellerIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ('id', )

#SEARCH SERIALIZER
class SearchSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    type = serializers.CharField(max_length=200)

#CRUD SERIALIZERS
class PDSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    result = serializers.BooleanField()

class CreateOrderSerializer(serializers.ModelSerializer):    
    id = serializers.IntegerField()

    class Meta:
        model = Order
        fields = ('id', 'name', 'last_name', 'amount', 'payed', 'delivered', )

class EditOrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Order
        fields = ('id', 'amount', 'payed', 'delivered', )

class DeleteOrderSerializer(serializers.Serializer):
    id = serializers.IntegerField()