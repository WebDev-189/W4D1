import { useState } from "react"
import "./App.css"
import Counter from "./components/Counter"
import Timer from "./components/Timer"
function App() {
	const [showCounter, setShowCounter] = useState(false)
	return (
		<>
			<div>
				<button onClick={() => setShowCounter(!showCounter)}>
					{showCounter ? "Hide" : "Show"} counter
				</button>
			</div>
			{showCounter && <Timer />}
		</>
	)
}

export default App
