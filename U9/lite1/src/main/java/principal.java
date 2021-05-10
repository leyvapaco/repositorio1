import java.sql.*;

public class principal {
    public static void main(String[] args) {
        Connection connection=null;
        try{
            connection=DriverManager.getConnection("jdbc:sqlite:sampledatabase.db");
//             connection=DriverManager.getConnection("jdbc:sqlite:metadata.db");
            Statement statement= connection.createStatement();
            statement.setQueryTimeout(30);

            ResultSet rs = statement.executeQuery("select * from employees");
 //         ResultSet rs = statement.executeQuery("select * from books");

            while (rs.next()) {
                System.out.println("nombre: " + rs.getString("firstName"));
 //             System.out.println("name: " + rs.getString("title"));
            }
            } catch (SQLException e){
                System.out.println(e.getMessage());
            } finally{
                try {
                    if (connection!=null) {
                        connection.close();
                    }
                    } catch (SQLException e) {
                        System.out.println((e.getMessage()));
                    }
                }
            }
        }
