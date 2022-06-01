import { useEffect, useState } from "react";
export const useGetFetch = (url, token) => {
	const [result, setResult] = useState([]);
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			let config = {}

			if (token) {
				config = {
					"Content-Type": "application/json",
					Authorization: `jwt ${token}`,
				};
			} else {
				config = {
					"Content-Type": "application/json",
				};
			}

			try {
				const res = await fetch(url, { headers: config });
				if (res.status !== 200) {
					throw await res.text();
				}
				const json = await res.json();
				setResult(json);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setError(err);
				setLoading(false);
			}
		};

		fetchData();
	}, [token, url]);
	return [result, error, loading];
}
