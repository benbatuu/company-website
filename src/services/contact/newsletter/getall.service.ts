import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getAllNewsletterSubscribers = async () => {

    const subscribers = await pc.newsletter.findMany();

    if (!subscribers)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'subscribers_not_found' });

    return subscribers;
}