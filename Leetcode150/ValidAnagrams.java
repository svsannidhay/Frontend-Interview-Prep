package Leetcode150;

import java.util.Scanner;

public class ValidAnagrams {
    public boolean isAnagramUsingFrequencyArrat(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] freq = new int[100];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--; 
        }

        for (int count: freq) {
            if (count != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        ValidAnagrams solution = new ValidAnagrams();
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine();
        String t = scanner.nextLine();

        System.out.println(s + " " + t + " " + solution.isAnagramUsingFrequencyArrat(s, t));
    }
}