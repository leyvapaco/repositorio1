package U2.T1.EJ4;

import java.util.Scanner;

public class Tarea5 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.printf("Escribe tres numeros distintos: ");
    long x = sc.nextLong();
    long i = sc.nextLong();
    long j = sc.nextLong();
    if (x > i && x > j) {
      System.out.printf("El " + x + " es el mayor de los tres");
    } else if (i > x && i > j) {
      System.out.printf("El " + i + " es el mayor de los tres");
    } else if (j > x && j > i) {
      System.out.printf("El " + j + " es el mayor de los tres");
    }
  }
}
