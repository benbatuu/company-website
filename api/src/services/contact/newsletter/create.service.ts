import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const createNewsletterSubscriber = async (email: string, userID: number) => {

    const isSubscriberExist = await pc.newsletter.findFirst({ where: { email: email } });

    if (isSubscriberExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'subscriber_already_exists' });

    const subscriber = await pc.newsletter.create({
        data: {
            email: email,
            createdat: new Date(),
            createdby: userID
        }
    });

    if (!subscriber)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'subscriber_not_created' })

    return { data: subscriber, message: 'subscriber_created' };
}