import {
  IconCalendarTime,
  IconDeviceDesktop,
  IconClipboardList,
  IconSettings,
  IconUsers,
  IconDeviceTv,
} from "@tabler/icons";

const icons = {
  IconCalendarTime,
  IconDeviceDesktop,
  IconClipboardList,
  IconSettings,
  IconUsers,
  IconDeviceTv,
};

const menuItems = {
  id: "menuitems",
  type: "group",
  children: [
    {
      id: "reservation",
      title: "예약",
      type: "item",
      url: "/reservation",
      icon: icons.IconCalendarTime,
      breadcrumbs: false,
    },
    {
      id: "reception",
      title: "접수/수납",
      type: "item",
      url: "/reception",
      icon: icons.IconDeviceDesktop,
      breadcrumbs: false,
    },
    {
      id: "clinic",
      title: "진료",
      type: "item",
      url: "/clinic",
      icon: icons.IconClipboardList,
      breadcrumbs: false,
    },
    {
      id: "video_did",
      title: "VIDEO DID",
      type: "item",
      url: "/view",
      icon: icons.IconDeviceTv,
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
    {
      id: "management",
      title: "유저관리",
      type: "item",
      url: "/management",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
    {
      id: "logout",
      title: "로그아웃",
      type: "item",
      url: "/logout",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
    {
      id: "pwdchange",
      title: "비밀번호 변경",
      type: "item",
      url: "/pwdchange",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
  ],
};

export default menuItems;
