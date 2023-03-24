import { IconCalendarTime, IconDeviceDesktop, IconClipboardList } from '@tabler/icons';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const icons = { IconCalendarTime, IconDeviceDesktop, IconClipboardList };

const menuItems = {
    id: 'menuitems',
    type: 'group',
    children: [
        {
            id: 'reservation',
            title: '예약',
            type: 'item',
            url: '/reservation',
            icon: icons.IconCalendarTime,
            breadcrumbs: false
        },{
            id: 'reception',
            title: '접수/수납',
            type: 'item',
            url: '/reception',
            icon: icons.IconDeviceDesktop,
            breadcrumbs: false
        },
        {
            id: 'clinic',
            title: '진료',
            type: 'item',
            url: '/clinic',
            icon: icons.IconClipboardList,
            breadcrumbs: false
        }
    ]
};

export default menuItems;
