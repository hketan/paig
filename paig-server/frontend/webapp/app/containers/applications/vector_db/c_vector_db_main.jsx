import React, { Component, Fragment } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import {Loading, Tabs, TabList, Tab, TabPanels, TabPanel, Row, Column, Button, Breadcrumb, BreadcrumbItem} from '@carbon/react';

import f from 'common-ui/utils/f';
import UiState from 'data/ui_state';
import { UI_CONSTANTS, FEATURE_PERMISSIONS } from 'utils/globals';
import CVectorDBDetail from 'containers/applications/vector_db/c_vector_db_detail';
import CVectorDBPermissions from 'containers/policies/vector_db/c_vector_db_permissions';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';

@inject('vectorDBStore')
@observer
class CVectorDBMain extends Component {
    @observable _vState = {
        model: null,
        loading: true
    }

    @observable tabsState = {
        defaultState: 0
    }

    state = {
        views: []
    }

    views = [{
        title: "Overview",
        view: CVectorDBDetail,
        tab: `${UI_CONSTANTS.VECTOR_DB}.${UI_CONSTANTS.VECTOR_DB}`,
        index: 0,
        testId: 'vector-db-overview-tab',
        trackId: 'vector-db-overview-tab'
    }, {
        title: "Permissions",
        view: CVectorDBPermissions,
        tab: `${UI_CONSTANTS.VECTOR_DB}.${UI_CONSTANTS.VECTOR_DB_PERMISSIONS}`,
        index: 1,
        testId: 'vector-db-permissions-tab',
        trackId: 'vector-db-permissions-tab'
    }]

    constructor(props) {
		super(props);
		this.permission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.VECTOR_DB.PROPERTY);
	}

    componentDidMount() {
        this.filterTabs();
		if (this.props.match.params.id) {
			this.getVectorDBDetails(this.props.match.params.id);
		} else {
		    this._vState.model = null;
			this._vState.loading = false;
		}
    }

	getVectorDBDetails = (id) => {
	    this._vState.loading = true;
        this.props.vectorDBStore.getVectorDBById(id)
            .then((response) => {
                this._vState.model = response;
                this._vState.loading = false;
            }, f.handleError(null, () => {
                this._vState.loading = false;
                this._vState.model = null;
            }));
    }

    componentWillUnmount() {
        let { tabsState } = this;
        let data = JSON.stringify({ tabsState });

        UiState.saveState(this.props._vName, data);
    }

    filterTabs() {
        let { state } = this;
        state.views = this.views;
        if (state.views.length && !this.hasEventKey(state.views, this.tabsState.defaultState)) {
            this.tabsState.defaultState = state.views[0].index;
        }
        this.setState(state);
    }

    hasEventKey(views = [], defaultState = 1) {
        return !!views.find(view => view.index == defaultState);
    }

    handleTabSelect = (key, path) => {
        this.tabsState.defaultState = key;
    }
    
    handleRedirect = () => {
        this.props.history.push('/vector_db');
    }

    handleBackButton = () => {
        this.handleRedirect();
    }
    
    handlePostDelete = () => {
        this.handleRedirect();
    }

    handleDelete = () => {
        f._confirm.confirmDelete({
                children: <Fragment>Are you sure you want to delete <b>{this._vState.model.name}</b> vector DB?</Fragment>,
            }).then((confirm) => {
                this.props.vectorDBStore.deleteVectorDB(this._vState.model.id)
                    .then(() => {
                        f.notifySuccess(`The Vector DB ${this._vState.model.name} deleted successfully`);
                        confirm.hide();
                        this.handlePostDelete();
                    }, f.handleError(null, null, {confirm}));
            }, () => {});
    }
    handleEdit = () => {
        this.props.history.push(`/vector_db/${this._vState.model.id}`);
    }

    render() {
        const {state, _vState, handleBackButton, handleTabSelect, getVectorDBDetails}  = this;
        let tabs = [];
        let tabsPane = [];

        if (state.views.length) {
            state.views.forEach((viewObj) => {
                tabs.push(
                    <Tab
                        key={viewObj.index}
                        ref={ref => viewObj.ref = ref}
                        onClick={(e) => this.handleTabSelect(viewObj.index)}
                        data-testid={viewObj.testId}
                        data-track-id={viewObj.trackId}
                    >
                        {viewObj.title}
                    </Tab>
                )
                tabsPane.push(
                    <TabPanel key={viewObj.index}>
                        <viewObj.view _vState={_vState} handleTabSelect={handleTabSelect} handlePostUpdate={getVectorDBDetails} />
                    </TabPanel>
                )
            })
        }

        if (_vState.loading) {
            return (
                <Loading small />
            )
        }

        return (
            <>
                <div className="header-container" style={{minHeight: '90px'}}>
                    <Row style={{minHeight: '18px'}}>
                        <Column>
                            <Breadcrumb noTrailingSlash>
                                <BreadcrumbItem href="#/vector_db">VectorDB</BreadcrumbItem>
                                <BreadcrumbItem isCurrentPage>Details</BreadcrumbItem>
                            </Breadcrumb>
                        </Column>
                    </Row>
                    <div className="page-header m-t-sm d-flex gap-10">
                        <div className="page-title">
                            <h3>{this._vState.model?.name}</h3>
                        </div>
                        <div className="page-action">
                            {
                                this._vState.model &&
                                <Button kind="tertiary" onClick={this.handleEdit}>
                                    Edit VectorDB
                                </Button>
                            }
                        </div>
                    </div>
                </div>
                <Tabs onTabCloseRequest={() => {}}>
                    <TabList contained scrollDebounceWait={200} aria-label="tabs">
                        {tabs}
                    </TabList>
                    <TabPanels>
                        {tabsPane}
                    </TabPanels>
                </Tabs>
            </>
        )
    }
}

CVectorDBMain.defaultProps = {
    view: UI_CONSTANTS.PAIG_NAVIGATOR,
    _vName: 'c_vector_db_main'
};

export default CVectorDBMain;
