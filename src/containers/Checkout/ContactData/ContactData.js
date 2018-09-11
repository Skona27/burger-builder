import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders.js";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";

class ContactData extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "Kuba",
            email: "email@email.com",
            address: {
                street: "TEST",
                postalCode: 12345
            },
            loading: false
        }
    }
    
    orderHandler = async (event) => {
        event.preventDefault();

        this.setState({loading: true});
    
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          customer: {
            name: "Jakub",
            address: {
              street: "Test123",
              zipCode: "12345",
              country: "Poland"
            },
            email: "test@test.com"
          },
          deliveryMethod: "Fast"
        };
        
        try {
          await axios.post("/orders.json", order);
          this.setState({loading: false});
          this.props.history.push('/');
        } catch(error) {
          this.setState({loading: false});
          console.log(error);
        }
    }
    
    render() {
        let form = (<form>
                    <input className={classes.Input} type="text" name="name" placeholder="name" />
                    <input className={classes.Input} type="email" name="email" placeholder="email" />
                    <input className={classes.Input} type="text" name="street" placeholder="street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="zipcode" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
                
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Contact data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);