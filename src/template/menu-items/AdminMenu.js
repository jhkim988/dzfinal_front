import { IconUsers } from "@tabler/icons";

const icons = { IconUsers };

const AdminMenu = {
  id: "adminmenui",
  type: "group",
  children: [
    {
      id: "management",
      title: "유저관리",
      type: "item",
      url: "/management",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
  ],
};

export default AdminMenu;
