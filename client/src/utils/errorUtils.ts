export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message; 
    }
    console.log(error);
    return String(error);
};