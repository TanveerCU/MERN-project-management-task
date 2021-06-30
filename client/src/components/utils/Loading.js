import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading({ render }) {
	return (
		<div className={`flex h-screen justify-center items-center`}>
			<CircularProgress />
		</div>
	);
}
