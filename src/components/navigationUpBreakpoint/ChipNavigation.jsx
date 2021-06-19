import React, {Suspense, lazy} from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// Mui components
const Chip = lazy(() => import('@material-ui/core/Chip'));

// breadCrumb custom style as chip
const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: theme.palette.greenChip.main,
    height: theme.spacing(3.625),
    fontWeight: 500,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
}))(Chip);

const ChipNavigation = ({color, href, component, icon, label, deleteIcon, onClick, onDelete}) => {

  return (
    <Suspense fallback={<div/>}>
      <StyledBreadcrumb
        color={color}
        component={component}
        href={href}
        icon={icon}
        deleteIcon={deleteIcon}
        label={label}
        onClick={onClick}
        onDelete={onDelete}
      />
    </Suspense>
  );
}

export default ChipNavigation;

ChipNavigation.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string,
  component: PropTypes.string,
  label: PropTypes.string.isRequired,
  deleteIcon: PropTypes.object,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
}
