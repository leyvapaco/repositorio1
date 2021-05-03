package U8.JSON.ventas_retrofit;

import U8.JSON.ventas_retrofit.CentralDeVentas;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/*Retrofit es un cliente hhtp que nos permitirá realizar llamadas a una
API ficticia y recibir una respuesta JSON que instanciaremos en un objeto JAVA.

Añadir a DetalleVenta un atributo id.
*/
public class principal_retrofit {
    public static void main(String[] args) {

        Retrofit retrofit=new Retrofit.Builder()
                .baseUrl("https://my-json-server.typicode.com/chemaduran/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        CentralDeVentas service=retrofit.create(CentralDeVentas.class);
        Venta venta=null;

        System.out.println("1.Obtenemos el listado completo de ventas");
        try {
            Response<List<Venta>> response = service.listVentas().execute();
            if (response.isSuccessful()){
                List<Venta> ventas=response.body();
                System.out.println(ventas);
        } else {
                System.out.println("Peticion no valida: "+ response.message());
            }
        }
            catch (IOException ex) {
            System.out.println("Error en la petición: "+ex.getMessage());
        }

        final Integer ventaId=2;
        System.out.println("\n"+"2.Obtenemos una venta concreta a partir de su id: "+ventaId);

        try {
            Response<Venta> response = service.getVentaId(ventaId).execute();
            if (response.isSuccessful()){
                venta=response.body();
                System.out.println(venta);
            } else {
                System.out.println("Peticion no valida: "+ response.message());
            }
        }
        catch (IOException ex) {
            System.out.println("Error en la petición: "+ex.getMessage());
        }

        System.out.println("\n"+"3.Obtenemos el listado de detalles de una venta concreta:"+ventaId);
        try {
            Response<List<DetalleVenta>> response = service.listVentaIdDetalles(ventaId).execute();
            if (response.isSuccessful()){
                List<DetalleVenta> detalle_venta=response.body();
                System.out.println(detalle_venta);
                if (venta!=null){
                    venta.setDetalle(new ArrayList<>(detalle_venta));
                }
            } else {
                System.out.println("Peticion no valida: "+ response.message());
            }
        }
        catch (IOException ex) {
            System.out.println("Error en la petición: "+ex.getMessage());
        }
        System.out.println("\nImprimimos el objeto venta (id 2) completo: \n"+venta);
    }
}
