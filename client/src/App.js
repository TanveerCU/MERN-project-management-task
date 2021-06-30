import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signup/SignUp";
import ProjectForm from "./components/project/ProjectForm";
import SeeProject from "./components/pages/SeeProject";
import SearchProject from "./components/pages/SearchProject";
import SeeUser from "./components/pages/SeeUser";
function App() {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route path="/" component={SignIn} exact />
					<Route path="/signin" component={SignIn} exact />
					<Route path="/signup" component={SignUp} exact />
					<Route path="/create" component={ProjectForm} exact />
					<Route path="/seeproject" component={SeeProject} exact />
					<Route path="/searchproject" component={SearchProject} exact />
					<Route path="/seeuser" component={SeeUser} exact />
					<Route>404 Not Found</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
