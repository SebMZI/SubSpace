import {ContentService} from "../services/content.service";

export class ContentController {
    constructor(private contentService: ContentService){}

    async getAllContents(req : any, res: any) {
        try {
            const RESULT = await this.contentService.getAllContents(req);
            res.status(200).send(RESULT);
        } catch (e) {
           res.status(500).send("Failed to get all contents");
        }
    }

    async addContent(req: any, res: any) {
        try {
            const RESULT = await this.contentService.addContent(req);
            res.status(201).send(RESULT);
        } catch (e) {
            res.status(500).send("Failed to add content");
        }
    }

    async editContent(req: any, res: any) {
        try {
            const RESULT = await this.contentService.updateContent(req);
            res.status(200).send(RESULT);
        } catch (e) {
            res.status(500).send("Failed to edit content");
        }
    }

    async deleteContent(req: any, res: any) {
        try {
            const RESULT = await this.contentService.deleteContent(req);
            res.status(200).send(RESULT);
        } catch (e) {
            res.status(500).send("Failed to delete content");
        }
    }
}