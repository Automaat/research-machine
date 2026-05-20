#!/usr/bin/env python3
"""Fetch a YouTube video transcript and metadata, emit JSON for the skill."""

import argparse
import json
import re
import sys
import urllib.parse
import urllib.request

from youtube_transcript_api import YouTubeTranscriptApi

_ID_PATTERNS = [
    r"(?:v=|/embed/|/shorts/|/live/|youtu\.be/|/v/)([A-Za-z0-9_-]{11})",
]


def extract_video_id(url: str) -> str | None:
    """Pull the 11-char video id from any common YouTube URL form."""
    url = url.strip()
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", url):
        return url
    for pattern in _ID_PATTERNS:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def fetch_metadata(video_id: str) -> dict[str, str]:
    """Best-effort title/author via the public oEmbed endpoint."""
    watch_url = f"https://www.youtube.com/watch?v={video_id}"
    oembed = "https://www.youtube.com/oembed?" + urllib.parse.urlencode(
        {"url": watch_url, "format": "json"}
    )
    try:
        req = urllib.request.Request(oembed, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return {
            "title": data.get("title", "Unknown title"),
            "author": data.get("author_name", "Unknown channel"),
        }
    except Exception:
        return {"title": "Unknown title", "author": "Unknown channel"}


def fmt_time(seconds: float) -> str:
    """Format seconds as mm:ss or h:mm:ss."""
    total = int(seconds)
    hours, rem = divmod(total, 3600)
    minutes, secs = divmod(rem, 60)
    if hours:
        return f"{hours}:{minutes:02d}:{secs:02d}"
    return f"{minutes}:{secs:02d}"


def build_chapters(snippets: list, chunk_chars: int = 280) -> list[str]:
    """Coarsen snippets into timestamped segments for citing moments."""
    chapters: list[str] = []
    buf: list[str] = []
    buf_start = 0.0
    for snip in snippets:
        if not buf:
            buf_start = snip.start
        buf.append(snip.text.strip())
        if sum(len(t) for t in buf) >= chunk_chars:
            chapters.append(f"[{fmt_time(buf_start)}] {' '.join(buf)}")
            buf = []
    if buf:
        chapters.append(f"[{fmt_time(buf_start)}] {' '.join(buf)}")
    return chapters


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch a YouTube transcript.")
    parser.add_argument("--url", required=True, help="YouTube URL or video id")
    args = parser.parse_args()

    video_id = extract_video_id(args.url)
    if not video_id:
        print(json.dumps({"status": "error", "error": "Could not parse a YouTube video id from the URL"}))
        sys.exit(0)

    try:
        api = YouTubeTranscriptApi()
        transcript_list = api.list(video_id)
        try:
            transcript = transcript_list.find_transcript(["en", "en-US", "en-GB"])
        except Exception:
            transcript = next(iter(transcript_list))
        fetched = transcript.fetch()
    except Exception as exc:
        print(json.dumps({
            "status": "error",
            "video_id": video_id,
            "error": f"{type(exc).__name__}: {exc}",
        }))
        sys.exit(0)

    snippets = list(fetched)
    if not snippets:
        print(json.dumps({"status": "error", "video_id": video_id, "error": "Empty transcript"}))
        sys.exit(0)

    meta = fetch_metadata(video_id)
    last = snippets[-1]
    duration = last.start + last.duration
    full_text = " ".join(s.text.strip() for s in snippets if s.text.strip())

    print(json.dumps({
        "status": "ok",
        "video_id": video_id,
        "url": f"https://www.youtube.com/watch?v={video_id}",
        "title": meta["title"],
        "author": meta["author"],
        "language": getattr(fetched, "language", transcript.language),
        "duration_seconds": round(duration, 1),
        "duration_human": fmt_time(duration),
        "segment_count": len(snippets),
        "transcript": full_text,
        "chapters": build_chapters(snippets),
    }))


if __name__ == "__main__":
    main()
