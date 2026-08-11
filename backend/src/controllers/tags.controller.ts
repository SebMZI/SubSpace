import {TagsService} from "../services/tags.service";

export class TagsController {
    constructor(private tagsService: TagsService) {}

    /**
     * Handles Get tags user request
     * @param req
     * @param res
     */
    async getTags(req: any, res: any) {
        try {
            const RESULT = await this.tagsService.getTags(req);
            res.status(200).send(RESULT);
        } catch (e) {
            res.status(500).send({
                message: "Failed to get all tags",
            })
        }
    }

    /**
     * Handles Add tag user request
     * @param req
     * @param res
     */
    async addTag(req: any, res: any) {
        try {
            const RESULT = await this.tagsService.addTag(req);
            res.status(201).send(RESULT);
        } catch (e) {
            res.status(500).send({
                message: "Failed to add tag",
            })
        }
    }

    /**
     * Handles edit tag user request
     * @param req
     * @param res
     */
    async editTag(req: any, res: any) {
        try {
            const RESULT = await this.tagsService.editTag(req);
            res.status(200).send(RESULT);
        } catch (e) {
            res.status(500).send({
                message: "Failed to modify tag",
            })
        }
    }

    /**
     * Handles delete tag user request
     * @param req
     * @param res
     */
    async deleteTag(req: any, res: any) {
        try {
            const RESULT = await this.tagsService.deleteTag(req);
            res.status(200).send(RESULT);
        } catch (e) {
            res.status(500).send({
                message: "Failed to delete tag",
            })
        }
    }
}