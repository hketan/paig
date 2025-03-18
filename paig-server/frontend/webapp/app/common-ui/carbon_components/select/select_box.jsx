import React, {Component, Fragment} from 'react';

import {Select, SelectItem} from '@carbon/react';

class SelectBox extends Component {
    state = {
        options: []
    }
    componentDidMount() {
        const {data, fetchOnLoad, fetchOptions} = this.props;
        if (fetchOnLoad) {
            this.fetchOptions();
        } else {
            this.setOptions();
        }
    }
    loadOptions = (value) => {
        this.fetchOptions(value);
    }
    fetchOptions = (inputValue='') => {
        const {fetchOptions} = this.props;
        if (fetchOptions) {
            try {
                //this._vState.loading = true;
                //this.searchValue = inputValue;
                fetchOptions(inputValue, this.setOptions);
            } catch(e) {
                //this.searchValue = '';
                //this._vState.loading = false;
            }
        }
    }
    setOptions = (options) => {
        this.setState({options});
    }
    render() {
        const {data, label, labelKey='label', valueKey='value', fetchOnLoad, fetchOptions, ...props} = this.props;
        const {options} = this.state;

        return (
            <Select
                id={label}
                labelText={label}
                data-testid="select-field"
                {...props}
            >
                {
                    options && options.length > 0
                    ?
                        <Fragment>
                            <SelectItem
                                key="empty"
                                value=""
                                text=""
                            />
                            {
                                options.map((item, index) => (
                                    <SelectItem
                                        key={item.text || index}
                                        value={item[valueKey] || ''}
                                        text={item[labelKey] || ''}
                                    />
                                ))
                            }
                        </Fragment>
                    :
                        <SelectItem
                            disabled
                            text="No options"
                        />
                }
            </Select>
        )
    }
}

export {
    SelectBox
}