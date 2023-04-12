import { IconKey } from "@tabler/icons";

const icons = {
  IconKey,
};

const authitems = {
  id: "authitems",
  title: "authitems",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Authentication",
      type: "collapse",
      icon: icons.IconKey,

      children: [
        {
          id: "login",
          title: "Login",
          type: "item",
          url: "login",
        },
      ],
    },
    {
      
    },
  ],
}
;

export default authitems;
