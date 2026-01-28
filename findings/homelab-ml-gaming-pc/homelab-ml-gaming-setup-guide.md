# 🖥️ Homelab PC for ML Training, LLM Inference, Whisper & Gaming

**Date:** 2025-01-08
**Tags:** #homelab #ML #LLM #gaming #GPU #hardware
**Focus:** Multi-purpose workstation setup

---

## 🎯 Key Findings Summary

- **Best GPU:** RTX 4090 (24GB) - ideal balance of ML + gaming performance
- **Best Value:** Used RTX 3090 ($800-900) - same 24GB VRAM at lower cost
- **Architecture Choice:** GPU passthrough VM > dual boot for flexibility
- **Software:** NVIDIA + CUDA ecosystem strongly recommended over AMD ROCm

---

## 🔧 Hardware Recommendations

### GPU Selection

| GPU | VRAM | Price | ML Performance | Gaming | Recommendation |
|-----|------|-------|----------------|--------|----------------|
| **RTX 4090** | 24GB | ~$1,600 | 128 tok/s (8B) | Excellent | 🏆 Best overall |
| **RTX 3090 (used)** | 24GB | $800-900 | 112 tok/s (8B) | Great | 💰 Best value |
| **RTX 5090** | 32GB | ~$2,500 | TBD | Excellent | 🔮 Future-proof |
| **RX 7900 XTX** | 24GB | $900-1000 | Competitive | Good | ⚠️ ROCm issues |

**📄 STATED:** "RTX 4090 delivers 128 tokens/second on 8B models" [Source: [BIZON](https://bizon-tech.com/blog/best-gpu-llm-training-inference)]

**📄 STATED:** "Used RTX 3090 offers exceptional value in the used market at $800-900" [Source: [LocalLLM.in](https://localllm.in/blog/best-gpus-llm-inference-2025)]

### VRAM Requirements by Workload

| Task | Minimum | Recommended | Notes |
|------|---------|-------------|-------|
| **LLM 7-13B models** | 8GB | 16GB+ | Consumer GPUs sufficient |
| **LLM 70B (4-bit quant)** | 24GB | 48GB (dual) | Requires layer offloading |
| **Whisper Large** | 10GB | 12GB+ | 4.7GB with faster-whisper |
| **ML Training** | 16GB | 24GB | Depends on batch size |
| **Gaming 4K** | 12GB | 16GB+ | Modern titles |

**📄 STATED:** "The largest Whisper model requires approximately 10GB of VRAM" [Source: [Tom's Hardware](https://www.tomshardware.com/news/whisper-audio-transcription-gpus-benchmarked)]

**📄 STATED:** "faster-whisper implementation dropped this to 4.7 GB. Further quantization to INT8 reduced memory to just 3.1 GB" [Source: [Tom's Hardware](https://www.tomshardware.com/news/whisper-audio-transcription-gpus-benchmarked)]

### System Specs

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **CPU** | 6-core | 8-12 core (AMD Ryzen 7/9) |
| **RAM** | 32GB | 64GB DDR5 |
| **Storage** | 1TB NVMe | 2TB+ NVMe (models large) |
| **PSU** | 850W 80+ Gold | 1000W+ (dual GPU) |
| **Motherboard** | PCIe 4.0 x16 | IOMMU support essential |

**📄 STATED:** "A modern 6–8 core processor (Intel Core i5/i7 or AMD Ryzen 5/7) provides adequate performance for most scenarios" [Source: [LocalLLM.in](https://localllm.in/blog/best-gpus-llm-inference-2025)]

---

## 🎮 Architecture Options

### Option 1: GPU Passthrough VM (Recommended ✅)

**Setup:** Linux host + Windows VM with dedicated GPU

**Pros:**
- 🔄 Switch between ML (Linux) and gaming (Windows VM) without reboot
- 🔒 Windows isolated in VM (security/privacy)
- 📸 ZFS snapshots, encryption options
- 🖥️ Looking Glass for single-monitor setup

**Cons:**
- ⚙️ Complex initial setup (VFIO, IOMMU groups)
- 🎮 Anti-cheat may detect/ban VM players
- 🔧 Some performance overhead (~5%)

**📄 STATED:** "Looking Glass addresses the problem of needing a separate monitor by capturing the output of the Windows display and presenting it to you in a window" [Source: [Level1Techs](https://forum.level1techs.com/t/gpu-passthrough-looking-glass-single-monitor/133054)]

**📄 STATED:** "The majority of multiplayer games with anti-cheat will still not let you play or they will outright ban you" [Source: [Hacker News](https://news.ycombinator.com/item?id=18328323)]

#### Two Approaches:

**A) Dual GPU Setup (Easier)**
- GPU 1 (iGPU or cheap card): Linux host display
- GPU 2 (RTX 4090/3090): Passthrough to Windows VM
- More stable, GPU always dedicated to VM

**B) Single GPU Passthrough (Advanced)**
- Dynamic unbinding: GPU switches between host/VM
- Uses libvirt hooks for driver switching
- Host loses display while VM runs

**📄 STATED:** "An alternative approach is to dynamically unbind nvidia/amd drivers and bind vfio drivers right before the VM starts, then reverse these actions when the VM stops" [Source: [Gentoo Wiki](https://wiki.gentoo.org/wiki/GPU_passthrough_with_virt-manager,_QEMU,_and_KVM)]

### Option 2: Dual Boot

**Setup:** Windows + Linux on separate partitions/drives

**Pros:**
- ✅ Maximum performance (native hardware)
- ✅ No anti-cheat issues
- ✅ Simpler to set up

**Cons:**
- 🔄 Reboot required to switch OS
- ⏰ Context switching friction
- 🔓 Windows may access Linux partition data

**📄 STATED:** "For gamers requiring high frames per second (FPS) and detailed graphics, a dual boot configuration is essential. The direct hardware access it offers is crucial" [Source: [Medium](https://aditya-sunjava.medium.com/dual-booting-vs-virtual-machines-maximizing-system-resources-and-performance-3c75b1869487)]

### Decision Matrix

| Factor | GPU Passthrough | Dual Boot |
|--------|-----------------|-----------|
| **Performance** | 95-98% | 100% |
| **Convenience** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Complexity** | ⭐⭐ | ⭐⭐⭐⭐ |
| **Anti-cheat** | ❌ Risk | ✅ Safe |
| **ML workflow** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🐧 GPU Passthrough Setup Guide

### Prerequisites

1. **Hardware Requirements:**
   - CPU with VT-x/VT-d (Intel) or AMD-Vi
   - Motherboard with IOMMU support
   - 2 GPUs (or single GPU + iGPU)

2. **BIOS Settings:**
   - Enable VT-x/VT-d or AMD SVM
   - Enable IOMMU
   - Set primary display to iGPU (if using)

### Kernel Parameters

```bash
# /etc/default/grub - GRUB_CMDLINE_LINUX_DEFAULT
# Intel
intel_iommu=on iommu=pt

# AMD
amd_iommu=on iommu=pt

# Additional (if IOMMU groups merged)
pcie_acs_override=downstream,multifunction
```

**📄 STATED:** "iommu=pt (passthrough mode) helps reduce overhead... allowing the device to access physical memory directly with minimal performance penalty" [Source: [Arch Wiki](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF)]

### NVIDIA-Specific Fixes

```xml
<!-- Add to VM XML to hide hypervisor -->
<features>
  <hyperv mode="custom">
    <vendor_id state="on" value="randomid"/>
  </hyperv>
  <kvm>
    <hidden state="on"/>
  </kvm>
</features>
```

**📄 STATED:** "Without proper hyperv and ioapic settings, the NVIDIA driver will throw an Error 43 and refuse to load" [Source: [Quantum5.ca](https://quantum5.ca/2022/04/18/windows-vm-gpu-passthrough-part-0-introduction/)]

### Looking Glass Setup

1. Configure shared memory (IVSHMEM)
2. Install IVSHMEM driver in Windows VM
3. Install Looking Glass host app in Windows
4. Run Looking Glass client on Linux

**Memory calculation:** `width × height × 4 × 2` bytes → round up to power of 2

---

## 🧠 Software Stack for ML/LLM

### NVIDIA vs AMD (CUDA vs ROCm)

| Aspect | NVIDIA CUDA | AMD ROCm |
|--------|-------------|----------|
| **Performance** | Baseline | 10-30% slower |
| **Ecosystem** | Mature, extensive | Growing, gaps |
| **Installation** | Easy | Complex, Linux-only |
| **PyTorch** | First-class | Supported |
| **Framework support** | Everything | Most major ones |

**📄 STATED:** "CUDA typically outperforms ROCm by 10% to 30% in compute-intensive workloads" [Source: [SCIMUS](https://thescimus.com/blog/rocm-vs-cuda-a-practical-comparison-for-ai-developers/)]

**🔗 INFERRED:** Stick with NVIDIA for homelab ML - ecosystem maturity outweighs AMD's lower hardware cost

### LLM Inference Frameworks

| Framework | Best For | Performance |
|-----------|----------|-------------|
| **Ollama** | Quick start, single user | Good |
| **llama.cpp** | CPU/GPU offload, edge | Good |
| **vLLM** | Multi-user, production | Best (3.23x faster) |

**📄 STATED:** "vLLM can perform up to 3.23x times faster than Ollama with 128 concurrent requests" [Source: [Medium](https://robert-mcdermott.medium.com/performance-vs-practicality-a-comparison-of-vllm-and-ollama-104acad250fd)]

**Recommendation:** Start with Ollama for simplicity, migrate to vLLM for production

### Whisper Deployment

```bash
# Install faster-whisper (optimized, lower VRAM)
pip install faster-whisper

# Use with 4-bit quantization for even lower memory
```

| Implementation | VRAM (Large) | Speed |
|----------------|--------------|-------|
| OpenAI Whisper | ~10GB | Baseline |
| faster-whisper | 4.7GB | Faster |
| faster-whisper INT8 | 3.1GB | Fastest |

---

## 💰 Budget Builds

### 🥉 Entry (~$1,500 total)

- **GPU:** Used RTX 3090 ($800)
- **CPU:** AMD Ryzen 5 7600X ($200)
- **RAM:** 32GB DDR5 ($100)
- **Motherboard:** B650 with IOMMU ($150)
- **PSU:** 850W Gold ($100)
- **Storage:** 1TB NVMe ($80)

**Capabilities:** 7B-13B LLMs, Whisper large, 1440p gaming

### 🥈 Mid-Range (~$2,500 total)

- **GPU:** RTX 4090 ($1,600)
- **CPU:** AMD Ryzen 7 7800X3D ($350)
- **RAM:** 64GB DDR5 ($200)
- **Motherboard:** X670E ($250)
- **PSU:** 1000W Platinum ($150)
- **Storage:** 2TB NVMe ($150)

**Capabilities:** 13B-34B LLMs, fast Whisper, 4K gaming

### 🥇 Enthusiast (~$4,500 total)

- **GPU:** 2× RTX 4090 ($3,200)
- **CPU:** AMD Ryzen 9 7950X ($450)
- **RAM:** 128GB DDR5 ($400)
- **Motherboard:** X670E (16x/16x slots) ($350)
- **PSU:** 1600W ($250)
- **Storage:** 4TB NVMe ($300)

**Capabilities:** 70B LLMs, concurrent workloads, VR gaming

---

## ⚠️ Multi-GPU Considerations

### NVLink Status (2024-2025)

**📄 STATED:** "NVIDIA has phased out NVLink for consumer and workstation GPUs and reserves it only for their enterprise GPUs. The last generation to support NVLink in the consumer and workstation class is Ampere" [Source: [SabrePC](https://www.sabrepc.com/blog/computer-hardware/nvlink-vs-pcie-do-you-need-nvlink-for-multi-gpu)]

### PCIe Good Enough?

**📄 STATED:** "No NVLink is needed, and 8x lanes are fine for 2 GPUs – it should not be much slower (maybe 1-5%)" [Source: [Towards Data Science](https://towardsdatascience.com/how-to-setup-a-multi-gpu-linux-machine-for-deep-learning-in-2024-df561a2d3328/)]

**Bottom line:** For dual RTX 4090, PCIe 4.0 x8/x8 is sufficient. NVLink not available anyway.

---

## 🔍 What Sources Don't Cover

- ❓ Specific RTX 5090 ML benchmarks (too new)
- ❓ Power consumption comparisons under ML load
- ❓ Cooling solutions for multi-GPU cases
- ❓ Network storage options for model hosting
- ❓ Noise levels in home environment

---

## 📚 Resources & References

### GPU Selection
- [BIZON: Best GPU for LLM Training/Inference](https://bizon-tech.com/blog/best-gpu-llm-training-inference)
- [LocalLLM.in: Best GPUs for LLM Inference 2025](https://localllm.in/blog/best-gpus-llm-inference-2025)
- [HomelabSec: Best GPU for Local LLM Homelab](https://homelabsec.com/posts/best-gpu-for-local-llm-homelab/)

### GPU Passthrough
- [Arch Wiki: PCI Passthrough via OVMF](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF)
- [Gentoo Wiki: GPU Passthrough Guide](https://wiki.gentoo.org/wiki/GPU_passthrough_with_virt-manager,_QEMU,_and_KVM)
- [GitHub: GPU Passthrough Tutorial](https://github.com/bryansteiner/gpu-passthrough-tutorial)
- [Looking Glass Project](https://github.com/gnif/LookingGlass)

### CUDA vs ROCm
- [SCIMUS: ROCm vs CUDA Comparison](https://thescimus.com/blog/rocm-vs-cuda-a-practical-comparison-for-ai-developers/)
- [Thunder Compute: CUDA vs ROCm 2025](https://www.thundercompute.com/blog/rocm-vs-cuda-gpu-computing)

### LLM Frameworks
- [Red Hat: Ollama vs vLLM Benchmarking](https://developers.redhat.com/articles/2025/08/08/ollama-vs-vllm-deep-dive-performance-benchmarking)
- [ITECS: vLLM vs Ollama vs llama.cpp](https://itecsonline.com/post/vllm-vs-ollama-vs-llama.cpp-vs-tgi-vs-tensort)

### Whisper
- [Tom's Hardware: Whisper GPU Benchmarks](https://www.tomshardware.com/news/whisper-audio-transcription-gpus-benchmarked)
- [OpenAI Whisper GitHub](https://github.com/openai/whisper)

---

## 🎯 My Recommendation

**For your use case (ML + LLM + Whisper + Gaming):**

1. **GPU:** RTX 4090 (24GB) - handles all workloads excellently
2. **Architecture:** GPU passthrough with Looking Glass
   - Linux host for ML/LLM (native CUDA performance)
   - Windows VM for gaming (near-native with passthrough)
3. **iGPU or cheap GPU:** For Linux host display during VM gaming
4. **Software:**
   - Ollama → vLLM for LLM serving
   - faster-whisper for speech-to-text
   - PyTorch + CUDA for training

**If budget constrained:** Used RTX 3090 + dual boot (simpler, same VRAM)

**If playing competitive multiplayer:** Dual boot (anti-cheat safe)

---

**Suggested Vault Location:** `3_Resources/Tech/Homelab/`
**Potential MOCs:** [[Homelab MOC]], [[Machine Learning MOC]], [[Gaming Setup MOC]]
**Tags:** #homelab #ML #LLM #Whisper #gaming #GPU #hardware #VFIO #passthrough
