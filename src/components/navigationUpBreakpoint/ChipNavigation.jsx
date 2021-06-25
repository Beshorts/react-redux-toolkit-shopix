import React  from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// Mui components
import Chip from '@material-ui/core/Chip';

// breadCrumb custom style as chip
const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    height: theme.spacing(3.625),
    backgroundColor: theme.palette.greenChip.main,
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:active': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))(Chip);

const ChipNavigation = ({disabled, href, component, icon, label, deleteIcon, onClick, onDelete}) => {

  return (
      <StyledBreadcrumb
        component={component}
        disabled={ disabled ? disabled : null }
        href={href}
        icon={icon}
        deleteIcon={deleteIcon}
        label={label}
        onClick={onClick}
        onDelete={onDelete}
      />
  );
}

export default ChipNavigation;

ChipNavigation.propTypes = {
  disabled: PropTypes.bool,
  href: PropTypes.string,
  component: PropTypes.string,
  label: PropTypes.string.isRequired,
  deleteIcon: PropTypes.object,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
}
