export class ErrorResponse {
    constructor(err) {
        this.error = err;
    }
    
    error: string;
}