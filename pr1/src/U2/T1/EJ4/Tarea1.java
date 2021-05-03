package U2.T1.EJ4;

import java.util.Scanner;

public class Tarea1 {
  public static void main(String[] args) {
    Scanner teclado = new Scanner(System.in);
    System.out.print("Escribe un numero: ");
    int x = teclado.nextInt();

    if (x > 0) {
      System.out.println("Es positivo");

    } else {
      System.out.println("No es positivo, es negativo");
    }
  }
}
