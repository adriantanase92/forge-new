/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const isValidObjectId = (id: string) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

export const convertToObjectId = (obj: any) => {
    for (const key in obj) {
        if (typeof obj[key] === 'string' && isValidObjectId(obj[key])) {
            obj[key] = new ObjectId(obj[key]);
        } else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map((item: any) =>
                typeof item === 'string' && isValidObjectId(item) ? new ObjectId(item) : item
            );
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            convertToObjectId(obj[key]);
        }
    }
};
