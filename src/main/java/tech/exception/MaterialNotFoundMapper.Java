package tech.exception;

import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;



@Provider
public class MaterialNotFoundMapper implements ExceptionMapper<MaterialNotFoundExecption> {

    @Override
    public Response toResponse(MaterialNotFoundExecption exception) {
        return Response.status(Response.Status.NOT_FOUND.getStatusCode(),"Material not found").build();
    }