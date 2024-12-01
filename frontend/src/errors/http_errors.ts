class HttpError extends Error{
    constructor(message?: string){
        super(message);
        this.name = this.constructor.name;
    }
}
export class ApiError extends Error {
    constructor(public status: number, public message: string) {
      super(message);
    }
  }

export class ConflictError extends HttpError{}