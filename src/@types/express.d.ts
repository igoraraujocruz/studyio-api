declare namespace Express {
    export interface Request { // eslint-disable-line
      user: {
        id: string;
      };
      files: Express.Multer.File[];
    }
  }
