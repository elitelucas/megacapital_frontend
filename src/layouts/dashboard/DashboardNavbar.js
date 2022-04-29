import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Grid, Box, Stack, AppBar, Toolbar, IconButton, Link, Menu, MenuItem, Popover } from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { MHidden} from '../../components/@material-extend';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import NetworkPopover from './NetworkPopover';
import LanguagePopover from './LanguagePopover';
import * as React from 'react';

// ----------------------------------------------------------------------

// const DRAWER_WIDTH = 280;
const DRAWER_WIDTH = 0;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  backgroundColor:"#171819",
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 1),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  backgroundColor:"#171819",
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  },
  borderBottom:"2px solid white"
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <RootStyle
      sx={{
        backgroundColor:"#171819",
        paddingLeft: '13%',
        paddingRight: '13%',
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        }),
      }} 
    >
      
      <ToolbarStyle id="navbarSupportedContent">
        <MHidden width="mdUp" paddingLeft="13%" paddingRight="13%">
          <Grid container sx={{position:'relative'}}>
          <IconButton sx={{ mr: 1, color: 'text.primary' }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
             <Icon icon={menu2Fill} />
          </IconButton>
          <Box component="a" position="absolute" left="40%" top="-10px" width="80%" href="/home"><Box component="img" src="/logo.png" sx={{ width: '60px' }}></Box></Box>
          <Box sx={{position:'absolute', right:'0px'}}><LanguagePopover /></Box>
          <Popover
            id="basic-menu"
            open={open}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 0, left: 0 }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <Box width = "100%" height="100%" backgroundColor="#000000">
              <NavMenuItem onClick={handleClose} title="Deals" link="/idodeals" />
              <NavMenuItem onClick={handleClose} title="Pools" link="/stakepad" />
              <NavMenuItem onClick={handleClose} title="Vote" link="/vote" />
              <NavMenuItem onClick={handleClose} title="Dashboard" link="/dashboard" />
              <NavMenuItem onClick={handleClose} title="Blog" link="/blog" />
              <NavMenuItem onClick={handleClose} title="Help Center" link="/helpcenter" />
            </Box>
          </Popover>
          </Grid>
        </MHidden>
        {/* <Searchbar /> */}
        <MHidden width="mdDown">
        <Box component="a" href="/home"><Box component="img" src="/logo.png" sx={{ width: '80px' }}></Box></Box>
        <NavMenuItem onClick={handleClose} title="Deals" link="/idodeals" />
        <NavMenuItem onClick={handleClose} title="Pools" link="/stakepad" />
        <NavMenuItem onClick={handleClose} title="Vote" link="/vote" />
        <NavMenuItem onClick={handleClose} title="Dashboard" link="/dashboard" />
        <NavMenuItem onClick={handleClose} title="Blog" link="/blog" />
        <NavMenuItem onClick={handleClose} title="Help Center" link="/helpcenter" />


        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <Link
            href={
              process.env.REACT_APP_MODE == 'testnet'
                ? process.env.REACT_APP_MAINNET_URL
                : process.env.REACT_APP_TESTNET_URL
            }
            color="primary"
            fontSize={16}
          >
            {process.env.REACT_APP_MODE == 'testnet' ? 'To Mainnet' : 'To Testnet'}
          </Link> */}
          <LanguagePopover />
          <NetworkPopover />
          <AccountPopover />
        </Stack>
        </MHidden>
      </ToolbarStyle>
    </RootStyle>
  );
}

function NavMenuItem(props) {
  return (
    <a class="nav-link mx-1 text-light" href={props.link}>
      {props.title}
    </a>
  );
}
function NavMenuItem1(props) {
  return (
    <a class="nav-link mx-3 text-light" href={props.link}
      style={{
        fontSize: '17px', color: 'white', cursor: 'pointer',
        marginLeft: '30px', textDecoration: 'none'
      }}>
      {props.title}
    </a>
  );
}