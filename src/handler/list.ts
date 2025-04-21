import { Request, Response, NextFunction } from "express";
import { Listcontroller } from "../controller/list";

const listcontroller = new Listcontroller();


export class ListHttphHandler{

    getplotbox = async (request: Request, response: Response, next: NextFunction) => {
            const blotpox = await listcontroller.boxplot();
            response.json(blotpox);
    }
    

}