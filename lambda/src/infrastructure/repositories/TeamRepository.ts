import { Team } from "../../domain/entities/Team";
import { postgres_client } from "../clients/postgres-client";

const createTeam = async (team: Team) => {
    const query = `
        INSERT INTO teams.ta_teams (team_id, club_id, league_id, creation_timestamp, modified_timestamp, sport, team_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
        team.teamId,
        team.clubId,
        team.leagueId.toString(),
        team.creationTimestamp.toISOString(),
        team.modifiedTimestamp.toISOString(),
        team.sport,
        team.teamNumber.toString()
    ];

    await postgres_client.query(query, values);
}

const getTeamsForClubId = async (clubId: string): Promise<Team[]> => {
    const query = `
        SELECT * FROM teams.ta_teams WHERE club_id = $1
    `;
    const { rows } = await postgres_client.query(query, [clubId]);
    
    const teams: Team[] = rows.map((row: any) => {
        return {
            teamId: row.team_id,
            clubId: row.club_id,
            leagueId: row.league_id,
            creationTimestamp: new Date(row.creation_timestamp),
            modifiedTimestamp: new Date(row.modified_timestamp),
            leaguePath: null,
            sport: row.sport,
            teamNumber: row.team_number
        };
    });

    return teams;
}


export {createTeam, getTeamsForClubId}