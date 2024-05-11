import express from 'express';
import { basicAuth } from '../middleware/basicAuth';
import { getLeagueByNodeId, getLeaguePathByNodeId, getLeaguesByParentId, isLeaf } from '../../domain/controllers/LeagueController';

const leagueResource = express.Router();

//GET /league/by-parent/
leagueResource.get("/by-parent/:parentId?", basicAuth, async (req, res, next) => {
    let parentId : string | null = req.params.parentId;
    parentId = parentId == undefined ? null : parentId;
    console.log('[GET /league/by-parent/] trying to get leagues for parentId: ', parentId, '...');

    getLeaguesByParentId(parentId)
        .then(response => {
            if(!response){
                return res.status(204).json();
            }
            return res.status(200).json(response);
        })
        .catch(error => {
            next(error);
        })
});

//GET /league/by-node/
leagueResource.get("/by-node/:nodeId", basicAuth, async (req, res, next) => {
    const nodeId = req.params.nodeId;
    console.log('[GET /league/by-node/] trying to get league for nodeId: ', nodeId, '...');

    getLeagueByNodeId(nodeId)
        .then(response => {
            if(!response){
                return res.status(204).json();
            }
            return res.status(200).json(response);
        })
        .catch(error => {
            next(error);
        })
});

//GET /league/is-leaf/
leagueResource.get("/is-leaf/:nodeId", basicAuth, async (req, res, next) => {
    const nodeId = req.params.nodeId;
    console.log('[GET /league/is-leaf/] checking if node is leaf with nodeId: ', nodeId, '...');

    isLeaf(nodeId)
        .then(response => {
            if(!response){
                return res.status(204).json();
            }
            return res.status(200).json(response);
        })
        .catch(error => {
            next(error);
        })
});

//GET /league/path/
leagueResource.get("/path/:nodeId", basicAuth, async (req, res, next) => {
    const nodeId = req.params.nodeId;
    console.log('[GET /league/path/] trying to get league-path for nodeId: ', nodeId, '...');

    getLeaguePathByNodeId(nodeId)
        .then(response => {
            if(!response){
                return res.status(204).json();
            }
            return res.status(200).json(response);
        })
        .catch(error => {
            next(error);
        })
});

export { leagueResource };