import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import { Box, Paper, Divider, Tabs, Tab, Typography } from '@material-ui/core';

import BaseContainer from 'containers/base_container';
import { getSkeleton, Loader } from 'common-ui/components/generic_components';
import {
    AssetDetail, RiskScoreCard, ConfiguredService, AssetOverview, DependenciesView, RuntimeDetails
} from 'components/applications/ai_assets/v_asset_details';

@inject("aiAssetsStore")
@observer
class CApplicationDetails extends Component {
    @observable _vState = {
        asset: undefined,
        isLoading: false,
        isRiskExpanded: false
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async() => {
        this._vState.isLoading = true;
        try {
            const asset = await this.props.aiAssetsStore.fetchAIAssetDetails(this.props.match.params.id);
            this._vState.asset = asset;
        } catch (error) {
            this._vState.asset = undefined;
            f.handleError()(error);
        } finally {
            this._vState.isLoading = false;
        }
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <BaseContainer
                showBackButton={true}
                showRefresh={false}
            >
                <Loader
                    isLoading={this._vState.isLoading}
                    loaderContent={getSkeleton('FULL_PAGE_LOADER')}
                >
                    <Fragment>
                        {
                            this._vState.asset
                            ?
                            <Fragment>
                                <Box component={Paper}>
                                    <AssetDetail
                                        _vState={this._vState}
                                    />
                                    <Divider className="m-t-sm m-b-sm" />
                                    <RiskScoreCard
                                        _vState={this._vState}
                                    />
                                    <Divider className="m-t-sm" />
                                    <ConfiguredService
                                        _vState={this._vState}
                                    />
                                </Box>
                                <Tabs
                                    value={0}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    className="m-t-md"
                                >
                                    <Tab label="Overview" />
                                </Tabs>
                                <AssetOverview
                                    _vState={this._vState}
                                />
                                <DependenciesView
                                    asset={{
                                        name: 'SentientWorks AI Chatbot',
                                        description: 'An advanced AI chatbot system that provides customer support and service automation.',
                                        author: 'MichaelJordan',
                                        status: 'In Evaluation',
                                        type: 'Cortex Agent',
                                        updatedAt: '2h ago'
                                    }}
                                />
                                <RuntimeDetails
                                />
                            </Fragment>
                        :
                            <Fragment>
                                <Typography variant="h6">
                                    No asset found
                                </Typography>
                            </Fragment>
                        }
                    </Fragment>
                </Loader>
            </BaseContainer>
        );
    }
}

export default CApplicationDetails;