import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import { TableToolbarContent } from '@carbon/react';

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

    handleSearch = () => {
        this.cSensitiveData.params.name = this._vState.searchValue || undefined;
        this.cSensitiveData.params.page = undefined;
        this.fetchSensitiveData();
    }

    render() {
        const headers = [{
            header: 'Name',
            key: 'name'
        }, {
            header: 'Description',
            key: 'description'
        }]

        return (
            <Table
                data={this.cSensitiveData}
                headers={headers}
                getRowData={null}
                pageChange={this.handlePageChange}
                showToolbar={true}
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
        );
    }
}

CSensitiveData.defaultProps = {
  vName: "sensitiveData"
};

export default CSensitiveData;
