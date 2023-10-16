import { useState, useEffect } from "react"
import axios from "axios"
import Spinner from "./../components/Spinner"
import { Link } from "react-router-dom"
/**
 * Special URL that allow us to get all of the nationalities
 * that had a payload.
 *
 * An other API might not work the same way, we need to read and test the API
 * in order to understand what is possible!
 */
const API_URL =
	"https://api.spacexdata.com/v3/launches?filter=rocket/second_stage/payloads/nationality"

function SearchMissionPage() {
	const [flights, setFlights] = useState(null)
	const [countries, setCountries] = useState(null)
	const [selectedCountry, setSelectedCountry] = useState("-1")

	/**
	 * We need to display a select and allow the user to filter by countries
	 *
	 * To know which countries are avilable we're using a special url which filters by nationality
	 * it returns a lot of duplicate values so we're creating a Set to remove
	 * each duplicate and make sure that our Select only display unique countries.
	 */
	const fetchNationalities = async () => {
		try {
			const response = await axios.get(API_URL)
			// setCountries(response.data)
			const nations = response.data.map((element) => {
				return element.rocket.second_stage.payloads[0].nationality
			})
			const uniqueNations = new Set(nations)
			console.log(uniqueNations)

			setCountries([...uniqueNations])
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * Is ran when the selectedCountry changes
	 * Allow us to get all the flights which includes a payload
	 * belonging to a specific country
	 */
	const fetchByCountries = async (url) => {
		try {
			const response = await axios.get(url)
			// console.log(response.data)
			setFlights(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		/**
		 * This condition prevent me from fetching when there is no selected country
		 */
		if (selectedCountry === "-1") {
			return
		}
		const fetchUrlByNationalities =
			"https://api.spacexdata.com/v3/launches?nationality=" + selectedCountry

		fetchByCountries(fetchUrlByNationalities)

		/**
		 * Run this effect everytime selectedCountry changes
		 */
	}, [selectedCountry])

	/**
	 * Fetch all of the available Options
	 */
	useEffect(() => {
		fetchNationalities()
	}, [])

	/**
	 * Modify the selected country
	 */
	const handleChange = (event) => {
		setSelectedCountry(event.target.value)
	}

	if (!countries) {
		return <Spinner />
	}
	return (
		<div>
			<select name="" value={selectedCountry} onChange={handleChange} id="">
				<option value="-1" disabled>
					Select a Country
				</option>
				{/* Display all the options coming from the API */}
				{countries.map((country) => {
					return (
						<option key={country} value={country}>
							{country}
						</option>
					)
				})}
			</select>

			{flights && (
				<>
					<ul>
						{/* Display all the flights that had a payload belonging to selectedCountry */}
						{flights.map((flight) => {
							return (
								<li key={flight.flight_number}>
									{" "}
									<Link to={`/${flight.flight_number}`}>
										{flight.mission_name}
									</Link>
								</li>
							)
						})}
					</ul>
				</>
			)}
		</div>
	)
}

export default SearchMissionPage
