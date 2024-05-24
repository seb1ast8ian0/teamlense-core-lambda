import { League, LeaguePathNode } from "../../domain/entities/League";
import { postgres_client } from "../clients/postgres-client";


const getLeaguesForParentId = async (parentId: string | null): Promise<any[]> => {
    let query = "SELECT * FROM leagues.ta_league_hierarchy";
    let queryParams: any[] = [];

    if (parentId !== null) {
        query += " WHERE parent_id = $1";
        queryParams.push(parentId);
    } else {
        query += " WHERE parent_id IS NULL";
    }

    const res = await postgres_client.query(query, queryParams);
    return res.rows.map(r => {
        return {
            nodeId: r.node_id,
            nodeKey: r.node_key,
            nodeValue: r.node_value,
            childrenLabel: r.children_label,
            parentId: r.parent_id
        }
    });
}


const getLeagueForNodeId = async (nodeId: string) : Promise<League[]>=> {
    const res = await postgres_client.query("SELECT * FROM leagues.ta_league_hierarchy WHERE node_id = $1", [nodeId]);
    return res.rows.map(r => {
        return {
            nodeId: r.node_id,
            nodeKey: r.node_key,
            nodeValue: r.node_value,
            childrenLabel: r.children_label,
            parentId: r.parent_id,
            creationTimestamp: r.creation_timestamp
        }
    });
}

const isNodeLeaf = async (nodeId: string) => {
    const queryResult = await postgres_client.query('SELECT COUNT(*) FROM leagues.ta_league_hierarchy WHERE parent_id = $1', [nodeId]);
    const isLeaf = queryResult.rows[0].count === '0';
    return isLeaf;
}

const getLeaguePathForNodeId = async (nodeId: string) : Promise<LeaguePathNode[]>=> {
    const query = `
        WITH RECURSIVE LeaguePath AS (
            SELECT node_id, node_key, node_value, parent_id
            FROM leagues.ta_league_hierarchy
            WHERE node_id = $1
        UNION ALL
            SELECT th.node_id, th.node_key, th.node_value, th.parent_id
            FROM leagues.ta_league_hierarchy th
            JOIN LeaguePath lp ON th.node_id = lp.parent_id
        )
        SELECT node_id, node_key, node_value FROM LeaguePath ORDER BY node_id;
    `;
    const res = await postgres_client.query(query, [nodeId]);
    return res.rows.map((r) => {
        return {
            nodeId: r.node_id,
            nodeKey: r.node_key,
            nodeValue: r.node_value
        }
    });
}

export {
    getLeaguesForParentId,
    getLeagueForNodeId,
    isNodeLeaf,
    getLeaguePathForNodeId
}
