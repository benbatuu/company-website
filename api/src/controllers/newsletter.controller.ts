import { Hono } from "hono";
import { env } from "bun";
import { verify as jwtverify } from "hono/jwt";
// Newsletter Service
import { createNewsletterSubscriber } from 'services/contact/newsletter/create.service';
import { deleteNewsletterSubscriber } from 'services/contact/newsletter/delete.service';
import { getSingleNewsletterSubscriber } from 'services/contact/newsletter/get.service';
import { getAllNewsletterSubscribers } from 'services/contact/newsletter/getall.service';
// Permission middleware
import checkPermission from '../helpers/permission.middleware';

const newsletterController = new Hono();


// Newsletter Services
newsletterController.get('/:id', checkPermission(["newsletter:view"]), async (c) => {
    const subscriberID = c.req.param("id");
    const singleSubscriber = await getSingleNewsletterSubscriber(parseInt(subscriberID));
    return c.json(singleSubscriber);
});

newsletterController.get('/', checkPermission(["newsletter:view"]), async (c) => {
    const allSubscribers = await getAllNewsletterSubscribers();
    return c.json(allSubscribers);
});

newsletterController.post('/', checkPermission(["newsletter:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { email } = await c.req.json();
    const newSubscriber = await createNewsletterSubscriber(email, createdby);
    return c.json(newSubscriber);
});

newsletterController.delete('/:id', checkPermission(["newsletter:delete"]), async (c) => {
    const subscriberID = c.req.param("id");
    const deletedSubscriber = await deleteNewsletterSubscriber(parseInt(subscriberID));
    return c.json(deletedSubscriber);
});
export default newsletterController;