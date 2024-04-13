import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from "hono/jwt";
// Services
import { createMetaTag } from 'services/metatags/create.service';
import { getSingleMetaTag } from 'services/metatags/get.service';
import { getMetaTags } from 'services/metatags/getall.service';
import { updateMetaTag } from 'services/metatags/update.service';
// Helpers
import checkPermission from 'helpers/permission.middleware';

const metaTagsController = new Hono();

metaTagsController.get('/', checkPermission(["metatags:view"]), async (c) => {
    const metaTags = await getMetaTags();
    return c.json(metaTags);
});

metaTagsController.get('/:id', checkPermission(["metatags:view"]), async (c) => {
    const metaTagID = c.req.param("id");
    const singleMetaTag = await getSingleMetaTag(parseInt(metaTagID));
    return c.json(singleMetaTag);
});

metaTagsController.post('/', checkPermission(["metatags:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { title, description, keywords, robots, httpequiv, language, author, revisit } = await c.req.json();
    const newMetaTag = await createMetaTag(title, description, keywords, robots, httpequiv, language, author, revisit, createdby);
    return c.json(newMetaTag);
});

metaTagsController.put('/:id', checkPermission(["metatags:update"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const metaTagID = c.req.param("id");
    const { title, description, keywords, robots, httpequiv, language, author, revisit } = await c.req.json();
    const updatedMetaTag = await updateMetaTag(parseInt(metaTagID), title, description, keywords, robots, httpequiv, language, author, revisit, updatedby);
    return c.json(updatedMetaTag);
});

export default metaTagsController;