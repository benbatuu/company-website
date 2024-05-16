import { Context } from 'hono';
import { v4 as uuidv4 } from 'uuid';

const generateRefreshToken = (userid: number) => `${uuidv4()}${userid}${uuidv4()}`.replace(/[-]/g, '');

const generateTraceCode = () => {
    const givenSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    let code = '';
    for (let i = 0; i < 8; i++) {
        let pos = Math.floor(Math.random() * givenSet.length);
        code += givenSet[pos];
    }
    return code;
};

const findIPAddress = (c: Context) => c.req.header('CF-Connecting-IP') || c.req.header('X-Real-IP') || c.req.header('X-Forwarded-For') || '';

const todayDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString('tr-TR', {
        timeZone: 'Europe/Istanbul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        minute: '2-digit',
        hour: '2-digit',
    });
    const replaced = formattedDate.replace('.', '').replace('.', '').replace(' ', '').replace(':', '').replace(':', '');
    return replaced;
};

const slugify = (name: string, seperator: string) => {
    name = name.toString().toLowerCase().trim();

    const sets = [
        { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
        { to: 'c', from: '[ÇĆĈČ]' },
        { to: 'd', from: '[ÐĎĐÞ]' },
        { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
        { to: 'g', from: '[ĜĞĢǴ]' },
        { to: 'h', from: '[ĤḦ]' },
        { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
        { to: 'j', from: '[Ĵ]' },
        { to: 'ij', from: '[Ĳ]' },
        { to: 'k', from: '[Ķ]' },
        { to: 'l', from: '[ĹĻĽŁ]' },
        { to: 'm', from: '[Ḿ]' },
        { to: 'n', from: '[ÑŃŅŇ]' },
        { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
        { to: 'oe', from: '[Œ]' },
        { to: 'p', from: '[ṕ]' },
        { to: 'r', from: '[ŔŖŘ]' },
        { to: 's', from: '[ßŚŜŞŠ]' },
        { to: 't', from: '[ŢŤ]' },
        { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
        { to: 'w', from: '[ẂŴẀẄ]' },
        { to: 'x', from: '[ẍ]' },
        { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
        { to: 'z', from: '[ŹŻŽ]' },
        { to: '-', from: '[·/_,:;\']' }
    ];

    sets.forEach(set => {
        name = name.replace(new RegExp(set.from, 'gi'), set.to);
    });

    name = name.toString().toLowerCase()
        .replace(/\s+/g, '-')         // Replace spaces with -
        .replace(/&/g, '-and-')       // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\--+/g, '-')        // Replace multiple - with single -
        .replace(/^-+/, '')           // Trim - from start of text
        .replace(/-+$/, '');          // Trim - from end of text

    if ((typeof seperator !== 'undefined') && (seperator !== '-')) {
        name = name.replace(/-/g, seperator);
    }

    return name;
}

export { generateRefreshToken, generateTraceCode, findIPAddress, todayDateTime, slugify };
