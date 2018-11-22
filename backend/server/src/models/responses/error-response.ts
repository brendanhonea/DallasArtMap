export class ErrorResponse {
    constructor(err) {
        this.error = err;
        console.error(err);
    }
    
    error: string;
}