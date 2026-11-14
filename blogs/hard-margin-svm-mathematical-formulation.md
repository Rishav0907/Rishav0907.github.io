# Hard Margin SVM — Mathematical Formulation

If you haven't read the [geometrical interpretation of SVM](svm-geometrical-interpretation.md) yet, that's a good place to start. Once the geometry is clear, the mathematics follows naturally.

Understanding the internal math of any ML model lets you adapt and extend it to your own requirements. So let's work through the Hard Margin SVM derivation in detail.

---

## Setup

Assume we have linearly separable data with a separating hyperplane π and two margin hyperplanes π⁺ and π⁻.

**Equation of the separating hyperplane π:**

```
W^T · X + b = 0
```

> `W` is the weight vector (not necessarily a unit vector), `b` is the bias.

We define the margin hyperplanes as:

```
π⁺:  W^T · X + b = +1
π⁻:  W^T · X + b = -1
```

The choice of +1 and -1 is a convention — the values can be scaled arbitrarily, and the formulation still holds. What matters is the **ratio**, not the absolute values.

---

## Computing the Margin

The distance from a point P to a hyperplane is:

```
distance = |W^T · P + b| / ||W||
```

Distance from **π⁺ to π**:

```
|W^T · X + b| / ||W|| = 1 / ||W||
```

By symmetry, the distance from **π⁻ to π** is also `1 / ||W||`.

Therefore:

```
margin  d = 2 / ||W||
```

---

## Optimization Objective

We want to **maximize** the margin `d = 2 / ||W||`, which is equivalent to **minimizing** `||W||`:

```
maximize  2 / ||W||
  ⟺
minimize  ||W||
  ⟺
minimize  (1/2) · ||W||²     ← convenient for differentiation
```

---

## The Constraint

All positive points must lie on or above π⁺, and all negative points on or below π⁻. This gives us the constraint:

```
y_i · (W^T · X_i + b) ≥ 1    for all i
```

**Why this works — two cases:**

**Case a — support vector on π⁺:**
- `y_i = +1` (positive class)
- `W^T · X + b = +1`
- Product: `(+1)(+1) = +1` ✓

**Case b — support vector on π⁻:**
- `y_i = -1` (negative class)
- `W^T · X + b = -1`
- Product: `(-1)(-1) = +1` ✓

**For any non-support-vector point:**
- Positive point above π⁺: `W^T · X + b > +1`, so `y_i(W^T · X + b) > 1` ✓
- Negative point below π⁻: `W^T · X + b < -1`, so `y_i(W^T · X + b) > 1` ✓

---

## Full Optimization Problem

```
minimize    (1/2) · ||W||²

subject to  y_i · (W^T · X_i + b) ≥ 1    ∀ i
```

This is a **constrained quadratic optimization problem** — solvable via the method of Lagrange multipliers (which leads to the dual formulation and eventually kernel SVMs).

---

## Limitation — Why "Hard" Margin?

This formulation **only works when data is perfectly linearly separable**. If even a single point falls on the wrong side of its margin hyperplane, the constraint is violated and no solution exists.

This is why it's called **Hard Margin SVM** — there is zero tolerance for constraint violations.

For real-world data that is noisy or only approximately separable, we need **Soft Margin SVM**, which introduces slack variables to allow controlled constraint violations.

---