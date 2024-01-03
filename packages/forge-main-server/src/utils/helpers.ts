import { ObjectId } from 'mongodb';

export const createPermissionsObjectFromArray = (
    array: { name: string; read: boolean; write: boolean }[]
) => {
    interface ConvertedObject {
        [key: string]: {
            read: boolean;
            write: boolean;
        };
    }

    const object: ConvertedObject = {};

    array.forEach((item) => {
        if (item.name) {
            object[item.name] = {
                read: item.read,
                write: item.write
            };
        }
    });

    return object;
};

export const generateObjectIds = (count: number): ObjectId[] =>
    Array.from({ length: count }, (): ObjectId => new ObjectId());

export const escapeString = (str: string): string => {
    return (
        str
            .replace(/[&]/g, '&amp;')
            .replace(/[<]/g, '&lt;')
            .replace(/[>]/g, '&gt;')
            .replace(/["]/g, '&quot;')
            .replace(/[']/g, '&#039;')
            .replace(/[/]/g, '&#x2F;')
            .replace(/[\\]/g, '&#x5C;')
            .replace(/[-]/g, '&#x2D;')
            // eslint-disable-next-line no-useless-escape
            .replace(/[\`]/g, '&#96;')
    );
};
