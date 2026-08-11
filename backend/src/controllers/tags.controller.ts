import {TagsService} from "../services/tags.service";

export class TagsController {
    constructor(private tagsService: TagsService) {}

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