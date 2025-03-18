import React, { Component } from "react";
import { inject } from "mobx-react";
import { observable } from "mobx";

import { TableToolbarContent, Row, Column, IconButton } from '@carbon/react';
import {Renew} from '@carbon/icons-react';

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
            <>
                <div className="header-container" style={{minHeight: '90px'}}>
                    <Row style={{minHeight: '18px'}}>
                    </Row>
                    <div className="page-header m-t-sm d-flex gap-10">
                        <div className="page-title">
                            <h3 className="d-flex align-center">Tags
                                <IconButton
                                    label="Refresh"
                                    kind="ghost"
                                    onClick={this.handleRefresh}
                                >
                                    <Renew size={20} />
                                </IconButton>
                            </h3>
                        </div>
                        <div className="page-action">
                        </div>
                    </div>
                </div>
                {/* <div>
                    <Row className="m-b-md">
                        <Column>
                            <h4>Tags
                                <IconButton
                                    label="Refresh"
                                    kind="ghost"
                                    size="sm"
                                    onClick={this.handleRefresh}
                                >
                                    <Renew />
                                </IconButton>
                            </h4>
                        </Column>
                    </Row>
                </div> */}
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
            </>
        );
    }
}

CSensitiveData.defaultProps = {
  vName: "sensitiveData"
};

export default CSensitiveData;
