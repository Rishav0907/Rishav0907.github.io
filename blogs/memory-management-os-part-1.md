# Memory Management in OS Part 1

## Abstract View of Memory, Memory Addressing, Linking and Loading

*CS-101 is a series covering core Computer Science concepts — from Operating Systems and databases to theory of computation and computer networks.*

---

Memory Management in Operating Systems refers to the working of RAM alongside the CPU, and how processes are allocated and deallocated. There are two broad categories:

- **Contiguous Memory Management**
- **Non-Contiguous Memory Management**

Before diving into these techniques, we need to clear up some foundational concepts: how memory looks logically, how addressing works, and how linking and loading are performed.

---

## 1. Abstract View of Memory

You've probably heard of 32-bit or 64-bit CPUs. If a CPU is 32-bit, it means the CPU can request and fetch 32 bits of data from main memory in a single operation. The same applies to 64-bit CPUs.

```
CPU  ──[address]──▶  RAM
CPU  ◀──[data]────  RAM
```

The CPU sends an address to RAM, and RAM returns the data stored at that address. The chunk of data fetched in one go is called a **word**:

- 32-bit CPU → 1 word = 32 bits
- 64-bit CPU → 1 word = 64 bits

---

## 2. Memory Addressing

The address sent to RAM is in binary. The number of bits needed to address all words in memory depends on the total word count.

**Example 1:**

```
N = 16 words
Bits needed = 4   (because 2⁴ = 16)
```

**Example 2:**

```
N = 256 words
Bits needed = 8   (because 2⁸ = 256)
```

**Example 3:**

```
Total memory = 4 GB, 1 word = 1 Byte  →  8-bit processor
Number of words = 4 GW = 4 × 2³⁰ = 2³² words
Bits needed = 32
```

This is why a 32-bit processor can address at most 4 GB of RAM — it has exactly 32 bits to encode memory addresses.

---

## 3. Loading and Linking

After a program is compiled into machine language, the OS performs **Loading** and **Linking**.

### Loading

A program can have multiple **modules** — think of each function as a module. A program with `main()`, `func1()`, and `func2()` has three modules.

#### a) Static Loading

All modules are loaded into memory **before runtime**.

Drawbacks:
- Poor memory utilization — a module loaded under a rarely-triggered `if` condition wastes space
- Program size becomes large
- Reduces the degree of multiprocessing

#### b) Dynamic Loading

Only the **currently needed** modules are loaded. Everything else is deallocated when not in use.

- ✅ Efficient memory utilization
- ❌ Slightly slower execution speed

Dynamic loading is preferred in modern systems.

---

### Linking

Consider a simple program:

```c
main() {           f() {
  ------             ------
  ------             ------
  f();             }
  ------
}
```

When `main()` calls `f()`, the compiled machine instruction is **BSA (Branch and Save return address)**. BSA needs to know the address of `f()` to jump to it, and also saves the return address so execution can resume in `main()` after `f()` completes.

**Linking** is the process of filling in that address parameter of BSA.

#### a) Static Linking

Both the calling and called functions are compiled together into a **single machine-level program**. The address in BSA is filled **before runtime**.

Alternatively, functions can be compiled separately and loaded into memory — a linker then fills in the addresses after loading.

- ✅ Very fast execution
- ❌ Requires static loading; poor memory utilization

#### b) Dynamic Linking

When execution reaches the BSA instruction at runtime:

1. The **loader** is called
2. The called module is loaded into memory
3. The **linker** fills in the address in BSA

- ✅ Highly memory efficient
- ❌ Slower than static linking

Dynamic linking is the most commonly used method in modern operating systems.

---