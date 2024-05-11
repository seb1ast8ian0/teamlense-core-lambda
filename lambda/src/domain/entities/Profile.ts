import Ajv from "ajv";
import { Team } from "./Team";

export enum ProfileType {
  CLUB = "club",
  USER = "user"
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  DIVERSE = "diverse",
  NOT_SPECFDIED = "not_specified"
}

export interface Profile {
  userId: string;
  email: string;
  biography: string | null;
  profileType: ProfileType;
  registrationTimestamp: Date;
  avatarUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  information: ClubProfile | UserProfile;
  teams: Team[] | null;
}

export interface ClubProfile {
  clubName: string;
  foundingYear: number;
  website: string | null;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface UserProfile {
  birthday: Date;
  firstName: string;
  lastName: string;
  gender: Gender;
  city: string | null;
  country: string | null;
  postalCode: string | null;
}

export const transformProfile = (profileData: any): Profile => {

  const profile : Profile = {
    ...profileData,
    registrationTimestamp: new Date(profileData.registrationTimestamp)
  };

  if (profile.profileType == ProfileType.USER) {
    const userProfile = profile.information as UserProfile;
    userProfile.birthday = new Date(userProfile.birthday);
  } 

  return profile;

};

const schema = {
  "title": "Profile",
  "type": "object",
  "properties": {
    "userId": { "type": "string", "format": "uuid" },
    "email": { "type": "string", "format": "email" },
    "biography": { "type": ["string", "null"] },
    "profileType": {
      "type": "string",
      "enum": ["club", "user"]
    },
    "registrationTimestamp": { "type": "string", "format": "timestamp" },
    "avatarUrl": { "type": ["string", "null"] },
    "facebookUrl": { "type": ["string", "null"] },
    "instagramUrl": { "type": ["string", "null"] },
    "tiktokUrl": { "type": ["string", "null"] },
    "twitterUrl": { "type": ["string", "null"] },
    "linkedinUrl": { "type": ["string", "null"] },
    "information": {
      "type": "object",
      "oneOf": [
        { "$ref": "#/definitions/ClubProfile" },
        { "$ref": "#/definitions/UserProfile" }
      ]
    }
  },
  "required": ["userId", "email", "profileType", "registrationTimestamp", "information"],
  "definitions": {
    "ClubProfile": {
      "type": "object",
      "properties": {
        "clubName": { "type": "string" },
        "foundingYear": { "type": "integer" },
        "website": { "type": ["string", "null"] },
        "address": { "type": "string" },
        "city": { "type": "string" },
        "country": { "type": "string" },
        "postalCode": { "type": "string" }
      },
      "required": ["clubName", "foundingYear", "address", "city", "country", "postalCode"]
    },
    "UserProfile": {
      "type": "object",
      "properties": {
        "birthday": { "type": "string", "format": "date" },
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "gender": {
          "type": "string",
          "enum": ["male", "female", "diverse", "not_specified"]
        },
        "city": { "type": ["string", "null"] },
        "country": { "type": ["string", "null"] },
        "postalCode": { "type": ["string", "null"] }
      },
      "required": ["birthday", "firstName", "lastName", "gender"]
    }
  }
};

const ajv = new Ajv({
  formats: { 
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    timestamp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  }
});

export const validateProfile = ajv.compile(schema);
