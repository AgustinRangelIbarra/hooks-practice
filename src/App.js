import { useEffect, useState } from "react";
import { useForms } from "./hooks/useForms";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
	const [formValues, resetValues, handleChange] = useForms({
		email: "",
		password: "",
		firstName: "",
	});
	const { email, password, firstName } = formValues;
	
	const [count, setCount] = useState( () => 
		JSON.parse(localStorage.getItem("count-"))
	);

	useEffect(() => {
		console.log("Render");
	}, [email, password]);


	const { data, loadingData } = useFetch(`http://numbersapi.com/${count}/trivia`);

	useEffect(() => {
		localStorage.setItem('count-', JSON.stringify(count));
	}, [count])

	return (
		<div className="App">
			<div className="App-header">
				<div className="form" style={{ "margin-top": "2rem" }}>
					<input
						placeholder="First Name"
						type="text"
						name="firstName"
						value={firstName}
						onChange={handleChange}
					/>
					<input
						placeholder="Email"
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
					/>
					<input
						placeholder="Password"
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
					/>

					<div style={{ "margin-top": "2rem" }}>
						{`Email: ${email}`}
						<br />
						{`Password: ${password}`}
						<br />
						{`Password: ${firstName}`}
					</div>

					<button style={{ "margin-top": "2rem" }} onClick={resetValues}>
						Reset
					</button>
					<button onClick={() => setCount(count + 1)}> +1 </button>
					<div>{count}</div>
					<div className="fetch" style={{ "margin-top": "2rem" }}>
						{loadingData ? "Loading ..." : data}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
