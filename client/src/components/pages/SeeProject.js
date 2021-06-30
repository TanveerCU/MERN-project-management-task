import React from "react";
import TableUtils from "../utils/TableUtils";
import { useProjectList } from "../../data/projectListDataRetrieve";

function SeeProject() {
	const data = useProjectList();
	return (
		<div className="mt-16  flex flex-col items-center justify-center">
			<TableUtils data={data} text="Project List" />
		</div>
	);
}

export default SeeProject;
