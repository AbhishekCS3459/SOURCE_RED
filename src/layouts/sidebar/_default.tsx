'use client';

import AuthorCard from '@/components/ui/author-card';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Logo from '@/components/ui/logo';
import cn from 'classnames';
// import Scrollbar from '@/components/ui/scrollbar';
import { useDrawer } from '@/components/drawer-views/context';
import { Close } from '@/components/icons/close';
import Button from '@/components/ui/button';
import { defaultMenuItems } from '@/layouts/sidebar/_menu-items';
import { LAYOUT_OPTIONS } from '@/lib/constants';
//images
import { useSession } from 'next-auth/react';
import AuthorImage from '@/assets/images/user-3.png';
interface SidebarProps {
  className?: string;
  layoutOption?: string;
  menuItems?: any[];
}

export default function Sidebar({
  className,
  layoutOption = '',
  menuItems = defaultMenuItems,
}: SidebarProps) {
  const { closeDrawer } = useDrawer();
  const { data } = useSession();
  const sideBarMenus = menuItems?.map((item) => ({
    name: item.name,
    icon: item.icon,
    href:
      layoutOption +
      (layoutOption === `/${LAYOUT_OPTIONS.RETRO}` && item.href === '/'
        ? ''
        : item.href),
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem: any) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href:
          item.name === 'Authentication'
            ? layoutOption + dropdownItem.href
            : '/' + LAYOUT_OPTIONS.RETRO + dropdownItem.href,
      })),
    }),
  }));

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className,
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <div className="custom-scrollbar h-[calc(100%-98px)] overflow-hidden overflow-y-auto">
        <div className="px-6 pb-5 2xl:px-8">
          <AuthorCard
            image={data?.user?.image || AuthorImage}
            name={data?.user?.name || ''}
            width={200}
            height={200}
            role={data?.user?.email || ''}
          />

          <div className="mt-12">
            {sideBarMenus?.map((item, index) => (
              <MenuItem
                key={'default' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
