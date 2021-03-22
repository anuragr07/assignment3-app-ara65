import React from "react";

function InventoryAra65(props) {

    
    function addItem(e){
        const id = e.target.id;
        const itemToAdd = props.inventoryData.filter(item => item.sku === id);
        // itemToAdd[0].quantity = 1;
        props.addAction(itemToAdd[0]);
    }

    return (
        <div className="col-md-9">
            <table className="table table-striped">
                <thead className="">
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.inventoryData.map((item, key) => {
                            // console.log(item);

                            function setAction(){
                                if(item.quantity > 0){
                                    return(
                                        <button type="button" className="btn btn-success" onClick={addItem} id={item.sku}>Add</button>
                                    )
                                }
                                else{
                                    return(
                                        <button type="button" className="btn btn-secondary" id={item.sku}>Out of stock</button>
                                    )
                                }
                            }

                            return(
                                <tr key={key}>
                                    <td>{item.sku}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{`$${item.price}`}</td>
                                    <td>
                                        {setAction()}
                                    </td>
                                </tr>
                            )        
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default InventoryAra65;