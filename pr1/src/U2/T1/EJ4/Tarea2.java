package U2.T1.EJ4;
// Crea un programa que pida al usuario que introduzca el número 12.
// Después debe decirle si lo ha hecho correctamente o no.
import java.util.Scanner;

public class Tarea2 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println("Introduce el numero 12:");
    int x = sc.nextInt();
    if (x != 12) {
      System.out.printf("Eso no es el numero 12");
    } else {
      System.out.printf("Ese es el numero 12");
    }
  }
}
