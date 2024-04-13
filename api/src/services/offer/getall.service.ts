import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getAllOffers = async () => {

    const offers = await pc.offer.findMany();

    if (!offers)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offers_not_found' });

    return offers;
}