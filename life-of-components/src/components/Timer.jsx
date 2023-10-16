import React, { useState, useEffect } from "react"
import Confetti from "react-confetti"
function Timer() {
	const [count, setCount] = useState(0)
	const [coordinates, setCoordinates] = useState({ x: null, y: null })
	const [showConfetti, setShowConfetti] = useState(false)
	function handleCoordinates(event) {
		console.log(event)
		setCoordinates({ x: event.x, y: event.y })
	}

	useEffect(() => {
		console.log("Component Mounted")

		const intervalId = setInterval(() => {
			console.log("I am being updated!")
			setCount((currentCount) => currentCount + 1)
		}, 1000)

		document.addEventListener("click", handleCoordinates)

		// This will run only when the component unmount.
		return () => {
			console.log("Component being unmounted...")

			clearInterval(intervalId)
			document.removeEventListener("click", handleCoordinates)
		}
	}, [])

	useEffect(() => {
		if (count % 10 === 0 && count !== 0) {
			setShowConfetti(true)
			setTimeout(() => {
				setShowConfetti(false)
			}, 5000)
		}
	}, [count])

	return (
		<>
			<h1>{count}</h1>

			<h2>x: {coordinates.x}</h2>
			<h2>y: {coordinates.y}</h2>

			{showConfetti && <Confetti numberOfPieces={count} />}
		</>
	)
}

export default Timer
