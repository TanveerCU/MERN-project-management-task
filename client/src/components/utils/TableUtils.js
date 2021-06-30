import * as React from "react";
import { Box, withStyles } from "@material-ui/core";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
	GridToolbarColumnsButton,
} from "@material-ui/data-grid";

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
			<GridToolbarFilterButton />
			<GridToolbarColumnsButton />
		</GridToolbarContainer>
	);
}
const StyledDataGrid = withStyles({
	root: {
		"& .MuiDataGrid-renderingZone": {
			maxHeight: "none !important",
		},
		"& .MuiDataGrid-cell": {
			lineHeight: "unset !important",
			maxHeight: "none !important",
			whiteSpace: "normal",
			wordBreak: "break-all",
		},
		"& .MuiDataGrid-row": {
			maxHeight: "none !important",
		},
	},
})(DataGrid);

export default function ColumnSelectorGrid({ data, text }) {
	console.log(data);
	const [pageSize, setPageSize] = React.useState(20);

	const handlePageSizeChange = (params) => {
		setPageSize(params.pageSize);
	};
	console.log(data);
	return (
		<Box height={"600px"} width={"90%"}>
			<StyledDataGrid
				autoHeight
				{...data}
				components={{
					Toolbar: CustomToolbar,
				}}
				pageSize={pageSize}
				onPageSizeChange={handlePageSizeChange}
				rowsPerPageOptions={[5, 10, 20]}
				pagination
				getRowId={(row) => row._id}
			/>
		</Box>
	);
}
