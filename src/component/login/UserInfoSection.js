import { Avatar, Box } from "@mui/material";

const UserInfoSection = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);
  return <Box sx={{ display: "flex" }}>
    <Avatar src={`/api/admin/getimage?real_image=${userInfo.real_image}`} sx={{ marginRight: 2 }}/>
    <p>
      {userInfo.employee_name}/{userInfo.authority}
    </p>
  </Box>;
};

export default UserInfoSection;
