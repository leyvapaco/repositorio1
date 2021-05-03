package U2.T1.EJ4;

import java.util.Scanner;

public class Tarea3 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.printf("Escribe un numero ");
    int x = sc.nextInt();
    if (x % 2 == 0) {
      System.out.printf("Es par");
    } else {
      System.out.printf("Es impar");
    }
  }
}
