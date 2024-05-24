import { ClubProfileDTO, ProfileDTO, UserProfileDTO } from "@prisma/client";
import { ClubProfile, Profile, ProfileType, UserProfile } from "../../domain/entities/Profile";

export const getProfileType = (type : string) => {
    for(const t of Object.values(ProfileType)){
        if(t == type) return t;
    }
    return null;
}

export class ProfileMapper {
    static mapDtoToObject(profileDTO: ProfileDTO, clubProfileDTO: ClubProfileDTO | null, userProfileDTO: UserProfileDTO | null): Profile {
        let information: ClubProfile | UserProfile | null = null;

        if (clubProfileDTO) {
            information = {
                foundingYear: clubProfileDTO.founding_year,
                clubName: clubProfileDTO.club_name,
                postalCode: clubProfileDTO.postal_code,
                address: clubProfileDTO.address,
                city: clubProfileDTO.city,
                country: clubProfileDTO.country,
                website: clubProfileDTO.website
            } as ClubProfile;
        }

        if (userProfileDTO) {
            information = {
                birthday: userProfileDTO.birthday,
                city: userProfileDTO.city,
                country: userProfileDTO.country,
                firstName: userProfileDTO.first_name,
                gender: userProfileDTO.gender,
                lastName: userProfileDTO.last_name,
                postalCode: userProfileDTO.postal_code,
                telephoneNumber: userProfileDTO.telephone_number,
                username: userProfileDTO.username
            } as UserProfile;
        }

        if (!information) {
            throw new Error("Unmappable DTO");
        }

        const profile: Profile = {
            userId: profileDTO.user_id,
            email: profileDTO.email,
            biography: profileDTO.biography,
            profileType: profileDTO.profile_type as ProfileType,
            registrationTimestamp: profileDTO.registration_timestamp,
            modifiedTimestamp: profileDTO.modified_timestamp,
            avatarUrl: profileDTO.avatar_url,
            facebookUrl: profileDTO.facebook_url,
            instagramUrl: profileDTO.instagram_url,
            tiktokUrl: profileDTO.tiktok_url,
            twitterUrl: profileDTO.twitter_url,
            linkedinUrl: profileDTO.linkedin_url,
            information: information,
            teams: []
        };

        return profile;
    }
}
