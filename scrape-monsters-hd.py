"""
scrape-monsters-hd.py - Pass finale
Pour les fichiers sans HD : recherche par nom dans l'API (search + fuzzy)
Gère les cas : Tir_heure -> Tireur d'heure, hommeOurs -> Homme Ours, etc.
"""

import os, re, hashlib, json, unicodedata
import urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR    = os.path.join(PROJECT_ROOT, "images", "monsters_no_hd")
OUTPUT_DIR   = os.path.join(PROJECT_ROOT, "images", "monsters_no_hd_hd")
API_BASE     = "https://api.dofusdb.fr/monsters"
RENDERER_URL = "https://renderer.dofusdb.fr/look/{}/full/1/300_300.png"
PAGE_SIZE    = 50
WORKERS      = 20
HEADERS      = {"User-Agent": "Mozilla/5.0"}

os.makedirs(OUTPUT_DIR, exist_ok=True)

def to_hex_look(look):
    return "".join(f"{ord(c):02x}" for c in look)

def strip_accents(s):
    return unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode('ascii').lower()

def fetch_bytes(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read()

def fetch_bytes_safe(url):
    try:
        return fetch_bytes(url)
    except Exception:
        return None

# ── 1. Find files that still need HD ─────────────────────────────────────────
existing   = [f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".png")]
already_hd = set(os.listdir(OUTPUT_DIR))
need_hd    = [f for f in existing if f not in already_hd]
print(f"Already HD : {len(already_hd)}/{len(existing)}", flush=True)
print(f"Still need : {len(need_hd)}\n", flush=True)

if not need_hd:
    print("Nothing to do!")
    exit(0)

# ── 2. Fetch full API ─────────────────────────────────────────────────────────
print("Fetching full monster list from API...", flush=True)
all_monsters = []  # list of (name_fr, look_hex, img_url)

skip = 0
total_api = None
while True:
    data = json.loads(fetch_bytes(f"{API_BASE}?$limit={PAGE_SIZE}&$skip={skip}"))
    if total_api is None:
        total_api = data["total"]
    for m in data["data"]:
        name_fr = m.get("name", {}).get("fr", "")
        look    = m.get("look", "")
        img_url = m.get("img", "")
        if look and name_fr:
            all_monsters.append((name_fr, to_hex_look(look), img_url))
    skip += PAGE_SIZE
    print(f"  {min(skip, total_api)}/{total_api}", end="\r", flush=True)
    if skip >= total_api:
        break
print(f"\n  {len(all_monsters)} monsters loaded.\n", flush=True)

# Build indexes
api_exact   = {strip_accents(n.replace(" ", "_")): lh for n, lh, _ in all_monsters}
# Build richer index: normalized words -> look_hex
api_words   = {}
for name_fr, look_hex, _ in all_monsters:
    key = strip_accents(name_fr)
    api_words[key] = look_hex

# ── 3. Resolve each file with multiple strategies ─────────────────────────────
def make_candidates(stem):
    """Generate candidate search strings from a filename stem."""
    candidates = []

    # 1. Direct
    candidates.append(strip_accents(stem.replace("_", " ")))

    # 2. CamelCase split
    split = re.sub(r'([a-z])([A-Z])', r'\1 \2', stem).replace("_", " ")
    candidates.append(strip_accents(split))

    # 3. Replace _heure patterns: Tir_heure -> Tir * heure (partial match)
    no_heure = stem.replace("_heure", "").replace("_", " ")
    candidates.append(strip_accents(no_heure))

    # 4. Try with "de" / "d'" reinserted (e.g., Tir_heure -> Tireur d'heure)
    # Just keep the first word for a partial match
    first_word = strip_accents(re.split(r'[_ ]', stem)[0])
    candidates.append(first_word)

    return [c for c in dict.fromkeys(candidates) if c]  # dedup

def resolve_by_name(stem):
    candidates = make_candidates(stem)

    # Exact match on full normalized name
    for c in candidates:
        if c in api_words:
            return api_words[c]

    # Partial: find API names that START WITH first candidate
    first = candidates[0] if candidates else ""
    if len(first) >= 4:
        for api_name, look_hex in api_words.items():
            if api_name.startswith(first[:6]):
                return look_hex

    return None

print("Resolving by name...", flush=True)
resolved   = {}
unresolved = []

for fname in need_hd:
    stem     = fname[:-4]
    look_hex = resolve_by_name(stem)
    if look_hex:
        resolved[fname] = look_hex
    else:
        unresolved.append(fname)

print(f"  Name matches : {len(resolved)}", flush=True)
print(f"  Still unresolved : {len(unresolved)}\n", flush=True)

# ── 4. Download HD for resolved ───────────────────────────────────────────────
if resolved:
    print(f"Downloading {len(resolved)} HD images ({WORKERS} workers)...", flush=True)
    done = errors = 0

    def download_hd(args):
        fname, look_hex = args
        out = os.path.join(OUTPUT_DIR, fname)
        if os.path.exists(out):
            return True, fname
        try:
            data = fetch_bytes(RENDERER_URL.format(look_hex))
            with open(out, "wb") as f:
                f.write(data)
            return True, fname
        except Exception as e:
            return False, fname

    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futures = {ex.submit(download_hd, item): item for item in resolved.items()}
        for future in as_completed(futures):
            ok, fname = future.result()
            if ok: done += 1
            else: errors += 1
            total = done + errors
            if total % 50 == 0 or total == len(resolved):
                print(f"  {total}/{len(resolved)} — ok:{done} errors:{errors}", flush=True)

# ── 5. Report ─────────────────────────────────────────────────────────────────
total_hd = len(os.listdir(OUTPUT_DIR))
print(f"\n{'='*50}", flush=True)
print(f"Total HD: {total_hd}/{len(existing)}", flush=True)

if unresolved:
    print(f"\nStill no match ({len(unresolved)} files) — probablement custom ou absent de l'API:", flush=True)
    for f in sorted(unresolved):
        print(f"  {f}", flush=True)
