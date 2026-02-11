package tech.buildrun.controller;

import java.util.List;
import java.util.UUID;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import tech.entity.ProductRecipeEntity;
import tech.service.ProductRecipeService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Path("/recipes")
@Produces("application/json")
@Consumes("application/json")
public class ProductRecipeController {

    private final ProductRecipeService service;

    public ProductRecipeController(ProductRecipeService service) {
        this.service = service;
    }

    @POST
    @Transactional
    public Response createRecipe(@Valid ProductRecipeEntity productRecipeEntity) {
        return Response.status(201).entity(service.addRecipe(productRecipeEntity)).build();
    }

    @GET
    public List<ProductRecipeEntity> listAll() {
        return service.findAll();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") UUID id) {
        service.deleteRecipe(id);
        return Response.noContent().build();
    }
}