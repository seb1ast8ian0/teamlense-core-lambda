import { randomUUID } from "crypto";
import { createTeam, getTeamsForClubId } from "../../infrastructure/repositories/TeamRepository";
import { Team } from "../entities/Team";
import { getLeaguePathByNodeId } from "./LeagueController";

const addTeam = async (team: Team) : Promise<any> => {

    //TODO: check if clubId belongs to club

    if(!team.teamId) team.teamId = randomUUID();
    if(!team.creationTimestamp) team.creationTimestamp = new Date();
    if(!team.modifiedTimestamp) team.modifiedTimestamp = new Date();

    await createTeam(team);

    return team;
}

const getTeamsByClubId = async (clubId: string) : Promise<Team[]> => {
        const teams = await getTeamsForClubId(clubId);
        
        const promises = teams.map(async (team) => {
            team.leaguePath = await getLeaguePathByNodeId(team.leagueId.toString());
            return team; 
        });

        return Promise.all(promises);
};


export { addTeam, getTeamsByClubId};