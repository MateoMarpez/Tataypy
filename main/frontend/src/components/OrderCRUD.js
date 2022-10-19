export function CreateOrder (order) {
    console.log('Attempting AJAX')
    let newOrder = {}
    $.ajax({
        url: 'api/create-order/',
        type: "POST",
        async: false,
        data: {
            "id": order.id,
            "name": order.name,
            "last_name": order.last_name,
            "amount": order.amount,
            "payed": order.payed,
            "delivered": order.delivered,
        },
        dataType: "json",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Accept': 'application/json, text/plain, */*',
          },
          success: (data) => {            
            newOrder = data;
            alert('Pedido creado con éxito');

          },
          error: (error) => {
            console.log(error);
          }
    })

    return newOrder
}

export function EditOrder (order) {
  console.log('Attempting AJAX')
  let newOrder = {}
  $.ajax({
      url: 'api/edit-order/',
      type: "POST",
      async: false,
      data: {
          "id": order.id,
          "amount": order.amount,
          "payed": order.payed,
          "delivered": order.delivered,
      },
      dataType: "json",
      headers: {
          "X-Requested-With": "XMLHttpRequest",
          'Accept': 'application/json, text/plain, */*',
        },
        success: (data) => {          
          newOrder = data;
          console.log('Order recieved: ',newOrder)
          alert('Pedido creado con éxito');
        },
        error: (error) => {
          console.log(error);
        }
  })
  return newOrder
}

export function PayOrder (order) {
  console.log('Attempting to pay')
  const id = order.id;
  const payed = !order.payed;
  console.log(payed, order.payed)
  $.ajax({
    url: 'api/pay-order/',
    type: "POST",
    async: false,
    data: {
        "id": id,
        "result": payed,
    },
    dataType: "json",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Accept': 'application/json, text/plain, */*',
      },
      success: (data) => {   
        console.log('Order payed')},
      error: (error) => {
        console.log(error);
      }
})
}


export function DeliverOrder (order) {
  console.log('Attempting to deliver')
  const id = order.id;
  const delivered = !order.delivered;
  $.ajax({
    url: 'api/deliver-order/',
    type: "POST",
    async: false,
    data: {
        "id": id,
        "result": delivered,
    },
    dataType: "json",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Accept': 'application/json, text/plain, */*',
      },
      success: (data) => {   
        console.log('Order delivered')},
      error: (error) => {
        console.log(error);
      }
})
}
