import { Icon, Tag } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';

const { CheckableTag } = Tag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag
    checked={!!checked}
    key={value}
    onChange={state => onChange && onChange(value, state)}
  >
    {children}
  </CheckableTag>
);

TagSelectOption.isTagSelectOption = true;

class TagSelect extends Component {
  static defaultProps = {
    hideCheckAll: false,
    actionsText: {
      selectAllText: '全部',
    },
  };

  static Option = TagSelectOption;

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || [],
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      value: props.value || props.defaultValue || [],
    };
  }

  onChange = value => {
    const { onChange, hideCheckAll } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }

    if (onChange) {
      onChange(value);
    }
  };

  onSelectAll = checked => {
    let checkedTags = [];

    if (!checked) {
      checked = !checked
    }
    checkedTags = this.getAllTags();
    this.onChange(checkedTags);
  };

  getAllTags() {
    const { children } = this.props;
    const childrenArray = React.Children.toArray(children);
    const checkedTags = childrenArray
      .filter(child => this.isTagSelectOption(child))
      .map(child => child.props.value);
    return checkedTags || [];
  }

  handleTagChange = (value, checked) => {
    const { value: StateValue } = this.state;
    const checkedTags = [...StateValue];
    const index = checkedTags.indexOf(value);
    if (this.props.radioable) {
      if (index === -1) {
        checkedTags.splice(0, 1, value)
      }
    } else {
      if (checked && index === -1) {
        checkedTags.push(value);
      } else if (!checked && index > -1 && checkedTags.length > 1) {
        checkedTags.splice(index, 1);
      }
    }

    this.onChange(checkedTags);
  };

  handleTagChange2 = (value, checked) => {
    let checkedTags = []
    checkedTags.push(value);
    this.onChange(checkedTags);
  };

  isTagSelectOption = node =>
    node &&
    node.type &&
    (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption');

  render() {
    const { value, expand } = this.state;
    const { children, hideCheckAll, className, style, radioable, actionsText = {} } = this.props;
    const checkedAll = this.getAllTags().length === value.length;
    const { selectAllText = '全部' } = actionsText;
    const cls = classNames(styles.tagSelect, className, {
      [styles.expanded]: true,
    });
    return (
      <div className={cls} style={style}>
        {hideCheckAll ? null : (
          <CheckableTag checked={checkedAll} key="tag-select-__all__" onChange={this.onSelectAll}>
            {selectAllText}
          </CheckableTag>
        )}
        {value &&
          children &&
          React.Children.map(children, child => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: checkedAll && !hideCheckAll ? false : value.indexOf(child.props.value) > -1,
                onChange: checkedAll ? this.handleTagChange2 : this.handleTagChange
              });
            }

            return child;
          })}
      </div>
    );
  }
}

export default TagSelect;
