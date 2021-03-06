import React from "react";

function CartAra65(props) {

    // Variable to generatye the total
    var curTotal = 0;

    function deleteItem(e){
        props.deleteAction(e.target.id);
    }

    return (
        <div className="col-md-3">
            <table className="table table-striped">
                <thead className="">
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Generate the cart rows
                        props.cartData.map((item, key) => {

                            // Generate the total
                            curTotal = curTotal + (item.quantity * item.price);
                            
                            return(
                                <tr key={key}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={deleteItem} id={item.sku}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
            <div>
                <button type="button" className="btn btn-primary" onClick={props.checkoutAction}><h3>Checkout</h3></button>
                <h3 className="float-right">{`$${curTotal.toFixed(2)}`}</h3>
            </div>
        </div>
    )
}

export default CartAra65;