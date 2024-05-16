import { Hono } from 'hono';
import { env } from 'bun';
import { verify as jwtverify } from 'hono/jwt';
// Services
import { getAllUsers } from 'services/user/getall.service';
import { getUserById } from 'services/user/get.service';
import { createService } from 'services/user/create.service';
import { updateService } from 'services/user/update.service';
import { archiveService } from 'services/user/archive.service';
import { activateService } from 'services/user/activate.service';
import { editUserInfoService } from 'services/user/edituserinfo.service';
import { profileService } from 'services/user/profile.service';

import checkPermission from 'helpers/permission.middleware';

const userController = new Hono();

userController.get('/', checkPermission(['user:view']), async (c) => {
    const users = await getAllUsers();
    return c.json(users);
});

userController.get('/:id/info', async (c) => {
    const userID = c.req.param('id');
    const user = await profileService(parseInt(userID));
});

userController.put('/info', async (c) => {
    const body = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const user = await editUserInfoService(body.firstname, body.lastname, body.email, body.phone, userID);
    return c.json(user);
});

userController.get('/:id', checkPermission(['user:view']), async (c) => {
    const id = c.req.param('id');
    const user = await getUserById(parseInt(id));
    return c.json(user);
});

userController.post('/', checkPermission(['user:create']), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { firstname, lastname, email, password, phone, userroles, userpermissions } = await c.req.json();
    const user = await createService(firstname, lastname, email, password, phone, userroles, userpermissions, createdby);
    return c.json(user);
});

userController.put('/:id', checkPermission(['user:update']), async (c) => {
    const id = c.req.param('id');
    const { firstname, lastname, email, password, phone, userroles, userpermissions, } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const user = await updateService(parseInt(id), firstname, lastname, email, password, phone, userroles, userpermissions, updatedby);
    return c.json(user);
});

userController.put('/:id/archive', checkPermission(['user:changestatus']), async (c) => {
    const id = c.req.param('id');
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const user = await archiveService(parseInt(id), updatedby);
    return c.json(user);
});

userController.put('/:id/activate', checkPermission(['user:changestatus']), async (c) => {
    const id = c.req.param('id');
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const user = await activateService(parseInt(id), updatedby);
    return c.json(user);
});

userController.get('/profile', checkPermission(['user:view']), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const id = jwtPayload.sub_id;
    const profile = await profileService(parseInt(id));
    return c.json(profile);
});

export default userController;