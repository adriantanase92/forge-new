export type Error = {
    errorKey: string;
    error?: unknown;
};

export const formErrorObject = ({ errorKey, error }: Error) => {
    return {
        errorKey,
        error
    };
};
