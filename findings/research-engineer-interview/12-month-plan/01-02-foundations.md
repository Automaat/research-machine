# 📅 Months 1-2: Deep Foundations (120-150 hours)

**Tags:** #career #ML #preparation #12-month-plan #foundations

---

## 🎯 Goals

- Build rigorous math foundations (not just intuition)
- Master Python ML stack with deep understanding
- Implement neural network from scratch (NumPy only)
- Derive backpropagation equations by hand

---

## 📆 Month 1: Mathematics with Rigor

### Linear Algebra (Deep)
- Vectors, matrices with proofs
- Eigenvalues, eigenvectors (derivations)
- Matrix decompositions (SVD, QR)
- Geometric interpretations

### Calculus (Deep)
- Multivariate calculus
- Chain rule derivations
- Jacobians, Hessians
- Optimization theory basics

### Probability Theory
- Probability distributions (continuous & discrete)
- Bayes theorem (derive from first principles)
- Information theory basics (entropy, KL divergence)
- Maximum likelihood estimation

### Statistics
- Hypothesis testing
- Confidence intervals
- Statistical significance
- Experimental design basics

---

## 📆 Month 2: Python ML Stack + First Implementations

### NumPy Mastery
- Internals: how arrays work in memory
- Broadcasting rules (know them cold)
- Advanced indexing
- Vectorization patterns

### From-Scratch Implementations
- Matrix multiplication
- Gradient computation
- Simple optimization (gradient descent)

### Neural Network from Scratch
- Forward pass implementation
- Backward pass (backpropagation)
- **No frameworks allowed** - pure NumPy

### PyTorch Foundations
- Tensor operations
- einsum mastery
- Autograd understanding
- Custom modules

---

## 📚 Resources

| Topic | Resource | Link |
|-------|----------|------|
| Linear Algebra | Gilbert Strang MIT OCW | [ocw.mit.edu/courses/18-06](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) |
| Linear Algebra | 3Blue1Brown Essence of LA | [3blue1brown.com/topics/linear-algebra](https://www.3blue1brown.com/topics/linear-algebra) |
| Calculus | Khan Academy Multivariable | [khanacademy.org/math/multivariable-calculus](https://www.khanacademy.org/math/multivariable-calculus) |
| Calculus | 3Blue1Brown Essence of Calculus | [3blue1brown.com/topics/calculus](https://www.3blue1brown.com/topics/calculus) |
| Probability | Khan Academy Stats & Prob | [khanacademy.org/math/statistics-probability](https://www.khanacademy.org/math/statistics-probability) |
| Info Theory | Colah's Blog | [colah.github.io](https://colah.github.io/) |
| NumPy | Official Beginners Guide | [numpy.org/doc/stable/user/absolute_beginners.html](https://numpy.org/doc/stable/user/absolute_beginners.html) |
| NumPy | Stanford CS231n Tutorial | [cs231n.github.io/python-numpy-tutorial](https://cs231n.github.io/python-numpy-tutorial/) |
| PyTorch | Sasha Rush Tensor Puzzles | [github.com/srush/Tensor-Puzzles](https://github.com/srush/Tensor-Puzzles) |
| PyTorch | Official Tutorials | [docs.pytorch.org/tutorials](https://docs.pytorch.org/tutorials/) |

### 📖 Books

- **"Linear Algebra Done Right"** - Axler (for proofs)
- **"Mathematics for Machine Learning"** - Deisenroth (free PDF)
- **"Pattern Recognition and Machine Learning"** - Bishop, Ch 1-2

---

## 🎬 YouTube Watch List

### Month 1: Math
1. **Gilbert Strang** - MIT Linear Algebra (selected lectures)
2. **3Blue1Brown** - Essence of Linear Algebra (complete)
3. **3Blue1Brown** - Essence of Calculus (complete)
4. **StatQuest** - Probability & Statistics fundamentals

### Month 2: Implementation
1. **Andrej Karpathy** - micrograd ⭐ (watch after building yours)
2. **3Blue1Brown** - Neural Networks Ch 1-4
3. Work through Tensor Puzzles

---

## ✅ Milestones

### Month 1
- [ ] Can prove matrix properties
- [ ] Derive chain rule for multivariate functions
- [ ] Explain Bayes theorem with examples
- [ ] Understand KL divergence geometrically

### Month 2
- [ ] ✅ Implement neural network from scratch (NumPy only)
- [ ] ✅ Complete Sasha Rush Tensor Puzzles
- [ ] ✅ Derive backprop equations by hand

---

## 📝 Neural Network from Scratch Requirements

Build a 2-layer neural network that can:
- Classify MNIST digits
- Use only NumPy (no PyTorch/TensorFlow)
- Implement forward pass
- Implement backward pass (derive gradients yourself)
- Train with SGD
- Achieve >90% accuracy

### Code Structure
```python
class NeuralNetwork:
    def __init__(self, layer_sizes):
        # Initialize weights

    def forward(self, X):
        # Compute activations

    def backward(self, X, y, output):
        # Compute gradients

    def update(self, learning_rate):
        # SGD update

    def train(self, X, y, epochs, lr):
        # Training loop
```

---

## 📝 Self-Assessment Checklist

**Math:**
- [ ] Can derive eigenvalue decomposition
- [ ] Understand SVD geometrically and algebraically
- [ ] Can compute gradients of complex functions
- [ ] Know chain rule for matrices (Jacobians)
- [ ] Can derive Bayes theorem from scratch
- [ ] Understand MLE derivation

**Implementation:**
- [ ] Know NumPy broadcasting rules without looking up
- [ ] Can implement matrix operations efficiently
- [ ] Built working neural network (NumPy only)
- [ ] Completed Tensor Puzzles
- [ ] Can write backprop equations on whiteboard

---

## 🔗 Implementation References

- [micrograd](https://github.com/karpathy/micrograd) - Study AFTER building yours
- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) - Free online book

---

**Navigation:** [[00-overview|← Overview]] | [[03-04-ml-fundamentals|Months 3-4 →]]
