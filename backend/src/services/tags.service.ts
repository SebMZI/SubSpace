import Tag from "../models/tag.model";

export class TagsService {
    async getTags(req: any) {
        const USER = req.user;
        if(!USER) {
            throw new Error("No user found");
        }

        return await Tag.findAll({where: {userId: USER.userId}});
    }

    async addTag(req: any) {
        const USER = req.user;
        if(!USER) {
            throw new Error("No user found");
        }

        const {label} = req.body;
        if(!label || label.trim().length === 0) {
            throw new Error("No label found");
        }

        if(label.length > 50){
            throw new Error("Label should be less than 50 characters");
        }

        const TAG = await Tag.create({
            userId: USER.userId,
            label: label.trim()
        })


        return {
            message: "Tag added successfully",
            data: {
                tag: TAG
            }
        }
    }

    async editTag(req: any) {
        const USER = req.user;
        const {id} = req.params;
        const TAG_ID = Number(id);
        const {label} = req.body;

        if(!USER) {
            throw new Error("No user found");
        }

        if(!TAG_ID) {
            throw new Error("No id found");
        }

        if(Number.isNaN(TAG_ID) || TAG_ID <= 0) {
            throw new Error("Id is not a number");
        }

        if(!label || label.trim().length === 0) {
            throw new Error("Label is required");
        }

        if(label.length > 50){
            throw new Error("Label should be less than 50 characters");
        }

        const TAG_FOUND = await Tag.findOne({where: {tagId: TAG_ID, userId: USER.userId}});
        if(!TAG_FOUND) {
            throw new Error("No tag found with this id");
        }

        const UPDATED_TAG = await TAG_FOUND.update({ label: label.trim() })

        return {
            message: "Tag successfully edited",
            data: {
                tag: UPDATED_TAG
            }
        }

    }

    async deleteTag(req: any) {
        const USER = req.user;
        const {id} = req.params;
        const TAG_ID = Number(id);

        if(!USER) {
            throw new Error("No user found");
        }

        if(!TAG_ID) {
            throw new Error("No id found");
        }

        if(Number.isNaN(TAG_ID) || TAG_ID <= 0) {
            throw new Error("Id is not a number");
        }

        const TAG_FOUND = await Tag.findOne({where: {tagId: TAG_ID, userId: USER.userId}});
        if(!TAG_FOUND) {
            throw new Error("No tag found with this id");
        }

        await TAG_FOUND.destroy();
        return {
            message: "Tag deleted successfully",
        }
    }
}