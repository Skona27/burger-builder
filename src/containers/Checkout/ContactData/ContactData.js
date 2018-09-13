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
            loading: false,
            formValid: false
        }
    }
    
    orderHandler = async (event) => {
        event.preventDefault();

        this.setState({loading: true});
        
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

    
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData
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
    
    checkValidity(value, rules) {
        let isValid = true;
        
        if(!rules) {
            return true;
        }
    
        if (rules.required) {
          isValid = value.trim() !== '' && isValid;
        }
    
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
        }
    
        if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid;
        }
    
        return isValid;
    };
    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formValid = true;
        
         for (let inputIds in updatedOrderForm) {
            formValid = updatedOrderForm[inputIds].valid && formValid;
         }

        this.setState({ orderForm: updatedOrderForm, formValid: formValid});
    }
    
    render() {
        const formElementArray = [];
            for (let key in this.state.orderForm) {
              formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
              });
        }
        
        let form = (<form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => (
                      <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                     />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
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