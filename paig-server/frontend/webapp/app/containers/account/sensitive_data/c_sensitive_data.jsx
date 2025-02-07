import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import KeyEvent from 'common-ui/lib/react-structured-filter/keyevent';

import {
    DataTable,
    TableContainer,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Pagination
} from '@carbon/react';

import f from "common-ui/utils/f";
import { DEFAULTS } from "common-ui/utils/globals";
// import BaseContainer from "containers/base_container";
// import VSensitiveData from "components/account/sensitive_data/v_sensitive_data";
// import { SearchField } from 'common-ui/components/filters';

@inject("sensitiveDataStore")
@observer
class CSensitiveData extends Component {
  @observable _vState = {
    searchValue: ''
  }
  constructor(props) {
    super(props);

    this.cSensitiveData = f.initCollection();
    this.cSensitiveData.params = {
      size: DEFAULTS.DEFAULT_PAGE_SIZE
    };
  }

  componentDidMount() {
    this.fetchSensitiveData();
  }

  fetchSensitiveData = () => {
    f.beforeCollectionFetch(this.cSensitiveData);
    this.props.sensitiveDataStore.fetchSensitiveData({
        params: this.cSensitiveData.params
    }).then(f.handleSuccess(this.cSensitiveData), f.handleError(this.cSensitiveData));
  };

  handleRefresh = () => {
    this.fetchSensitiveData();
  };

  handlePageChange = () => {
    this.handleRefresh();
  };

  handleSearch = (e) => {
      let enterPress = false;
      switch ((e.keyCode || e.which)) {
          case KeyEvent.DOM_VK_RETURN:
          case KeyEvent.DOM_VK_ENTER:
              enterPress = true;
              break;
      }
      if (!enterPress) {
          return;
      }
    let value = e.target.value;
    this._vState.searchValue = value;
    this.cSensitiveData.params.name = value || undefined;
    this.cSensitiveData.params.page = undefined;
    this.fetchSensitiveData();
  }

  render() {
      let rows = f.models(this.cSensitiveData).map(d => {
          return {
              id: d.id,
              name: d.name,
              description: d.description
          }
      });

      const headers = [{
          header: 'Name',
          key: 'name'
      }, {
        header: 'Description',
        key: 'description'
      }];

    const pageState = f.pageState(this.cSensitiveData);

    return (
      <Fragment
        /* handleRefresh={this.handleRefresh}
        titleColAttr={{ lg: 8, md: 7 }}
        headerChildren={(
          <SearchField
            initialValue={this._vState.searchValue}
            colAttr={{xs: 12, sm: 4, md: 4}}
            placeholder="Search Tags"
            onEnter={this.handleSearch}
            data-track-id="search-sensitive-data"
          />
        )} */
      >
        {/* <VSensitiveData
          data={this.cSensitiveData}
          pageChange={this.handlePageChange}
        /> */}



        <DataTable rows={rows} headers={headers}>
            {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            getToolbarProps,
            onInputChange,
            getTableContainerProps
          }) => <TableContainer {...getTableContainerProps()}>
                <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
                  <TableToolbarContent>
                    <TableToolbarSearch placeholder="Search Tags" onKeyUp={this.handleSearch} persistent />
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()} aria-label="sample table">
                  <TableHead>
                    <TableRow>
                      {headers.map(header => <TableHeader key={header.key} {...getHeaderProps({
                    header
                  })}>
                          {header.header}
                        </TableHeader>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => <TableRow key={row.id} {...getRowProps({row})}>
                        {row.cells.map(cell => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                      </TableRow>)}
                  </TableBody>
                </Table>
                <Pagination
                    backwardText="Previous page"
                    forwardText="Next page"
                    itemsPerPageText="Items per page:"
                    page={(pageState.number|| 0)+1}
                    pageNumberText="Page Number"
                    pageSize={15 || pageState.size}
                    pageSizes={[
                      15,
                      30,
                      45
                    ]}
                    size="md"
                    totalItems={pageState.totalElements}
                    onChange={({page, pageSize}) => {
                        if (this.cSensitiveData.params.size != pageSize) {
                            this.cSensitiveData.params.page = 0;
                            this.cSensitiveData.params.size = pageSize;
                        } else {
                            this.cSensitiveData.params.page = page - 1;
                        }
                        this.handlePageChange();
                    }}
                  />
              </TableContainer>
            }
          </DataTable>
      </Fragment>
    );
  }
}

CSensitiveData.defaultProps = {
  vName: "sensitiveData"
};

export default CSensitiveData;
