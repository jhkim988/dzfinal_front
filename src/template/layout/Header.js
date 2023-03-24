import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, TextField } from "@mui/material";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { IconArrowBarRight, IconArrowBarToLeft } from "@tabler/icons";

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const [toggleIcon, setToggleIcon] = useState(false);

  const handleToggleIcon = () => {
    setToggleIcon(!toggleIcon);
    handleLeftDrawerToggle();
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <Box>DREAM_EULJI</Box>
        </Box>
      </Box>

      <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: "all .2s ease-in-out",
            background: theme.palette.secondary.light,
            color: theme.palette.secondary.dark,
            "&:hover": {
              background: theme.palette.secondary.dark,
              color: theme.palette.secondary.light,
            },
          }}
          onClick={handleToggleIcon}
          color="inherit"
        >
          {toggleIcon ? (
            <IconArrowBarToLeft stroke={1.5} size="1.3rem" />
          ) : (
            <IconArrowBarRight stroke={1.5} size="1.3rem" />
          )}
        </Avatar>
      </ButtonBase>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <Box>채팅</Box>
      <Box>
        <AccountCircleRoundedIcon style={{ height: 50 }}></AccountCircleRoundedIcon>
        <TextField id="outlined-basic" label="프로필" name="profile" variant="outlined" />
      </Box>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;