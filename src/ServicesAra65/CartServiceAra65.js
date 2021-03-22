// Service file to input cart services

// Get cart service
export async function getCart(){
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/cartAra65/`)
    .then(response => response.json());
}

// Add item cart service
export function addItem(item){
    const newItem = JSON.stringify(item);
    
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/cartAra65/`,
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: newItem        
        }
    )
    .then(response => response.json());
}

// Delete item cart service
export function deleteItem(id){
    const deleteData = JSON.stringify({"id": id});
    console.log(deleteData);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/cartAra65/`,
        {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
            body: deleteData        
        }
    )
    .then(response => response.json());
}

// Checkout service
export function checkout(){
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/cartAra65/checkout`,{
        method: 'POST',
        headers: {'Content-type': 'application/json'}
    })
    .then(response => response.json());
}