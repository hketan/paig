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

const content = [{
    id: 1,
    name: 'AI Asset 1',
    type: 'Model',
    owner: 'Owner 1',
    riskLevel: 'High',
    trustStage: 'Production',
    lastUpdated: '2025-4-01'
}, {
    id: 2,
    name: 'AI Asset 2',
    type: 'Dataset',
    owner: 'Owner 2',
    riskLevel: 'Medium',
    trustStage: 'Development',
    lastUpdated: '2025-5-02'
}]

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