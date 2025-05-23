import React, {Component} from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Grid, Box, Paper, Typography, List, ListItem, IconButton } from '@material-ui/core';
//import MoreVertIcon from '@material-ui/icons/MoreVert';

import BaseContainer from 'containers/base_container';
import { FEATURE_PERMISSIONS } from 'utils/globals';
//import {AddButtonWithPermission} from 'common-ui/components/action_buttons';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';
import { VKnowledgeIQPrompt } from 'components/knowledge_iq/v_knowledge_iq';

@observer
class CKnowledgeIQLanding extends Component {
    @observable _vState = {
        selectedLayer: null,
        question: '',
        explainResults: false
    }

    constructor(props) {
        super(props);
        
        this.permission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.KNOWLEDGE_IQ.PROPERTY);
    }

    handleAskQuestion = () => {
        console.log('handleAskQuestion', this._vState);
    }
    
    render() {

        const layers = [
            {
              id: 'main_db_data',
              name: 'Main_db_data',
              description: 'Contains financial contracts, salary records, and access logs tied to payroll, vendor ...'
            },
            {
              id: 'finance_files',
              name: 'finance_files',
              description: 'Contains all files with the prefix finance'
            },
            {
              id: 'auditors',
              name: 'Auditors',
              description: 'Contains financial contracts, salary records, and access logs tied to auditors, layers and para-leg ...'
            }
        ];

        return (
            <BaseContainer>
                <Box component={Paper} p="15px">
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <Grid container className="align-items-center space-between">
                                <Grid item>
                                    <Typography variant="h6">IQ Layer</Typography>
                                </Grid>
                                <Grid item>
                                    {/* <AddButtonWithPermission
                                        permission={this.permission}
                                        addCol={false}
                                        size="small"
                                        label="Add New"
                                        onClick={() => {
                                            this.props.history.push('/knowledge_iq/iq_layer/add');
                                        }}
                                    /> */}
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item sm={12}>
                                    <List>
                                        {
                                            layers.map((layer) => (
                                                <ListItem
                                                    key={layer.id}
                                                    button
                                                    selected={this._vState.selectedLayer === layer.id}
                                                    onClick={e => {
                                                        this._vState.selectedLayer = layer
                                                        e.stopPropagation();
                                                        console.log('layer', layer);
                                                    }}
                                                    style={{
                                                        paddingLeft: '8px'
                                                    }}
                                                >
                                                    <Box width="100%">
                                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                                        <Typography variant="subtitle1">{layer.name}</Typography>
                                                        {/* <IconButton size="small">
                                                            <MoreVertIcon fontSize="small" />
                                                        </IconButton> */}
                                                    </Box>
                                                    <Typography variant="body2" color="textSecondary" noWrap>
                                                        {layer.description}
                                                    </Typography>
                                                    </Box>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={8} style={{
                            backgroundColor: '#F4F9FC',
                            borderRadius: '5px',
                            paddingTop: '20px',
                            paddingBottom: '10px',
                            height: '100%'
                        }}>
                            <Paper style={{minHeight: 'calc(100vh - 210px)'}}>
                                <VKnowledgeIQPrompt
                                    _vState={this._vState}
                                    handleAskQuestion={this.handleAskQuestion}
                                />
                                
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </BaseContainer>
        )
    }
}

export default CKnowledgeIQLanding;