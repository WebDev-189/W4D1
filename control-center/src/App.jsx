import { Routes, Route } from "react-router-dom"
import "./App.css"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import OneMissionPage from "./pages/OneMissionPage"
import SearchMissionPage from "./pages/SearchMissionPage"

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="/:flightId" element={<OneMissionPage />} />
					<Route path="/search" element={<SearchMissionPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
