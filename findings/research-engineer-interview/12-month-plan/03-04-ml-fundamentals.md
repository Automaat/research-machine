# 📅 Months 3-4: ML Fundamentals Deep Dive (120-150 hours)

**Tags:** #career #ML #preparation #12-month-plan #ml-fundamentals

---

## 🎯 Goals

- Master classical ML with mathematical rigor
- Implement 10 algorithms from scratch
- Complete first Kaggle competition (top 25%)
- Understand optimization theory deeply

---

## 📆 Month 3: Classical ML with Math

### Linear Models (Derived)

- **Linear regression:** Closed-form solution derivation (normal equations)
- **Logistic regression:** Gradient derivation, cross-entropy from MLE
- **Regularization:** L1 vs L2, why L1 gives sparsity

### Tree-Based Methods (Theory)

- **Decision trees:** Entropy, information gain, Gini impurity proofs
- **Why trees overfit:** Complexity analysis
- **Pruning:** Theory and practice

### Support Vector Machines (Math)

- **Hard margin SVM:** Optimization problem formulation
- **Soft margin:** Slack variables
- **Kernel trick:** Mathematical foundation
- **Lagrangian duality** (important!)

### Model Selection

- **Bias-variance decomposition:** Derive it
- **Cross-validation:** Why it works
- **Regularization theory:** Connection to Bayesian priors

---

## 📆 Month 4: Advanced Classical + First Kaggle

### Ensemble Methods

- **Bagging:** Why it reduces variance (prove it)
- **Random forests:** Feature randomization theory
- **Boosting:** AdaBoost derivation
- **Gradient boosting:** Connection to gradient descent

### Dimensionality Reduction

- **PCA:** Eigenvector derivation, variance maximization proof
- **Kernel PCA:** Extension to non-linear
- **t-SNE:** How it works (high-level)

### Clustering

- **k-means:** Lloyd's algorithm, convergence proof
- **EM algorithm:** Derive for Gaussian mixture
- **Hierarchical:** Linkage criteria

### Kaggle Competition

- Choose tabular data competition
- Apply learned techniques
- Focus on feature engineering
- Target: top 25%

---

## 📚 Resources

| Topic | Resource | Link |
|-------|----------|------|
| ML Course | Andrew Ng's ML Specialization | [coursera.org/specializations/machine-learning-introduction](https://www.coursera.org/specializations/machine-learning-introduction) |
| ML Course | Stanford CS229 (YouTube) | [youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU](https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU) |
| ML Study Plan | Patrick Loeber | [github.com/patrickloeber/ml-study-plan](https://github.com/patrickloeber/ml-study-plan) |
| Algorithm Intuition | StatQuest | [statquest.org/video-index](https://statquest.org/video-index/) |
| Kaggle | Competitions | [kaggle.com/competitions](https://www.kaggle.com/competitions) |

### 📖 Books

- **"Pattern Recognition and Machine Learning"** - Bishop (selected chapters)
- **"Hands-on Machine Learning"** - Géron (practical)
- **"Elements of Statistical Learning"** - Hastie et al. (free PDF, advanced)

---

## 🎬 YouTube Watch List

### Month 3: Classical ML

1. **StatQuest** - Linear/Logistic Regression (with math)
2. **StatQuest** - Decision Trees, Random Forests
3. **StatQuest** - SVM series
4. **Stanford CS229** - Lecture on SVMs

### Month 4: Advanced

1. **StatQuest** - Gradient Boosting, XGBoost
2. **StatQuest** - PCA (mathematical)
3. **StatQuest** - k-means, clustering
4. **Kaggle Learn** - Feature engineering courses

---

## ✅ Milestones

### Month 3

- [ ] Derive linear regression closed-form solution
- [ ] Derive logistic regression gradient
- [ ] Implement 5 algorithms from scratch

### Month 4

- [ ] ✅ Implement 10 algorithms from scratch (total)
- [ ] ✅ Kaggle competition: top 25%
- [ ] ✅ Derive gradient descent convergence conditions

---

## 📝 10 Algorithms to Implement from Scratch

| # | Algorithm | Key Math to Derive |
|---|-----------|-------------------|
| 1 | Linear Regression | Normal equations |
| 2 | Logistic Regression | Cross-entropy gradient |
| 3 | Decision Tree | Information gain |
| 4 | Random Forest | Bagging variance reduction |
| 5 | k-NN | Distance metrics |
| 6 | k-Means | Convergence proof |
| 7 | PCA | Eigenvector solution |
| 8 | Naive Bayes | Bayes theorem application |
| 9 | SVM (soft margin) | Lagrangian formulation |
| 10 | Gradient Boosting | Functional gradient descent |

### Implementation Requirements

- No sklearn for core algorithm
- sklearn OK for data loading, metrics
- Include training + prediction
- Test on real dataset
- Document the math

---

## 📝 Self-Assessment Checklist

**Theory:**

- [ ] Can derive normal equations on whiteboard
- [ ] Explain why L1 gives sparsity (geometrically)
- [ ] Know SVM dual formulation
- [ ] Can prove PCA maximizes variance
- [ ] Understand bias-variance decomposition

**Practical:**

- [ ] 10 algorithms implemented
- [ ] Kaggle competition completed
- [ ] Can debug ML pipeline issues
- [ ] Know when to use which algorithm

---

## 🔗 Implementation References

- [ML from Scratch](https://github.com/eriklindernoren/ML-From-Scratch) - Compare after implementing
- [Scikit-learn source](https://github.com/scikit-learn/scikit-learn) - See production implementations

---

**Navigation:** [[01-02-foundations|← Months 1-2]] | [[05-06-deep-learning|Months 5-6 →]]
