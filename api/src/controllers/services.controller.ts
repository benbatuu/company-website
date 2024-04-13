import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
// Services
import { getAllServices } from 'services/service/getall.service';
import { getSingleService } from 'services/service/get.service'; 
import { createService } from 'services/service/create.service';
import { updateService } from 'services/service/update.service';
import { archiveService } from 'services/service/archive.service';
import { activateService } from 'services/user/activate.service';
import { deleteService } from 'services/service/delete.service';
// Helpers
import checkPermission from 'helpers/permission.middleware';

const serviceController = new Hono();

serviceController.get('/', checkPermission(["services:view"]), async (c) => {
    const services = await getAllServices();
    return c.json(services);
});

serviceController.get('/:id', checkPermission(["services:view"]), async (c) => {
    const serviceID = c.req.param('id');
    const service = await getSingleService(parseInt(serviceID));
    return c.json(service);
});

serviceController.post('/', checkPermission(["services:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { name, description, category } = await c.req.json();
    const service = await createService(name, description, parseInt(category), createdby);
    return c.json(service);
});

serviceController.put('/:id', checkPermission(["services:update"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const serviceID = c.req.param('id');
    const { name, description, category } = await c.req.json();
    const service = await updateService(parseInt(serviceID), name, description, parseInt(category), updatedby);
    return c.json(service);
});

serviceController.put('/:id/archive', checkPermission(["services:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const serviceID = c.req.param('id');
    const service = await archiveService(parseInt(serviceID), updatedby);
    return c.json(service);
});

serviceController.put('/:id/active', checkPermission(["services:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const serviceID = c.req.param('id');
    const service = await activateService(parseInt(serviceID), updatedby);
    return c.json(service);
});

serviceController.delete('/:id', checkPermission(["services:delete"]), async (c) => {
    const serviceID = c.req.param('id');
    const service = await deleteService(parseInt(serviceID));
    return c.json(service);
});
export default serviceController;
