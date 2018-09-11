import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ingredients: {
                meat: 1,
                salad: 1,
                cheese: 1,
                bacon: 1
            },
            totalPrice: 0
        };
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        } 
        
        console.log(ingredients);
        
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    
    
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.path + "/contact-data"}
                    render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />)} />
            </div>
        );
    }
}

export default Checkout;