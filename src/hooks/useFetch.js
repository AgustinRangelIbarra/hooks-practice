import { useEffect, useRef, useState } from 'react'

export const useFetch = (url) => {

	const isCurrent = useRef(true)

	const [state, setState] = useState({ data: null, loading: true });

	useEffect(() => {
		return () => {
			// called when the component is goinh to unmount
			isCurrent.current = false;
		}
	}, [])

	useEffect(async () => {
		setState({ data: state.data, loading: true});
		fetch(url)
			.then( (response) => response.text() )
			.then( data => {
				if (isCurrent.current) {
					setState({ data: data, loading: false });
				}
			});

	}, [url, setState]);

	return state;
}
