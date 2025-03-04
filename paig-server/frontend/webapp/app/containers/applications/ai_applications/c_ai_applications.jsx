import React, {Component, Fragment} from 'react';
import {inject} from 'mobx-react';

import {Row, Column} from '@carbon/react';

import f from 'common-ui/utils/f';
import {DEFAULTS} from 'common-ui/utils/globals';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';
// import {PaginationComponent} from 'common-ui/components/generic_components';
import {AddButton} from 'common-ui/carbon_components/action_buttons';
import {FEATURE_PERMISSIONS} from 'utils/globals';
import VAIApplications from 'components/applications/ai_applications/v_ai_applications';

@inject('aiApplicationStore')
class CAIApplications extends Component {
	constructor(props) {
		super(props);

		this.permission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.AI_APPLICATIONS.PROPERTY);

		this.cAIApplications = f.initCollection();
		this.cAIApplications.params = {
            size: DEFAULTS.DEFAULT_PAGE_SIZE,
            sort: 'createTime,desc'
        };
	}

	componentDidMount() {
	    // get ai applications
	    this.getAIApplications();
	}
	getAIApplications = () => {
	    f.beforeCollectionFetch(this.cAIApplications)
	    this.props.aiApplicationStore.getAIApplications({
	        params: this.cAIApplications.params
	    }).then(f.handleSuccess(this.cAIApplications), f.handleError(this.cAIApplications));
	}
	handleRefresh = () => {
        this.getAIApplications();
    }
    handleApplicationCreate = () => {
        this.props.history.push('/ai_application/create');
    }
    handleApplicationEdit = (id) => {
        this.props.history.push('/ai_application/' + id);
    }
    handleDeleteApplication = (app) => {
        f._confirm.show({
            title: 'Confirm Delete',
			children: <Fragment>Are you sure you want to delete <b>{app.name}</b> application?</Fragment>,
			btnCancelText: 'Cancel',
			btnOkText: 'Delete',
			btnOkColor: 'secondary',
			btnOkVariant: 'text'
        }).then((confirm) => {
            this.props.aiApplicationStore.deleteAIApplication(app.id, {
                models: this.cAIApplications
            })
                .then((response) => {
                    f.notifySuccess(`The AI Application ${app.name} deleted successfully`);
                    confirm.hide();
                    f.handlePagination(this.cAIApplications, this.cAIApplications.params);
                    this.handleRefresh();
                }, f.handleError());
        }, () => {});
    }
    handlePageChange = (page) => {
        this.cAIApplications.params.page = page-1;
        this.handleRefresh();
    }
	render() {
	    const {cAIApplications, permission, handleApplicationEdit, handleDeleteApplication} = this;

	    /*
	    handleRefresh={this.handleRefresh}

	    */

		return (
			<>
			    <Row className="space-between">
                    <Column>
                    </Column>
                    <AddButton
                        colProps={{className: 'text-right'}}
                        permission={this.permission}
                        data-track-id="add-application"
                        data-testid="add-application"
                        onClick={this.handleApplicationCreate}
                    >
                        CREATE APPLICATION
                    </AddButton>
			    </Row>
			    <VAIApplications
			        data={cAIApplications}
			        permission={this.permission}
			        handleApplicationEdit={handleApplicationEdit}
			        handleDeleteApplication={handleDeleteApplication}
			    />
			    {/*<PaginationComponent
                    promiseData={cAIApplications}
                    callback={this.handlePageChange}
                /> */}
			</>
		)
	}
}

export default CAIApplications;