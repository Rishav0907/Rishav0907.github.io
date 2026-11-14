# Unlocking the Power of ReLU: Why It Reigns Supreme Over Sigmoid and Tanh

As you read this, I'm assuming you have some general knowledge of perceptrons, multilayer perceptrons, and neural networks — so the phrase "activation function" has probably already come up. The main goal of this post is to explain why, mathematically speaking, modern neural networks use ReLU rather than sigmoid or tanh.

In the 1980s and 1990s, researchers were mostly using sigmoid or tanh for perceptrons and multilayer perceptrons. Then there was a paradigm shift, and ReLU became the default activation function in most neural networks. Before we can understand why, we need to look at sigmoid and tanh first.

---

## Sigmoid Activation Function

The sigmoid activation function is denoted by σ and defined as:

```
σ(z) = 1 / (1 + e^(-z))
```

Its derivative is:

```
σ'(z) = σ(z) · (1 − σ(z))
```

A fun fact: we can compute the derivative of sigmoid using itself — so σ(z) can be reused for both forward propagation and backpropagation.

**Key properties:**
- Min value: 0
- Max value: 1
- Maximum derivative value: **0.25**

The sigmoid function is popular because its derivative can be expressed purely in terms of itself. However, that maximum derivative of 0.25 turns out to be its biggest weakness.

---

## Tanh Activation Function

Tanh gained popularity alongside sigmoid in the 1990s. It is defined as:

```
tanh(z) = (e^z − e^(−z)) / (e^z + e^(−z))
```

Its derivative is:

```
tanh'(z) = 1 − tanh²(z)
```

Just like sigmoid, the derivative of tanh can be expressed using the tanh function itself.

**Key properties:**
- Range: −1 to 1
- Maximum derivative value: **1**

Both sigmoid and tanh suffer from a problem known as the **vanishing gradient problem** — and in certain circumstances, sigmoid can also trigger the **exploding gradient problem**.

---

## The Vanishing Gradient Problem

The vanishing gradient problem was one of the biggest obstacles in deep learning during the 80s and 90s. Here's the mathematical intuition.

Consider a neural network with weights W. When we update a weight using backpropagation, we compute a chain of partial derivatives. For a 3-layer network, the chain rule gives us something like:

```
∂L/∂W = (∂O₃/∂O₂) · (∂O₂/∂O₁) · (∂O₁/∂W)
```

Since each term in that chain is a derivative of sigmoid — and sigmoid's derivative can **never exceed 0.25** — each term is ≤ 0.25.

For example:

```
0.2 × 0.1 × 0.05 = 0.001
```

This means the weight update `W_new = W_old − α · (∂L/∂W)` results in a `W_new` that is almost identical to `W_old`. In a 3-layer network this is already tiny. In a 10-layer network, the difference becomes vanishingly small — hence the name.

We spend enormous computational power calculating derivatives that change almost nothing. That is the **vanishing gradient problem**.

---

## The Exploding Gradient Problem

The name makes sense once you understand the vanishing counterpart. An exploding gradient problem occurs when derivative values are **significantly greater than 1**, causing weight updates to diverge wildly at each epoch. We never converge — meaning the new and old weights never stabilize.

While this doesn't typically arise with sigmoid, it can under certain weight initialization conditions.

---

## ReLU — Rectified Linear Units

Now the interesting part. ReLU is defined as:

```
f(z) = max(0, z)
```

Or equivalently:

```
f(z) = z  if z > 0
f(z) = 0  if z ≤ 0
```

The graph is a straight line at 45° in the positive quadrant (points like (1,1), (2,2), …) and flat zero for all negative inputs.

**The derivative of ReLU is beautifully simple:**

```
f'(z) = 1  if z > 0
f'(z) = 0  if z ≤ 0
```

Because the derivative of ReLU is either **0 or 1** — never a fraction, never an exponentially large number — it sidesteps both the vanishing and exploding gradient problems entirely.

---

## The Dead Activation Problem

ReLU isn't perfect. If a derivative turns 0 (i.e., z ≤ 0), the weight update becomes zero and that neuron stops learning. This is called the **dead activation problem**.

The fix is **Leaky ReLU**:

```
f(z) = z      if z > 0
f(z) = α·z   if z ≤ 0  (where α is a very small constant, e.g. 0.001)
```

By using a small non-zero slope for negative inputs, we avoid dead activations — though we reintroduce a tiny risk of vanishing gradients. The tradeoff is worth it in most cases.

---

## Summary

| Property | Sigmoid | Tanh | ReLU |
|---|---|---|---|
| Output range | (0, 1) | (−1, 1) | (0, ∞) |
| Max derivative | 0.25 | 1.0 | 1 |
| Vanishing gradient | Yes | Yes | No |
| Exploding gradient | Possible | Rare | No |
| Dead activation | No | No | Possible |
| Computational cost | High | High | Low |

ReLU's combination of a simple derivative (0 or 1), low computational cost, and immunity to vanishing/exploding gradients is why it became — and remains — the default activation function in modern deep neural networks.