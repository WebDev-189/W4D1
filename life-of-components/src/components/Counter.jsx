import { useState, useEffect } from "react"

function Counter() {
	const [count, setCount] = useState(0)

	/**
	 * useEffect with an empty Array of dependencies run
	 * only once the component is mounted
	 */
	useEffect(() => {
		console.log("I run during Mounting phase.")
		document.title = count
	}, [])

	useEffect(() => {
		console.log("I run on every update")
		document.title = count
	}, [count])

	return (
		<div>
			<h1>{count}</h1>

			<button onClick={() => setCount(count + 1)}>Up</button>
		</div>
	)
}

export default Counter
