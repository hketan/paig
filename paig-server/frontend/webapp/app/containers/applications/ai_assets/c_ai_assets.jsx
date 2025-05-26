import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import f from 'common-ui/utils/f';
import { DEFAULTS } from 'common-ui/utils/globals';
import { RISK_LEVEL } from 'utils/globals';
import BaseContainer from 'containers/base_container';
import VAIAssets from 'components/applications/ai_assets/v_ai_assets';
import { SearchField } from 'common-ui/components/filters';
import {FormGroupSelect2} from 'common-ui/components/form_fields';

const content = [
    {
      "id": 0,
      "document_id": "document_processing_assistant",
      "display_name": "Document Processing Assistant",
      "description": "AI agent specialized in document processing assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "deprecated",
      "created_at": "2025-01-04T19:58:39.880581Z",
      "updated_at": "2025-05-26T06:02:10.491697",
      "risk_score": 8,
      "classification": "internal",
      "environment": "staging",
      "regions": [
        "us-west-2"
      ],
      "purpose": "Information retrieval",
      "contains_pii": "no",
      "encryption": "both",
      "authentication": "api_key",
      "authorization": "rbac",
      "compliance_frameworks": [
        "ISO27001",
        "HIPAA"
      ],
      "documentation_url": "https://docs.example.com/agents/document-processing-assistant",
      "data_quality_metrics": {
        "accuracy": 0.9,
        "reliability": 0.92,
        "consistency": 0.87
      }
    },
    {
      "id": 1,
      "document_id": "customer_service_agent",
      "display_name": "Customer Service Assistant",
      "description": "AI-powered customer service agent handling common inquiries and support requests",
      "asset_type": "ai_agent",
      "status": "active",
      "created_at": "2024-05-25T19:58:39.880497Z",
      "updated_at": "2025-05-26T06:02:10.313494",
      "risk_score": 6,
      "classification": "internal",
      "environment": "prod",
      "regions": [
        "us-east-1",
        "eu-west-1"
      ],
      "purpose": "Automated customer support and query resolution",
      "contains_pii": "yes",
      "encryption": "both",
      "authentication": "oauth2",
      "authorization": "rbac",
      "compliance_frameworks": [
        "GDPR",
        "SOC2"
      ],
      "documentation_url": "https://docs.example.com/agents/customer-service",
      "data_quality_metrics": {
        "accuracy": 0.92,
        "reliability": 0.95,
        "consistency": 0.94
      }
    },
    {
      "id": 2,
      "document_id": "security_monitor_agent",
      "display_name": "Security Monitoring Assistant",
      "description": "AI agent for security monitoring and threat detection",
      "asset_type": "ai_agent",
      "status": "active",
      "created_at": "2024-05-25T19:58:39.880557Z",
      "updated_at": "2025-05-26T06:02:10.483415",
      "risk_score": 8,
      "classification": "confidential",
      "environment": "prod",
      "regions": [
        "us-east-1",
        "us-west-2",
        "eu-west-1"
      ],
      "purpose": "Automated security monitoring and incident response",
      "contains_pii": "no",
      "encryption": "both",
      "authentication": "mfa",
      "authorization": "rbac",
      "compliance_frameworks": [
        "SOC2",
        "ISO27001"
      ],
      "documentation_url": "https://docs.example.com/agents/security-monitor",
      "data_quality_metrics": {
        "accuracy": 0.98,
        "reliability": 0.99,
        "consistency": 0.97
      }
    },
    {
      "id": 3,
      "document_id": "code_review_assistant",
      "display_name": "Code Review Assistant",
      "description": "AI agent specialized in code review assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "deprecated",
      "created_at": "2025-04-11T19:58:39.880608Z",
      "updated_at": "2025-05-26T06:02:10.499013",
      "risk_score": 8,
      "classification": "internal",
      "environment": "dev",
      "regions": [
        "us-east-1",
        "ap-southeast-1",
        "eu-west-1"
      ],
      "purpose": "Decision support",
      "contains_pii": "yes",
      "encryption": "none",
      "authentication": "none",
      "authorization": "abac",
      "compliance_frameworks": [
        "SOC2",
        "ISO27001"
      ],
      "documentation_url": "https://docs.example.com/agents/code-review-assistant",
      "data_quality_metrics": {
        "accuracy": 0.88,
        "reliability": 0.95,
        "consistency": 0.91
      }
    },
    {
      "id": 4,
      "document_id": "hr_support_assistant",
      "display_name": "HR Support Assistant",
      "description": "AI agent specialized in hr support assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "deprecated",
      "created_at": "2025-02-22T19:58:39.880635Z",
      "updated_at": "2025-05-26T06:02:10.507597",
      "risk_score": 7,
      "classification": "internal",
      "environment": "dev",
      "regions": [
        "us-east-1",
        "eu-west-1",
        "us-west-2"
      ],
      "purpose": "Process automation",
      "contains_pii": "unknown",
      "encryption": "at_rest",
      "authentication": "basic",
      "authorization": "rbac",
      "compliance_frameworks": [
        "HIPAA",
        "PCI-DSS",
        "GDPR"
      ],
      "documentation_url": "https://docs.example.com/agents/hr-support-assistant",
      "data_quality_metrics": {
        "accuracy": 0.95,
        "reliability": 0.97,
        "consistency": 0.88
      }
    },
    {
      "id": 5,
      "document_id": "marketing_assistant",
      "display_name": "Marketing Assistant",
      "description": "AI agent specialized in marketing assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "archived",
      "created_at": "2024-10-14T19:58:39.880714Z",
      "updated_at": "2025-05-26T06:02:10.528634",
      "risk_score": 4,
      "classification": "public",
      "environment": "staging",
      "regions": [
        "us-east-1",
        "ap-southeast-1"
      ],
      "purpose": "Decision support",
      "contains_pii": "no",
      "encryption": "at_rest",
      "authentication": "mfa",
      "authorization": "none",
      "compliance_frameworks": [
        "ISO27001"
      ],
      "documentation_url": "https://docs.example.com/agents/marketing-assistant",
      "data_quality_metrics": {
        "accuracy": 0.92,
        "reliability": 0.96,
        "consistency": 0.95
      }
    },
    {
      "id": 6,
      "document_id": "it_help_desk_assistant",
      "display_name": "IT Help Desk Assistant",
      "description": "AI agent specialized in it help desk assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "active",
      "created_at": "2024-12-03T19:58:39.880661Z",
      "updated_at": "2025-05-26T06:02:10.514407",
      "risk_score": 4,
      "classification": "internal",
      "environment": "test",
      "regions": [
        "ap-southeast-1"
      ],
      "purpose": "Process automation",
      "contains_pii": "no",
      "encryption": "none",
      "authentication": "basic",
      "authorization": "rbac",
      "compliance_frameworks": [
        "GDPR",
        "PCI-DSS",
        "HIPAA"
      ],
      "documentation_url": "https://docs.example.com/agents/it-help-desk-assistant",
      "data_quality_metrics": {
        "accuracy": 0.92,
        "reliability": 0.91,
        "consistency": 0.91
      }
    },
    {
      "id": 7,
      "document_id": "sales_assistant",
      "display_name": "Sales Assistant",
      "description": "AI agent specialized in sales assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "deprecated",
      "created_at": "2024-07-23T19:58:39.880688Z",
      "updated_at": "2025-05-26T06:02:10.521636",
      "risk_score": 4,
      "classification": "confidential",
      "environment": "test",
      "regions": [
        "us-east-1",
        "ap-southeast-1"
      ],
      "purpose": "Task assistance",
      "contains_pii": "no",
      "encryption": "in_transit",
      "authentication": "basic",
      "authorization": "none",
      "compliance_frameworks": [
        "SOC2",
        "HIPAA"
      ],
      "documentation_url": "https://docs.example.com/agents/sales-assistant",
      "data_quality_metrics": {
        "accuracy": 0.92,
        "reliability": 0.95,
        "consistency": 0.96
      }
    },
    {
      "id": 8,
      "document_id": "research_assistant",
      "display_name": "Research Assistant",
      "description": "AI agent specialized in research assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "active",
      "created_at": "2024-07-29T19:58:39.880735Z",
      "updated_at": "2025-05-26T06:02:10.535731",
      "risk_score": 7,
      "classification": "confidential",
      "environment": "prod",
      "regions": [
        "eu-west-1",
        "us-east-1"
      ],
      "purpose": "Quality control",
      "contains_pii": "unknown",
      "encryption": "both",
      "authentication": "api_key",
      "authorization": "abac",
      "compliance_frameworks": [
        "HIPAA"
      ],
      "documentation_url": "https://docs.example.com/agents/research-assistant",
      "data_quality_metrics": {
        "accuracy": 0.98,
        "reliability": 0.98,
        "consistency": 0.94
      }
    },
    {
      "id": 9,
      "document_id": "compliance_assistant",
      "display_name": "Compliance Assistant",
      "description": "AI agent specialized in compliance assistant tasks and automation",
      "asset_type": "ai_agent",
      "status": "archived",
      "created_at": "2024-12-10T19:58:39.880760Z",
      "updated_at": "2025-05-26T06:02:10.543599",
      "risk_score": 5,
      "classification": "public",
      "environment": "test",
      "regions": [
        "eu-west-1",
        "us-east-1"
      ],
      "purpose": "Quality control",
      "contains_pii": "yes",
      "encryption": "at_rest",
      "authentication": "api_key",
      "authorization": "rbac",
      "compliance_frameworks": [],
      "documentation_url": "https://docs.example.com/agents/compliance-assistant",
      "data_quality_metrics": {
        "accuracy": 0.93,
        "reliability": 0.93,
        "consistency": 0.9
      }
    }
]

@inject("aiAssetsStore")
@observer
class CAIAssets extends Component {
    @observable _vState = {
        searchValue: '',
        riskLevel: ''
    }
    constructor(props) {
        super(props);
        this.cAIAssets = f.initCollection();
        this.cAIAssets.params = {
            size: DEFAULTS.DEFAULT_PAGE_SIZE
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        f.beforeCollectionFetch(this.cAIAssets);
        setTimeout(() => {
            f.resetCollection(this.cAIAssets, content);
        }, 0);
        /* this.props.aiAssetsStore.fetchAIAssets({
            params: this.cAIAssets.params
        }).then(f.handleSuccess(this.cAIAssets), f.handleError(this.cAIAssets)); */
    };

    handleRefresh = () => {
        this.fetchData();
    };

    handlePageChange = () => {
        this.handleRefresh();
    };

    handleSearch = (value) => {
        this._vState.searchValue = value;
        this.cAIAssets.params.name = value || undefined;
        this.cAIAssets.params.page = undefined;
        this.fetchData();
    }
    handleRiskLevelChange = (value) => {
        this._vState.riskLevel = value;
        this.cAIAssets.params.riskLevel = value || undefined;
        this.cAIAssets.params.page = undefined;
        this.fetchData();
    }

    render() {
        return (
            <BaseContainer
                handleRefresh={this.handleRefresh}
                titleColAttr={{ lg: 4, md: 4 }}
                headerChildren={(
                    <Fragment>
                        <SearchField
                            initialValue={this._vState.searchValue}
                            colAttr={{xs: 12, sm: 6, md: 4}}
                            placeholder="Search AI Assets"
                            onEnter={this.handleSearch}
                            data-track-id="search-ai-assets"
                        />
                        <FormGroupSelect2
                            inputColAttr={{
                                md: 4,
                                sm: 6,
                                xs: 12
                            }}
                            data={Object.values(RISK_LEVEL)}
                            showLabel={false}
                            placeholder="All Risk Levels"
                            labelKey="LABEL"
                            valueKey="VALUE"
                            value={this._vState.riskLevel}
                            onChange={this.handleRiskLevelChange}
                            data-testid="risk-level"
                            data-track-id="risk-level-filter"
                        />
                    </Fragment>
                )}
            >
                <VAIAssets
                    data={this.cAIAssets}
                    pageChange={this.handlePageChange}
                />
            </BaseContainer>
        );
    }
}

export default CAIAssets;