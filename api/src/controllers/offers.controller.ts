import { env } from 'bun';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify as jwtverify } from 'hono/jwt';
// Services
import { getOffer } from 'services/offer/get.service';
import { getAllOffers } from 'services/offer/getall.service';
import { createOffer } from 'services/offer/create.service';
import { updateOffer } from 'services/offer/update.service';
import { deleteOffer } from 'services/offer/delete.service';
import { activeOffer } from 'services/offer/active.service';
// Helpers
import checkPermission from 'helpers/permission.middleware';

const offersController = new Hono();

offersController.get('/', checkPermission(["offers:view"]), async (c) => {
    const offers = await getAllOffers();
    return c.json(offers);
});

offersController.get('/:id', checkPermission(["offers:view"]), async (c) => {
    const offerID = c.req.param("id");
    const singleOffer = await getOffer(parseInt(offerID));
    return c.json(singleOffer);
});

offersController.post('/', checkPermission(["offers:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { name, description, saleprice, salepricecurrency, salepriceperiod, discountprice, discountamount, serviceID } = await c.req.json();
    const newOffer = await createOffer(name, description, saleprice, salepricecurrency, salepriceperiod, discountprice, discountamount, serviceID, createdby);
    return c.json(newOffer);
});

offersController.put('/:id', checkPermission(["offers:update"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const offerID = c.req.param("id");
    const { name, description, saleprice, salepricecurrency, salepriceperiod, discountprice, discountamount,serviceID } = await c.req.json();
    const updatedOffer = await updateOffer(parseInt(offerID), name, description, saleprice, salepricecurrency, salepriceperiod, discountprice, discountamount,serviceID,updatedby);
    return c.json(updatedOffer);
});

offersController.delete('/:id', checkPermission(["offers:delete"]), async (c) => {
    const offerID = c.req.param("id");
    const deletedOffer = await deleteOffer(parseInt(offerID));
    return c.json(deletedOffer);
});

offersController.put('/:id/active', checkPermission(["offers:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const offerID = c.req.param("id");
    const updatedOffer = await activeOffer(parseInt(offerID), updatedby);
    return c.json(updatedOffer);
});

offersController.put('/:id/archive', checkPermission(["offers:changestatus"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const offerID = c.req.param("id");
    const updatedOffer = await activeOffer(parseInt(offerID), updatedby);
    return c.json(updatedOffer);
});

export default offersController;
