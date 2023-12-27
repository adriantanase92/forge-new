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
