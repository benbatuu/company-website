import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const deleteOffer = async (id: number) => {

    const isOfferExist = await pc.offer.findFirst({ where: { id: id } });

    if (!isOfferExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_found' });

    const offer = await pc.offer.delete({
        where: { id: id }
    });

    if (!offer)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_deleted' })

    return offer;
}