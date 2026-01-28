# 📅 Month 3: Deep Learning (80-100 hours)

**Tags:** #career #ML #preparation #month-3 #deep-learning

---

## 🎯 Goals

- Understand neural network fundamentals deeply
- Implement backpropagation from scratch
- Build and train CNNs and RNNs
- Complete first real deep learning project

---

## 📆 Week 1-2: Neural Network Fundamentals

### Architecture Basics

- Perceptrons and MLPs
- Layers, neurons, weights, biases
- Forward pass computation

### Activation Functions

- Sigmoid, tanh, ReLU, Leaky ReLU
- Why non-linearity matters
- Dying ReLU problem

### Backpropagation

- Computational graphs
- Chain rule application
- Gradient flow through layers
- **Implement from scratch** (NumPy only)

### Regularization

- Dropout (and why it works)
- Batch normalization
- Weight decay (L2 regularization)
- Early stopping

---

## 📆 Week 3-4: CNNs and RNNs

### Convolutional Neural Networks

- Convolution operation (filters, stride, padding)
- Pooling layers (max, average)
- Common architectures (LeNet, AlexNet concepts)
- Feature hierarchies

### Recurrent Neural Networks

- Sequence modeling motivation
- Vanilla RNN architecture
- Vanishing gradient problem
- LSTM and GRU (gating mechanisms)

### Practical Training

- Data augmentation
- Learning rate scheduling
- Batch size effects
- Transfer learning basics

---

## 📚 Resources

| Topic | Resource | Link |
|-------|----------|------|
| Course (Primary) | fast.ai Practical Deep Learning | [fast.ai](https://www.fast.ai/) |
| Course | fast.ai Part 1 (2022) | [course.fast.ai](https://course.fast.ai/) |
| Tutorials | PyTorch Official Tutorials | [pytorch.org/tutorials](https://pytorch.org/tutorials/) |
| CNN Tutorial | PyTorch CNN Tutorial | [pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html) |
| Reference | Deep Learning Book (Goodfellow) | [deeplearningbook.org](https://www.deeplearningbook.org/) - Ch 6-10 |

### 📖 Book Chapters

**"Hands-on Machine Learning"** (Géron) - Chapters 10-15
**"Deep Learning"** (Goodfellow) - Chapters 6-10 (for theory depth)

---

## 🎬 YouTube Watch List

### Week 1-2: Fundamentals

1. **Andrej Karpathy** - micrograd (build backprop from scratch) ⭐
2. **Andrej Karpathy** - makemore Part 1-2
3. **3Blue1Brown** - Neural Networks Ch 1-4

### Week 3-4: Architectures

1. **Andrej Karpathy** - makemore Part 3-5 (BatchNorm, advanced)
2. **Stanford CS231n** - CNN lectures
3. **fast.ai** - Lessons 1-4

---

## ✅ Milestone

**Train CNN on CIFAR-10, achieve >85% accuracy**

### Project Requirements

- Build CNN architecture from scratch (PyTorch)
- Implement proper train/val/test split
- Use data augmentation
- Track training curves (loss, accuracy)
- Experiment with hyperparameters

### Suggested Architecture

```text
Conv2d → ReLU → MaxPool →
Conv2d → ReLU → MaxPool →
Flatten → Linear → ReLU → Dropout →
Linear → Softmax
```text

---

## 📝 Self-Assessment Checklist

- [ ] Can implement forward/backward pass manually
- [ ] Understand gradient flow through each layer type
- [ ] Know why BatchNorm helps training
- [ ] Can explain dropout mathematically
- [ ] Understand convolution output dimensions
- [ ] Know LSTM gating mechanism
- [ ] Can debug common training issues (loss not decreasing, etc.)

---

## 🔧 Common Debugging Issues

| Symptom | Likely Cause |
|---------|--------------|
| Loss not decreasing | Learning rate too high/low, data issue |
| Loss NaN | Numerical instability, gradient explosion |
| Validation loss increasing | Overfitting, need regularization |
| Training very slow | Batch size too small, not using GPU |
| Accuracy stuck at random | Labels shuffled wrong, architecture issue |

---

## 🔗 Code References

- [micrograd](https://github.com/karpathy/micrograd) - Tiny autograd engine
- [PyTorch CIFAR10 example](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html)

---

**Navigation:** [[02-month-2-ml-fundamentals|← Month 2]] | [[04-month-4-transformers|Month 4 →]]
