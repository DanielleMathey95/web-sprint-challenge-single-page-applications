import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import {Form} from './Styles';

const PizzaBuilder = () => {
  const initialFormState = {
    name: "",
    size: "",
    pepperoni: false,
    sausage: false,
    mushroom: false,
    peppers: false,
    special: "",
  }

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [post, setPost] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required('name is a required field').min(2, 'name must be at least two characters long'),
    size: yup.string().oneOf(['Small', 'Medium', 'Large'], 'size of pizza is required'),
    pepperoni: yup.boolean().optional(),
    sausage: yup.boolean().optional(),
    mushroom: yup.boolean().optional(),
    peppers: yup.boolean().optional(),
    special: yup.string().notRequired,
  })

  const setFormErrors = (name, value) => {
    yup.reach(formSchema, name).validate(value)
    .then( () => setErrors({...errors, [name]: ''}))
    .catch(err => setErrors({...errors, [name]: err.errors[0]}))
  }

  const inputChange = event => {
    const { checked, value, name, type } = event.target
    const valueChecked = type === 'checkbox' ? checked : value
    setFormErrors(name, valueChecked)
    setFormState({...formState, [name]: valueChecked})
  }

  const formSubmit = event => {
    event.preventDefault()
    axios.post('https://reqres.in/api/users', formState)
      .then(response => {
        setPost(JSON.stringify(response.data, null, 8))
        console.log('success', response)
      })
      .catch(err => {
        console.log('error submitting', err)
      })
  }

  useEffect(() => {
    formSchema.isValid(formState).then(valid =>
      setIsButtonDisabled(!valid)
    )
  }, [formState])


  return (
    <form onSubmit={formSubmit}>
      <Form>
        <label htmlFor="name">Name
          <input 
            name="name"
            type="text"
            onChange={inputChange}
            value={formState.name}
          />
        </label>

        <label htmlFor="size">Choose a Size
          
            <select onChange={inputChange} name="size" value={formState.size}>
              <option value="">--Please Choose a Size--</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
        </label>

        <p>Toppings</p>
        <div className="toppings">

          <label htmlFor="pepperoni">Pepperoni
            <input 
              name="pepperoni"
              type="checkbox"
              id="pepperoni"
              onChange={inputChange}
              value={formState.pepperoni}
            />
          </label>

          <label htmlFor="sausage">Sausage
            <input 
              name="sausage"
              type="checkbox"
              id="sausage"
              onChange={inputChange}
              value={formState.sausage}
            />
          </label>

          <label htmlFor="mushroom">Mushroom
            <input 
              name="mushroom"
              type="checkbox"
              id="mushroom"
              onChange={inputChange}
              value={formState.mushroom}
            />
          </label>

          <label htmlFor="peppers">Peppers
            <input 
              name="peppers"
              type="checkbox"
              id="peppers"
              onChange={inputChange}
              value={formState.peppers}
            />
          </label>
        </div>

        <label htmlFor="special">Special Instructions
        <textarea 
          name="special"
          id="specialInput"
          placeholder="Anything to Add?"
          onChange={inputChange}
          value={formState.special} />
      </label>

      <button disabled={isButtonDisabled}>Place Your Order</button>

      <div className="order-details">
        {post}
      </div>
      </Form>
    </form>
  );
}

export default PizzaBuilder;