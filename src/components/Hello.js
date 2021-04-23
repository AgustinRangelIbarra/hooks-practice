import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { useMeasure } from "../hooks/useMeasure";
import Bye from "./Bye";

const Hello = () => {
	// const renders = useRef(0);

	const [count, setCount] = useState(() => JSON.parse(localStorage.getItem("count-")));
	const { data, loadingData } = useFetch(`http://numbersapi.com/${count}/trivia`);
	useEffect(() => {
		localStorage.setItem("count-", JSON.stringify(count));
	}, [count]);

	// console.log(`Hello Rendes: ${renders.current++}`);

	useLayoutEffect(() => {
		console.log()
	}, []);	

	// const [rect, setRect] = useState({});
	/* 
	useLayoutEffect(() => {
		setRect(divRef.current.getBoundingClientRect());
	}, [data]) 
	*/

	const [rect, divRef] = useMeasure([data]);

	const decrement = useCallback(
		(n) => {
			setCount(c =>  c - n);	
		},
		[setCount],
	)

	return (
		<div>
			<h1>Hello</h1>

			<Bye decrement={decrement}/>
			<span>{count}{" "}</span>
			<button className="btn btn-outline-info" onClick={() => setCount(count + 1)}>
				Hello +1
			</button>

			<pre>{JSON.stringify(rect, null, 2)}</pre>
			<div className="d-flex" style={{ marginTop: "1rem" }}>
				<div ref={divRef} className="fetch" style={{ marginTop: "1rem" }}>
					{loadingData ? "Loading ..." : data}
				</div>
			</div>
		</div>
	);
};

export default Hello;
