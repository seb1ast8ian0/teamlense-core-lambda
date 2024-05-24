export interface League {
    nodeId: number,
    nodeKey: string,
    nodeValue: string,
    childrenLabel: string,
    parentId: number,
    creationTimestamp: Date
}

export interface LeaguePathNode {
    nodeId: number,
    nodeKey: string,
    nodeValue: string
}

export interface LeaguePath {
    nodeId: number,
    path: LeaguePathNode[]
}
