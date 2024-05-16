import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const createOffer = async (
    name: string,
    description: object,
    saleprice: number,
    salepricecurrency: string,
    salepriceperiod: string,
    discountprice: number,
    discountamount: string,
    serviceID: number,
    userID: number
) => {

    const isOfferExist = await pc.offer.findFirst({ where: { name: name } });

    if (isOfferExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_already_exist' });

    const offer = await pc.offer.create({
        data: {
            name: name,
            description: description.toString(),
            saleprice: saleprice,
            salepricecurrency: salepricecurrency,
            salepriceperiod: salepriceperiod,
            discountprice: discountprice,
            discountamount: discountamount,
            createdat: new Date(),
            createdby: userID,
            isactive: ServiceStatus.ACTIVE
        }
    });

    if (!offer)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_created' })

    return offer;
}