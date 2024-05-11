import {  ClubProfileDTO, PrismaClient, ProfileDTO, UserProfileDTO } from "@prisma/client";
import { Profile, ProfileType, ClubProfile, UserProfile } from "../../domain/entities/Profile";
import { ProfileMapper } from "../mapper/profileMapper";


const prisma = new PrismaClient()

export const createProfile = async (profile: Profile): Promise<Profile> => {

    const transactions = [];

    const query = prisma.profileDTO.create({
        data: {
            user_id: profile.userId,
            email: profile.email,
            profile_type: profile.profileType,
            registration_timestamp: profile.registrationTimestamp,
            avatar_url: profile.avatarUrl,
            biography: profile.biography,
            twitter_url: profile.twitterUrl,
            linkedin_url: profile.linkedinUrl,
            facebook_url: profile.facebookUrl,
            instagram_url: profile.instagramUrl,
            tiktok_url: profile.tiktokUrl,
        }
    });
    transactions.push(query);

    if(profile.profileType == ProfileType.USER){
        const information = profile.information as UserProfile;
        const query_user = prisma.userProfileDTO.create({
            data: {
                user_id: profile.userId,
                birthday: information.birthday,
                first_name: information.firstName,
                gender: information.gender,
                last_name: information.lastName,
                city: information.city,
                country: information.country,
                postal_code: information.postalCode,
            }
        })
        transactions.push(query_user);
    }

    if (profile.profileType === ProfileType.CLUB) {
        const information = profile.information as ClubProfile;
        const query_club = prisma.clubProfileDTO.create({
          data: {
            user_id: profile.userId,
            club_name: information.clubName,
            founding_year: information.foundingYear,
            website: information.website,
            address: information.address,
            city: information.city,
            country: information.country,
            postal_code: information.postalCode,
          },
        })
        transactions.push(query_club);
    }
      
    await prisma.$transaction(transactions)
        .catch((error) => {
            console.error("createProfile-Transaction failed.", error);
            throw error;
        })

    return profile;

}

export const getProfile = async (userId: string): Promise<Profile | null> => {
    const profileDTO = await prisma.profileDTO.findUnique({
      where: {
        user_id: userId,
      }
    });
    const clubProfileDTO = await prisma.clubProfileDTO.findUnique({
        where: {
          user_id: userId,
        }
      });
    const userProfileDTO = await prisma.userProfileDTO.findUnique({
        where: {
          user_id: userId,
        }
    });
    const profile = ProfileMapper.mapDtoToObject(
        profileDTO as ProfileDTO,
        clubProfileDTO as ClubProfileDTO,
        userProfileDTO as UserProfileDTO
    )
    return profile;
};

export const deleteProfile = async (userId: string): Promise<void> => {
    await prisma.$transaction([
        prisma.userProfileDTO.deleteMany({
                where: {
                user_id: userId,
            },
        }),
        prisma.clubProfileDTO.deleteMany({
                where: {
                user_id: userId,
            },
        }),
        prisma.profileDTO.delete({
                where: {
                user_id: userId,
            },
        }),
        ]);
};