import express from 'express';
import { basicAuth } from '../middleware/basicAuth';
import { transformProfile, validateProfile } from '../../domain/entities/Profile';
import { addProfile, getProfileForProfileId } from '../../domain/controllers/ProfileController';
import { deleteProfile, getProfile } from '../../infrastructure/repositories/ProfileRepository';

const profileResource = express.Router();

// POST /profile
profileResource.post('/', basicAuth, async (req, res, next) => {

    const payload = req.body;
    const isValid = validateProfile(payload);
    const profile = transformProfile(payload);

    console.log("[POST /profile] recieved profile: ", profile);
    
    if(!isValid){
        console.log("invalid profile!")
        console.log(validateProfile.errors)
        return res.status(400).json({ 
            message: 'Invalid user object!', 
            error: validateProfile.errors
        });
    }

    addProfile(profile)
        .then(response => {
            return res.status(200).json({ 
                message: 'Valid user object received!', 
                response: response 
            });
        })
        .catch(error => {
            next(error);
        })
});

//GET /profile
profileResource.get("/:userId", basicAuth, async (req, res, next) => {
    const userId = req.params.userId;

    console.log("[GET /profile/] trying to get profile", userId, "...")

    getProfileForProfileId(userId)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            next(error);
        });
});

//DELETE /profile
profileResource.delete("/:userId", basicAuth, async (req, res, next) => {
    const userId = req.params.userId;

    console.log("[DELETE /profile/] deleting", userId, "...")

    deleteProfile(userId).then((result) => {
        res.status(200).json(
            result
        )
    })
    .catch((error) => {
        next(error);
    })
})

export { profileResource };