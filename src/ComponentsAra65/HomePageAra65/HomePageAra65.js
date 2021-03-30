import React, { useEffect, useState } from "react";
import { addItem, checkout, deleteItem, getCart } from "../../ServicesAra65/CartServiceAra65";
import { getInventory, updateInventory } from "../../ServicesAra65/InventoryServiceAra65";
import CartAra65 from "../CartAra65/CartAra65";
import HeaderAra65 from "../HeaderAra65/HeaderAra65";
import InventoryAra65 from "../InventoryAra65/InventoryAra65";

function HomePageAra65() {

    const [cart, setCart] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0.00);

    useEffect(() => {
        refreshPage();
    }, []);

    async function refreshPage(){
        // For inventory
        await getInventory()
        .then(json => {
            setInventory(json);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setError(null);
        })
        
        // For cart
        await getCart()
        .then(async (data) => {
            setCart(data)
        })
        .then(generateTotal())
        .catch(error => {
            console.log(error);
        })
    }

    // Adds item to
    function handleAdd(newItem){

        // To check if the items in cart are not more than inventory
        var quantityLimitFlag = true;
        if(cart.length !== 0){
            var count = 0;
            quantityLimitFlag = cart.some((item, index) => {
                count++;
                if(item.sku === newItem.sku){
                    count = -10;
                    console.log(item.quantity);
                    console.log(newItem.quantity);
                    return item.quantity <= newItem.quantity;
                }
                else if(count === cart.length){
                    return true;
                }
            })
        }

        if(quantityLimitFlag){
            addItem(newItem);
        }

        refreshPage();
    }

    // Delete event listner
    async function handleDelete(id){
        deleteItem(id)
        refreshPage();
    }

    // To set total state
    function generateTotal(curTotal){
        setTotal(curTotal);
    }

    // Checkout handler
    async function handleCheckout(){
        await checkout();
        await updateInventory(cart);
        setTotal(0);
        refreshPage();
    }

    if (loading) return (<div className="alert alert-info">Please stand by while we connect your call....</div>)
    if (error) return (<div className="alert alert-danger">There was an error loading...</div>)

    return (
        <div className="text-center">
            <HeaderAra65></HeaderAra65>
            <div className="row container col-md-12 text-left">
                <InventoryAra65 inventoryData={inventory} addAction={handleAdd}></InventoryAra65>
                <CartAra65 cartData={cart} deleteAction={handleDelete} setTotalState={generateTotal} checkoutAction={handleCheckout}></CartAra65>
            </div>
        </div>
    )
}

export default HomePageAra65;