import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaCog, FaQuestionCircle } from 'react-icons/fa'; // Example icons - install react-icons
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight,MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { IoImagesOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { TfiBlackboard } from "react-icons/tfi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import styles from './styles/Sidebar.module.css'; // Create a CSS module file

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const  Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState('test_brand');
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [selectedMainItem, setSelectedMainItem] = useState('Home');
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const campaignOptions = [
    { name: 'test_brand' },
    { name: 'summer_sale' },
    { name: 'new_product' },
    { name: 'holiday_cp' },
  ];
  const mainItems = [
    { name: 'Home', icon: <IoHomeOutline /> },
    { name: 'Channels', icon: <TfiBlackboard />, subItems: ['Meta Ads', 'Google Ads', 'Quick Commerce'] },
    { name: 'Creatives', icon: <FaImagePlaceholder /> }, // Replace with actual icon
  ];
  const bottomItems = [
    { name: 'Help', icon: <IoIosHelpCircleOutline /> },
    { name: 'Settings', icon: <CiSettings /> },
  ];
  const companyLogos = [
    { name: 'boat', logo: '/images/boat_icon.jpeg' }, // Replace with actual paths
    { name: 'mamaearth', logo: '/images/mamaearth.jpeg' }, // Replace with actual paths
    { name: 'add', logo: 'images/add_more.png'}
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCompanySelect = (companyName) => {
    setSelectedCompany(companyName);
  };

  const handleCampaignSelect = (campaignName) => {
    setSelectedCampaign(campaignName);
  };

  const toggleChannels = () => {
    setIsChannelsOpen(!isChannelsOpen);
  };

  const handleMainItemSelect = (itemName) => {
    setSelectedMainItem(itemName);
    setSelectedSubItem(null); // Reset sub-item selection when main item changes
    if (itemName === 'Channels') {
      setIsChannelsOpen(!isChannelsOpen);
    } else {
      setIsChannelsOpen(false);
    }
  };

  const handleSubItemSelect = (subItemName) => {
    setSelectedMainItem('Channels');
    setSelectedSubItem(subItemName);
    setIsChannelsOpen(true); // Ensure channels are open when a sub-item is selected
  };

  const handleBottomItemSelect = (itemName) => {
    setSelectedMainItem(itemName);
    setSelectedSubItem(null); // Reset sub-item selection
    setIsChannelsOpen(false);
  };

  return (
    <div className={`${styles.sidebarContainer} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* First Vertical Bar (Company Logos) */}
      <div className={styles.companyBar}>
        {companyLogos.map((company) => (
          <div
            key={company.name}
            className={`${styles.companyLogo} ${selectedCompany === company.name ? styles.selected : ''}`}
            onClick={() => handleCompanySelect(company.name)}
          >
            <img src={company.logo} alt={company.name} />
          </div>
        ))}
      </div>

      {/* Second Vertical Bar (Collapsible Content) */}
      <div className={styles.contentBar}>

        {/* Head Component */}
        <div className={styles.head}>
          <DropdownMenu className={styles.campaignDropdown}>
            <DropdownMenuTrigger className={styles.selectedCampaign}>
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-400 rounded-[10px] dark:bg-gray-600">
                    <span classname="font-light text-white">{selectedCampaign
                      .split('_')
                      .map((word) => word.charAt(0).toUpperCase())
                      .join('')}</span>
                </div>
              {selectedCampaign}
              <FaAngleDown onClick={() => {}} className={styles.dropdownArrow} /> {/* Add dropdown functionality */}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {campaignOptions.map((campaign) => (
                <DropdownMenuItem
                  key={campaign.name}
                  onClick={() => handleCampaignSelect(campaign.name)}
                  className={selectedCampaign === campaign.name ? styles.selected : ''}
                >
                  <span className={styles.campaignIcon}>
                    {campaign.name}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
            {/* Implement actual dropdown list here */}
            {/* For now, just showing the options */}
            {/* <ul className={styles.dropdownList}>
              {campaignOptions.map((campaign) => (
                <li
                  key={campaign.name}
                  onClick={() => handleCampaignSelect(campaign.name)}
                  className={selectedCampaign === campaign.name ? styles.selected : ''}
                >
                  <span className={styles.campaignIcon}>
                    <BsCircleFill />
                    {campaign.name
                      .split('_')
                      .map((word) => word.charAt(0).toUpperCase())
                      .join('')}
                  </span>
                  {campaign.name}
                </li>
              ))}
            </ul> */}
          </DropdownMenu>
          <div className={styles.collapseButton} onClick={toggleCollapse}>
            {isCollapsed ? <MdKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft />}
          </div>
        </div>

        {/* Center Component */}
        <div className={styles.center}>
          <ul className={styles.mainList}>
            {mainItems.map((item) => (
              <React.Fragment key={item.name}>
                <li
                  className={`${styles.mainItem} ${selectedMainItem === item.name ? styles.selected : ''}`}
                  onClick={() => handleMainItemSelect(item.name)}
                >
                  <span className={styles.itemIcon}>{item.icon}</span>
                  {item.name}
                  {item.subItems && (
                    <span>
                      {isChannelsOpen && item.name === 'Channels' ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                    </span>
                  )}
                </li>
                {item.subItems && isChannelsOpen && selectedMainItem === 'Channels' && (
                  <ul className={styles.subList}>
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem}
                        className={`${styles.subItem} ${selectedSubItem === subItem ? styles.selected : ''}`}
                        onClick={() => handleSubItemSelect(subItem)}
                      >
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* Bottom Component */}
        <div className={styles.bottom}>
          <ul className={styles.bottomList}>
            {bottomItems.map((item) => (
              <li
                key={item.name}
                className={`${styles.bottomItem} ${selectedMainItem === item.name ? styles.selected : ''}`}
                onClick={() => handleBottomItemSelect(item.name)}
              >
                <span className={styles.itemIcon}>{item.icon}</span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// Placeholder for image icon - replace with actual icon component or import
const FaImagePlaceholder = () => <span><IoImagesOutline /></span>;
const FaAngleDown = () => <span><MdKeyboardArrowDown /></span>; // Basic down arrow