import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

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
      <style>{`
        .ag-theme-quartz {
          --ag-background-color: #1a1a1a;
          --ag-border-color: rgba(255, 255, 255, 0.1);
          --ag-header-background-color: #242424;
          --ag-header-foreground-color: #ffffff;
          --ag-header-cell-text-color: #ffffff;
          --ag-row-hover-color: rgba(255, 255, 255, 0.08);
          --ag-row-border-color: rgba(255, 255, 255, 0.05);
          --ag-text-color: #e5e5e5;
          --ag-cell-horizontal-padding: 12px;
          --ag-row-height: 40px;
          --ag-font-size: 13px;
          --ag-header-height: 40px;
          --ag-selected-row-background-color: rgba(79, 70, 229, 0.2);
          --ag-range-selection-background-color: rgba(79, 70, 229, 0.1);
        }

        .ag-theme-quartz .ag-header-cell {
          background-color: #242424;
          color: #ffffff;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ag-theme-quartz .ag-row {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background-color 0.2s ease;
        }

        .ag-theme-quartz .ag-row:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }

        .ag-theme-quartz .ag-cell {
          color: #0a0a0a;
          padding: 8px 12px;
          display: flex;
          align-items: center;
        }

        .ag-theme-quartz .ag-cell-focus {
          outline: none;
          box-shadow: inset 0 0 0 2px rgba(79, 70, 229, 0.3);
        }

        .ag-theme-quartz .ag-pagination {
          background-color: #1a1a1a;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ag-theme-quartz .ag-paging-panel {
          background-color: #242424;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #e5e5e5;
        }

        .ag-theme-quartz .ag-paging-button.ag-disabled {
          opacity: 0.5;
        }

        .ag-theme-quartz .ag-paging-button:hover:not(.ag-disabled) {
          background-color: rgba(79, 70, 229, 0.2);
        }

        .ag-theme-quartz .ag-icon {
          color: #e5e5e5;
        }

        .ag-theme-quartz .ag-input-field-input {
          background-color: #2a2a2a;
          color: #e5e5e5;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
        }

        .ag-theme-quartz .ag-input-field-input:focus {
          border-color: rgba(79, 70, 229, 0.5);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .ag-theme-quartz .ag-menu-default {
          background-color: #242424;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .ag-theme-quartz .ag-menu-option {
          color: #e5e5e5;
        }

        .ag-theme-quartz .ag-menu-option:hover {
          background-color: rgba(79, 70, 229, 0.2);
        }

        .ag-theme-quartz .ag-filter-toolpanel-header {
          background-color: #242424;
          color: #ffffff;
          font-weight: 600;
        }

        .ag-theme-quartz .ag-filter-toolpanel-body {
          background-color: #1a1a1a;
        }

        .ag-theme-quartz .ag-checkbox-input-wrapper {
          width: 16px;
          height: 16px;
          border: 1px solid #4b5563;
          border-radius: 3px;
          background-color: #2a2a2a;
        }

        .ag-theme-quartz .ag-checkbox-input-wrapper.ag-checked {
          background-color: #4f46e5;
          border-color: #4f46e5;
        }

        .ag-theme-quartz .ag-column-drop {
          background-color: #1a1a1a;
          border: 1px dashed rgba(255, 255, 255, 0.15);
        }

        .ag-overlay-loading-center {
          background-color: rgba(26, 26, 26, 0.9);
          color: #e5e5e5;
        }

        .ag-root .ag-resizer {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div
        className="ag-theme-quartz w-full rounded-2xl overflow-hidden border border-black/12 shadow-minimal"
        style={{ height: '500px' }}
      >
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
