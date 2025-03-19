import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import ColumnResizer from 'column-resizer';

import {
    Table, TableHead, TableHeader, TableRow, TableBody, TableCell, TableContainer, TableToolbar,
    DataTable, DataTableSkeleton, Pagination, FlexGrid, Row, Column, Tile
} from '@carbon/react';
import {KubernetesPod} from '@carbon/icons-react';

import UiState from 'data/ui_state';
import f from 'common-ui/utils/f';

@observer
class CommonTable extends Component {
    @observable _vState = {
        sortedColumn: null,
        sortDirection: null
    }
    constructor(props) {
        super(props);
        this.tableId = props.tableId || "table";
        this.isColumnResizerLoading = null;
        //this.initializeSession();

        if (props.sortBy && typeof props.sortBy === 'string') {
            let sortBy = props.sortBy.split(',');
            this._vState.sortedColumn = sortBy[0];
            this._vState.sortDirection = sortBy.pop() == 'asc' ? 'ASC' : 'DESC';
        }
    }
    initializeSession = () => {
        if(this.props.resizable){
            try {
                this.store = sessionStorage;
            } catch (e) {
                this.store = {};
            }
        }
    }
    componentDidMount() {
        /* if (this.props.resizable) {
            if(!this.props.tableId){
                console.warn("Please provide table id to use column resizable feature");
            }
            this.enableResize();
        } */
    }
    restoreColResizeState() {
        let data = UiState.getStateData("columnResizeTableData")
        if (data && data[this.tableId]) {
            this.store[this.tableId] = data[this.tableId];
        }
    }
    componentWillUnmount() {
        /* if (this.props.resizable && this.resizer) {
            let { store } = this.resizer;
            let columnResizeTableData = UiState.getStateData("columnResizeTableData") || {};
            columnResizeTableData[this.tableId] = store[this.tableId];
            let data = JSON.stringify(columnResizeTableData );
            UiState.saveState("columnResizeTableData", data);
            this.disableResize();
        } */
    }
    componentDidUpdate() {
        /* if (this.props.resizable) {
            this.enableResize();
        } */
    }

    /* enableResize() {
        const tableNode = this.table && this.table.current;
        let { resizableOptions, data } = this.props;
        let options = CommonTable.defaultProps.resizableOptions;
        Object.assign(options, resizableOptions)

        if (tableNode && this.isColumnResizerLoading != f.isLoading(data)) {
            this.restoreColResizeState();
            if (this.store && this.store[this.tableId]) {
                options.widths = this.store[this.tableId].split(';').map(w => Number(w));
            }
            this.resizer = new ColumnResizer(tableNode, options);
            this.resizer.tb.classList.remove('grip-padding');
            this.isColumnResizerLoading = f.isLoading(data);
        }
        // To sync resizable and origin table columns
        this.resizer?.syncGrips();
        this.resizer?.applyBounds();
    }

    disableResize() {
        if (this.resizer) {
            this.resizer.reset({ disable: true });
        }
    } */
    getNoDataText = () => {
        return this.props.noDataText;
    }
    getHeaderCount = () => {
        const {headers} = this.props;
        if (headers) {
            return headers.length;
        } else if (this.props.getHeaders) {
            return this.headerCount || 1;
        } else {
            return 1;
        }
    }
    getNoData = () => {
        const {customNoDataCaption} = this.props;
        let headerCount = this.getHeaderCount();

        return (
            <TableCell colSpan={headerCount} data-testid="table-no-data">
                <FlexGrid className="data-table--empty-state">
                    <Row>
                        <Column lg={16} className="data-table--empty-state-col" data-testid="no-data-text">
                            <div className="data-table--message-box">
                                <Tile>
                                    <div className="data-table--message-icon">
                                        <KubernetesPod size={100} />
                                    </div>
                                    <div className="data-table--message-content">
                                        <span className="data-table--message-text">
                                            {this.getNoDataText()}
                                        </span>
                                        {
                                            customNoDataCaption &&
                                            <span className="data-table--message-caption">
                                                {customNoDataCaption}
                                            </span>
                                        }
                                    </div>
                                </Tile>
                            </div>
                        </Column>
                    </Row>
                </FlexGrid>
            </TableCell>
        )
    }
    getHeaders = ({ headers, getHeaderProps }) => {
        const { getHeaders, tableHeadProps, handleSort } = this.props;

        if (getHeaders) {
            const headersCustom = getHeaders(headers);
            this.headerCount = headersCustom.length;
            return (
                <TableHead data-testid="thead" {...tableHeadProps}>
                    <TableRow>
                        {headersCustom}
                    </TableRow>
                </TableHead>
            );
        }

        if (!headers) return null;

        return (
            <TableHead data-testid="thead" {...tableHeadProps}>
                <TableRow>
                    {headers.map(header => {
                        const {sortable, ...rest} = header
                        return (
                            <TableHeader {...rest} {...getHeaderProps({ header, isSortable: sortable })}
                                onClick={() => {
                                    if (this._vState.sortedColumn === header.key) {
                                        this._vState.sortDirection = this._vState.sortDirection === 'ASC' ? 'DESC' : 'ASC';
                                    } else {
                                        this._vState.sortDirection = 'ASC';
                                    }
                                    this._vState.sortedColumn = header.key;
                                    handleSort?.(header.key, this._vState.sortDirection);
                                }}
                                sortDirection={this._vState.sortedColumn === header.key ? this._vState.sortDirection : null}
                                isSortHeader={this._vState.sortedColumn === header.key}
                            >
                                {header.header}
                            </TableHeader>
                       )
                    })}
                </TableRow>
            </TableHead>
        );
    }
    getRows = ({rows, getRowProps}) => {
        const {headers, getRowData, customNoData, renderCustomBody, isRowCustom} = this.props;
        const data = this.getData();

        let headerCount = this.getHeaderCount();

        if (!data || !data.length) {
            return (
                <TableBody data-testid="tbody-with-nodata">
                    {
                        customNoData
                        ?
                            customNoData("tbody-with-nodata", headerCount)
                        :
                            <TableRow data-testid="table-row">
                                {this.getNoData()}
                            </TableRow>
                    }
                </TableBody>
            )
        }

        if (renderCustomBody) {
            // use data-testid property while invoking renderCustomBody
            return renderCustomBody("tbody-with-data", getRowProps);
        }

        return (
            <TableBody data-testid="tbody-with-data">
                {
                    data.map((row, index) => {
                        if (isRowCustom) {
                            return getRowData ? getRowData(row, index, {models: data}) : null;
                        }
                        if (getRowData) {
                            return (
                                <TableRow key={row.id || index} {...getRowProps({row})}>
                                    {getRowData?.(row, index, {models: data})}
                                </TableRow>
                            )
                        } else if (headers) {
                            return (
                                <TableRow key={row.id || index} {...getRowProps({row})}>
                                    {
                                        headers.map((cell, index) => (
                                            <TableCell key={index}>
                                                {row[cell.key] || '--'}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            )
                        }

                        return null;
                    })
                }
            </TableBody>
        )
    }
    getPagination = () => {
        const {data, pagination, paginationProps, defaultPageSizes, showPaginationForSinglePage} = this.props;
        if (!pagination || !f.isPromise(data) || !f.pageState(data)) {
            return null;
        }

        let pageState = f.pageState(data);

         if (!showPaginationForSinglePage && pageState.totalPages < 2) {
             return;
         }

        return (
            <Pagination
                backwardText="Previous page"
                forwardText="Next page"
                itemsPerPageText="Items per page:"
                page={(pageState.number|| 0)+1}
                pageNumberText="Page Number"
                pageSize={pageState.size}
                pageSizes={defaultPageSizes}
                size="md"
                totalItems={pageState.totalElements}
                onChange={this.handlePageChange}
                {...paginationProps}
            />
        )
    }
    handlePageChange = (...args) => {
        const {pageChange} = this.props;
        this.setPageNumberInParam(...args);
        pageChange && pageChange(...args);
    }
    setPageNumberInParam({page, pageSize}) {
        const {data} = this.props;
        if (data && data.params) {
            if (data.params.size != pageSize) {
                data.params.page = 0;
                data.params.size = pageSize;
            } else {
                data.params.page = page - 1;
            }
        }
    }
    getData = () => {
        const {data} = this.props;
        if (!data) {
            return [];
        }

        const processModels = (models) => {
            models.forEach(d => {
                if (d.id != null) {
                    d.id = d.id.toString();
                }
            });
            return models;
        };

        if (f.isPromise(data)) {
            return processModels(f.models(data));
        }

        return processModels(data);
    }
    getIsLoading = () => {
        const {data, isLoading} = this.props;
        if (isLoading) {
            return isLoading;
        }
        if (f.isPromise(data)) {
            return f.isLoading(data);
        }
        return false;
    }
    render() {
        const {title, dataTableProps, tableToolbarProps, headers, tableContainerProps, showToolbar, toolbarContent,
            resizable, tableProps, data, tableSkeletonProps} = this.props;

        let idTableAttr = {};
        if (resizable) {
            idTableAttr = { id: this.tableId };
        }

        let rows = this.getData();
        let isLoading = this.getIsLoading();

        return (
            <DataTable rows={rows} headers={headers || []} {...dataTableProps}>
                {
                    ({
                        rows,
                        headers,
                        getHeaderProps,
                        getRowProps,
                        getTableProps,
                        getToolbarProps,
                        onInputChange,
                        getTableContainerProps
                    }) =>
                        (
                            <TableContainer title={title} className="full-width" {...getTableContainerProps()} {...tableContainerProps}>
                                {
                                    showToolbar &&
                                    <TableToolbar {...getToolbarProps()}
                                        aria-label="data table toolbar"
                                        data-testid="table-toolbar"
                                        {...tableToolbarProps}
                                    >
                                        {this.props.toolbarContent}
                                    </TableToolbar>
                                }
                                {
                                    isLoading
                                    ?
                                        <div style={{height: '300px'}}>
                                            <DataTableSkeleton
                                                showHeader={false}
                                                showToolbar={false}
                                                compact={false}
                                                headers={headers}
                                                aria-label="table loading"
                                                {...tableSkeletonProps}
                                            />
                                            <br />
                                        </div>
                                    :
                                        <>
                                            <Table {...getTableProps()}
                                                aria-label="table"
                                                data-testid="table"
                                                {...idTableAttr}
                                                {...tableProps}
                                            >
                                                {this.getHeaders({headers, getHeaderProps})}
                                                {this.getRows({rows, getRowProps})}
                                            </Table>
                                            {this.getPagination()}
                                        </>
                                }
                            </TableContainer>
                        )
                }
            </DataTable>
        )
    }
}

CommonTable.defaultProps = {
    isLoading: false,
    data: null,
    title: '',
    headers: null,
    getHeaders: null,
    getRowData: null,
    isRowCustom: false,
    renderCustomBody: null,
    noDataText: "No matching records found.",
    customNoData: null,
    customNoDataCaption: null,
    resizable: false,
    showToolbar: false,
    toolbarContent: null,
    tableContainerProps: {},
    dataTableProps: {},
    tableToolbarProps: {},
    tableProps: {},
    tableHeadProps: {},
    tableSkeletonProps: {},
    pagination: true,
    showPaginationForSinglePage: false,
    defaultPageSizes: [15, 20, 50, 100],
    paginationProps: {},
    sortBy: null,
    handleSort: null
}

export default CommonTable;