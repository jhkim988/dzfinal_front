import { Avatar, Box } from "@mui/material";

const UserInfoSection = () => {
  const userInfoStr = localStorage.getItem("userInfo");
  let userInfo = {};
  if (userInfoStr !== "undefined") {
    userInfo = JSON.parse(userInfoStr);
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        src={
          userInfo.real_image &&
          `/api/admin/getimage?real_image=${userInfo.real_image}`
        }
        sx={{ marginRight: 2 }}
      />
      <p>
        {userInfo?.employee_name}/{userInfo?.authority}
      </p>
    </Box>
  );
};

export default UserInfoSection;
