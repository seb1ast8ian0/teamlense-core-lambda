import { getLeagueForNodeId, getLeaguePathForNodeId, getLeaguesForParentId, isNodeLeaf } from "../../infrastructure/repositories/LeagueRepository";
import { LeaguePath } from "../entities/League";

const getLeaguesByParentId = async (parentId: string | null) : Promise<any> => {
    const leagues = await getLeaguesForParentId(parentId!);
    if(leagues.length == 0){
        return null;
    }
    return {
        parentId: parentId,
        leagues: leagues
    };
}

const getLeagueByNodeId = async (nodeId: string) : Promise<any> => {
    const leagues = await getLeagueForNodeId(nodeId);
    if(leagues.length == 0){
        return null;
    }
    return {
        league: leagues[0]
    };
}

const isLeaf = async (nodeId: string) : Promise<any> => {
    const isLeaf = await isNodeLeaf(nodeId)
    return {
        nodeId: nodeId,
        isLeaf: isLeaf
    };
}

const getLeaguePathByNodeId = async (nodeId: string) : Promise<LeaguePath> => {
    const path = await getLeaguePathForNodeId(nodeId)
    return {
        nodeId: parseInt(nodeId),
        path: path
    };
}

const snakeToCamelCase = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => snakeToCamelCase(item));
    }

    const camelCaseObj: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
            camelCaseObj[camelCaseKey] = snakeToCamelCase(obj[key]);
        }
    }
    return camelCaseObj;
};


export { getLeaguesByParentId, getLeagueByNodeId, isLeaf, getLeaguePathByNodeId};