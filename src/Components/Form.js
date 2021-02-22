import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
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

  const formSchema = Yup.object().shape({
    name: Yup.string().required('name is a required field').min(2, 'name must be at least two characters long'),
    size: Yup.string().oneOf(['Small', 'Medium', 'Large'], 'size of pizza is required'),
    pepperoni: Yup.boolean().optional(),
    sausage: Yup.boolean().optional(),
    mushroom: Yup.boolean().optional(),
    peppers: Yup.boolean().optional(),
    special: Yup.string().notRequired(),
  })

  const validateChange = event => {
    Yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
        setErrors({ ...errors, [event.target.name]: "" });
    })
    .catch(err => {
        console.log("somethings wrong here", err);
        setErrors({ ...errors, [event.target.name]: err.errors[0] });
    });
};

  const inputChange = event => {
    console.log("There's been an input change", event.target.value);
    event.persist();
    const newFormData = {
      ...formState, [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setFormState(newFormData);
  };

  const formSubmit = event => {
    event.preventDefault()
    axios.post('https://reqres.in/api/users', formState)
      .then(response => {
        setPost(JSON.stringify(response.data, null, 2))
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