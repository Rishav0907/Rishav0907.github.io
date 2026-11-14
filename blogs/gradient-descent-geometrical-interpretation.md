# Gradient Descent — Geometrical Interpretation

One of the most critical tasks in Computer Science, Machine Learning, and computation in general is to **optimize solutions**. Gradient Descent is one such computational technique — and the good thing is that the intuition behind it is surprisingly simple.

---

## Prerequisites

To understand the underlying mathematics, you'll need:

- Differentiation and Integration
- Maxima and Minima
- Vector Differentiation (a basic understanding is enough)

---

## Why Do We Need Gradient Descent?

Consider the **logistic loss with regularization**:

```
L(W) = Σ log(1 + exp(-y_i · W^T · x_i)) + λ · ||W||²
```

Here `x_i` and `y_i` are constants (they come from the dataset), so `L` is purely a function of `W`. To find the minimum we need to compute the vector derivative of `L` with respect to `W`.

Breaking it into two parts:

**Part 2** — the regularization term:

```
If W is scalar:  d/dW (λW²) = 2λW
Vector equivalent:  ∇_W (λ||W||²) = 2λW
```

**Part 1** — the loss term, using the chain rule:

```
∇_W L₁ = Σ [ -y_i · x_i · σ(-y_i · W^T · x_i) ]

where σ is the sigmoid function
```

**Combined gradient:**

```
∇_W L = Σ [ -y_i · x_i · σ(-y_i · W^T · x_i) ] + 2λW
```

This closed-form solution is extremely hard to solve analytically. That's exactly why we use computational methods like **Gradient Descent**.

---

## Geometric Interpretation

Gradient Descent is an **iterative algorithm**. Here's how it works conceptually:

We want to find:

```
x* = argmin f(x)
```

We don't start there — we start at a random point and move toward it step by step.

```
x₀  →  x₁  →  x₂  →  ...  →  x_k  ≈  x*
```

Before seeing the algorithm, two key geometric observations:

- In the **positive quadrant** (right of minimum), the slope `df/dx > 0`
- In the **negative quadrant** (left of minimum), the slope `df/dx < 0`
- `min f(x) = -max(-f(x))` — minimization and maximization are equivalent under negation

---

## Working of the Gradient Descent Algorithm

**Step 1** — Pick a random starting point `x₀`

**Step 2** — Compute the next point:

```
x₁ = x₀ - r · (df/dx)|_{x₀}
```

where `r` is the **step size (learning rate)**.

**Why this works geometrically:**

- If `x₀` is to the right of `x*` → slope is **positive** → `x₁ = x₀ - (+ve)` → shifts **left**, closer to `x*`
- If `x₀` is to the left of `x*` → slope is **negative** → `x₁ = x₀ - (-ve)` → shifts **right**, closer to `x*`

**General update rule:**

```
x_{k+1} = x_k - r · (df/dx)|_{x_k}
```

**Termination condition:**

```
if |x_{k+1} - x_k| < ε  →  stop, return x* = x_k
```

At each iteration we are reducing the magnitude of the slope — driving it toward zero, which is exactly the condition at a minimum.

---

## The Problem with a Fixed Step Size

Keeping `r` constant can cause **oscillation**. Consider `f(x) = x²` and suppose after some iterations we reach `x_i = 0.5` with `r = 1`:

```
x_{i+1} = 0.5 - 1 · f'(0.5) = 0.5 - 1·(1) = -0.5
x_{i+2} = -0.5 - 1 · f'(-0.5) = -0.5 - 1·(-1) = +0.5
x_{i+3} = -0.5
x_{i+4} = +0.5
...
```

The algorithm gets stuck oscillating between `-0.5` and `+0.5`, never converging to `x* = 0`.

**Solution:** Make `r` dynamic — **reduce the step size with each iteration**.

```
r_k = r₀ / (1 + decay · k)
```

A smaller step size near the minimum prevents overshooting and allows the algorithm to converge.


Gradient Descent is the backbone of nearly every modern machine learning optimization — from linear regression to training deep neural networks.