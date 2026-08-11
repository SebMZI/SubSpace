import Content from "../models/content.model";
import Tag from "../models/tag.model";

// TODO - Add validation methods

export class ContentService {
    /**
     * Retrieves all content items associated to the authenticated user
     * @param req
     */
    async getAllContents(req : any){
        const USER = req.user;
        if(!USER) {
            throw new Error("No user found");
        }

        return await Content.findAll({where: {userId: USER.userId}, include: [
                {
                    model: Tag,
                    through: {
                        attributes: []
                    }
                }
            ]});
    }

    /**
     * Create a new content item (Channel | Video) associated to the authenticated user
     * @param req
     */
    async addContent(req : any){
        const USER = req.user;
        const {contentId, title, description, thumbnailUrl, duration, channelId, subscriberCount, tags} = req.body;

        if(!USER) {
            throw new Error("No user found");
        }

        if(!contentId || !title || !thumbnailUrl) {
            throw new Error("Please provide all required fields");
        }

        const EXISTING_CONTENT = await Content.findOne({where: {contentId: contentId, userId: USER.userId}});
        if(EXISTING_CONTENT) {
            throw new Error("Content already exists");
        }

        const content = await Content.create({
            contentId,
            title,
            description: description ?? null,
            thumbnailUrl,
            duration: duration ?? null,
            channelId: channelId ?? null,
            subscriberCount: subscriberCount ?? null,
            userId: USER.userId
        })

        if(tags && Array.isArray(tags) && tags.length > 0) {
            const TAGS_FOUND = await Tag.findAll({
                where: {
                    tagId: tags,
                    userId: USER.userId
                }
            });

            //@ts-ignore
            await content.addTags(TAGS_FOUND);
        }

        return {
            message: "Content successfully created",
            data: {
                content: content,
            }
        }
    }

    /**
     * Updates an existing content item owned by the authenticated user
     * @param req
     */
    async updateContent(req : any){
        const USER = req.user;
        const {id} = req.params;
        const ID = Number(id);
        const {title, description, thumbnailUrl, duration, channelId, subscriberCount, tags} = req.body;

        if(!USER) {
            throw new Error("No user found");
        }

        if(!ID) {
            throw new Error("No id found");
        }

        if(Number.isNaN(ID) || ID <= 0) {
            throw new Error("Id is not a number");
        }

        const CONTENT_FOUND = await Content.findOne({where: {id: ID, userId: USER.userId}});
        if(!CONTENT_FOUND) {
            throw new Error("No content found with this id");
        }

        const updateData: any = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (thumbnailUrl !== undefined) updateData.thumbnailUrl = thumbnailUrl;
        if (duration !== undefined) updateData.duration = duration;
        if (channelId !== undefined) updateData.channelId = channelId;
        if (subscriberCount !== undefined) {
            updateData.subscriberCount = subscriberCount;
        }

        await CONTENT_FOUND.update(updateData);

        if(tags && Array.isArray(tags) && tags.length > 0) {
            const TAGS_FOUND = await Tag.findAll({
                where: {
                    tagId: tags,
                    userId: USER.userId
                }
            });

            //@ts-ignore
            await CONTENT_FOUND.setTags(TAGS_FOUND);
        }

        return {
            message: "Content successfully updated",
            data: {
                content: CONTENT_FOUND
            }
        }

    }

    /**
     * Deletes a content item associated to the authenticated user
     * @param req
     */
    async deleteContent(req : any){
        const USER = req.user;
        const {id} = req.params;
        const ID = Number(id);

        if(!USER) {
            throw new Error("No user found");
        }

        if(!ID) {
            throw new Error("No id found");
        }

        if(Number.isNaN(ID) || ID <= 0) {
            throw new Error("Id is not a number");
        }

        const CONTENT_FOUND = await Content.findOne({where: {id: ID, userId: USER.userId}});
        if(!CONTENT_FOUND) {
            throw new Error("No content found with this id");
        }

        await CONTENT_FOUND.destroy();
        return {
            message: "Content successfully deleted"
        }
    }
}