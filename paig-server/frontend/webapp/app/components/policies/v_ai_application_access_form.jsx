import React, {Component, Fragment, useState, useEffect} from 'react';
import {compact} from 'lodash';
import {observer} from 'mobx-react';

import { MultiSelect, Tag, Loading, ComboBox } from '@carbon/react';

// import {Grid, Divider, Typography, Paper} from '@material-ui/core';
// import PersonIcon from '@material-ui/icons/Person';
// import PeopleIcon from '@material-ui/icons/People';
// import ContactsIcon from '@material-ui/icons/Contacts';
// import CloseIcon from '@material-ui/icons/Close';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// import NotInterestedIcon from '@material-ui/icons/NotInterested';

// import {FormHorizontal, FormGroupSelect2} from 'common-ui/components/form_fields';
// import {TagChip} from 'common-ui/lib/fs_select/fs_select';
import {Utils} from 'common-ui/utils/utils';
import { userGroupRolesLookups } from 'components/policies/field_lookups';
import {MESSAGE_RESULT_TYPE} from 'utils/globals';

import userStore from 'data/stores/s_user_store';

const getIcon = type => {
  const common = { fontSize: "small" }
  switch(type) {
    case 'users':
      return <PersonIcon {...common} />;
    case "groups":
      return <PeopleIcon {...common} />
    case "roles":
      return <ContactsIcon {...common} />
    case "others":
      return <PeopleIcon {...common} />;
  }
}

export const MultiSearchableSelect = () => {
  const [options, setOptions] = useState([]); // List of options
  const [selectedItems, setSelectedItems] = useState([]); // Selected values
  const [searchTerm, setSearchTerm] = useState(''); // User input
  const [loading, setLoading] = useState(false);

  // Fetch options from API when user types
  const fetchOptions = async (query) => {
    setLoading(true);
    try {
      const response = await userStore.getAllUsers({params: {username: searchTerm}});
      console.log(response)
      setOptions(response.models || []); // Adjust based on API response
    } catch (error) {
      console.error('API Error:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce API call (fetch after user stops typing for 500ms)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchOptions(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Handle item selection
  /*const handleSelectionChange = ({ selectedItems }) => {
    setSelectedItems(selectedItems);
  };

  // Handle custom input (Add if not in list)
  const handleCustomInput = (event) => {
    const inputValue = event.target.value.trim();
    setSearchTerm(inputValue);

    if (event.key === 'Enter' && inputValue) {
      const newItem = { id: inputValue, text: inputValue };
      if (!selectedItems.find((item) => item.id === inputValue)) {
        setSelectedItems([...selectedItems, newItem]);
      }
      setSearchTerm(''); // Clear input field
    }
  };*/

    const handleSelectionChange = ({ selectedItem, inputValue }) => {
      if (!selectedItem) return;
      if (!selectedItems.some((item) => item.id === selectedItem.id)) {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    };

    // Handle typing (Triggers API search)
    const handleTyping = (value) => {
      setSearchTerm(event?.target?.value || '');
    };

    // Handle custom input (Allows adding new item)
    const handleCustomInput = (event) => {
      if (event.key === 'Enter' && searchTerm) {
        const newItem = { id: searchTerm, username: searchTerm };
        if (!selectedItems.some((item) => item.id === newItem.id)) {
          setSelectedItems([...selectedItems, newItem]);
        }
        setSearchTerm('');
      }
    };

    // Remove selected item
    const removeItem = (id) => {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    };

  return (
      <div style={{ maxWidth: '400px', position: 'relative' }}>

        {loading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)'
          }}>
            <Loading small withOverlay={false} />
          </div>
        )}

        <ComboBox
          items={options}
          itemToString={(item) => (item ? item.username : '')} // API Data Formatting
          placeholder="Search or type to add..."
          allowCustomValue={true}
          onInputChange={handleTyping} // Search while typing
          onChange={handleSelectionChange} // Handle selection
          onKeyDown={handleCustomInput} // Add custom items
          disabled={loading} // Disable input while loading
          itemToElement={(item) =>{
              if (item) {
                  return (
                      <span className="test" style={{ color: 'red' }}>
                          {item.username}
                      </span>
                  )
              } else {
                    return '';
              }
          }}
        />
        <div style={{ marginBottom: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedItems.map((item) => (
                <Tag key={item.id} onClose={() => removeItem(item.id)}>
                  {item.username}
                </Tag>
              ))}
            </div>
      </div>
  )

 /*  return (
    <div style={{ maxWidth: '400px', position: 'relative' }}>
      { *//* Loader Indicator *//* }
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)'
        }}>
          <Loading small withOverlay={false} />
        </div>
      )}

      { *//* Multi-Select Dropdown *//* }
      <MultiSelect
        id="multi-search"
        label="select"
        titleText="Search and Select"
        items={loading ? [{ id: 'loading', username: 'Loading...' }] : options}
        itemToString={(item) => (item ? item.username : '')}
        placeholder="Search or type to add..."
        onChange={handleSelectionChange}
        initialSelectedItems={selectedItems}
        selectionFeedback="top"
        onInputChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleCustomInput} // Handle custom input on Enter
      />

      { *//* Selected Items as Tags *//* }
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {selectedItems.map((item) => (
          <Tag key={item.id} onClose={() => setSelectedItems(selectedItems.filter((i) => i.id !== item.id))}>
            {item.username}
          </Tag>
        ))}
      </div>
    </div>
  ); */
};


@observer
class PermissionRow extends Component {
  render () {
    const { aiPolicyFormUtil, field, splitDelimiter } = this.props;

    let userGroupRolesValue = aiPolicyFormUtil.getPrefillUsersGroupsRolesValues(field, splitDelimiter);

    const restrictionMap = aiPolicyFormUtil.getRestrictionMap();

    return (
        <div>
            sdf
        </div>
    )

    return (
      <FormGroupSelect2
        data-testid="access-input"
        required={true}
        showLabel={false}
        value={userGroupRolesValue}
        variant="standard"
        allowCreate={false}
        multiple={true}
        labelKey="label"
        valueKey="value"
        openText="Options"
        placeholder="Select Users and/or Groups"
        noOptionsText="Type to search Users and/or Groups"
        triggerOnLoad={true}
        loadOptions={(searchString, callback) => {
          this.infoOption = null;
          userGroupRolesLookups(searchString, (options, op) => {
            this.infoOption = op;
            callback(options);
          }, field.accessType);
        }}
        onChange={value => {
          const obj = {
            users: [],
            groups: [],
            roles: [],
            others: []
          };
          if (value) {
            let pattern = /,(?=users##__##|groups##__##|roles##__##|others##__##)/;
            value.split(pattern).forEach(v => {
              const [type, val] = compact(v.split("##__##"));
              obj[type].push(val);
            });
            // select all will remove the other already selected.
            if (obj.others.length) {
              obj.users = [];
              obj.groups = [...obj.others];
              obj.roles = [];
              delete obj.others;
            }
          }
          Object.assign(field, obj);
        }}
        disableCloseOnSelect={true}
        renderTags={(tagValue, getTagProps) => (
          tagValue.map((option, index) => {
            const value = ''+option.value;
            const [type, val] = compact(value.split(splitDelimiter));
            const label = <div>{getIcon(type)} {val}</div>;
            return (
              <TagChip
                data-testid="options-tag-chip"
                className="permission-labels"
                label={label}
                {...getTagProps({ index })}
                deleteIcon={<CloseIcon />}
              />
            )
          })
        )}
        renderList={({options, listProps, listboxProps, getOptionProps, classes}) => {
          let len = options.length;
          return (
            <Fragment>
              <ul className={classes.listbox} {...listProps} {...listboxProps}>
                {
                  options.map((option, index) => {
                    const optionProps = getOptionProps({option, index});
                    let disableClass = '';
                    if (userGroupRolesValue.length &&  userGroupRolesValue[0]?.label === "Everyone") {
                      disableClass = " inactive not-allowed ";
                    }
                    return (
                      <li
                        {...optionProps}
                        className={`${classes.option}${disableClass}`}
                        style={{alignItems: 'normal'}}
                        key={option.model?.resource || index}
                      >
                        <Grid item xs={10}>
                          <span className="opacity-40 m-r-sm">
                            {option.type && getIcon(option.type.toLowerCase())}
                          </span>
                          <span data-testid="select-option-item">{option.label}</span>
                        </Grid>
                        <Grid item xs={2} className="opacity-40">
                          {option.type !== "OTHERS" && Utils.toTitleCase(option.type)}
                        </Grid>
                      </li>
                    )
                  })
                }
              </ul>
              {
                this.infoOption &&
                <Fragment>
                  <Divider />
                  <li
                    {...listProps}
                    {...listboxProps}
                    ref={null}
                    className={classes.option}
                    classes="disabled"
                    aria-disabled="true"
                    tabIndex="-1"
                    style={{backgroundColor: '#eae9e9'}}
                  >
                    <Grid item xs={12} key="count">
                      <Typography variant="caption" className="pull-right bold font-wt-500">
                        Showing Users: {this.infoOption.USERS}, Groups: {this.infoOption.GROUPS}
                      </Typography>
                    </Grid>
                  </li>
                </Fragment>
              }
            </Fragment>
          )
        }}
      />
    )
  }
}

const VAIApplicationAccessForm = observer(({accessFields, editMode, form, aiPolicyFormUtil}) => {

  const splitDelimiter = "##__##";

  return accessFields.slice(0, 1).map(field => {
      return (
          <MultiSearchableSelect />
      )
      return (
          <PermissionRow
              field={field}
              splitDelimiter={splitDelimiter}
              aiPolicyFormUtil={aiPolicyFormUtil}
          />
      )
  })

  return (
      <FormHorizontal spacing={1}>
        {accessFields.map(field => {

          const Icon = field.accessType === 'allow' ? CheckCircleOutlineIcon : NotInterestedIcon;

          return (
            <Grid item xs={12}>
              <Paper elevation={0}
                className="access-form-alignment"
                style={{
                  backgroundColor: field.accessType === 'allow' ? '#F0FBED' : '#FFF4EB',
                  padding: '10px'
                }}
              >
                <div className="m-b-sm">
                  <Icon
                    className="m-r-xs"
                    fontSize="small"
                    style={{color: field.accessType === 'allow' ? '#0F9956' : MESSAGE_RESULT_TYPE.DENIED.COLOR}}
                  />
                  <span>
                    {
                      field.accessType === 'allow'
                      ? 'Allow '
                      : 'Deny '
                    }
                    access to AI Application for Users/Groups
                  </span>
                </div>
                {
                  editMode
                  ?
                    (
                      <PermissionRow
                        field={field}
                        splitDelimiter={splitDelimiter}
                        aiPolicyFormUtil={aiPolicyFormUtil}
                      />
                    )
                  :
                    <div className="permission-labels">
                      {
                        aiPolicyFormUtil.getPrefillUsersGroupsRolesValues(field, splitDelimiter).map(value => {
                        let type = value.value.split(splitDelimiter)?.[0];
                        return (
                          <TagChip
                            data-testid="tag-chip"
                            key={value.label}
                            className="m-r-sm m-b-xs"
                            label={value.label}
                            icon={getIcon(type)}
                          />
                        )
                      })
                      }
                    </div>
                }
              </Paper>
            </Grid>
          )
        })}
      </FormHorizontal>
  )
})

export default VAIApplicationAccessForm;