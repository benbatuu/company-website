import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const updateOffer = async (
    id: number,
    name: string,
    description: string,
    saleprice: number,
    salepricecurrency: string,
    salepriceperiod: string,
    discountprice: number,
    discountamount: string,
    serviceID: number,
    userID: number
) => {

    const isOfferExist = await pc.offer.findFirst({ where: { id: id } });

    if (!isOfferExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_found' });

    const offer = await pc.offer.update({
        where: { id: id },
        data: {
            name: name,
            description: description,
            saleprice: saleprice,
            salepricecurrency: salepricecurrency,
            salepriceperiod: salepriceperiod,
            discountprice: discountprice,
            discountamount: discountamount,
            serviceid: serviceID,
            updatedat: new Date(),
            updatedby: userID,
        }
    });

    if (!offer)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_updated' })

    return offer;
}