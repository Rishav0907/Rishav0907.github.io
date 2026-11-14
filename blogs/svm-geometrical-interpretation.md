# Support Vector Machines — Geometrical Interpretation

SVMs are one of the most popular machine learning techniques, usable for both classification and regression. They gained popularity in the 1990s. In short, an SVM is a supervised model that uses a **hyperplane** to separate two classes — and its objective is to **maximize the distance** between the positive and negative points.

---

## 1. Introduction

Consider a dataset that is linearly separable. Multiple hyperplanes can separate the two classes, but which one should we prefer?

Take two candidate hyperplanes π₁ and π₂:

- If we choose **π₁**, many points sit very close to it. A small change in the hyperplane could misclassify them.
- Points closer to the hyperplane have **lower confidence** of belonging to their class.

**Example:**
```
Point close to π₁   → probability of belonging to class: 0.55
Point far from π₁   → probability of belonging to class: 0.90
```

The farther a point is from the decision boundary, the more confidently it belongs to its class.

So we prefer **π₂** — the hyperplane that keeps positive and negative points as far apart as possible. This is called a **margin-maximizing hyperplane**.

---

## 2. Margin Maximizing Hyperplane

Starting from the separating hyperplane π, draw parallel hyperplanes outward until:

- **π⁺** — the first parallel plane that touches the nearest **positive** point
- **π⁻** — the first parallel plane that touches the nearest **negative** point

The points lying exactly on π⁺ and π⁻ are called **support vectors** — they are the only points that matter for defining the hyperplane.

The distance between π⁺ and π⁻ is called the **margin** `d`.

```
SVM objective: maximize d = dist(π⁺, π⁻)
```

**Why maximizing the margin helps:**

```
margin increases  →  misclassification decreases  →  generalization accuracy increases
```

A wider margin means the model is more robust to unseen data — the core intuition behind why SVMs generalize well.

---


*Next: Hard Margin SVM — the mathematical formulation behind this geometric intuition.*