import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

import { TableCell, Chip, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Table from 'common-ui/components/table';
import {Utils} from 'common-ui/utils/utils';
import {CustomAnchorBtn} from 'common-ui/components/action_buttons';
import {ASSERT_RISK_LEVEL, ASSERT_DATA_SEVERITY_LEVEL} from 'utils/globals';

const getPrivacyLevel = (agent={}) => {
    let score = 0;
    if (agent.contains_pii === "yes") score += 1;
    if (agent.encryption === "none") score += 1;
    if (agent.authentication === "none") score += 1;

    if (score === 0) return ASSERT_DATA_SEVERITY_LEVEL.LOW;
    if (score === 1) return ASSERT_DATA_SEVERITY_LEVEL.MODERATE;
    if (score === 2) return ASSERT_DATA_SEVERITY_LEVEL.HIGH;
    return ASSERT_DATA_SEVERITY_LEVEL.SEVERE;
}

const getQualityLevel = (metrics={}) => {
    if (!metrics) return "Unknown";
    const avg = (metrics.accuracy + metrics.reliability + metrics.consistency) / 3;

    if (avg < 0.80) return ASSERT_DATA_SEVERITY_LEVEL.LOW;
    if (avg < 0.90) return ASSERT_DATA_SEVERITY_LEVEL.MODERATE;
    if (avg < 0.95) return ASSERT_DATA_SEVERITY_LEVEL.HIGH;
    return ASSERT_DATA_SEVERITY_LEVEL.SEVERE;
}

const getRiskLevelFromScore = (score) => {
    if (score <= 2) {
        return ASSERT_RISK_LEVEL.LOW;
    } else if (score <= 4) {
        return ASSERT_RISK_LEVEL.MODERATE;
    } else if (score <= 6) {
        return ASSERT_RISK_LEVEL.ELEVATED;
    } else if (score <= 8) {
        return ASSERT_RISK_LEVEL.HIGH;
    }
    return ASSERT_RISK_LEVEL.CRITICAL;
}

const AssetActionsMenu = ({ model }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();

    return (
        <>
            <CustomAnchorBtn
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
                size="small"
                icon={<MoreHorizIcon fontSize="small" />}
                tooltipLabel="Actions"
            />
            <Menu
                id="asset-actions-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                getContentAnchorEl={null}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right', 
                }}
                style={{
                    marginTop: '25px'
                }}
            >
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    history.push(`/ai_assets/${model.id}/details`);
                }}>
                    <ListItemText>View</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
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
            </TableCell>,
            <TableCell key="actions">
            </TableCell>
        ];
    };

    getRowData = (model) => {
        const riskLevel = getRiskLevelFromScore(model.risk_score);
        const dataPrivacyLevel = getPrivacyLevel(model);
        const dataQualityLevel = getQualityLevel(model.data_quality_metrics);

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
                    riskLevel ?
                        <Chip
                            label={<b>{riskLevel.LABEL}</b>}
                            style={{ color: riskLevel.COLOR, backgroundColor: riskLevel.COLOR + '20' }}
                            size="small"
                        />
                    : "--"
                }
            </TableCell>,
            <TableCell key="trustStage">
                {
                    model.status ?
                        <Chip
                            label={model.status || '--'}
                            size="small"
                        />
                    : "--"
                }
            </TableCell>,
            <TableCell key="dataPrivacy">
                <Chip
                    label={dataPrivacyLevel.LABEL}
                    size="small"
                />
            </TableCell>,
            <TableCell key="quality">
                <Chip
                    label={dataQualityLevel.LABEL}
                    size="small"
                />
            </TableCell>,
            <TableCell key="lastUpdated">
                {
                    model.updated_at
                    ?
                        <span title={model.updated_at}>
                            {Utils.dateUtil.getMomentObject(model.updated_at).fromNow().replace(/^an? /, '1 ')}
                        </span>
                    : "--"
                }
            </TableCell>,
            <TableCell key="actions">
                <AssetActionsMenu model={model} />
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