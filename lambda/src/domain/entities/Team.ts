import Ajv from "ajv";
import { LeaguePath } from "./League";
  
export interface Team {
    teamId: string,
    clubId: string,
    leagueId: number,
    creationTimestamp: Date,
    modifiedTimestamp: Date,
    leaguePath: LeaguePath | null
}

const schema = {
    "title": "Team",
    "type": "object",
    "properties": {
        "teamId": { "type": "string", "format": "uuid" },
        "clubId": { "type": "string", "format": "uuid" },
        "leagueId": { "type": "integer" },
        "creationTimestamp": { "type": "string", "format": "timestamp" },
        "modifiedTimestamp": { "type": "string", "format": "timestamp" }
    },
    "required": ["clubId", "leagueId"]
};

const ajv = new Ajv({
formats: {
    timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
}
});

export const validateTeam = ajv.compile(schema);
