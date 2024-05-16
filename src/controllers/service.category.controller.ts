import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
// Services
import { getAllCategory } from 'services/service.category/getall.service';
import { getSingleCategory } from 'services/service.category/get.service';
import { createCategory } from 'services/service.category/create.service';
import { updateCategory } from 'services/service.category/update.service';
import { deleteCategory } from 'services/service.category/delete.service';
import { archiveCategory } from 'services/service.category/archive.service';
// Helpers
import checkPermission from 'helpers/permission.middleware';

const serviceCategoryController = new Hono();

serviceCategoryController.get('/', checkPermission(["servicecategories:view"]), async (c) => {
    const servicecategories = await getAllCategory();
    return c.json(servicecategories);
});

serviceCategoryController.get('/:id', checkPermission(["servicecategories:view"]), async (c) => {
    const categoryID = c.req.param('id');
    const category = await getSingleCategory(parseInt(categoryID));
    return c.json(category);
});

serviceCategoryController.post('/', checkPermission(["servicecategories:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { name, description, metaID } = await c.req.json();
    const category = await createCategory(name, description, metaID, createdby);
    return c.json(category);
});

serviceCategoryController.put('/:id', checkPermission(["servicecategories:update"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const categoryID = c.req.param('id');
    const { name, description, metaID } = await c.req.json();
    const category = await updateCategory(parseInt(categoryID), name, description, metaID, updatedby);
    return c.json(category);
});

serviceCategoryController.delete('/:id', checkPermission(["servicecategories:delete"]), async (c) => {
    const categoryID = c.req.param('id');
    const category = await deleteCategory(parseInt(categoryID));
    return c.json(category);
});

serviceCategoryController.put('/:id/archive', checkPermission(["servicecategories:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const categoryID = c.req.param('id');
    const category = await archiveCategory(parseInt(categoryID), updatedby);
    return c.json(category);
});

serviceCategoryController.put('/:id/active', checkPermission(["servicecategories:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const categoryID = c.req.param('id');
    const category = await archiveCategory(parseInt(categoryID), updatedby);
    return c.json(category);
});

export default serviceCategoryController;
