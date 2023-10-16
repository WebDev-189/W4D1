import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import ReactPlayer from "react-player"

function OneMissionPage() {
	// This state will store the flight that we will fetch.
	const [oneFlight, setOneFlight] = useState(null)
	// This is the flight_number of the flight, it is used as an ID
	// by the API we are using.
	const { flightId } = useParams()

	/**
	 * This function will fetch one specific flight
	 */
	const fetchOneFlight = async () => {
		try {
			const response = await axios.get(
				`https://api.spacexdata.com/v3/launches/${flightId}`
			)
			// console.log(response)
			setOneFlight(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * We will re-execute fetchOneFlight everytime flightId changes
	 */
	useEffect(() => {
		fetchOneFlight()
	}, [flightId])

	/**
	 * At first, we have no data and nothing to display, let's return a Spinner.
	 */
	if (!oneFlight) {
		return <Spinner />
	}

	const launchDate = new Date(oneFlight.launch_date_local)
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}
	const date = launchDate.toLocaleDateString(undefined, options)

	return (
		<>
			<h1>
				{oneFlight.mission_name}: {oneFlight.rocket.rocket_name}
			</h1>
			<p>Launch date: {date}</p>
			<img
				style={{ width: "5rem" }}
				src={oneFlight.links.mission_patch}
				alt=""
			/>
			<ReactPlayer url={oneFlight.links.video_link} controls={true} />
		</>
	)
}

export default OneMissionPage
