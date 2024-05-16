import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
// Services
import { getAllPages } from 'services/pages/getall.service';
import { getSinglePage } from 'services/pages/get.service';
import { createPage } from 'services/pages/create.service';
import { updatePage } from 'services/pages/update.service';
import { deletePage } from 'services/pages/delete.service';
import { archivePage } from 'services/pages/archive.service';
import { activePage } from 'services/pages/active.service';
// Helpers
import checkPermission from 'helpers/permission.middleware';

const pagesController = new Hono();

pagesController.get('/', checkPermission(["pages:view"]), async (c) => {
    const pages = await getAllPages();
    return c.json(pages);
});

pagesController.get('/:id', checkPermission(["pages:view"]), async (c) => {
    const pageID = c.req.param('id');
    const page = await getSinglePage(parseInt(pageID));
    return c.json(page);
});

pagesController.post('/', checkPermission(["pages:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const { name, content, metaID, serviceID } = await c.req.json();
    const createPageResponse = await createPage(name, content, metaID, serviceID, userID);
    return c.json(createPageResponse);
});

pagesController.put('/:id', checkPermission(["pages:update"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const pageID = c.req.param('id');
    const { name, content } = await c.req.json();
    const page = await updatePage(parseInt(pageID), name, content, updatedby);
    return c.json(page);
});

pagesController.delete('/:id', checkPermission(["pages:delete"]), async (c) => {
    const pageID = c.req.param('id');
    const page = await deletePage(parseInt(pageID));
    return c.json(page);
});

pagesController.put('/:id/archive', checkPermission(["pages:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const pageID = c.req.param('id');
    const page = await archivePage(parseInt(pageID), updatedby);
    return c.json(page);
});

pagesController.put('/:id/active', checkPermission(["pages:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const pageID = c.req.param('id');
    const page = await activePage(parseInt(pageID), updatedby);
    return c.json(page);
});
export default pagesController;
