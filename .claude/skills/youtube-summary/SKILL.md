---
name: youtube-summary
description: Summarize a YouTube video from its transcript and save a concise note to the Obsidian vault. Use when user shares a YouTube URL and wants a summary, key takeaways, or notes from a video.
argument-hint: "[youtube-url] [--no-save]"
allowed-tools: Bash(cd *), Bash(uv run *), Read, Write
user-invocable: true
---

# YouTube Summary: $ARGUMENTS

Fetch a YouTube video transcript, produce a concise summary, and save it as a note
to the Obsidian vault inbox.

## Arguments

- `[youtube-url]` — required. Any form: `watch?v=`, `youtu.be/`, `/shorts/`, `/embed/`, `/live/`.
- `--no-save` — print the summary to chat only; skip writing the vault note.

Default: print the summary AND save a note to the Obsidian vault.

---

## Workflow

### Phase 1: Fetch transcript

Run the script (DO NOT read it into context):

```bash
cd .claude/skills/youtube-summary/scripts && uv run python fetch_transcript.py --url "<youtube-url>"
```

Parse the JSON output:

- `status` — `ok` or `error`
- `video_id`, `title`, `author`, `url`
- `duration_human`, `language`, `segment_count`
- `transcript` — full plain text
- `chapters` — timestamped segments (`[mm:ss] text`) for citing moments
- `error` — message when `status` is `error`

If `status` is `error`, report the message and stop (see Error Handling).

### Phase 2: Summarize (concise)

Base the summary ONLY on the transcript. No outside knowledge, no gap-filling.

- Read the full transcript and `chapters`.
- Distill the core thesis into a 1-2 sentence TL;DR.
- Extract 4-6 key points — the essential takeaways only, no padding.
- Cite the most important moments with `[mm:ss]` timestamps from `chapters`.
- Keep it tight: this is a concise note, not a transcript rewrite.

### Phase 3: Output

Produce the note using `output-template.md` format. Use emojis, bullets, `[[wikilinks]]`.
Print it to chat.

### Phase 4: Save to vault (default)

Unless `--no-save` was passed, `Write` the note to:

```
/Users/marcin.skalski/Documents/Obsidian Vault/0_Inbox/YouTube - {sanitized-title}.md
```

- `{sanitized-title}` — the video title with `/ \ : * ? " < > |` stripped, trimmed.
- If a file with that name already exists, append `({video_id})` before `.md`.
- Confirm the saved path in chat.

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Invalid / unparseable URL | Report; ask for a valid YouTube URL |
| Transcripts disabled / none found | Report; suggest user supply a transcript manually |
| Video unavailable / private | Report status; stop |
| Non-English only transcript | Summarize anyway; note language in output |
| `uv` / network failure | Show stderr; suggest retry |

Never invent video content when the transcript is missing.

---

## Quality Checklist

- [ ] Every claim traceable to the transcript
- [ ] TL;DR is 1-2 sentences; key points are 4-6 bullets
- [ ] Key timestamps cited with `[mm:ss]`
- [ ] Emojis, bullets, wikilinks per repo conventions
- [ ] Title/author/duration from script, not guessed
- [ ] Note saved to vault inbox (unless `--no-save`); path confirmed
