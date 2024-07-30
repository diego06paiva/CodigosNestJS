import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { NotFoundError } from "rxjs";

export const User = createParamDecorator((filter: string, context: ExecutionContext) =>{
    const request = context.switchToHttp().getRequest()

    if (request.user){
        if(filter){
            return request.user[filter]
        }else {
            return request.user
        }
    } else {
        throw new NotFoundException("Usuario não encontrado no request. Use o AuthGuard para obter o usuario")

    }

})