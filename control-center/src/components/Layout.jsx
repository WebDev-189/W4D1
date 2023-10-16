import { useEffect, useState } from "react"
import { Outlet, NavLink } from "react-router-dom"
import axios from "axios"
import Spinner from "./Spinner"

/**
 * This external function gives us an URL to fetch, here it allow us to do pagination using
 * offset and limit query strings
 */
function getApiURL(num) {
	return `https://api.spacexdata.com/v3/launches?limit=10&offset=${num}&filter=flight_number,mission_name`
}

function Layout() {
	const [launches, setLaunches] = useState(null)
	const [counter, setCounter] = useState(0)

	// const [isLoading, setIsLoading] = useState(true)

	const fetchLaunches = async () => {
		try {
			// Allow us to fetch the first 10, the 10 to 20, 20 to 30, 30 to 40...
			const response = await axios.get(getApiURL(counter * 10))
			setLaunches(response.data)
			// setTimeout(() => {
			// 	setIsLoading(false)
			// }, 1000)
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * Whenever counter changes, fetch the new Launches !
	 */
	useEffect(() => {
		fetchLaunches()
		// axios
		// 	.get(API_URL)
		// 	.then((response) => {
		// 		console.log(response)
		// 		setLaunches(response.data)
		// 	})
		// 	.catch((error) => console.log(error))
		// fetch(API_URL)
		// 	.then((rawResponse) => rawResponse.json())
		// 	.then((data) => {
		// 		console.log(data)
		// 		setLaunches(data)
		// 	})
		// 	.catch((error) => console.log(error))
	}, [counter])

	const handleDecrement = () => {
		if (counter === 0) {
			return
		}
		setCounter(counter - 1)
	}

	// if (isLoading) {
	// 	return <Spinner />
	// }
	if (!launches) {
		return <Spinner />
	}
	return (
		<>
			<nav>
				<ul>
					<li>
						<NavLink to={"/"}>Home</NavLink>
					</li>
					<li>
						<NavLink to={"/search"}>Search</NavLink>
					</li>
				</ul>
				<hr />
				<ul>
					{launches.map((launch) => {
						return (
							<li key={launch.flight_number}>
								<NavLink to={`/${launch.flight_number}`}>
									{launch.mission_name}
								</NavLink>
							</li>
						)
					})}
					<li>
						<button onClick={handleDecrement}>Previous</button>
						<button onClick={() => setCounter(counter + 1)}>Next</button>
					</li>
				</ul>
			</nav>

			<main>{<Outlet />}</main>

			<footer></footer>
		</>
	)
}

export default Layout
