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

const VLayout = () => (
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
              return menuItem.child ? (
                <SideNavMenu key={index} renderIcon={Fade} title={menuItem.name} isActive={isParentActive} defaultExpanded={isParentActive}>
                  {menuItem.child.map((childItem, childIndex) => (
                    <SideNavMenuItem
                      key={childIndex}
                      href={'#'+childItem.to}
                      isActive={window.location.pathname === childItem.to}
                    >
                      {childItem.name}
                    </SideNavMenuItem>
                  ))}
                </SideNavMenu>
              ) : (
                <SideNavLink
                  key={index}
                  renderIcon={Fade}
                  href={'#'+menuItem.to}
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

export default VLayout;