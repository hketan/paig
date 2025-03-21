import React from 'react';

import {GlobalTheme} from '@carbon/react';

import ThemeContext from './theme_context';

class ThemeProviderComponent extends React.Component {
    state = {
        currentTheme: 'light'
    }
    componentDidMount() {
        const { currentTheme } = this.state;
        const theme = localStorage.getItem('theme');
        if (theme) {
            this.setState({
                currentTheme: theme
            }, this.setGlobalTheme);
        } else {
            localStorage.setItem('theme', currentTheme);
            this.setGlobalTheme();
        }
    }
    setTheme = (theme) => {
        this.setState({
            currentTheme: theme
        }, this.setGlobalTheme);
        localStorage.setItem('theme', theme);
    }
    setGlobalTheme = () => {
        document.documentElement.dataset.carbonTheme = this.getGlobalTheme();
    }
    getGlobalTheme = () => {
        const { currentTheme } = this.state;
        if (currentTheme === 'dark') {
            return 'g100';
        }
        return 'g10';
    }
    getSideNavTheme = () => {
        const { currentTheme } = this.state;
        if (currentTheme === 'dark') {
            return 'g100';
        }
        return 'white';
    }
    render() {
        const { children } = this.props;
        const { currentTheme } = this.state;

        return (
            <ThemeContext.Provider value={{
                currentTheme,
                setTheme: this.setTheme,
                getGlobalTheme: this.getGlobalTheme,
                getSideNavTheme: this.getSideNavTheme
            }}>
                <GlobalTheme>
                    {children}
                </GlobalTheme>
            </ThemeContext.Provider>
        );
    }
}

export default ThemeProviderComponent;