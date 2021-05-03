import com.google.gson.Gson;

public class principal {
    public static void main(String[] args) {

        // Serialization
        BagOfPrimitives obj = new BagOfPrimitives();
        Gson gson = new Gson();
        String json = gson.toJson(obj);
        System.out.println(json);

    }
}
