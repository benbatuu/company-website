import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const updateMetaTag = async (
    id: number,
    title: string,
    description: string,
    keywords: string,
    robots: string,
    httpequiv: string,
    language: string,
    author: string,
    revisit: string,
    updatedby: number
) => {

    const isMetaTagExist = await pc.meta.findFirst({ where: { id: id } });

    if (!isMetaTagExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'metatag_not_found' });

    const metaTag = await pc.meta.update({
        where: { id: id },
        data: {
            metatitle: title,
            metadescription: description,
            metakeywords: keywords,
            metarobots: robots,
            metahttpequiv: httpequiv,
            metalanguage: language,
            metaauthor: author,
            metarevisit: revisit,
            updatedat: new Date(),
            updatedby: updatedby
        }
    });

    if (!metaTag)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'metatag_not_updated' });

    return metaTag;
}