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

public class principal_retrofit {
    public static void main(String[] args) {

        Retrofit retrofit=new Retrofit.Builder()
                .baseUrl("https://my-json-server.typicode.com/chemaduran/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        CentralDeVentas service=retrofit.create(CentralDeVentas.class);
        Venta venta=null;
        final Integer ventaId=2;
        System.out.println("Obtenemos el listado completo de ventas");
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
    }
}
