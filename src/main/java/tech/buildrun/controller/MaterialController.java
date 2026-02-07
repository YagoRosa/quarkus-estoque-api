package tech.buildrun.controller;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Path("/materials")
@Produces("application/json")
@Consumes("application/json")


public class MaterialController {

    @GET
    public Response test() {
        return Response.ok("Testando ").build();
    }

}