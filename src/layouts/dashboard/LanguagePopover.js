import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Grid, ListItemText, Button, Stack, Typography, Divider} from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import { useDispatch,useSelector } from 'react-redux';
import i18next from "i18next";
const CHAINS = [
  {
    index: 0,
    value: Number(process.env.REACT_APP_ENG_SELECT),
    label: 'English',
    lang: 'en',
    icon: 'my_public/images/us-flag.png'
  },
  {
    index: 1,
    value: Number(process.env.REACT_APP_CHI_SELECT),
    label: 'Chinese',
    lang: 'zh',
    icon: 'my_public/images/china.png'
  },
  {
    index: 2,
    value: Number(process.env.REACT_APP_RUS_SELECT),
    label: 'Russian',
    lang: 'ru',
    icon: 'my_public/images/russia.png'
  },
  {
    index: 3,
    value: Number(process.env.REACT_APP_TUR_SELECT),
    label: 'Turkish',
    lang: 'tu',
    icon: 'my_public/images/turkey.png'
  },
];
export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [curID, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async (id) => {

    console.log(id);
    setOpen(false);
    if(id >= 0 && id <= 3){
      setCurrentIndex(id);
      i18next.changeLanguage(CHAINS[id].lang);
    }
  };

  return (
    <>
      <Box component="button"
        ref={anchorRef}
        onClick={handleOpen}
        className="p-2 rounded bg-dark btn text-white shadow-0 position-relative"
        width="100px" height="42px"
      >
        <Grid container direction="row">
        <Grid item sm="3" component="img" src={CHAINS.find((ele) => ele.index === curID)?.icon} />
        <Grid item sm="8">{CHAINS.find((ele) => ele.index === curID)?.label}</Grid></Grid>
      </Box>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {CHAINS.map((option) => (
            <MenuItem
              key={option.value}
              // selected={option.value === network}
              onClick={() => handleClose(option.index)}
              sx={{ py: 1, px: 2.5 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box component="img" alt={option.label} src={option.icon} sx={{ width: 20 }} />
                <Box variant="body2">{option.label}</Box>
              </Stack>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
