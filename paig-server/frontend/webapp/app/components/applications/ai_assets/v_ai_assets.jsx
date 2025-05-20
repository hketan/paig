import React, { Component } from 'react';

import { TableCell, Chip } from '@material-ui/core';

import Table from 'common-ui/components/table';
import {Utils} from 'common-ui/utils/utils';

class VAIAssets extends Component {
    constructor(props) {
        super(props);
    }

    getHeaders = () => {
        return [
            <TableCell key="name">
                Name
            </TableCell>,
            <TableCell key="type">
                Type
            </TableCell>,
            <TableCell key="owner">
                Owner
            </TableCell>,
            <TableCell key="riskLevel">
                Risk Level
            </TableCell>,
            <TableCell key="trustStage">
                Trust Stage
            </TableCell>,
            <TableCell key="lastUpdated">
                Last Updated
            </TableCell>
        ];
    };

    getRowData = (model) => {
        return [
            <TableCell key="name">
                {model.name || "--"}
            </TableCell>,
            <TableCell key="type">
                <Chip
                    label={model.type || "--"}
                    size="small"
                />
            </TableCell>,
            <TableCell key="owner">
                {model.owner || "--"}
            </TableCell>,
            <TableCell key="riskLevel">
                <Chip
                    label={model.riskLevel || "--"}
                    size="small"
                />
            </TableCell>,
            <TableCell key="trustStage">
                <Chip
                    label={model.trustStage || "--"}
                    size="small"
                />
            </TableCell>,
            <TableCell key="lastUpdated">
                {
                    model.lastUpdated
                    ?
                        <span title={model.lastUpdated}>
                            {Utils.dateUtil.getMomentObject(model.lastUpdated).fromNow()}
                        </span>
                    : "--"
                }
            </TableCell>
        ];
    };

    render() {
        const { pageChange, data } = this.props;

        return (
            <Table
                data={data}
                getHeaders={this.getHeaders}
                getRowData={this.getRowData}
                pageChange={pageChange}
            />
        );
    }
}

export default VAIAssets;