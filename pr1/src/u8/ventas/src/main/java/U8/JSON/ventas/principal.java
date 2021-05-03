package U8.JSON.ventas;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

//Transformar un objeto java a una cadena en formato JSON y viceversa

public class principal {
    public static void main(String[] args) {
        //PRIMERA PARTE. \n Creamos el objeto Venta que vamos a transformar en una cadena en formato JSON

        Calendar calendario=Calendar.getInstance();
        Date fecha=new Date(calendario.getTimeInMillis());

        Venta venta=new Venta(fecha, "Paquito");

        //Creamos el objeto GSON que se encarga de las conversiones
        Gson gson =new Gson();

        //Convertimos el objeto GSON en JSON y lo mostramos por pantalla
        System.out.println("\nJSON VENTA:\n"+gson.toJson(venta));

        //Creamos los detalles de venta
        DetalleVenta detalle1=new DetalleVenta("Martillo",50.0,25.0,2);
        DetalleVenta detalle2=new DetalleVenta("Clavos",10.0,10.0,1);

        ArrayList<DetalleVenta> detalles=new ArrayList<>();
        detalles.add(detalle1);
        detalles.add(detalle2);
        venta.setDetalle(detalles);

        //Convertimos un objeto compuesto con ArrayList a JSON
        System.out.println("\nJSON VENTA Y DETALLE:\n"+gson.toJson(venta));


        //SEGUNDA PARTE. \nTransformamos una cadena JSON en un objeto JAVA.
        String json_completo=gson.toJson(venta);

        Venta nueva_venta=gson.fromJson(json_completo,Venta.class);
        System.out.println("\nOBJETO COMPLETO:\n"+nueva_venta);

        //Si queremos transformar sólo un array de JSON con detalle de ventas a ArrayList
        String json_array=gson.toJson(detalles);

        Type ListType = new TypeToken<ArrayList<DetalleVenta>>() {}.getType();
        ArrayList<DetalleVenta> array_de_json=gson.fromJson(json_array,ListType);

        System.out.println("\nSOLO DETALLE:\n"+array_de_json);

    }
}
