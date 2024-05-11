import express from 'express';
import { basicAuth } from '../middleware/basicAuth';
import { Team, validateTeam } from '../../domain/entities/Team';
import { addTeam } from '../../domain/controllers/TeamController';

const teamResource = express.Router();

//GET /team
teamResource.get("/:teamId?", basicAuth, async (req, res) => {
    const teamId = req.params.parentId;
    
    console.log("[GET /team/] trying to get team", teamId, "...");

    return res.status(200).json(teamId);
});

//POST /team
teamResource.post("/", basicAuth, async (req, res) => {

    const payload = req.body;
    const isValid = validateTeam(payload);
    const team = payload as Team;

    console.log("[POST /team] recieved team: ", payload);
    
    if(!isValid){
        console.log("invalid team!")
        console.log(validateTeam.errors)
        return res.status(400).json({ 
            message: 'Invalid team object!', 
            error: validateTeam.errors
        });
    }
    await addTeam(team)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            console.error("Error while processing team request:", error);
            return res.status(500).json({
                message: 'Error while processing the team request!',
                error: error.message
            });
        })
});

export { teamResource };