import React from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { ITableNode } from '../../../interfaces/ITableNode';
import { Row } from '@tanstack/react-table';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';
import './WorkspaceBreadCrumbs.scss';

const breadcrumbItem = (item: MenuItem, options: MenuItemOptions) => {
    return (
        <div className={options.className} style={{marginRight: "10px", marginLeft: "10px", "fontSize": "inherit"}}>
            {item.label}
        </div>
    )
}

const WorkspaceBreadCrumbs = ({ clickedRow }: { clickedRow?: Row<ITableNode>}) => {

    let breakcrumbsItems: MenuItem[] = [];

    if(clickedRow) {
        const currentRowItem: MenuItem = {
            label: clickedRow.original.paramName,
            template: breadcrumbItem
        };
        const parentRows = clickedRow.getParentRows();
    
        breakcrumbsItems = parentRows.map((parentRow) => {
            const item: MenuItem = {
                label: parentRow.original.paramName,
                template: breadcrumbItem
            }
            return item;
        });

        breakcrumbsItems.push(currentRowItem);
    }

    return (
        <div>
            <BreadCrumb model={breakcrumbsItems} className="WorkspaceBreadcrumbs" />
        </div>
    )
}

export default WorkspaceBreadCrumbs