package U2.T1.EJ4;

import java.util.Scanner;

public class Tarea6 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    double gravedad = 9.8;
    System.out.printf("Dime el tiempo para calcular la velocidad: ");
    double tiempo = sc.nextDouble();
    if (tiempo < 0) {
      System.out.printf("Tiempo incorrecto");
    } else {
      System.out.printf("La velocida es " + gravedad * tiempo);
    }
  }
}
