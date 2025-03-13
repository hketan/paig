import React, { useContext } from 'react';

import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem,
    HeaderMenuButton,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    SkipToContent,
    Fade,
    Theme
} from '@carbon/react';

import { User, Logout } from '@carbon/icons-react';

import { PaigLogo } from 'components/site/paig_logo';
import {SIDEBAR_MENU} from 'components/site/sidebar_menu';
import UiState from 'data/ui_state';
import hashHistory from 'common-ui/routers/history';
import ThemeContext from 'components/site/theme_context';
import ThemeSwitch from 'components/site/theme_switch';

const VLayout = () => {

    const { getSideNavTheme } = useContext(ThemeContext);

    return (
        <Theme theme={getSideNavTheme()} style={{position: 'fixed', zIndex: '2'}}>
            <HeaderContainer
                render={
                    ({ isSideNavExpanded, onClickSideNavExpand }) => (
                        <Header aria-label="Privacera PAIG">
                            <SkipToContent />
                            <HeaderMenuButton
                                aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                                //isCollapsible={true}
                                onClick={onClickSideNavExpand}
                                isActive={isSideNavExpanded}
                                aria-expanded={isSideNavExpanded}
                            />
                            <HeaderName href="#" prefix="">
                                <PaigLogo />
                            </HeaderName>
                            <HeaderGlobalBar>
                                <HeaderNavigation aria-label="Header">
                                    <HeaderMenuItem aria-label="Theme Switch">
                                        <ThemeSwitch />
                                    </HeaderMenuItem>
                                </HeaderNavigation>
                                <HeaderGlobalAction aria-label="Avatar">
                                    <User />
                                </HeaderGlobalAction>
                                {/* <HeaderMenu isActive aria-label="Link 4" menuLinkName="Link 4">
                                  < HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                                </HeaderMenu> */}
                            </HeaderGlobalBar>
                            <SideNav
                                aria-label="Side navigation"
                                expanded={isSideNavExpanded}
                                onSideNavBlur={onClickSideNavExpand}
                                href="#main-content"
                            >
                                <SideNavItems>
                                    {
                                        SIDEBAR_MENU.map((menuItem, index) => {
                                            const isParentActive = menuItem.child && menuItem.child.some(childItem => window.location.pathname === childItem.to);
                                            const menuToggleAttrName = menuItem.menuToggleAttrName || null;
                                            const defaultExpanded = true;//UiState.menuToggle[menuToggleAttrName] || false;
                                            //isActive={isParentActive}

                                            return menuItem.child ? (
                                                <div key={index} onClick={(e) => {
                                                    if (menuToggleAttrName) {
                                                        UiState.menuToggle[menuToggleAttrName] = !UiState.menuToggle[menuToggleAttrName];
                                                    }
                                                }}>
                                                    <SideNavMenu renderIcon={Fade} title={menuItem.name} defaultExpanded={defaultExpanded}>
                                                        {menuItem.child.map((childItem, childIndex) => (
                                                            <SideNavMenuItem
                                                                key={childIndex}
                                                                className="pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (menuToggleAttrName) {
                                                                        UiState.menuToggle[menuToggleAttrName] = true;
                                                                    }
                                                                    hashHistory.push(childItem.to);
                                                                }}
                                                                isActive={window.location.hash === ('#' + childItem.to)}
                                                            >
                                                                {childItem.name}
                                                            </SideNavMenuItem>
                                                        ))}
                                                    </SideNavMenu>
                                                </div>
                                            ) : (
                                                <SideNavLink
                                                    key={index}
                                                    renderIcon={Fade}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        hashHistory.push(menuItem.to);
                                                    }}
                                                    isActive={window.location.hash === ('#' + menuItem.to)}
                                                >
                                                    {menuItem.name}
                                                </SideNavLink>
                                            );
                                        })
                                    }
                                </SideNavItems>
                            </SideNav>
                        </Header>
                    )
                }
            />
        </Theme>
    );
}

export default VLayout;