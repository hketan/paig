import React, { Component } from "react";
import { inject } from "mobx-react";
import { observable } from "mobx";

import { TableToolbarContent, Row, Column } from '@carbon/react';

import f from 'common-ui/utils/f';
import { DEFAULTS } from 'common-ui/utils/globals';
import Table from 'common-ui/carbon_components/table';
import {SearchTableToolbar} from 'common-ui/carbon_components/search_table_toolbar';

@inject("sensitiveDataStore")
class CSensitiveData extends Component {
    @observable _vState = {
        searchValue: ''
    }
    constructor(props) {
        super(props);

        this.cSensitiveData = f.initCollection();
        this.cSensitiveData.params = {
            size: DEFAULTS.DEFAULT_PAGE_SIZE,
            sort: 'name,asc'
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

    handleSearch = () => {
        Object.assign(this.cSensitiveData.params, {
            name: this._vState.searchValue || undefined,
            page: 0
        });
        this.fetchSensitiveData();
    }
    handleSort = (key, sortBy) => {
        Object.assign(this.cSensitiveData.params, {
            sort: `${key},${sortBy.toLowerCase()}`,
            page: 0
        });
        this.fetchSensitiveData();
    }

    render() {
        const headers = [{
            header: 'Name',
            key: 'name',
            sortable: true
        }, {
            header: 'Description',
            key: 'description',
            sortable: true
        }]

        return (
            <Row>
                <Column>
                    <Table
                        data={this.cSensitiveData}
                        headers={headers}
                        getRowData={null}
                        noDataText="No matching tags found"
                        pageChange={this.handlePageChange}
                        showToolbar={true}
                        sortBy={this.cSensitiveData.params.sort}
                        handleSort={this.handleSort}
                        toolbarContent={
                            <TableToolbarContent>
                                <SearchTableToolbar
                                    placeholder="Search Tags"
                                    obj={this._vState}
                                    field="searchValue"
                                    onEnter={this.handleSearch}
                                    onClear={this.handleSearch}
                                />
                            </TableToolbarContent>
                        }
                    />
                </Column>
            </Row>
        );
    }
}

CSensitiveData.defaultProps = {
  vName: "sensitiveData"
};

export default CSensitiveData;
