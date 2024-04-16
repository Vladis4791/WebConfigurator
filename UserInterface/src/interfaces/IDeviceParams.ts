export enum TagKinds {
    Tag = "Tag",
    GroupTag = "GroupTag"
}

export interface IDevice {
    DeviceName: string
    DeviceType: string
    Channels: IDeviceChannel[] 
}

export interface IDeviceChannel {
    ChannelName: string
    Description: string
    ChannelNumber: number
    Tags: ITag[]
} 

export interface ITag {
    Ordinal: number
    Kind: string
}

export interface IDeviceTag extends ITag {
    TagName: string
    MeasurementUnit: string | null
    Description: string
    Address: string
    DetailedDescription: string
    ValueRange: string
    IsOperative: boolean | null
    Value: string | null
}

export interface IDeviceGroupTag extends ITag {
    Tags: IDeviceTag[]
}


