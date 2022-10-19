export function ApplyFilter (list, filterBy) {
    if (filterBy.ids[0] === null) {
        return []
    } else {
        const newList = list.filter((seller) => {
            if ((filterBy.values.length === 0) && (filterBy.ids.length === 0)) {                          
                return seller
            }
            else if (filterBy.values.length === 0) {                      
                return (filterBy.ids).includes(seller.id)
            }
            else if (filterBy.ids.length === 0) {
                return (filterBy.values.includes(seller.group))
            }
            else {
                return ((filterBy.values.includes(seller.group)) && (filterBy.ids.includes(seller.id)))
            }                  
            
        })

        if (filterBy.ids.length === 0) {
            return newList
        } else {
            const sortedList = newList.sort((a, b) => {
                return (
                    filterBy.ids.indexOf(a.id) - filterBy.ids.indexOf(b.id)
                )
            })
        }
    
        return newList
    }
    
    
}

export function ApplyFilterOrder (list, filterBy) {
    const newList = list.filter((order) => {
        if ((filterBy.values.length === 0) && (filterBy.ids.length === 0)) {                          
            return order
        }
        else if (filterBy.values.length === 0) {                      
            return (filterBy.ids).includes(order.id)
        }
        else if (filterBy.ids.length === 0) {
            return (filterBy.values.includes(order.seller.group))
        }
        else {
            return ((filterBy.values.includes(order.seller.group)) && (filterBy.ids.includes(order.id)))
        }                  
        
    })

    return newList
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }      

export function getIds(searchTerm) {
    let idList = [];
    let csrf = getCookie("csrftoken");
    if (typeof searchTerm === 'undefined' || searchTerm === null) {
        searchTerm = ""
    }

    if (searchTerm.trim() === "") {
        return []
    } 
    else {
        $.ajax({
            url: 'api/search/',
            type: "POST",
            async: false,
            data: {"name": searchTerm, "type": "seller"},
            dataType: "json",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Accept': 'application/json, text/plain, */*',
              },
              success: (data) => {
                data.forEach((item) => {
                    idList.push(item.id);
                });
              },
              error: (error) => {
                console.log(error);
              }
        });
        if (idList.length === 0) {
            return [null];
        } else {return idList}
    }
}

export function getIdsOrder(searchTerm) {
    let idList = [];
    let csrf = getCookie("csrftoken");
    if (typeof searchTerm === 'undefined' || searchTerm === null) {
        searchTerm = ""
    }

    if (searchTerm.trim() === "") {
        return []
    } 
    else {
        $.ajax({
            url: 'api/search/',
            type: "POST",
            async: false,
            data: {"name": searchTerm, "type": "order"},
            dataType: "json",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Accept': 'application/json, text/plain, */*',
              },
              success: (data) => {
                data.forEach((item) => {
                    idList.push(item.id);
                });
              },
              error: (error) => {
                console.log(error);
              }
        });
        if (idList.length === 0) {
            return [null];
        } else {return idList}
    }
}

export function getIds2(newSearchTerm) {
    let idList = [];
    let searchTerm = newSearchTerm;
    let csrftoken = getCookie("csrftoken");    
    console.log('Cookies: ', csrftoken);
    fetch('api/search/', {
        method: "POST",
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            'post_data': {name: searchTerm}
        })
    }).then(response => response.json())
    .then((data) => {
            console.log('Data from fetch post: ', data)
        });

    return idList;
}