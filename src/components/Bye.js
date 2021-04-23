import React, { useRef } from "react";
import { useCountRenders } from "../hooks/useCountRenders";

const Bye = React.memo(( props ) => {
	{/* Use Callback hook */}

	useCountRenders();
	

	return <button className="btn btn-outline-info" onClick={() => props.decrement(5)} >Bye -1</button>;
});

export default Bye;