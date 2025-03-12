import React, {Component, Fragment} from 'react';
import {observer} from 'mobx-react';
import {withRouter} from 'react-router';

import {FEATURE_PERMISSIONS} from 'utils/globals';
import CVectorDBForm from 'containers/applications/vector_db/c_vector_db_form';
// import CVectorDBPolicesDetail from 'containers/policies/vector_db/c_vector_db_policies_detail';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';
import {SkeletonTextLoader} from 'common-ui/carbon_components/loader';

@observer
class CVectorDBDetail extends Component {
	constructor(props) {
		super(props);
		this.permission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.VECTOR_DB.PROPERTY);
        this.policyPermission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.VECTOR_DB_POLICIES.PROPERTY);
	}
    handleRedirect = () => {
        // redirect to listing page
        this.props.history.push('/vector_db');
    }
    handleCancel = () => {
        this.handleRedirect();
    }
    handlePostCreate = (response) => {
        this.props.history.replace('/vector_db/' + response.id);
    }

	render() {
	    const {handleCancel, handlePostCreate} = this;
        const {_vState, handlePostUpdate} = this.props;
		return (
            <Fragment>
                <SkeletonTextLoader
                    isLoading={_vState.loading}
                    lineCount={6}
                >
                    {
                        _vState.model == null
                        ? (
                            <div>
                                Vector DB not found
                            </div>
                        )
                        : (
                            <CVectorDBForm
                                editMode={false}
                                permission={this.permission}
                                model={_vState.model}
                                handleCancel={handleCancel}
                                handlePostCreate={handlePostCreate}
                                handlePostUpdate={handlePostUpdate}
                            />
                        )
                    }
                </SkeletonTextLoader>
                {/*
                    permissionCheckerUtil.checkHasReadPermission(this.policyPermission) && (
                        <Loader isLoading={_vState.loading} loaderContent={getSkeleton('THREE_SLIM_LOADER')}>
                            {
                                _vState.model?.id && <CVectorDBPolicesDetail vectorDBModel={_vState.model} handleTabSelect={this.props.handleTabSelect}/>
                            }
                        </Loader>
                    )
                */}
            </Fragment>
		)
	}
}

export default withRouter(CVectorDBDetail);
