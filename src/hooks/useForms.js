import { useState } from 'react'

export const useForms = (initialValues = {}) => {

	const [formValues, setFormValues] = useState(initialValues);

/* 	const [email, setEmail] = useState("");
	const [password, setPassword] = useState(""); */

	const handleChange = (event) => {
		setFormValues({
			...formValues,
			//En el nombre del evento, asignar el valor
			[event.target.name]: event.target.value
		});
		/* console.log(event.target.name);
		console.log(event.target.value); */
	}

	const resetValues = () => setFormValues(initialValues);

	return [formValues, resetValues, handleChange];
}
