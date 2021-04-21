import { useEffect, useState } from 'react'

export const useFetch = (url) => {

	const [state, setState] = useState({ data: null, loading: true });

	useEffect(async () => {

		setState({ data: state.data, loading: true});
		
		fetch(url)
			.then( (response) => response.text() )
			.then( data => setState({data: data, loading: false}));

	}, [url, setState]);

	return state;
}
