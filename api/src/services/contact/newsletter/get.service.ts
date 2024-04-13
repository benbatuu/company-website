import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getSingleNewsletterSubscriber = async (id: number) => {

    const subscriber = await pc.newsletter.findFirst({ where: { id: id } });

    if (!subscriber)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'subscriber_not_found' });

    return subscriber;
}