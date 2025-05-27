import React, { Component } from 'react';

import { TableCell, Chip } from '@material-ui/core';

import Table from 'common-ui/components/table';
import {Utils} from 'common-ui/utils/utils';

const getPrivacyLevel = (agent={}) => {
    let score = 0;
    if (agent.contains_pii === "yes") score += 1;
    if (agent.encryption === "none") score += 1;
    if (agent.authentication === "none") score += 1;

    if (score === 0) return "Low";
    if (score === 1) return "Medium";
    if (score === 2) return "High";
    return "Severe";
}

const getQualityLevel = (metrics={}) => {
    if (!metrics) return "Unknown";
    const avg = (metrics.accuracy + metrics.reliability + metrics.consistency) / 3;

    if (avg < 0.80) return "Low";
    if (avg < 0.90) return "Medium";
    if (avg < 0.95) return "High";
    return "Severe";
}

const getRiskLevelFromScore = (score) => {
    if (score <= 2) {
        return "Low";
    } else if (score <= 4) {
        return "Moderate";
    } else if (score <= 6) {
        return "Elevated";
    } else if (score <= 8) {
        return "High";
    }
    return "Critical";
}

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
            <TableCell key="dataPrivacy">
                Data Privacy
            </TableCell>,
            <TableCell key="quality">
                Quality
            </TableCell>,
            <TableCell key="lastUpdated">
                Last Updated
            </TableCell>
        ];
    };

    getRowData = (model) => {
        return [
            <TableCell key="name">
                {model.display_name || model.name || "--"}
            </TableCell>,
            <TableCell key="type">
                <Chip
                    label={model.asset_type || "--"}
                    size="small"
                />
            </TableCell>,
            <TableCell key="owner">
                {model.owner || "--"}
            </TableCell>,
            <TableCell key="riskLevel">
                {
                    model.risk_score ?
                        <Chip
                            label={getRiskLevelFromScore(model.risk_score) || "--"}
                            size="small"
                        />
                    : "--"
                }
            </TableCell>,
            <TableCell key="trustStage">
                {
                    model.status ?
                        <Chip
                            label={model.status || "--"}
                            size="small"
                        />
                    : "--"
                }
            </TableCell>,
            <TableCell key="dataPrivacy">
                {getPrivacyLevel(model)}
            </TableCell>,
            <TableCell key="quality">
                {getQualityLevel(model.data_quality_metrics)}
            </TableCell>,
            <TableCell key="lastUpdated">
                {
                    model.updated_at
                    ?
                        <span title={model.updated_at}>
                            {Utils.dateUtil.getMomentObject(model.updated_at).fromNow()}
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