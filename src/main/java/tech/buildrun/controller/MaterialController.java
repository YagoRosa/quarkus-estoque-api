package tech.buildrun.controller;

import java.util.UUID;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import tech.entity.MaterialEntity;
import tech.service.MaterialService;

@Path("/materials")
@Produces("application/json")
@Consumes("application/json")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("pagesize") @DefaultValue("10") Integer pagesize) {
        var materials = materialService.findAll(page, pagesize);
        
        return Response.ok(materials).build();
    }
    
    @POST
    @Transactional
    public Response createMaterial(MaterialEntity materialEntity) {
        return Response.ok(materialService.createMaterial(materialEntity)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateMaterial(@PathParam("id") UUID materialid, MaterialEntity materialEntity) {
        return Response.ok(materialService.updateMaterial(materialid,materialEntity)).build();
    }

    @GET
    @Path("/{id}")
    public Response getMaterialById(@PathParam("id") UUID materialid) {
        return Response.ok(materialService.findById(materialid)).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteMaterialById(@PathParam("id") UUID materialid) {
        materialService.deleteMaterialById(materialid);
        return Response.noContent().build();
    }


}   