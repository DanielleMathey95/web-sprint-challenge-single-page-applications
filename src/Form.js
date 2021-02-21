import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [post, setPost] = useState([]);

  const formSchema = Yup.object().shape({
    name: yup.string().required('name is a required field').min(2, 'name must be at least two characters long'),
    size: yup.string().oneOf(['Small', 'Medium', 'Large'], 'size of pizza is required'),
    pepperoni: yup.boolean().optional(),
    sausage: yup.boolean().optional(),
    mushroom: yup.boolean().optional(),
    peppers: yup.boolean().optional(),
    special: yup.string().notRequired,
  })

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then( () => setErrors({...errors, [name]: ''}))
    .catch(err => setErrors({...errors, [name]: err.errors[0]}))
  }

  const inputChange = event => {
    const { checked, value, name, type } = event.target
    const valueChecked = type === 'checkbox' ? checked : value
    setFormErrors(name, valueChekced)
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

}