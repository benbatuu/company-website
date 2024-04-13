import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const activeOffer = async (id: number, userID: number) => {

    const isOfferExist = await pc.offer.findFirst({ where: { id: id } });

    if (!isOfferExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_found' });

    if (isOfferExist?.isactive === ServiceStatus.ACTIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_already_active' });

    const offer = await pc.offer.update({
        where: { id: id },
        data: {
            isactive: ServiceStatus.ACTIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    if (!offer)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_active' })

    return offer;
}