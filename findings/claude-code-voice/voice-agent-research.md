# Claude Code Voice Agent Research

**Date:** 2026-02-26
**Tags:** #research #claude-code #voice #STT #TTS #MCP
**Focus:** Practical approaches to voice conversation with Claude Code CLI

---

## Key Findings Summary

- Claude Code has **no native voice support** in CLI mode
- Rich ecosystem of community solutions exists (MCP servers, hooks, wrappers)
- Best-in-class solution: **VoiceMode MCP** (fully local, offline capable)
- Multiple viable approaches: MCP servers, Python wrappers, CLI piping, hooks
- macOS has strong native options (`say` command, Apple Speech framework)

---

## 1. MCP-Based Solutions (Recommended)

### VoiceMode MCP (Best Overall)

- **Repo:** [mbailey/voicemode](https://github.com/mbailey/voicemode)
- **Website:** [getvoicemode.com](https://getvoicemode.com/)
- **Docs:** [voice-mode.readthedocs.io](https://voice-mode.readthedocs.io/en/stable/integrations/claude-code/)
- **PyPI:** [voice-mode](https://pypi.org/project/voice-mode/)
- **Architecture:** MCP server bridging mic/speakers to Claude Code
- **STT:** Local Whisper (port 2022, ~0.3s latency) or OpenAI Whisper API
- **TTS:** Local Kokoro (port 8880) or OpenAI TTS API
- **Install:**

  ```bash
  claude mcp add --scope user voicemode -- uvx --refresh voice-mode
  voicemode whisper install   # local STT
  voicemode kokoro install    # local TTS
  ```

- **Config (local):**

  ```bash
  VOICEMODE_STT_BASE_URL="http://127.0.0.1:2022/v1"
  VOICEMODE_TTS_BASE_URL="http://127.0.0.1:8880/v1"
  ```

- **Features:** Offline capable, smart silence detection (webrtcvad), low latency
- **Maturity:** Most popular, well-documented, active development

### voice-mcp (Apple Silicon Native)

- **Repo:** [shreyaskarnik/voice-mcp](https://github.com/shreyaskarnik/voice-mcp)
- **Architecture:** Bidirectional MCP server using mlx-audio
- **STT:** Voxtral Realtime (4B params, int4) - causal encoder-decoder
- **TTS:** Kokoro (82M params, bf16) - ALBERT text encoder
- **VAD:** webrtcvad (mode 3)
- **Audio cues:** Rising chime = mic active, falling chime = recording stopped
- **Usage:** Say "listen to me" or `/listen` slash command
- **Auto-stops:** After 1.5s silence
- **Best for:** Apple Silicon Macs, fully local, no API keys

### speech.sh MCP

- **Repo:** [j3k0/speech.sh](https://github.com/j3k0/speech.sh)
- **TTS only** (OpenAI API-based)
- **Features:** Caching, configurable voices/speeds, JSON-RPC server
- **Less comprehensive** than VoiceMode but simpler

### MiniMax MCP

- **Repo:** [MiniMax-AI/MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP)
- **TTS + image/video gen** via MiniMax API
- **Cloud-based**, requires API key

### mcp-audio-server

- **Repo:** [BatchLion/mcp-audio-server](https://github.com/BatchLion/mcp-audio-server)
- **TTS + audio playback** for Claude Desktop/MCP clients

### stt-mcp-server-linux

- **Repo:** [marcindulak/stt-mcp-server-linux](https://github.com/marcindulak/stt-mcp-server-linux)
- **Linux-specific** STT MCP for Tmux

### mlx-whisper-mcp

- **Repo:** [kachiO/mlx-whisper-mcp](https://github.com/kachiO/mlx-whisper-mcp)
- **Local MLX Whisper** transcription MCP
- **Apple Silicon optimized**

---

## 2. Python Wrapper Approaches

### claude_code_voice

- **Repo:** [phildougherty/claude_code_voice](https://github.com/phildougherty/claude_code_voice)
- **Architecture:** Python wrapper around Claude Code subprocess
- **STT:** Whisper integration
- **TTS:** Configurable TTS server (Kokoro voices)
- **Features:** Wake word detection, voice activity detection, multi-CLI support (gemini-cli, cursor-cli)
- **Config via env:** `TTS_URL`, `TTS_VOICE`, `WAKE_WORD`, `CLAUDE_COMMAND`
- **Modes:** Text mode, no-TTS mode, debug mode

### Duck Talk

- **Repo:** [dhuynh95/duck_talk](https://github.com/dhuynh95/duck_talk)
- **Architecture:** Two Gemini Live sessions (one listens, one speaks) with Claude Code as black box
- **Features:**
  - Say "stop" to interrupt mid-response
  - Streaming TTS (sentence-by-sentence, ~1.5s to first audio)
  - Review mode (hear instruction read back before sending)
  - Correction learning (edit misheard words, auto-corrects future transcriptions)
  - Session management (browse, resume, rewind via JSONL)
- **Unique:** Uses Gemini Live for low-latency voice, Claude Code for intelligence

### bidirectional_streaming_ai_voice

- **Repo:** [ccappetta/bidirectional_streaming_ai_voice](https://github.com/ccappetta/bidirectional_streaming_ai_voice)
- **Stack:** ElevenLabs TTS + Faster-Whisper STT + Pygame audio
- **Two-way voice conversation** with Anthropic Claude API (not Claude Code specifically)

---

## 3. CLI Piping / STT-First Approaches

### hns (Recommended STT CLI)

- **Repo:** [primaprashant/hns](https://github.com/primaprashant/hns)
- **Website:** [hns-cli.dev](https://hns-cli.dev/)
- **Install:** `uv tool install hns`
- **Engine:** faster-whisper (100% local, offline after first run)
- **Providers:** OpenAI, Mistral, Groq, Deepgram, ElevenLabs, or local Whisper
- **Claude Code integration:**

  ```bash
  # One-shot voice prompt
  claude "$(hns --as ai-prompt)"

  # Shell aliases
  alias hclaude='claude "$(hns --as ai-prompt)"'
  ```

- **Privacy:** All processing local with Whisper option

### whis

- **Repo:** [frankdierolf/whis](https://github.com/frankdierolf/whis)
- **Install:** `cargo install whis-cli` then `whis setup`
- **Architecture:** Voice-to-clipboard CLI
- **Providers:** Cloud (OpenAI, Mistral, Groq, Deepgram, ElevenLabs) or local Whisper
- **Default:** Deepgram ($200 free credits)
- **Integration:** Speak, press Enter, paste into Claude Code
- **Best for:** Simple clipboard-based workflow

### claude-stt (Dedicated Claude Code STT)

- **Repo:** [jarrodwatts/claude-stt](https://github.com/jarrodwatts/claude-stt)
- **Architecture:** Background daemon (STTDaemon) + hotkey-triggered recording
- **Flow:** Hold hotkey -> speak -> release -> transcription appears in Claude Code input
- **Local processing,** no telemetry
- **Plugin format** for Claude Code marketplace

---

## 4. Claude Code Hooks for TTS Output

### Claude-to-Speech (ElevenLabs)

- **Repo:** [LAURA-agent/Claude-to-Speech](https://github.com/LAURA-agent/Claude-to-Speech)
- **Mechanism:** Claude includes invisible markers in responses; Stop hook extracts and speaks them
- **TTS:** ElevenLabs (eleven_flash_v2_5 model)
- **Voices:** laura, claude, rachel, and others
- **Requires:** `ELEVENLABS_API_KEY`

### cc-hooks (Multi-Provider Audio Feedback)

- **Repo:** [husniadil/cc-hooks](https://github.com/husniadil/cc-hooks)
- **Features:** Context-aware TTS announcements, sound effects, contextual AI messages
- **Providers:** Multiple TTS providers including ElevenLabs
- **Multi-language support**

### ElevenLabs Official Plugins

- **Repo:** [elevenlabs/plugins](https://github.com/elevenlabs/plugins)
- **Official** Claude Code plugins for voice interactions

### claude-code-tts (OpenAI TTS)

- **Repo:** [ybouhjira/claude-code-tts](https://github.com/ybouhjira/claude-code-tts)
- **TTS MCP plugin** using OpenAI's TTS API

### claude-code-audio-hooks (Sound Effects)

- **Repo:** [ChanMeng666/claude-code-audio-hooks](https://github.com/ChanMeng666/claude-code-audio-hooks)
- **14 hook events** with sound alerts
- **Two audio sets:** Professional ElevenLabs recordings + modern UI sounds

### claudevoice-macos

- **Repo:** [emaspa/claudevoice-macos](https://github.com/emaspa/claudevoice-macos)
- **macOS-specific** voice notifications using Microsoft neural voices (edge-tts)
- **Speaks aloud** when tasks complete or input needed

---

## 5. Standalone STT/TTS Tools (Building Blocks)

### Speech-to-Text

| Tool | Type | Install | Notes |
|------|------|---------|-------|
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | Local | `pip install faster-whisper` | CTranslate2 optimized, fastest local STT |
| [whisper.cpp](https://github.com/ggerganov/whisper.cpp) | Local | Build from source | C/C++, very fast, low memory |
| [mlx-whisper](https://github.com/ml-explore/mlx-examples) | Local | pip install | Apple Silicon optimized |
| [hear](https://github.com/sveinbjornt/hear) | Local | brew install | macOS native Speech framework CLI |
| macOS Dictation | Native | System Settings | Built-in, works anywhere |

### Text-to-Speech

| Tool | Type | Install | Notes |
|------|------|---------|-------|
| macOS `say` | Native | Built-in | Zero setup, decent quality, many voices |
| [Piper TTS](https://github.com/rhasspy/piper) | Local | `pip install piper-tts` | Fast neural TTS, ONNX, many voices, v1.4.1 (Feb 2026) |
| [Kokoro TTS](https://voice-mode.readthedocs.io/en/stable/kokoro/) | Local | via voicemode | 82M params, high quality, used by VoiceMode |
| [edge-tts](https://github.com/rany2/edge-tts) | Cloud | `pip install edge-tts` | Free Microsoft neural voices |
| [ElevenLabs](https://elevenlabs.io/) | Cloud | API key | Best quality, paid |
| [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech) | Cloud | API key | Good quality, paid |

---

## 6. DIY Minimal Pipeline (macOS)

### Approach A: hns + say (Zero API Cost)

```bash
# Install
uv tool install hns

# Voice prompt to Claude Code (one-shot)
claude "$(hns)"

# With TTS response (pipe mode)
claude -p "$(hns)" | say

# Alias for convenience
alias vc='claude -p "$(hns)" | say'
```

### Approach B: whis + say

```bash
cargo install whis-cli
whis setup  # choose local Whisper

# Record, transcribe, paste into Claude Code
whis  # speak, press Enter, Cmd+V into Claude Code
```

### Approach C: macOS hear + say

```bash
brew install hear

# Use macOS native speech recognition
claude -p "$(hear -d 10)" | say  # 10 second recording
```

### Approach D: Full Local with Piper

```bash
pip install piper-tts faster-whisper
# Record audio -> faster-whisper -> claude -p -> piper -> play
```

---

## 7. Native Claude Voice Roadmap

- **Claude mobile apps:** Voice mode launched May 2025 (iOS/Android)
- **Claude web/desktop:** Voice button in prompt bar, rolled out late 2025
- **Claude Code CLI:** No native voice support, no announced plans
- **Offline voice packs (Q1 2026):** On-device processing for short prompts (~30s)
- **Custom voice cloning (2026):** Enterprise feature, opt-in privacy controls
- **Claude Code hooks system** provides the integration points community uses

---

## 8. Architecture Comparison

| Approach | Latency | Privacy | Setup | Bidirectional | Offline |
|----------|---------|---------|-------|---------------|---------|
| VoiceMode MCP (local) | Low (~0.3s STT) | Full | Medium | Yes | Yes |
| voice-mcp (mlx) | Low | Full | Medium | Yes | Yes |
| hns + say | Medium | Local STT | Easy | Partial | Partial |
| Duck Talk | Low (~1.5s) | Cloud | Medium | Yes | No |
| claude_code_voice | Medium | Configurable | Medium | Yes | Configurable |
| Hooks (TTS only) | Low | Cloud | Easy | No (TTS only) | No |
| whis + paste | High (manual) | Local | Easy | No | Partial |

---

## Recommendation

**For macOS Apple Silicon:**

1. **Quick start:** VoiceMode MCP with local Whisper + Kokoro (fully local, ~5 min setup)
2. **Lightweight STT only:** `hns` with local Whisper + `say` command for TTS
3. **Apple-native:** `voice-mcp` by shreyaskarnik (mlx-audio, Voxtral + Kokoro)
4. **Advanced features:** Duck Talk (interruption, correction learning, review mode)

---

## Sources

- [VoiceMode MCP](https://github.com/mbailey/voicemode) | [Docs](https://voice-mode.readthedocs.io/)
- [voice-mcp (mlx)](https://github.com/shreyaskarnik/voice-mcp)
- [Duck Talk](https://github.com/dhuynh95/duck_talk)
- [claude_code_voice](https://github.com/phildougherty/claude_code_voice)
- [Claude-to-Speech](https://github.com/LAURA-agent/Claude-to-Speech)
- [hns CLI](https://github.com/primaprashant/hns) | [Docs](https://hns-cli.dev/)
- [whis CLI](https://github.com/frankdierolf/whis)
- [claude-stt](https://github.com/jarrodwatts/claude-stt)
- [cc-hooks](https://github.com/husniadil/cc-hooks)
- [Piper TTS](https://github.com/rhasspy/piper)
- [faster-whisper](https://github.com/SYSTRAN/faster-whisper)
- [ElevenLabs Plugins](https://github.com/elevenlabs/plugins)
- [claude-code-audio-hooks](https://github.com/ChanMeng666/claude-code-audio-hooks)
- [claudevoice-macos](https://github.com/emaspa/claudevoice-macos)
- [speech.sh MCP](https://github.com/j3k0/speech.sh)
- [mlx-whisper-mcp](https://github.com/kachiO/mlx-whisper-mcp)
- [claude-code-tts](https://github.com/ybouhjira/claude-code-tts)
- [hear CLI](https://github.com/sveinbjornt/hear)
- [Setup Guide (macOS)](https://gist.github.com/wilks7/6e98343c8fd09cde13838aff90a58efe)
- [Medium: Voice Mode in 5 Minutes](https://medium.com/@kumaran.isk/how-i-added-voice-mode-to-claude-code-hands-free-coding-in-5-minutes-101a5086968f)
- [Medium: Local Speech Recognition Guide](https://medium.com/@agentic.ai.forge/voice-control-for-claude-code-a-step-by-step-guide-to-local-speech-recognition-ffc4928a9aec)
