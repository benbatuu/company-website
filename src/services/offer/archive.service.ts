import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const archiveOffer = async (id: number, userID: number) => {

    const isOfferExist = await pc.offer.findFirst({ where: { id: id } });

    if (!isOfferExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_found' });

    if (isOfferExist?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_already_inactive' });

    const offer = await pc.offer.update({
        where: { id: id },
        data: {
            isactive: ServiceStatus.PASSIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    if (!offer)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_inactive' })

    return offer;
}