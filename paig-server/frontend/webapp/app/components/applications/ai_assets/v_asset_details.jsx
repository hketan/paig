import React, {Fragment} from 'react';
import { observer } from 'mobx-react';

import {
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RocketLaunchIcon from '@material-ui/icons/Launch';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
//import SmartToyIcon from '@material-ui/icons/SmartToy';
import HeadsetIcon from '@material-ui/icons/Headset';
import FilterListIcon from '@material-ui/icons/FilterList';
//import DataObjectIcon from '@material-ui/icons/DataObject';
import LaunchIcon from '@material-ui/icons/Launch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

import ROCKET_ICON from 'images/trust3_icons/rocket-01.svg';
import DATA_ICON from 'images/trust3_icons/data.svg';
import SCALE_ICON from 'images/trust3_icons/scale-03.svg';
import {CustomAnchorBtn} from 'common-ui/components/action_buttons';
import {Utils} from 'common-ui/utils/utils';
import {ASSERT_RISK_LEVEL} from 'utils/globals';

const AssetDetail = observer(({ _vState }) => {
    const {asset={}} = _vState;
    return (
        <Box p={3}>
            <Grid container spacing={3} alignItems="center">
                <Grid item>
                    <Box
                        style={{
                            width: '75px',
                            height: '75px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F0F4FF',
                            color: '#4169E1'
                        }}
                    >
                        <img src={ROCKET_ICON} style={{fontSize: '65px'}} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h5">
                                    {asset.body.display_name || asset.body.name}
                                </Typography>
                                <Chip
                                    className="m-l-sm"
                                    label={asset.status}
                                    size="small"
                                />
                            </Box>
                        </Box>
                        <Box textAlign="right">
                            <Chip 
                                label={asset.asset_type}
                                size="small"
                            />
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography color="textSecondary" gutterBottom>
                                {asset.body.description}
                            </Typography>
                            {
                                asset.body.author && (
                                    <a>
                                        @{asset.body.author}
                                    </a>
                                )
                            }
                        </Box>
                        <Box textAlign="right">
                            {
                                asset.updated_at &&
                                <Box>
                                    <AccessTimeIcon fontSize="small" className="m-r-sm" />
                                    {Utils.dateUtil.getMomentObject(asset.updated_at).fromNow().replace(/^an? /, '1 ')}
                                </Box>
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
});

const getRiskLevelFromScore = (score) => {
    // Convert percentage to risk score 1-5
    let riskScore;
    if (score <= 2) {
        riskScore = 1;
        return {
            score: riskScore,
            level: ASSERT_RISK_LEVEL.LOW
        };
    } else if (score <= 4) {
        riskScore = 2;
        return {
            score: riskScore,
            level: ASSERT_RISK_LEVEL.MODERATE
        };
    } else if (score <= 6) {
        riskScore = 3;
        return {
            score: riskScore,
            level: ASSERT_RISK_LEVEL.ELEVATED
        };
    } else if (score <= 8) {
        riskScore = 4;
        return {
            score: riskScore,
            level: ASSERT_RISK_LEVEL.HIGH
        };
    }
    riskScore = 5;
    return {
        score: riskScore,
        level: ASSERT_RISK_LEVEL.CRITICAL
    };
}

// Risk Score Component
const RiskScoreCard = observer(({ _vState }) => {
    const {asset={}} = _vState;

    if (!asset.body.risk_score) {
        return null;
    }

    const riskScoreLevel = getRiskLevelFromScore(asset.body.risk_score);
    let riskMessage = asset.body.riskMessage;
    if (riskScoreLevel.level === ASSERT_RISK_LEVEL.LOW) {
        riskMessage = "The application is generally safe, but reviewing permission is recommended for better security.";
    } else if (riskScoreLevel.level === ASSERT_RISK_LEVEL.MODERATE) {
        riskMessage = "The application is moderately safe, but reviewing permission is recommended for better security.";
    } else if (riskScoreLevel.level === ASSERT_RISK_LEVEL.ELEVATED) {
        riskMessage = "Before moving forward with the deployment, it's recommended to thoroughly review the application to ensure that all key functionalities are working as expected, configurations are correct, and there are no outstanding issues that could impact performance or user experience.";
    } else if (riskScoreLevel.level === ASSERT_RISK_LEVEL.HIGH) {
        riskMessage = "The application is high risk and should not be deployed without thorough review and testing. It's recommended to conduct a comprehensive security assessment and implement additional mitigations before proceeding.";
    } else if (riskScoreLevel.level === ASSERT_RISK_LEVEL.CRITICAL) {
        riskMessage = "The application is critical risk and should not be deployed. It's recommended to contact the application owner for further assistance.";
    }

    if (_vState.isRiskExpanded) {
        return (
            <Box p={3}>
                <Grid container className="align-items-center space-between">
                    <Grid item >
                        <Box className="d-flex align-items-center">
                            <Typography variant="h6">
                                Risk Score
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <CustomAnchorBtn
                            onClick={() => _vState.isRiskExpanded = !_vState.isRiskExpanded}
                            icon={_vState.isRiskExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            tooltipLabel={_vState.isRiskExpanded ? 'Collapse' : 'Expand'}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <Box p={2} className="d-flex"
                            style={{ 
                                backgroundColor: riskScoreLevel.level.COLOR + '20',
                                borderRadius: '2px',
                                marginBottom: '3px',
                                gap: '3px'
                            }}
                        >
                            <Box p={2} className="text-center"
                                style={{
                                    backgroundColor: riskScoreLevel.level.COLOR,
                                    color: 'white',
                                    borderRadius: '2px',
                                    minWidth: '120px',
                                }}
                            >
                                <Typography variant="h3" component="div">
                                    {riskScoreLevel.score}
                                </Typography>
                                <Typography>Overall risk score</Typography>
                            </Box>
                            <Box flex={1} className="m-l-sm">
                                <Typography variant="body1" style={{ color: '#374151', marginBottom: '2px' }}>
                                    {riskMessage}
                                </Typography>
                                {/* <a color="primary" style={{ display: 'inline-block', marginTop: '8px' }}>
                                    Learn more
                                </a> */}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    } else {
        return (
            <Box p={3}>
                <Grid container className="align-items-center">
                    <Grid item>
                        <Box className="m-r-sm"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: riskScoreLevel.level.COLOR,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {riskScoreLevel.score}
                        </Box>
                    </Grid>
                    <Grid item xs className="d-flex align-items-center">
                        <Typography variant="h6" style={{marginRight: '10px'}}>
                            Overall risk score
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {riskMessage}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CustomAnchorBtn
                            onClick={() => _vState.isRiskExpanded = !_vState.isRiskExpanded}
                            icon={_vState.isRiskExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            tooltipLabel={_vState.isRiskExpanded ? 'Collapse' : 'Expand'}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    }
});

const ConfiguredService = observer(({ _vState }) => {
    const serviceDetails = _vState.asset?.body?.service_details;
    
    // if (!_vState.asset?.body?.service_details) {
    //     return null;
    // }

    return (
        <Box p={3}>
            <Grid container alignItems="center">
                <Grid item>
                    <Box style={{
                        width: 40,
                        height: 40,
                        //backgroundColor: '#F0F4FF',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} className="m-r-sm">
                        <img src={DATA_ICON} style={{fontSize: '65px'}} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" className="m-r-sm">
                            {serviceDetails ? serviceDetails.serviceName : 'Not Configured'}
                        </Typography>
                        {
                            serviceDetails?.serviceName && (
                                <Chip
                                    icon={
                                        <CheckCircleOutlineIcon
                                            style={{
                                                fontSize: '16px',
                                                color: '#059669'
                                            }}
                                        />
                                    }
                                    label="Configured"
                                    size="small"
                                    style={{
                                        backgroundColor: '#ECFDF5',
                                        color: '#059669'
                                    }}
                                />
                            )
                        }
                    </Box>
                    <Typography color="textSecondary">
                        Knowledge IQ layer
                    </Typography>
                </Grid>
                <Grid item>
                    <Box textAlign="right">
                        {/* <Button color="primary" style={{
                            marginLeft: 'auto',
                            color: '#2196F3'
                        }}>
                            View
                        </Button> */}
                        {
                            serviceDetails?.serviceLastUpdated && (
                                <Typography style={{
                                    color: '#6B7280',
                                    fontSize: '0.875rem'
                                }}>
                                    Last Updated: {Utils.dateUtil.getMomentObject(serviceDetails.serviceLastUpdated).fromNow().replace(/^an? /, '1 ')}
                                </Typography>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
});

const AssetOverview = observer(({ _vState }) => {
    const {asset} = _vState;

    if (!asset?.body) {
        return null;
    }

    const additionalData = asset.body.additional_data || [];

    return (
        <Box component={Paper} p={3} className="m-t-md">
            <Box className="d-flex align-items-center" style={{
                gap: '12px',
                marginBottom: '24px'
            }}>
                <DescriptionIcon style={{ color: '#6B7280' }} />
                <Typography variant="h5" component="h1">
                    Description
                </Typography>
            </Box>
            <Typography variant="body1" style={{ marginBottom: '32px', color: '#4B5563' }}>
                {asset.body.description || 'No description available'}
            </Typography>

            {/* Use Cases Section */}
            <Typography variant="h6" component="h2" className="m-b-sm">
                Use Cases
            </Typography>
            <Typography variant="body1" className="m-b-lg" style={{ color: '#4B5563' }}>
                {asset.body.purpose || 'No use cases available'}
            </Typography>

            {
                additionalData.map((item, index) => {
                    let value = item.value;
                    if (typeof item.value === 'string') {
                        value = [item.value];
                    }
                    return (
                        <Fragment key={item.name}>
                            <Typography variant="h6" component="h2">
                                {item.description}
                            </Typography>
                            <List className="m-b-sm">
                                {
                                    value.map((val) => (
                                        <ListItem key={val} style={{ color: '#4B5563' }}>
                                            <Typography>• {val}</Typography>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Fragment>
                    )
                })
            }
        </Box>
    );
});

const DependencyItem = ({ icon, name, usedBy, usedAs, showView = true }) => (
    <Box p={3} style={{ 
        borderBottom: '1px solid #eee'
    }}>
        <Grid container spacing={2} className="align-items-center space-between">
            <Grid item xs>
                {icon}
                <Typography component="span" className="m-l-sm" variant="subtitle1" style={{ fontWeight: 500 }}>
                    {name}
                </Typography>
                {
                    usedBy && (
                        <Chip
                            label={
                                <Typography variant="body2" color="textSecondary">
                                    used by <b>{usedBy}</b> assets
                                </Typography>
                            }
                            size="small"
                            className="m-l-sm"
                            style={{
                                backgroundColor: '#F3F4F6',
                                borderRadius: '16px'
                            }}
                        />
                    )
                }
            </Grid>
            <Grid item xs={2}>
                {
                    showView && (
                        <Button color="primary" size="small" className="pull-right">
                            View
                        </Button>
                    )
                }
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item>
                <Typography variant="body2" color="textSecondary">
                    Used as: {usedAs}
                </Typography>
            </Grid>
        </Grid>
    </Box>
)

const DependenciesView = () => {
    return (
        <Grid container spacing={3} className="m-t-md">
            {/* Depends On Section */}
            <Grid item xs={6}>
                <Box component={Paper}>
                    <Box p={3} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #eee'
                    }}>
                        <Box style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <img src={SCALE_ICON} style={{ width: '24px', height: '24px' }} />
                            <Typography variant="h6" className="m-l-xs">Depends On</Typography>
                        </Box>
                        <Button 
                            startIcon={<FilterListIcon />}
                            variant="outlined"
                            size="small"
                        >
                            Filter
                        </Button>
                    </Box>
                    
                    <DependencyItem 
                        icon={<StorageIcon style={{ color: '#818CF8' }} />}
                        name="algo_dev3"
                        usedBy="34"
                        usedAs="Model"
                    />
                    
                    <DependencyItem 
                        icon={<SearchIcon style={{ color: '#F472B6' }} />}
                        name="cortex_search"
                        usedBy="2"
                        usedAs="Tools"
                    />
                    
                    <DependencyItem 
                        icon={<StorageIcon style={{ color: '#60A5FA' }} />}
                        name="nim_modelv1"
                        usedBy="4"
                        usedAs="Dataset"
                    />
                    
                    <Box p={3} className="text-center">
                        <Button 
                            startIcon={<FilterListIcon style={{ transform: 'rotate(90deg)' }} />}
                            variant="outlined"
                            size="small"
                        >
                            Show 20 more
                        </Button>
                    </Box>
                </Box>
            </Grid>
    
            {/* Consumed By Section */}
            <Grid item xs={6}>
                <Box component={Paper}>
                    <Box p={3} style={{
                        display: 'flex', 
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #eee'
                    }}>
                        <Box style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <img src={SCALE_ICON} style={{ width: '24px', height: '24px', transform: 'rotate(180deg)' }} />
                            <Typography variant="h6" className="m-l-xs">Consumed By</Typography>
                        </Box>
                        <Button 
                            startIcon={<FilterListIcon />}
                            variant="outlined"
                            size="small"
                        >
                            Filter
                        </Button>
                    </Box>
                        <DependencyItem 
                            icon={<ChatIcon style={{ color: '#F472B6' }} />}
                            name="Sentien AI Chatbot"
                            usedAs="Model"
                        />
                        
                        <DependencyItem 
                            //icon={<SmartToyIcon style={{ color: '#34D399' }} />}
                            name="OmniBot"
                            usedAs="Model"
                        />
                        
                        <DependencyItem 
                            icon={<HeadsetIcon style={{ color: '#EF4444' }} />}
                            name="TeleAgent"
                            usedAs="Model"
                        />
                    <Box p={3} className="text-center">
                        <Button 
                            startIcon={<FilterListIcon style={{ transform: 'rotate(90deg)' }} />}
                            variant="outlined"
                            size="small"
                        >
                            Show 45 more
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

const RuntimeDetails = () => {
    return (
        <Box p={3} component={Paper} className="m-t-md">
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center">
                    <StorageIcon 
                        style={{ 
                            color: '#4169E1',
                            marginRight: '12px',
                            fontSize: '24px'
                        }} 
                    />
                    <Typography variant="h6">
                        Runtime details
                    </Typography>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                        style={{ marginRight: '8px' }}
                    >
                        External links
                    </Button>
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Inference Endpoint Section */}
            <Box>
                <Typography 
                    variant="caption" 
                    style={{ 
                        color: '#6B7280',
                        display: 'block',
                        marginBottom: '8px'
                    }}
                >
                    Inference Endpoint
                </Typography>
                <Box 
                    sx={{
                        padding: '12px 16px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    <Typography 
                        variant="body2" 
                        style={{ 
                            color: '#374151',
                            fontFamily: 'monospace'
                        }}
                    >
                        jade-ganache-9a0c7f.netlify.app/applications/sentientworks
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export {
    AssetDetail,
    RiskScoreCard,
    ConfiguredService,
    AssetOverview,
    DependenciesView,
    RuntimeDetails
}