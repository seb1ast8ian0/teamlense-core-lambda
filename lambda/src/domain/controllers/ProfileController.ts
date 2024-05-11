import { createProfile, getProfile } from "../../infrastructure/repositories/ProfileRepository";
import { uploadAvatar } from "../../infrastructure/repositories/S3Repository";
import { getTeamsForClubId } from "../../infrastructure/repositories/TeamRepository";
import { Profile, ProfileType } from "../entities/Profile";
import { getTeamsByClubId } from "./TeamController";


const addProfile = async (profile: Profile) : Promise<any> => {

    if(profile.avatarUrl){
        //Try uploading avatar to S3
        await uploadAvatar(profile.userId, profile.avatarUrl)
        profile.avatarUrl = profile.userId + "/avatar.png"
    }

    await createProfile(profile);

    return profile;
}

const getProfileForProfileId = async (profileId: string)  => {
    const profile = await getProfile(profileId);
    if(!profile) return null;

    if(profile.profileType === ProfileType.CLUB){
        profile.teams = await getTeamsByClubId(profile.userId);
    }
    return profile;
}

export { addProfile, getProfileForProfileId };