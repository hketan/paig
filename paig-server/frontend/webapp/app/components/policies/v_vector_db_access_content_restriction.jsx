import React, {Component} from 'react';

// import {TableRow, TableCell, Switch, Chip} from '@material-ui/core';
// import Tooltip from '@material-ui/core/Tooltip';
// import PersonIcon from '@material-ui/icons/Person';
// import PeopleIcon from '@material-ui/icons/People';

import {TableCell, Tag, Toggle, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import {User, UserMultiple} from '@carbon/icons-react';

import f from 'common-ui/utils/f';
import Table from 'common-ui/carbon_components/table';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';
// import { ActionButtonsWithPermission } from 'common-ui/components/action_buttons';

class VVectorDBAccessContentRestriction extends Component {
    getMetaDataDescription = (name) => {
        const {cMetaData} = this.props;
        const foundData = cMetaData && f.models(cMetaData).find(
            data => data.name === name
        );

        return foundData ? foundData.description : '';
    };

    getUserGroups = (model, accessType) => {
        let userGroups = [];
        if (model.users) {
            userGroups.push({
                label: 'users',
                value: model.users
            });
        }
        if (model.groups?.length) {
            if (!model.users.length && model.groups.length === 1 && model.groups[0] === 'public') {
                userGroups.push({
                    label: 'groups',
                    value: accessType === 'allow' ? ['Everyone'] : ['Others']
                });
            } else {
                userGroups.push({
                    label: 'groups',
                    value: model.groups
                });
            }
        }
        return userGroups;
    }
    getHeaders = () => {
        const {permission, showStatusColumn} = this.props;

        const headers = [
            { header: 'Vector DB Metadata', key: 'metadataKey', width: '200px' },
            { header: 'Value', key: 'metadataValue', /* className: 'tag-value-cell', */ width: '200px' },
            { header: 'Granted Access', key: 'grantedAccess', width: '300px' },
            { header: 'Denied Access', key: 'deniedAccess' }
        ];

        if (showStatusColumn) {
            headers.push({ header: 'Status', key: 'status', width: '70px' });
        }

        if (permissionCheckerUtil.hasUpdateOrDeletePermission(permission)) {
            headers.push({ header: '', key: 'action', width: '90px' });
        }
        return headers;
    }
    getRowData = (model, i) => {
        const {permission, handleStatusUpdate, handlePolicyEdit, handlePolicyDelete, showStatusColumn} = this.props;

        let allowedUserGroups = this.getUserGroups({users: model.allowedUsers, groups: model.allowedGroups}, 'allow');
        let deniedUserGroups = this.getUserGroups({users: model.deniedUsers, groups: model.deniedGroups});

        const description = this.getMetaDataDescription(model.metadataKey);

        let metaData = model.metadataKey;
        if (model.metadataValue) {
            metaData += ` = ${model.metadataValue}`;
        }

        const rows = [
            <TableCell key="metadataKey">
                <Tag
                    type="cool-gray"
                    size="md"
                >
                    {model.metadataKey}
                </Tag>
            </TableCell>,
            <TableCell key="metadataValue">
                <Tag
                    type="cool-gray"
                    size="md"
                >
                    {model.metadataValue}
                </Tag>
            </TableCell>,
            <TableCell key="grantedAccess">
                {
                    allowedUserGroups.map((userGroup) => {
                        return userGroup.value.map((value, index) => {
                            return (
                                <Tag
                                    key={value + index}
                                    type="cool-gray"
                                    size="md"
                                    renderIcon={userGroup.label == 'users' ? User : UserMultiple}
                                >
                                    {value}
                                </Tag>
                            )
                        })
                    })
                }
            </TableCell>,
            <TableCell key="grantedAccess">
                {
                    deniedUserGroups.map((userGroup) => {
                        return userGroup.value.map((value, index) => {
                            return (
                                <Tag
                                    key={value + index}
                                    type="cool-gray"
                                    size="md"
                                    renderIcon={userGroup.label == 'users' ? User : UserMultiple}
                                >
                                    {value}
                                </Tag>
                            )
                        })
                    })
                }
            </TableCell>
        ]

        if (showStatusColumn) {
            rows.push(
                <TableCell key="status">
                    <Toggle
                        id="status"
                        labelText=""
                        labelA=""
                        labelB=""
                        toggled={!!model.status}
                        onToggle={(val) => handleStatusUpdate(+val, model)}
                        disabled={!permissionCheckerUtil.checkHasUpdatePermission(permission)}
                        data-testid="vector-db-status-switch"
                    />
                </TableCell>
            )
        }

        if (permissionCheckerUtil.hasUpdateOrDeletePermission(permission)) {
            rows.push(
                <TableCell key="action">
                    <OverflowMenu aria-label="vector-db-policy-action-menu" flipped={true}>
                        <OverflowMenuItem
                            itemText="Edit"
                            aria-label="Edit"
                            onClick={e => handlePolicyEdit(model)}
                            data-testid="vectordb-policy-edit"
                            data-track-id="vectordb-policy-edit"
                        />
                        <OverflowMenuItem
                            isDelete
                            aria-label="Edit"
                            itemText="Delete"
                            onClick={e => handlePolicyDelete(model)}
                            data-testid="vectordb-policy-delete"
                            data-track-id="vectordb-policy-delete"
                        />
                    </OverflowMenu>
                </TableCell>
            )
        }

        return rows;

        return (
            <TableRow
                key={model.id || i}
                hover
                data-testid="table-row"
                className="restriction-row"
            >
                {/* <TableCell>{model.description || model.name}</TableCell> */}
                <TableCell>
                    <Tooltip
                        title={description}
                        placement="top"
                        arrow
                    >
                        <Chip
                            className="table-container-chips m-r-xs m-b-xs"
                            size="small"
                            label={model.metadataKey}
                        />
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Chip
                        className="table-container-chips m-r-xs m-b-xs"
                        size="small"
                        label={model.metadataValue}
                    />
                </TableCell>
                <TableCell>
                    {
                        allowedUserGroups.map((userGroup) => {
                            return userGroup.value.map((value, index) => {
                                return (
                                    <Chip
                                        key={value + index}
                                        className="table-container-chips m-r-xs m-b-xs"
                                        size="small"
                                        label={<span>{userGroup.label == 'users' ? <PersonIcon fontSize="small" color="action" /> : <PeopleIcon fontSize="small" color="action" />} {value}</span>}
                                    />
                                )
                            })
                        })
                    }
                </TableCell>
                <TableCell>
                    {
                        deniedUserGroups.map((userGroup) => {
                            return userGroup.value.map((value, index) => {
                                return (
                                    <Chip
                                        key={value + index}
                                        className="table-container-chips m-r-xs m-b-xs"
                                        size="small"
                                        label={<span>{userGroup.label == 'users' ? <PersonIcon fontSize="small" color="action" /> : <PeopleIcon fontSize="small" color="action" />} {value}</span>}
                                    />
                                )
                            })
                        })
                    }
                </TableCell>
                {
                    showStatusColumn &&
                    <TableCell>
                        <Switch
                            checked={!!model.status}
                            onChange={({target}) => handleStatusUpdate(+target.checked, model)}
                            disabled={!permissionCheckerUtil.checkHasUpdatePermission(permission)}
                            color="primary"
                            data-testid="vector-db-status-switch"
                        />
                    </TableCell>
                }
                {
                    permissionCheckerUtil.hasUpdateOrDeletePermission(permission) &&
                    <TableCell>
                        {/* <ActionButtonsWithPermission
                            permission={permission}
                            onEditClick={() => handlePolicyEdit(model)}
                            onDeleteClick={() => handlePolicyDelete(model)}
                        /> */}
                    </TableCell>
                }
            </TableRow>
        );
    }
    render() {
        const {cPolicies, handlePageChange} = this.props;

        const headers = this.getHeaders();

        return (
            <Table
                data={cPolicies}
                headers={headers}
                getRowData={this.getRowData}
                pageChange={handlePageChange}
                noDataText="No RAG contextual data filtering found."
            />
        )
    }
}

VVectorDBAccessContentRestriction.defaultProps = {
    permission: {},
    showStatusColumn: true
}

export default VVectorDBAccessContentRestriction;