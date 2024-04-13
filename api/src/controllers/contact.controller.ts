import { Hono } from "hono";
import { env } from "bun";
import { verify as jwtverify } from "hono/jwt";
// Contact Services
import { activeContact } from 'services/contact/open.service';
import { archiveContact } from '../services/contact/close.service';
import { createContact } from '../services/contact/create.service';
import { deleteContact } from '../services/contact/delete.service';
import { getSingleContactForm } from '../services/contact/get.service';
import { getAllContactForms } from '../services/contact/getall.service';
// Permission middleware
import checkPermission from '../helpers/permission.middleware';

const contactController = new Hono();

// Contact Serives
contactController.get('/', checkPermission(["contact:view"]), async (c) => {
    const allContacts = await getAllContactForms();
    return c.json(allContacts);
});

contactController.get('/:id', checkPermission(["contact:view"]), async (c) => {
    const contactID = c.req.param("id");
    const singleContact = await getSingleContactForm(parseInt(contactID));
    return c.json(singleContact);
});

contactController.post('/', checkPermission(["contact:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { name, email, phone, message, serviveCategory, service } = await c.req.json();
    const newContact = await createContact(name, email, phone, message, createdby, serviveCategory, service);
    return c.json(newContact);
});

contactController.put('/:id/close', checkPermission(["contact:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const contactID = c.req.param("id");
    const updatedContact = await archiveContact(parseInt(contactID), updatedby);
    return c.json(updatedContact);
});

contactController.put('/:id/open', checkPermission(["contact:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const contactID = c.req.param("id");
    const updatedContact = await activeContact(parseInt(contactID), updatedby);
    return c.json(updatedContact);
});

contactController.delete('/:id', checkPermission(["contact:delete"]), async (c) => {
    const contactID = c.req.param("id");
    const deletedContact = await deleteContact(parseInt(contactID));
    return c.json(deletedContact);
});


export default contactController;