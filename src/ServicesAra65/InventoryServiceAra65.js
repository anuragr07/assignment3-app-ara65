// Service file to put all services of Inventory

// Get inventory service
export function getInventory(){
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/inventoryAra65/`)
    .then(response => response.json());
}

// Post inventory service to update inventory
export function updateInventory(cart){

    const cartToCheckout = JSON.stringify(cart);

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/inventoryAra65/`,
    {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: cartToCheckout
    }
    )
    .then(response => response.json());
}