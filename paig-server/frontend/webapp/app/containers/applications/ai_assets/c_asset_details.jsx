import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Box, Paper, Divider, Tabs, Tab, Grid } from '@material-ui/core';

import BaseContainer from 'containers/base_container';
import {
    AssetDetail, RiskScoreCard, ConfiguredService, AssetOverview, DependenciesView, RuntimeDetails
} from 'components/applications/ai_assets/v_asset_details';

@observer
class CApplicationDetails extends Component {
    @observable _vState = {
        isRiskExpanded: false
    }
    constructor(props) {
        super(props);
        
        // Mock application data - TODO: Fetch from API
        this.mockApplication = {
            id: this.props.match.params.id,
            name: 'SentientWorks AI Chatbot',
            description: 'An advanced AI chatbot system that provides customer support and service automation.',
            author: '@MichaelJordan',
            status: 'In Evaluation',
            riskScore: 3,
            riskMessage: 'You should consider reviewing the application before proceeding with deployment.',
            useCases: [
                '24/7 Customer Support Automation',
                'Product Inquiries and FAQ',
                'Technical Support Triage',
                'Order Status Updates'
            ],
            targetAudience: [
                'Online Retail Customers',
                'Support Team Members'
            ],
            riskAnalysis: {
                aiModel: {
                    score: 4,
                    description: 'Complex model with potential for bias'
                },
                sensitiveData: {
                    score: 5,
                    description: 'Handles PII and financial data'
                },
                security: {
                    score: 3,
                    description: 'Standard security measures in place'
                }
            }
        };
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    handleDownloadConfig = () => {
        // TODO: Implement config download
        console.log('Downloading config...');
    };

    handleApplyGuardrails = () => {
        // TODO: Implement guardrails application
        console.log('Applying guardrails...');
    };

    handleApplyPermissions = () => {
        // TODO: Implement permissions application
        console.log('Applying permissions...');
    };

    render() {
        return (
            <BaseContainer
                showBackButton={true}
                showRefresh={false}
            >
                <Box component={Paper}>
                    <AssetDetail
                        asset={{
                            name: 'SentientWorks AI Chatbot',
                            description: 'An advanced AI chatbot system that provides customer support and service automation.',
                            author: 'MichaelJordan',
                            status: 'In Evaluation',
                            type: 'Cortex Agent',
                            updatedAt: '2h ago'
                        }}
                    />
                    <Fragment>
                        <Divider className="m-t-sm m-b-sm" />
                        <RiskScoreCard
                            _vState={this._vState}
                            riskDetails={{
                                riskScore: '1.0',
                                riskMessage: 'The application is generally safe, but reviewing permission is recommended for better security.'
                            }}
                        />
                    </Fragment>
                    <Fragment>
                        <Divider className="m-t-sm m-b-sm" />
                        <ConfiguredService
                            _vState={this._vState}
                            serviceDetails={{
                                serviceName: 'Nimbus IQ',
                                serviceDescription: 'Knowledge IQ layer',
                                serviceStatus: 'Configured',
                                serviceLastUpdated: '2h ago'
                            }}
                        />
                    </Fragment>
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
                    asset={{
                        
                    }}
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
            </BaseContainer>
        );
    }
}

export default CApplicationDetails;