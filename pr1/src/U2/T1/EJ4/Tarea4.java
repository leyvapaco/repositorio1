package U2.T1.EJ4;

import java.util.Scanner;

public class Tarea4 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.printf("Escribe dos numeros: ");
    int x = sc.nextInt();
    int i = sc.nextInt();
    if ((x % 2 == 0) && (i % 2 == 0)) {
      System.out.printf("Ambos son pares");
    } else if ((x % 2 != 0 && i % 2 != 0)) {
      System.out.printf("Los dos son impares");
    } else if ((x % 2 == 0 || i % 2 != 0) || (x % 2 != 0 || i % 2 == 0)) {
      System.out.printf("Uno de ellos es impar");
    }
  }
}
