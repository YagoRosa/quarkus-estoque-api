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
import tech.entity.ProductEntity;
import tech.service.ProductService;

@Path("/products")
@Produces("application/json")
@Consumes("application/json")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("pagesize") @DefaultValue("10") Integer pagesize) {
        var products = productService.findAll(page, pagesize);
        
        return Response.ok(products).build();
    }
    
    @POST
    @Transactional
    public Response createProduct(ProductEntity productEntity) {
        return Response.ok(productService.createProduct(productEntity)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateProduct(@PathParam("id") UUID id, ProductEntity productEntity) {
        return Response.ok(productService.updateProduct(id,productEntity)).build();
    }

    @GET
    @Path("/{id}")
    public Response getProductById(@PathParam("id") UUID id) {
        return Response.ok(productService.findById(id)).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteProductById(@PathParam("id") UUID id) {
        productService.deleteProductById(id);
        return Response.noContent().build();
    }

    @POST
    @Path("/{id}/produce")
    @Transactional
    public Response produce(@PathParam("id") UUID productId, @QueryParam("quantity") Integer quantity) {
        return Response.ok(productService.produceProduct(productId, quantity)).build();
    }

}   