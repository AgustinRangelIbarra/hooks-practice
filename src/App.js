import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { useForms } from "./hooks/useForms";
import Hello from "./components/Hello";
import "./App.css";
import Bye from "./components/Bye";
import ReducerTodo from './components/Reducer';

function reducer(state, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;

		case 'DECREMENT': 
			return state - 1;
	
		default:
			return state;
	}
}

function App() {

	const [reducerCount	, dispatch] = useReducer(reducer, 0)

	const [formValues, resetValues, handleChange] = useForms({
		email: "",
		password: "",
		firstName: "",
	});
	const { email, password, firstName } = formValues;

	useEffect(() => {
		console.log("Render");
	}, [email, password]);

	const inputRefEmail = useRef();
	const helloRef = useRef(() => console.log(`Hello`));

	const [showHello, setShowHello] = useState(true);

	useLayoutEffect(() => {
		console.log(inputRefEmail.current.getBoundingClientRect());
	}, []);

	return (
		<div className="App">
			<div className="App-header container-sm">
				<div className="fetch">
					<h3>REDUCER</h3>
					<button onClick={() => dispatch({ type: 'DECREMENT'})} className="btn btn-outline-info">Decrement</button>
					<spandiv>{reducerCount}</spandiv>
					<button onClick={() => dispatch({ type: 'INCREMENT'})} className="btn btn-outline-info">Increment</button>
				</div>

				<ReducerTodo />

				<div className="form contanier-sm">
					<input
						className="form-control "
						placeholder="First Name"
						type="text"
						name="firstName"
						value={firstName}
						onChange={handleChange}
					/>
					<input
						className="form-control "
						ref={inputRefEmail}
						placeholder="Email"
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
					/>
					<input
						className="form-control "
						placeholder="Password"
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
					/>

					<div>
						{`Email: ${email}`}
						<br />
						{`Password: ${password}`}
						<br />
						{`Password: ${firstName}`}
					</div>

					<button className="btn btn-outline-info" onClick={resetValues}>
						Reset
					</button>

					<button
						className="btn btn-outline-info"
						onClick={() => {
							inputRefEmail.current.focus();
							helloRef.current();
						}}
					>
						Focus
					</button>

					<hr />
					<div>
						<button className="btn btn-outline-info" onClick={() => setShowHello(!showHello)}>
							Toggle Hello Component
						</button>
						{showHello && <Hello />}
					</div>
					<hr />
				</div>
			</div>
		</div>
	);
}

export default App;
