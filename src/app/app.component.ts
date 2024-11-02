import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AgGridAngular, AgGridModule } from "@ag-grid-community/angular";
// NOTE: Angular CLI does not support component CSS imports: angular-cli/issues/23273
/* Core Data Grid CSS */
import '@ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import '@ag-grid-community/styles/ag-theme-quartz.css';
import {
  ColDef,
  GetDataPath,
  GridOptions,
  GridReadyEvent,

  IGroupCellRendererParams,

  IViewportDatasourceParams,
  ModuleRegistry,

} from "@ag-grid-community/core";
import { ViewportRowModelModule } from "@ag-grid-enterprise/viewport-row-model";
import { IViewportDatasource } from "@ag-grid-community/core";
import { CustomGroupCellRenderer } from "./group-cell-renderer";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
ModuleRegistry.registerModules([ViewportRowModelModule, RowGroupingModule]);
import { SimpleCellRenderer } from "./simple-cell-renderer.component";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [AgGridModule, AgGridAngular, HttpClientModule, SimpleCellRenderer, CustomGroupCellRenderer]
})
export class AppComponent implements OnInit {
  gridOptions: GridOptions<any>;
  public rowData!: any[];
  private viewportParams: IViewportDatasourceParams | undefined;

  constructor() {
    this.rowData = this.createMockData();
    this.gridOptions = {
      rowModelType: "viewport",
      blockLoadDebounceMillis: 10000,
      columnDefs: [
        {
          field: 'department', headerName: 'Department', width: 200, rowGroup: true, hide: true
        },
        { field: 'id', headerName: 'Id', width: 200 },
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'lastName', headerName: 'Last Name', width: 200 },
      ],
      viewportDatasource: this.createViewportDatasource()
    };
  }

  public autoGroupColumnDef: ColDef = {
    cellRenderer: CustomGroupCellRenderer,
  };


  ngOnInit(): void {

  }

  onGridReady(params: GridReadyEvent): void {
    
  }

  isServerSideGroup = (dataItem: { group: any; }) => {
    return dataItem.group;
  };

  getServerSideGroupKey = (dataItem: { id: any; }) => {
    return dataItem.id;
  };

  createViewportDatasource(): IViewportDatasource {
    return {
      init: (params: IViewportDatasourceParams) => {
        this.viewportParams = params;
        this.viewportParams.setRowCount(this.rowData.length);
      },
      setViewportRange: (firstRow, lastRow) => {
        /* const pageSize = lastRow - firstRow + 1;
        const dataSlice = this.rowData.slice(firstRow, lastRow + 3);
        //console.log(dataSlice)
        this.viewportParams?.setRowData(this.rowData); */

        var rowDataMap: any = {};
        for (var i = firstRow; i <= lastRow; i++) {
            rowDataMap[i] = this.rowData[i];
        }
          this.viewportParams?.setRowData(rowDataMap);
      },
    };
  }

  private createMockData(): any[] {
    const mockData = [];
    for (let i = 0; i < 10; i++) {
      let department = 'Department' + i
      mockData.push(
        { id: i, department: department, isGroup: true }
      );
      for (let j = 0; j < 10; j++) {
        mockData.push({
          id: parseInt(i+ "" + j, 10), firstName: "Umesh" + i + j, lastName: "Kamat" + i+ j, department: department
        });
      }
    }
    return mockData;
/* 
    return [
      { id: 11, department: "Test", isGroup: true },
      { id: 1, firstName: "Umesh1", lastName: "Kamat1", department: "Test" },
      { id: 2, firstName: "Umesh2", lastName: "Kamat2", department: "Test" },
      { id: 3, firstName: "Umesh3", lastName: "Kamat3", department: "Test" },
      { id: 4, firstName: "Umesh4", lastName: "Kamat4", department: "Test" },
    ]; */
  }

  /* 
    private createMockData(): any[] {
      return [
        { id: 11, department: "Test", group: "Test", children: [
          { id: 1, firstName: "Umesh1", lastName: "Kamat1", department: "Test"},
          { id: 2, firstName: "Umesh2", lastName: "Kamat2", department: "Test"},
          { id: 3, firstName: "Umesh3", lastName: "Kamat3", department: "Test"},
          { id: 4, firstName: "Umesh4", lastName: "Kamat4", department: "Test"},
        ]}
      ];
    } */

}
