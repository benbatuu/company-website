import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const deleteNewsletterSubscriber = async (id: number) => {

    const isSubscriberExist = await pc.newsletter.findFirst({ where: { id: id } });

    if (!isSubscriberExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'subscriber_not_found' });

    const subscriber = await pc.newsletter.delete({
        where: { id: id }
    });

    if (!subscriber)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'subscriber_not_deleted' })

    return subscriber;
}