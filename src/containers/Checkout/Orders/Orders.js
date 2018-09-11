import React, {Component} from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders.js";
import withErrorHandler from "../../../hoc/withErrorHandler";

class Orders extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            orders: [],
            loading: true
        }
    }
    
    async componentDidMount() {
        try {
            const result = await axios.get("/orders.json");
            let orders = [];
            for (let key in result.data) {
                orders.push({id: key, ...result.data[key]});
            }
            
            this.setState({loading: false, orders: orders});
        } catch(err) {
            this.setState({loading: false});
        }
    }
    
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))}
            </div>
        );
    }
};

export default withErrorHandler(Orders, axios);