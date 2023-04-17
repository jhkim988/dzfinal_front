import { IconSettings, IconDeviceTv, IconVideo } from "@tabler/icons";

const icons = {
  IconSettings,
  IconDeviceTv,
  IconVideo,
};

const DidMenu = {
  id: "didmenu",
  type: "group",
  children: [
    {
      id: "did",
      title: "DID",
      type: "collapse",
      icon: icons.IconLayoutBoardSplit,

      children: [
        {
          id: "video_did",
          title: "VIDEO DID",
          type: "item",
          url: "/view",
          icon: icons.IconVideo,
          breadcrumbs: false,
        },
        {
          id: "big_did",
          title: "BIG DID",
          type: "item",
          url: "/big_did",
          icon: icons.IconDeviceTv,
          breadcrumbs: false,
        },
        {
          id: "did_setting",
          title: "DID 설정",
          type: "item",
          url: "/did_setting",
          icon: icons.IconSettings,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default DidMenu;
