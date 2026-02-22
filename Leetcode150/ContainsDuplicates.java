package Leetcode150;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Scanner;

class ContainsDuplicates {
    public boolean containsDuplicateHashMap(int[] nums) {
        HashMap<Integer, Integer> freq = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (freq.containsKey(nums[i])) {
                return true;
            } else {
                freq.put(nums[i], 1);
            }
        }
        return false;
    }

    class Solution {
        public boolean containsDuplicateHashSet(int[] nums) {
            HashSet<Integer> set = new HashSet<>();
            for (int i = 0; i < nums.length; i++) {
                if (set.contains(nums[i])) {
                    return true;
                }
                set.add(nums[i]);
            }
            return false;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ContainsDuplicates solution = new ContainsDuplicates();

        int n = scanner.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            int x = scanner.nextInt();
            nums[i] = x;
        }

        System.out.println(solution.containsDuplicateHashMap(nums));

        scanner.close();
    }

}
