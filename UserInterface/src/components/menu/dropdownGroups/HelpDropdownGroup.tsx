import React from 'react'
import DropdownItem from '../../workspaceUI/Dropdown/DropdownItem/DropdownItem'
import { DropdownGroup } from '../../workspaceUI/Dropdown/Dropdown'

const HelpDropdownGroup = ({ closeDropdown }: DropdownGroup) => {
  return (
    <>
        <DropdownItem label="Справка программы Конфигуратор" closeDropdown={closeDropdown} />
        <DropdownItem label="О программе" closeDropdown={closeDropdown} />
    </>
  )
}

export default HelpDropdownGroup