import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const createMetaTag = async (
    title: string,
    description: string,
    keywords: string,
    robots: string,
    httpequiv: string,
    language: string,
    author: string,
    revisit: string,
    userID: number
) => {
    const isMetaTagExist = await pc.meta.findFirst({ where: { metatitle: title } });

    if (isMetaTagExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'metatag_already_exist' });

    const metaTag = await pc.meta.create({
        data: {
            metatitle: title,
            metadescription: description,
            metakeywords: keywords,
            metarobots: robots,
            metahttpequiv: httpequiv,
            metalanguage: language,
            metaauthor: author,
            metarevisit: revisit,
            createdby: userID
        }
    });

    if (!metaTag)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'metatag_not_created' });

    return metaTag;
}