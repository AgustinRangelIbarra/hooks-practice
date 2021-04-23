import React, { useReducer, useState } from "react";

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_TODO:
			return { todos: [...state.todos, { text: action.payload, completed: false }] };

		case TOGGLE_TODO:
			return {
				todos: state.todos.map((t, index) =>
					index === action.payload ? { ...t, completed: !t.completed } : t
				),
			};

		default:
			break;
	}
};

const ADD_TODO = "ADD-TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

const ReducerTodo = () => {
	const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });
	const [text, setText] = useState("");

	return (
		<div className="fetch">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					dispatch({
						type: ADD_TODO,
						payload: text,
					});
					setText("");
					console.log(todos);
				}}
			>
				<input value={text} type="text" onChange={(e) => setText(e.target.value)} />
			</form>
			<pre>
				{todos.map((todo, index) => (
					<div
						className="todo"
						key={todo.text}
						onClick={() => dispatch({ type: TOGGLE_TODO, payload: index })}
						style={{
							textDecoration: todo.completed ? "line-through" : "",
							opacity: todo.completed ? "40%" : "",
						}}
					>
						{todo.text}
					</div>
				))}
			</pre>
		</div>
	);
};

export default ReducerTodo;
