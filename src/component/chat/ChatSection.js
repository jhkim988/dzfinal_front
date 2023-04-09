import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Transitions from "../../template/ui-component/Transitions";
import MainCard from "../../template/ui-component/cards/MainCard";
import { IconBrandHipchat } from "@tabler/icons";
import ChatList from "./ChatList";
import { MqttContext } from "../waiting/MqttContextProvider";
import axios from "axios";

const ChatSection = () => {
  const { current: client } = useContext(MqttContext);
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [messageCount, setMessageCount] = useState([]);

  const totalMessageCount = messageCount.reduce(
    (accumulator, currentValue) => accumulator + currentValue.message_count,
    0
  );

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const handleMessage = (receivedTopic, payload) => {
      if (receivedTopic === `notification/1`) {
        console.log(JSON.parse(payload));
        setMessageCount(JSON.parse(payload));
      }
    };

    // 수정
    client.subscribe(`notification/1`, { qos: 1 }, (error) => {
      if (error) {
        console.log("Subscribe to topic error", error);
      }
    });

    client.on("message", handleMessage);
  }, []);

  useEffect(() => {
    axios
      .get("/api/chat/getmessagecount", {
        params: {
          participants_id: 1, // 수정
        },
      })
      .then((response) => {
        setMessageCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down("md")]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <IconBrandHipchat stroke={1.5} size="1.3rem" color="#00aaff" />
          </Avatar>
          <Badge
            sx={{ alignSelf: "flex-start" }}
            badgeContent={totalMessageCount}
            color="error"
          />
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? "top" : "top-right"}
            in={open}
            {...TransitionProps}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ px: 2, pt: 0.25 }}>
                        <ChatList messageCount={messageCount} setMessageCount={setMessageCount}/>
                      </Box>
                    </Grid>
                  </Grid>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ChatSection;
