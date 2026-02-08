package tech.buildrun.controller;

import java.util.List;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import tech.entity.ProductRecipeEntity;
import tech.service.ProductRecipeService;

@Path("/recipes")
@Produces("application/json")
@Consumes("application/json")
public class ProductRecipeController {

    private final ProductRecipeService service;

    public ProductRecipeController(ProductRecipeService service) {
        this.service = service;
    }

    @POST
    public Response create(ProductRecipeEntity recipe) {
        return Response.status(201).entity(service.addRecipe(recipe)).build();
    }

    @GET
    public List<ProductRecipeEntity> listAll() {
        return service.findAll();
    }
}