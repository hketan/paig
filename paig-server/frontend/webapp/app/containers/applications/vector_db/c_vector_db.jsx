import React, {Component, Fragment} from 'react';
import {inject} from 'mobx-react';

import {Row, Column, IconButton} from '@carbon/react';
import {Renew} from '@carbon/icons-react';

import f from 'common-ui/utils/f';
import {DEFAULTS} from 'common-ui/utils/globals';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';
// import {PaginationComponent} from 'common-ui/components/generic_components';
import {AddButton} from 'common-ui/carbon_components/action_buttons';
import {FEATURE_PERMISSIONS} from 'utils/globals';
import VVectorDB from 'components/applications/vector_db/v_vector_db';
import {DangerModal} from 'common-ui/carbon_components/modal/danger_modal';

@inject('vectorDBStore')
class CVectorDB extends Component {
	constructor(props) {
		super(props);

		this.permission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.VECTOR_DB.PROPERTY);

		this.cVectorDBs = f.initCollection();
		this.cVectorDBs.params = {
            size: DEFAULTS.DEFAULT_PAGE_SIZE,
            sort: 'createTime,desc'
        };
	}

	componentDidMount() {
	    this.getVectorDBs();
	}
	getVectorDBs = () => {
	    f.beforeCollectionFetch(this.cVectorDBs)
	    this.props.vectorDBStore.getVectorDBs({
	        params: this.cVectorDBs.params
	    }).then(f.handleSuccess(this.cVectorDBs), f.handleError(this.cVectorDBs));
	}
	handleRefresh = () => {
        this.getVectorDBs();
    }
    handleVectorDBCreate = () => {
        this.props.history.push('/vector_db/create');
    }
    handleVectorDBEdit = (id) => {
        this.props.history.push('/vector_db/' + id);
    }
    handleVectorDBDetail = (id) => {
        this.props.history.push('/vector_db/' + id + '/details');
    }
    handleDeleteVectorDB = (model) => {
        this.deleteModalRef?.openModal({
            label: 'Delete Vector DB',
            title: 'Confirm Delete',
            content: (
                <Fragment>
                    Deleting {model.name} will remove all associated policies, and data. This action cannot be undone.
                </Fragment>
            ),
        }).then((confirm) => {
            this.props.vectorDBStore.deleteVectorDB(model.id, {
                models: this.cVectorDBs
            }).then(() => {
                //f.notifySuccess(`The Vector DB ${model.name} deleted successfully`);
                confirm.hide();
                f.handlePagination(this.cVectorDBs, this.cVectorDBs.params);
                this.handleRefresh();
            }, f.handleError(null, null, {confirm}));
        }, () => {});

        return;
        f._confirm.show({
            title: 'Confirm Delete',
			children: <Fragment>Are you sure you want to delete <b>{model.name}</b> vector DB?</Fragment>,
			btnCancelText: 'Cancel',
			btnOkText: 'Delete',
			btnOkColor: 'secondary',
			btnOkVariant: 'text'
        }).then((confirm) => {
            this.props.vectorDBStore.deleteVectorDB(model.id, {
                models: this.cVectorDBs
            })
                .then(() => {
                    //f.notifySuccess(`The Vector DB ${model.name} deleted successfully`);
                    confirm.hide();
                    f.handlePagination(this.cVectorDBs, this.cVectorDBs.params);
                    this.handleRefresh();
                }, f.handleError());
        }, () => {});
    }
    handlePageChange = (page) => {
        this.cVectorDBs.params.page = page-1;
        this.handleRefresh();
    }
	render() {
	    const {cVectorDBs, handleVectorDBCreate, handleVectorDBEdit, handleVectorDBDetail, handleDeleteVectorDB} = this;

		//handleRefresh={this.handleRefresh}

		return (
			<>
			    <div className="header-container" style={{minHeight: '90px'}}>
                    <Row style={{minHeight: '18px'}}>
                    </Row>
                    <div className="page-header m-t-sm d-flex gap-10">
                        <div className="page-title">
                            <h4>
                                VectorDB
                                <IconButton
                                    label="Refresh"
                                    kind="ghost"
                                    size="sm"
                                    onClick={this.handleRefresh}
                                >
                                    <Renew />
                                </IconButton>
                            </h4>
                        </div>
                        <div className="page-action">
                            <AddButton
                                addCol={false}
                                permission={this.permission}
                                data-track-id="add-vector-db"
                                data-testid="add-vector-db"
                                onClick={handleVectorDBCreate}
                            >
                                Create VectorDB
                            </AddButton>
                        </div>
                    </div>
                </div>
			    {/* <Row className="space-between align-items-center">
                    <Column>
                        <h4>VectorDB
                            <IconButton
                                label="Refresh"
                                kind="ghost"
                                size="sm"
                                onClick={this.handleRefresh}
                            >
                                <Renew />
                            </IconButton>
                        </h4>
                    </Column>
                    <AddButton
                        colProps={{className: 'text-right m-b-md'}}
                        permission={this.permission}
                        data-track-id="add-vector-db"
                        data-testid="add-vector-db"
                        onClick={handleVectorDBCreate}
                    >
                        Create VectorDB
                    </AddButton>
                </Row> */}
                <VVectorDB
                    data={cVectorDBs}
                    permission={this.permission}
                    handleVectorDBEdit={handleVectorDBEdit}
                    handleVectorDBDetail={handleVectorDBDetail}
                    handleDeleteVectorDB={handleDeleteVectorDB}
                />

			    <DangerModal
			        ref={ref => this.deleteModalRef = ref}
			    />
			    {/* <PaginationComponent
                    promiseData={cVectorDBs}
                    callback={this.handlePageChange}
                /> */}
			</>
		)
	}
}

export default CVectorDB;