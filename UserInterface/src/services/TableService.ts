import { UpdatedNodeProps } from "../components/workspaceUI/ParamsTable/ParamsTable";
import { MAX_TAG_NAME_LENGTH } from "../constants/Workspace";
import { IDevice, IDeviceChannel, IDeviceGroupTag, IDeviceTag, ITag, TagKinds } from "../interfaces/IDeviceParams";
import { ITableNode, TagInfo } from "../interfaces/ITableNode";


class TableService {

    private savedTableNodes: ITableNode[] = [];

    public setSavedTableNodes(savedTableNodes: ITableNode[]) {
        this.savedTableNodes = savedTableNodes;
    }

    public getTableNodesFromDevice(device: IDevice) {

        const topNode: ITableNode = {
            paramName: device.DeviceName,
            subRows: this.getChannelsLevel(device.Channels),
            isEdited: false
        }

        return [topNode];
    }

    private getChannelsLevel(channels: IDeviceChannel[]) {
        const channelsLevel = channels.map(channel => {
            const newNode: ITableNode = {
                paramName: channel.ChannelName,
                subRows: this.getTagsLevel(channel.Tags),
                isEdited: false
            };

            return newNode;
        });

        return channelsLevel;
    }

    private getTagsLevel(tags: ITag[]) {

        const createTagsLevel = (tagsToFormLevel: ITag[]) => {
            
            const currentTagsLevel = tagsToFormLevel.map(tag => {
                let newNode: ITableNode;
                
                if(tag.Kind === TagKinds.Tag) {      
                    newNode = this.createTagNode(tag);
                } else {
                    newNode = this.createGroupTagNode(tag, createTagsLevel);
                }

                return newNode;
            })

            return currentTagsLevel;
        }
        
        return createTagsLevel(tags);
    }

    private createTagNode(tag: ITag) {
        const deviceTag = tag as IDeviceTag;
        const node: ITableNode = {
            paramName: deviceTag.Address,
            description: deviceTag.Description,
            detailedDescription: deviceTag.DetailedDescription,
            valueRange: deviceTag.ValueRange,
            measurementUnits: deviceTag.MeasurementUnit,
            value: deviceTag.Value as string,
            isOperative: deviceTag.IsOperative,
            isEdited: false
        }

        return node;
    }

    private createGroupTagNode(tag: ITag, nextLevelCreator: (tags: ITag[]) => ITableNode[]) {
        const groupTag = tag as IDeviceGroupTag;
        const node: ITableNode = {
            paramName: this.getGroupTagNameByOrdinal(groupTag.Ordinal),
            subRows: nextLevelCreator(groupTag.Tags),
            isEdited: false
        }  

        return node;
    }

    private getGroupTagNameByOrdinal(ordinal: number) {
        const ordinalLength = ordinal.toString().length;
        const leadingZeros = "0".repeat(MAX_TAG_NAME_LENGTH - ordinalLength);
        return `${leadingZeros}${ordinal}`;
    }

    public getTagsInfoFromTableData(tableData: ITableNode[]) {

        const tableTreeLeaves = this.getListOfLeavesInTreeTable(tableData);
        
        return tableTreeLeaves.map(leafTableNode => {
            const tagInfo: TagInfo = {
                isOperative: leafTableNode.isOperative ?? false,
                value: leafTableNode.value ?? "",
                measurementUnits: leafTableNode.measurementUnits
            }

            return tagInfo;
        });
    }

    private getListOfLeavesInTreeTable = (tableData: ITableNode[]) => {
        const leaves: ITableNode[] = [];
    
        const getTreeTableLeaf = (currentNode: ITableNode) => {
            if(currentNode.subRows) {
                const countChildNodes = currentNode.subRows.length;
                for(let i = 0; i < countChildNodes; i++) {
                    getTreeTableLeaf(currentNode.subRows[i]);
                }
            } else {
                leaves.push(currentNode);
            }
        }
    
        const topNode = tableData[0]; // it is the only one top Node - name of the device
    
        getTreeTableLeaf(topNode);
    
        return leaves;
    }
    
    public getCopyOfTableUpdatedWithNewInfo(tableNodes: ITableNode[], updatedNodeProps: UpdatedNodeProps) {
    
        const newTable = [...tableNodes];
        
        this.updateTableWithNewInfo(newTable, updatedNodeProps);
    
        return newTable;
    }
    
    private updateTableWithNewInfo(tableNodes: ITableNode[], updatedNodeProps: UpdatedNodeProps) {

    
        const updatedNode = this.getNode(tableNodes, updatedNodeProps.updatedNodeId);

        updatedNode.isEdited = true;

        if(updatedNodeProps.newValue != null) {
            updatedNode.value = updatedNodeProps.newValue;
        }

        if(updatedNodeProps.newOperative != null) {
            updatedNode.isOperative = updatedNodeProps.newOperative;
        }
        
    }

    private getNode(tableNodes: ITableNode[], nodeId: string) {
        const topNode = tableNodes[0];
        
        let currentNode = topNode;
        
        const indexesOfNodesFromTopToUpdatedOnCorrespondingDepth = nodeId.split(".").map(id => +id);
    
        for(let currentDepth = 1; currentDepth < indexesOfNodesFromTopToUpdatedOnCorrespondingDepth.length; currentDepth++) {
            const indexOnCurrentDepth = indexesOfNodesFromTopToUpdatedOnCorrespondingDepth[currentDepth];
            currentNode = currentNode.subRows![indexOnCurrentDepth];
        }

        return currentNode;
    }

    private isNodeDataDiffersFromSavedData = (savedTableNodes: ITableNode[], updatedNodeProps: UpdatedNodeProps) => {
        const { updatedNodeId, newOperative, newValue } = updatedNodeProps;
        const savedTableNode = this.getNode(savedTableNodes, updatedNodeId);

        if(savedTableNode.value === newValue && savedTableNode.isOperative === newOperative) return false;

        return true;

    }

    public getTableNodesWithUneditedNodes = (tableNodes: ITableNode[]) => {

        const newTableNode = [...tableNodes];

        const tableTreeLeaves = this.getListOfLeavesInTreeTable(newTableNode);

        for(const leaf of tableTreeLeaves) {
            leaf.isEdited = false;
        }

        return newTableNode;
    }
}

export const tableService = new TableService();