import React, {Fragment} from 'react';

import {Toggle} from '@carbon/react';
import {LightFilled, AsleepFilled} from '@carbon/icons-react';

import ThemeContext from './theme_context';

class ThemeSwitch extends React.Component {
    static contextType = ThemeContext;

    toggleTheme = () => {
        const { currentTheme, setTheme } = this.context;
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    render() {
        return (
            <div className="d-flex align-items-center">
                {
                    this.context.currentTheme === 'dark'
                    ? <AsleepFilled />
                    : <LightFilled />
                }
                <Toggle
                    size="sm"
                    labelA="Light"
                    labelB="Dark"
                    defaultToggled
                    id="theme-switch"
                    data-testid="theme-switch"
                    data-track-id="theme-switch"
                    toggled={this.context.currentTheme === 'dark'}
                    className="m-l-xs"
                    onClick={this.toggleTheme}
                />
            </div>
        );
    }
}

export default ThemeSwitch;