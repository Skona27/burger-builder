import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders.js";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            orderForm: {
              name: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Your Name'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              email: {
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Your Email'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              street: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              state: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'State'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              zipCode: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5
                },
                valid: false,
                touched: false
              },
              country: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                  options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                  ]
                },
                value: 'fastest',
                validation: {},
                valid: true
              }
            },
            formIsValid: false,
            loading: false
        }
    }
    
    orderHandler = async (event) => {
        event.preventDefault();

        this.setState({loading: true});
    
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
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
    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        this.setState({ orderForm: updatedOrderForm});
    }
    
    render() {
        const formElementArray = [];
            for (let key in this.state.orderForm) {
              formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
              });
        }
        
        let form = (<form>
                    {formElementArray.map(formElement => (
                      <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                     />
                    ))}
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