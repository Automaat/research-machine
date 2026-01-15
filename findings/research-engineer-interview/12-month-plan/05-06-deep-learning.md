# 📅 Months 5-6: Deep Learning Mastery (120-150 hours)

**Tags:** #career #ML #preparation #12-month-plan #deep-learning

---

## 🎯 Goals

- Deep understanding of neural network theory
- Master CNN and RNN architectures
- Implement LSTM from scratch
- Complete end-to-end deep learning project
- Achieve >90% on CIFAR-10

---

## 📆 Month 5: Neural Networks Deep Dive

### Theory Foundations
- **Universal approximation theorem:** What it means, limitations
- **Expressiveness vs learnability:** Why depth matters
- **Loss landscapes:** Local minima, saddle points

### Backpropagation Deep Dive
- Computational graphs formalism
- Automatic differentiation (forward vs reverse mode)
- Gradient flow analysis
- Numerical gradient checking

### Optimization Theory
- **SGD:** Convergence analysis
- **Momentum:** Physical intuition + math
- **Adam:** Adaptive learning rates, why it works
- **Learning rate schedules:** Warmup, decay, cyclical

### Regularization Theory
- **Dropout:** Bayesian interpretation, co-adaptation
- **Batch normalization:** Internal covariate shift debate
- **Weight decay:** Connection to L2, decoupled weight decay
- **Data augmentation:** As implicit regularization

---

## 📆 Month 6: Architectures

### Convolutional Neural Networks
- Convolution math: cross-correlation, stride, padding
- Receptive fields: calculation, importance
- Pooling: max vs average, when to use
- **Modern architectures:** ResNet (skip connections), EfficientNet

### Recurrent Neural Networks
- Vanishing/exploding gradients: mathematical analysis
- **LSTM:** Gating mechanisms, gradient flow
- **GRU:** Simplified gating
- Bidirectional RNNs
- Sequence-to-sequence basics

### Attention Preview
- Attention as soft addressing
- Bahdanau attention (RNN context)
- Setup for transformers

### Project: CV or NLP
- Choose one domain
- End-to-end project
- Proper evaluation

---

## 📚 Resources

| Topic | Resource | Link |
|-------|----------|------|
| Course | fast.ai Practical Deep Learning | [course.fast.ai](https://course.fast.ai/) |
| Course | Stanford CS231n | [youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv](https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv) |
| Tutorials | PyTorch Official | [pytorch.org/tutorials](https://pytorch.org/tutorials/) |
| ResNet Paper | Deep Residual Learning | [arxiv.org/abs/1512.03385](https://arxiv.org/abs/1512.03385) |
| LSTM | Colah's Blog | [colah.github.io/posts/2015-08-Understanding-LSTMs](https://colah.github.io/posts/2015-08-Understanding-LSTMs/) |

### 📖 Books

- **"Deep Learning"** - Goodfellow et al. (Chapters 6-10) - [deeplearningbook.org](https://www.deeplearningbook.org/)
- **"Hands-on Machine Learning"** - Géron (Chapters 10-15)

---

## 🎬 YouTube Watch List

### Month 5: Fundamentals
1. **Andrej Karpathy** - makemore Part 1-5 (all of them)
2. **3Blue1Brown** - Neural Networks Ch 1-4
3. **Stanford CS231n** - Optimization, Backprop lectures

### Month 6: Architectures
1. **Stanford CS231n** - CNN architecture lectures
2. **Colah's Blog** - Understanding LSTMs (read + watch explanations)
3. **fast.ai** - Full course (parallel with implementation)

---

## ✅ Milestones

### Month 5
- [ ] Can derive backprop for arbitrary computational graph
- [ ] Understand Adam optimizer mathematically
- [ ] Know dropout's Bayesian interpretation

### Month 6
- [ ] ✅ Train CNN on CIFAR-10: >90% accuracy
- [ ] ✅ Implement LSTM from scratch
- [ ] ✅ Complete one end-to-end DL project

---

## 📝 LSTM from Scratch Requirements

Implement LSTM cell with:
- Forget gate
- Input gate
- Output gate
- Cell state
- Hidden state

```python
class LSTMCell:
    def __init__(self, input_size, hidden_size):
        # Initialize weights for all gates

    def forward(self, x, h_prev, c_prev):
        # Compute all gates
        # Update cell state
        # Compute output
        return h_next, c_next
```

Train on:
- Character-level language modeling
- Simple sequence classification

---

## 📝 CIFAR-10 Project Requirements

Build CNN achieving >90% accuracy:

### Architecture Suggestions
```
Conv → BN → ReLU → Conv → BN → ReLU → MaxPool →
Conv → BN → ReLU → Conv → BN → ReLU → MaxPool →
Conv → BN → ReLU → Conv → BN → ReLU → MaxPool →
Flatten → FC → Dropout → FC → Softmax
```

### Must Include
- [ ] Data augmentation (RandomCrop, HorizontalFlip)
- [ ] Learning rate scheduling
- [ ] Training curves visualization
- [ ] Confusion matrix analysis
- [ ] Some ablation studies

---

## 📝 Self-Assessment Checklist

**Theory:**
- [ ] Can explain universal approximation theorem
- [ ] Know why ResNet skip connections help
- [ ] Understand LSTM gating mechanism
- [ ] Can derive backprop through LSTM
- [ ] Know BatchNorm training vs inference difference

**Practical:**
- [ ] CIFAR-10 >90% achieved
- [ ] LSTM implemented and working
- [ ] Can debug training issues systematically
- [ ] Comfortable with PyTorch

---

## 🔧 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Loss stuck | Check learning rate, try Adam |
| Overfitting | Add dropout, augmentation, reduce model |
| Underfitting | Increase model capacity, train longer |
| NaN loss | Reduce LR, check for division by zero |
| GPU OOM | Reduce batch size, use gradient accumulation |

---

**Navigation:** [[03-04-ml-fundamentals|← Months 3-4]] | [[07-08-transformers|Months 7-8 →]]
