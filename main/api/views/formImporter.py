import json
from ..models import Seller, Order, Sale

def iniciate(order_price):
	sale = Sale.objects.create_sale(order_price=order_price)
	sale.save()

	seller_dic = {}

	with open('./seller_list.json') as seller_data:
		seller_list = json.load(seller_data)
		for seller_name, seller in seller_list.items():
			name = seller['name']
			last_name = seller['last_name']
			group = seller['group']
			seller_model = Seller.objects.create_seller(name=name, last_name=last_name, group=group, sale=sale)
			seller_model.save()

			seller_dic[seller_name] = seller_model.pk

	with open('./orders_list.json') as orders_data:
		orders_list = json.load(orders_data)
		for order in orders_list:
			name = order['name']
			last_name = order['last_name']
			amount = order['amount']
			order_seller_name = order['seller']
			seller_id = seller_dic[order_seller_name]
			order_seller = sale.seller_set.filter(pk=seller_id)[:1].get()

			order_model = Order.objects.create_order(name=name,  last_name=last_name, amount=amount, sale=sale, seller=order_seller)
			order_model.save()

	return sale




