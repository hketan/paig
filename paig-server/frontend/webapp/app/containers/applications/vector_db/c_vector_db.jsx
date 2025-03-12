import React, {Component, Fragment} from 'react';
import {inject} from 'mobx-react';

import {Row, Column} from '@carbon/react';

import f from 'common-ui/utils/f';
import {DEFAULTS} from 'common-ui/utils/globals';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';
// import {PaginationComponent} from 'common-ui/components/generic_components';
import {AddButton} from 'common-ui/carbon_components/action_buttons';
import {FEATURE_PERMISSIONS} from 'utils/globals';
import VVectorDB from 'components/applications/vector_db/v_vector_db';

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
			    <Row className="space-between">
                    <Column>
                    </Column>
                    <AddButton
                        colProps={{className: 'text-right m-b-md'}}
                        permission={this.permission}
                        data-track-id="add-vector-db"
                        data-testid="add-vector-db"
                        onClick={handleVectorDBCreate}
                    >
                        CREATE VECTOR DB
                    </AddButton>
                </Row>
			    <VVectorDB
			        data={cVectorDBs}
			        permission={this.permission}
			        handleVectorDBEdit={handleVectorDBEdit}
			        handleVectorDBDetail={handleVectorDBDetail}
			        handleDeleteVectorDB={handleDeleteVectorDB}
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