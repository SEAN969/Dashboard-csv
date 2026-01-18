import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import styles from './DataTable.module.css';

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  data: any[];
};

const DataTable: React.FC<Props> = ({ data }) => {
  // Generate columns from data
  const columnDefs = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: key,
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      wrapText: true,
      autoHeight: true,
    }));
  }, [data]);

  // Grid options
  const gridOptions = useMemo(
    () => ({
      modules: [AllCommunityModule],
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 20, 50, 100],
      rowData: data,
      columnDefs: columnDefs,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
        sortable: true,
        filter: true,
      },
      overlayNoRowsTemplate: '<span style="color: #b4b4b4;">No data available</span>',
      rowHeight: 40,
      headerHeight: 40,
    }),
    [data, columnDefs]
  );

  return (
    <div className="w-full space-y-4">
      <div className={`ag-theme-quartz ${styles.gridContainer}`}>
        <AgGridReact {...gridOptions} />
      </div>

      {/* Stats Footer */}
      {data.length > 0 && (
        <div className="p-4 bg-gray-800/40 rounded-xl border border-black/10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300 font-medium">
              Total Records: <span className="text-gray-100 font-semibold">{data.length}</span>
            </span>
            <span className="text-xs text-gray-400 bg-black/20 px-3 py-1 rounded-full border border-black/15">
              Showing {Math.min(10, data.length)} per page
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
