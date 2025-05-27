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
    Card
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

import {CustomAnchorBtn} from 'common-ui/components/action_buttons';

const AssetDetail = observer(({ asset={} }) => {
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
                        <RocketLaunchIcon style={{fontSize: '65px'}} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h5">
                                    {asset.name}
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
                                label={asset.type}
                                size="small"
                            />
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography color="textSecondary" gutterBottom>
                                {asset.description}
                            </Typography>
                            <a>
                                @{asset.author}
                            </a>
                        </Box>
                        <Box textAlign="right">
                            <Box>
                                <AccessTimeIcon fontSize="small" className="m-r-sm" />
                                {asset.updatedAt}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
});

// Risk Score Component
const RiskScoreCard = observer(({ _vState, riskDetails }) => {
    return (
        <Box p={3}>
            <Grid container alignItems="center">
                <Grid item>
                    <Box style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: '#22C55E',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }} className="m-r-sm">
                        {riskDetails.riskScore}
                    </Box>
                </Grid>
                <Grid item xs className="d-flex align-items-center">
                    <Typography variant="h6" style={{marginRight: '10px'}}>
                        Overall risk score
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {riskDetails.riskMessage}
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
});

const ConfiguredService = observer(({ serviceDetails }) => {
    return (
        <Box p={3}>
            <Grid container alignItems="center">
                <Grid item>
                    <Box style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#F0F4FF',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} className="m-r-sm">
                        {/* <DataObjectIcon /> */}
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" className="m-r-sm">
                            {serviceDetails.serviceName}
                        </Typography>
                        <Chip
                            icon={<CheckCircleOutlineIcon style={{
                                fontSize: '16px',
                                color: '#059669'
                            }} />}
                            label="Configured"
                            size="small"
                            style={{
                                backgroundColor: '#ECFDF5',
                                color: '#059669'
                            }}
                        />
                    </Box>
                    <Typography color="textSecondary">
                        {serviceDetails.serviceDescription}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box textAlign="right">
                        <Button color="primary" style={{
                            marginLeft: 'auto',
                            color: '#2196F3'
                        }}>
                            View
                        </Button>
                        <Typography style={{
                            color: '#6B7280',
                            fontSize: '0.875rem'
                        }}>
                            {serviceDetails.serviceLastUpdated}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
});

const AssetOverview = observer(({ asset={} }) => {
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
                parakeet-tdt-0.6b-v2 is a 600-million-parameter automatic speech recognition (ASR) model 
                designed for high-quality English transcription, featuring support for punctuation, 
                capitalization, and accurate timestamp prediction.
            </Typography>

            {/* Use Cases Section */}
            <Typography variant="h6" component="h2" style={{ marginBottom: '16px' }}>
                Use Cases
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '32px', color: '#4B5563' }}>
                Serves developers, researchers, academics, and industries that require speech-to-text 
                capabilities, including but not limited to: conversational AI, voice assistants, 
                transcription services, subtitle generation, and voice analytics platforms.
            </Typography>

            {/* Model Architecture Section */}
            <Typography variant="h6" component="h2" style={{ marginBottom: '16px' }}>
                Model Architecture
            </Typography>
            <List style={{ marginBottom: '32px' }}>
                <ListItem style={{ color: '#4B5563' }}>
                • FastConformer-TDT
                </ListItem>
            </List>

            {/* Datasets Section */}
            <Typography variant="h6" component="h2" style={{ marginBottom: '16px' }}>
                Datasets used for Training
            </Typography>
            <List>
                <ListItem style={{ color: '#4B5563' }}>
                • FastConformer-TDT
                </ListItem>
            </List>
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
                            {/* <LinkIcon style={{ color: '#6B7280' }} /> */}
                            <Typography variant="h6">Depends On</Typography>
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
                            {/* <LinkIcon style={{ color: '#6B7280', transform: 'rotate(180deg)' }} /> */}
                            <Typography variant="h6">Consumed By</Typography>
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