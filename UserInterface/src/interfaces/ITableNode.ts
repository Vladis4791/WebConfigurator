export interface ITableNode extends TagInfo {
    paramName: string
    detailedDescription?: string
    valueRange?: string
    description?: string
    subRows?: ITableNode[]
    isEdited: boolean
}

export interface TagInfo {
    measurementUnits?: string | null
    isOperative?: boolean | null
    value?: string
}

