import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getOffer = async (id: number) => {

    const offer = await pc.offer.findFirst({ where: { id: id } });

    if (!offer)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_found' });

    return offer;
}