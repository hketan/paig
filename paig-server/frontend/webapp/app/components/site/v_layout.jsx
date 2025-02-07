import React, { Fragment } from 'react';

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
  Fade
} from '@carbon/react';

import { DarkPaigLogo } from 'components/site/paig_logo';
import {SIDEBAR_MENU} from 'components/site/sidebar_menu';
import UiState from 'data/ui_state';
import hashHistory from 'common-ui/routers/history';

const VLayout = () => {
    return (
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
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
              <DarkPaigLogo />
            </HeaderName>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              onSideNavBlur={onClickSideNavExpand}
              href="#main-content"
            >
              <SideNavItems>
                {SIDEBAR_MENU.map((menuItem, index) => {
                  const isParentActive = menuItem.child && menuItem.child.some(childItem => window.location.pathname === childItem.to);
                  const menuToggleAttrName = menuItem.menuToggleAttrName || null;
                  const defaultExpanded = UiState.menuToggle[menuToggleAttrName] || false;

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
                              isActive={window.location.pathname === childItem.to}
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
                      isActive={window.location.pathname === menuItem.to}
                    >
                      {menuItem.name}
                    </SideNavLink>
                  );
                })}
              </SideNavItems>
            </SideNav>
          </Header>
        )}
      />
    );
}

export default VLayout;