# Natural Language Processing with Naive Bayes

NLP (Natural Language Processing) is the technology by which computers understand human language. Naive Bayes is one of the most effective algorithms for NLP — especially for text classification — and it outperforms many alternatives for this specific task.

This post is divided into two parts:

1. **Text Pre-processing**
2. **Naive Bayes**

---

## Part 1 — Text Pre-processing

### Why Pre-process?

Machine learning is fundamentally mathematical. Raw text like `"I want to be a Computer Scientist"` can't be fed directly into a mathematical model. We need to convert it into a **vector** so we can apply linear algebra operations on it.

There are several ways to convert text into vectors:

- **Bag of Words** ← covered here
- TF-IDF
- Word2Vec
- Average Word2Vec

---

### Bag of Words (BoW)

**Step 1 — Sample documents:**

```
d1: "Ubuntu is a great operating system for beginners"
d2: "Ubuntu is not a good operating system for beginners"
d3: "Ubuntu is an amazing operating system for beginners"
d4: "Ubuntu is the worst operating system for beginners"
```

**Step 2 — Build a dictionary of all unique words:**

```
{ Ubuntu, is, a, an, not, the, great, good, amazing, worst,
  operating, system, for, beginners }
```

14 unique words → 14-dimensional vector space.

**Step 3 — Vectorize each document:**

For `d1`, the vector value at each index = number of times that word appears in `d1`:

```
d1 = [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1]
      ↑                                           ↑
   "Ubuntu"                               "beginners"
```

> Note: `CountVectorizer` in scikit-learn ignores single-character words like `"a"`, so it may show 13 features instead of 14.

**Binary BoW** — a simpler variant that uses 1/0 (present/absent) instead of counts.

---

### Text Cleaning Techniques

#### a) Stop-word Removal

Stop words are common words that don't change the semantic meaning of a document when removed — `is`, `a`, `for`, `the`, etc.

```python
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
print(ENGLISH_STOP_WORDS)
```

#### b) Stemming

Words with the same root meaning are reduced to a single form:

```
"boring"  →  "bore"
"running" →  "run"
```

```python
from nltk.stem import PorterStemmer
ps = PorterStemmer()
ps.stem("boring")   # → "bore"
```

#### c) N-grams (Lemmatization)

Split documents into groups of words:

```
d1 uni-grams:  "Ubuntu", "is", "a", "great", "OS", "for", "beginners"
d1 bi-grams:   "Ubuntu is", "is a", "a great", "great OS", "OS for", "for beginners"
```

N-grams capture context that single-word representations miss.

---

## Part 2 — Naive Bayes

**Prerequisites:** Conditional probability, independent events, Bayes' theorem.

### Derivation

We want to find the class label `c` that maximizes the probability given a data point `x`:

```
c* = argmax P(c | x)
```

Applying Bayes' theorem:

```
P(c | x) = P(x | c) · P(c) / P(x)
```

Since `P(x)` is constant across classes, we maximize:

```
c* = argmax  P(x | c) · P(c)
```

For a feature vector `x = [x₁, x₂, ..., xₙ]`, computing `P(x | c)` exactly requires knowing the joint distribution of all features — computationally intractable.

**The Naive assumption** — assume **conditional independence** of features given the class:

```
P(x | c) = P(x₁ | c) · P(x₂ | c) · ... · P(xₙ | c)
         = ∏ P(xᵢ | c)
```

This is the "naive" part — it's rarely true in reality, but works surprisingly well in practice.

### Naive Bayes Classifier

```
c* = argmax  P(c) · ∏ P(xᵢ | c)
```

For each class:
1. Compute **prior** `P(c)` — fraction of training examples belonging to class `c`
2. Compute **likelihoods** `P(xᵢ | c)` — how often feature `xᵢ` appears in class `c`
3. Pick the class with the highest product

### Implementation in Python

```python
from sklearn.naive_bayes import GaussianNB

nb = GaussianNB()
nb.fit(X_train, y_train)
predictions = nb.predict(X_test)
```

---

## Bonus — Out-of-Core Naive Bayes

When the dataset is too large to fit in RAM, scikit-learn offers **Out-of-Core Naive Bayes**. The idea is similar to **External Merge Sort** — data is split into chunks that fit in memory, processed individually, and merged. This is a beautiful intersection of classical algorithms and machine learning.

```python
from sklearn.naive_bayes import MultinomialNB

nb = MultinomialNB()
for chunk in data_chunks:
    nb.partial_fit(chunk_X, chunk_y, classes=all_classes)
```

---