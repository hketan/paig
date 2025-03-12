import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";

import history from 'common-ui/routers/history'
import {UI_CONSTANTS} from 'utils/globals';
// import {Authorization, getRedirectPath} from 'auth/authorization';

import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';

/* import CPageNotFound from 'containers/c_page_not_found';
import CForbiddenError from 'containers/c_forbidden_error';

import CDashboard from 'containers/dashboard/c_dashboard';
import CUserManagementMain from 'containers/user_management/c_user_management_main';

import CAIApplications from 'containers/applications/ai_applications/c_ai_applications';
import CAIApplicationCreate from 'containers/applications/ai_applications/c_ai_application_create';
import CAIApplicationMain from 'containers/applications/ai_applications/c_ai_application_main';

import CVectorDB from 'containers/applications/vector_db/c_vector_db';
import CVectorDBCreate from 'containers/applications/vector_db/c_vector_db_create';
import CVectorDBMain from 'containers/applications/vector_db/c_vector_db_main';

import CSecurityAudits from 'containers/audits/security/c_security_audits';
import CAdminAudits from 'containers/compliance/c_admin_audits';


import CShieldConfig from 'containers/shield_configuration/c_shield_configuration';
import CMetaData from 'containers/metadata/c_metadata';

import CReporting from 'containers/reports/c_reporting';
import CSavedReportsListing from 'containers/reports/c_`saved_reports_listing'; */

import CSensitiveData from 'containers/account/sensitive_data/c_sensitive_data';
// import CAIApplicationForm from 'containers/applications/ai_applications/c_ai_application_form';
import CAIApplicationMain from 'containers/applications/ai_applications/c_ai_application_main';
import CAIApplications from 'containers/applications/ai_applications/c_ai_applications';

import CVectorDB from 'containers/applications/vector_db/c_vector_db';
import CVectorDBForm from 'containers/applications/vector_db/c_vector_db_form';

// import CEvaluationForm from 'containers/audits/evaluation/c_evaluation_create_form';
// import CEvaluationConfigList from 'containers/audits/evaluation/c_evaluation_config_list';
// import CEvaluationReportsList from 'containers/audits/evaluation/c_evaluation_report_list';
// import CEvaluationReport from 'containers/audits/evaluation/c_evaluation_report';

history.listen((location, action) => {
    // scroll to top when route changes
    window.scrollTo(0, 0);
});

const RedirectToPath = () => {
    let path = 'dashboard';//getRedirectPath();
    console.log('landing page path: ', path);
    return <Redirect to={path} />;
}

const checkComponentPermission = (permissionProperty) => {
    const permission = permissionCheckerUtil.getPermissions(permissionProperty);
    return !permissionCheckerUtil.checkHasReadPermission(permission);
}

const Dashboard = () => {
    return (<div>Loader</div>)
}

const Routes = () => (
	<Switch>
		<Route exact path="/" component={RedirectToPath} />

		<Route path="/dashboard" name="Dashboard" component={Dashboard} />
		{/* <Route path="/ai_application/create" name="Create Application" component={CAIApplicationForm} /> */}
		<Route path="/ai_application/:id" name="AI Application Details" component={CAIApplicationMain} />
		<Route path="/ai_applications" name="AI Applications" component={CAIApplications} />

		<Route path="/vector_db/create" name="Create VectorDB" component={CVectorDBForm} />
		<Route path="/vector_db/:id/detail" name="VectorDB Details" component={CVectorDBForm} />
		<Route path="/vector_db/:id" name="Update VectorDB" component={CVectorDBForm} />
		<Route path="/vector_db" name="Vector DB" component={CVectorDB} />

		<Route path="/tags" name="Tags" component={CSensitiveData} />

        {/* <Route path="/dashboard" name="Dashboard" component={Authorization(CDashboard, [UI_CONSTANTS.DASHBOARD])} />

        {/* Paig Navigator */}
        {/* <Route path="/ai_application/create" name="Create Application" component={Authorization(CAIApplicationCreate, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.AI_APPLICATIONS])} />
        <Route path="/ai_application/:id" name="AI Application Details" component={Authorization(CAIApplicationMain, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.AI_APPLICATIONS])} />
        <Route path="/ai_applications" name="AI Applications" component={Authorization(CAIApplications, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.AI_APPLICATIONS])} />

        <Route path="/vector_db/create" name="Create Vector DB" component={Authorization(CVectorDBCreate, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.VECTOR_DB])} />
        <Route path="/vector_db/:id" name="Update Vector DB" component={Authorization(CVectorDBMain, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.VECTOR_DB])} />
        <Route path="/vector_db" name="Vector DB" component={Authorization(CVectorDB, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.VECTOR_DB])} /> */}

        {/* Paig Lens */}
        {/* <Route path="/dashboard" name="Dashboard" component={Authorization(CDashboard, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.DASHBOARD])} />

        <Route path="/eval_reports" name="Evaluation Reports" component={Authorization(CEvaluationReportsList, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_REPORTS])} />
        <Route path="/eval/create" name="Create Security Evaluation" component={Authorization(CEvaluationForm, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_CONFIG])} />
        <Route path="/eval_configs" name="Security Evaluation" component={Authorization(CEvaluationConfigList, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_CONFIG])} />
        <Route path="/eval_report/:eval_id" name="Evaluation Report" component={Authorization(CEvaluationReport, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_REPORTS])} />

        <Route path="/audits_security" name="Access Audits" component={Authorization(CSecurityAudits, [UI_CONSTANTS.AUDITS, UI_CONSTANTS.SECURITY])} /> */}
         */}{/* TODO: [PAIG-2025] Uncomment this route once Admin Audits implemented */}{/*
         */}{/* <Route path="/admin_audits" name="Admin Audits" component={Authorization(CAdminAudits, [UI_CONSTANTS.COMPLIANCE, UI_CONSTANTS.ADMIN_AUDITS])} /> */}{/*
        <Route path="/audits_security" name="Access Audits" component={Authorization(CSecurityAudits, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.SECURITY])} />
        {/* TODO: [PAIG-2025] Uncomment this route once Admin Audits implemented */}
        {/* <Route path="/admin_audits" name="Admin Audits" component={Authorization(CAdminAudits, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.ADMIN_AUDITS])} /> */}

         */}{/* TODO: [PAIG-2025] Uncomment this route once Shield Configuration implemented */}{/*
         */}{/* <Route path="/shield_configuration" name="Shield Configuration" component={Authorization(CShieldConfig, [UI_CONSTANTS.ACCOUNT, UI_CONSTANTS.SHIELD_CONFIGURATION])} /> */}{/*
        <Route path="/user_management" name="User Management" component={Authorization(CUserManagementMain, [UI_CONSTANTS.ACCOUNT, UI_CONSTANTS.USER_MANAGEMENT])} />
        <Route path="/tags" name="Tags" component={Authorization(CSensitiveData, [UI_CONSTANTS.ACCOUNT, UI_CONSTANTS.SENSITIVE_DATA])} />
        <Route path="/vector_db_metadata" name="Vector DB Metadata" component={Authorization(CMetaData, [UI_CONSTANTS.ACCOUNT, UI_CONSTANTS.META_DATA])} />

         */}{/*Reports*/}{/*
         */}{/* TODO: [PAIG-2025] Uncomment this route once Saved Reports implemented */}{/*
         */}{/* <Route path="/saved_reports" name="Saved Reports" component={Authorization(CSavedReportsListing, [UI_CONSTANTS.REPORTS, UI_CONSTANTS.SAVED_REPORTS])} /> */}{/*
        <Route exact path="/built_in_reports" name="Built-in Reports" component={Authorization(CReporting, [UI_CONSTANTS.REPORTS, UI_CONSTANTS.BUILT_IN_REPORTS])} />
        <Route path="/built_in_reports/:reportType/new" name="Built-in Reports" component={Authorization(CReporting, [UI_CONSTANTS.REPORTS, UI_CONSTANTS.BUILT_IN_REPORTS])} />
         */}{/* TODO: [PAIG-2025] Uncomment this route once Saved Reports implemented */}{/*
         */}{/* <Route path="/reports/:reportType/:configId" name="Saved Reports" component={Authorization(CReporting, [UI_CONSTANTS.REPORTS, UI_CONSTANTS.BUILT_IN_REPORTS])} /> */}{/*
        <Route exact path="/reports" name="Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} />
        <Route path="/reports/:reportType/new" name="Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} />
        {/* TODO: [PAIG-2025] Uncomment this route once Saved Reports implemented */}
        {/* <Route path="/saved_reports" name="Saved Reports" component={Authorization(CSavedReportsListing, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.SAVED_REPORTS])} /> */}
        {/* <Route path="/reports/:reportType/:configId" name="Saved Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} /> */}
        {/* <Route path="/report/:configId" name="Saved Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} /> */}

        {/* Paig Guard */}
        {/* <Route path="/tags" name="Tags" component={Authorization(CSensitiveData, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.SENSITIVE_DATA])} />
        <Route path="/vector_db_metadata" name="Vector DB Metadata" component={Authorization(CMetaData, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.META_DATA])} /> */}

        {/* Settings */}
        {/* <Route path="/users" name="Users" component={Authorization(CUserManagementMain, [UI_CONSTANTS.SETTINGS, UI_CONSTANTS.USERS])} /> */}

        {/* TODO: [PAIG-2025] Uncomment this route once Shield Configuration implemented */}
        {/* <Route path="/shield_configuration" name="Shield Configuration" component={Authorization(CShieldConfig, [UI_CONSTANTS.SETTINGS, UI_CONSTANTS.SHIELD_CONFIGURATION])} /> */}
         */}{/* <Route path="/report/:configId" name="Saved Reports" component={Authorization(CReporting, [UI_CONSTANTS.REPORTS, UI_CONSTANTS.BUILT_IN_REPORTS])} /> */}{/*

		<Route path="/not_found"  component={CPageNotFound} />
        <Route path="/forbidden" component={CForbiddenError}  />
        <Redirect to="/not_found" from="*" /> */}
	</Switch>
)

export {
    Routes
}
