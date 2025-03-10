import React from 'react';

//import SettingsIcon from '@material-ui/icons/Settings';
//import SecurityIcon from '@material-ui/icons/Security';
//import ControlCameraRoundedIcon from '@material-ui/icons/ControlCameraRounded';

import { UI_CONSTANTS } from 'utils/globals';
//import { CodeWindowIcon } from './privacera_logo';

const SIDEBAR_MENU = [{
    menuToggleAttrName: "paig_navigator",
    name: "Paig Navigator",
    //  icon: <CodeWindowIcon className="list-svg-icon" />,
    sidebar: UI_CONSTANTS.PAIG_NAVIGATOR,
    child: [{
        to: "/ai_applications",
        name: "AI Applications",
        isChild: true,
        sidebar: UI_CONSTANTS.AI_APPLICATIONS,
        childrenRoutes: ["/ai_applications/", "/ai_application/create", "/ai_application/:id"]
    }, {
        to: "/vector_db",
        name: "Vector DB",
        isChild: true,
        sidebar: UI_CONSTANTS.VECTOR_DB,
        childrenRoutes: ["/vector_db/", "/vector_db/create", "/vector_db/:id"]
    }]
}, {
    menuToggleAttrName: "paig_lens",
    name: "Paig Lens",
    //icon: <ControlCameraRoundedIcon className="nav-rotated-icon" />,
    sidebar: UI_CONSTANTS.PAIG_LENS,
    child: [{
        to: "/dashboard",
        name: "Dashboard",
        isChild: true,
        sidebar: UI_CONSTANTS.DASHBOARD,
    }, {
        to: "/eval_configs",
        name: "Security Evaluation",
        isChild: true,
        sidebar: UI_CONSTANTS.EVALUATION_CONFIG,
        childrenRoutes: ["/eval_configs/"]
    }, {
        to: "/eval_reports",
        name: "Evaluation Reports",
        isChild: true,
        sidebar: UI_CONSTANTS.EVALUATION_REPORTS,
        childrenRoutes: ["/eval_reports", "/eval_report/:eval_id"]
    },{
        to: "/audits_security",
        name: "Access Audits",
        isChild: true,
        sidebar: UI_CONSTANTS.SECURITY
    }, {
        to: "/reports",
        name: "Reports",
        icon: "",
        isChild: true,
        sidebar: UI_CONSTANTS.BUILT_IN_REPORTS,
        childrenRoutes: ["/reports","reports/:reportType/new"]
    }]
}, {
    menuToggleAttrName: "paig_guard",
    name: "Paig Guard",
    //icon: <SecurityIcon className="list-svg-icon" />,
    sidebar: UI_CONSTANTS.PAIG_GUARD,
    child: [{
    to: "/tags",
        name: "Tags",
        isChild: true,
        sidebar: UI_CONSTANTS.SENSITIVE_DATA
    }, {
        to: "/vector_db_metadata",
        name: "Vector DB Metadata",
        isChild: true,
        sidebar: UI_CONSTANTS.META_DATA
    }]
}, {
    menuToggleAttrName: "settings",
    name: "Settings",
    //icon: <SettingsIcon className="list-svg-icon" />,
    sidebar: UI_CONSTANTS.SETTINGS,
    child: [{
        to: "/users",
        name: "Users",
        isChild: true,
        sidebar: UI_CONSTANTS.USERS
    }]
}]

export {
  SIDEBAR_MENU
};