import { IconUsers, IconLock, IconLogout } from "@tabler/icons";

const icons = {
  IconUsers,
  IconLock,
  IconLogout,
};

const authitems = {
  id: "authmenu",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "계정",
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "pwdchange",
          title: "비밀번호 변경",
          type: "item",
          url: "/pwdchange",
          icon: icons.IconLock,
          breadcrumbs: false,
        },
        {
          id: "logout",
          title: "로그아웃",
          type: "item",
          url: "/logout",
          icon: icons.IconLogout,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default authitems;
