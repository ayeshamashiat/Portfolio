"""
dump_codebase.py
Writes every source file in this project into a single codebase.txt file.
Run from the project root:  python dump_codebase.py
"""

import os

# ── Configuration ──────────────────────────────────────────────────────────────

OUTPUT_FILE = "codebase.txt"

# Directories to skip entirely
SKIP_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".turbo",
    "__pycache__",
    ".cache",
    "dist",
    "build",
    "out",
    ".gemini",
}

# File extensions to include
INCLUDE_EXTENSIONS = {
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".css", ".scss", ".sass",
    ".json",
    ".md", ".mdx",
    ".html",
    ".env", ".env.local", ".env.example",
    ".yaml", ".yml",
    ".py",
}

# Specific filenames to always include even without a matching extension
INCLUDE_FILENAMES = {
    ".eslintrc", ".eslintignore",
    ".prettierrc", ".prettierignore",
    ".gitignore",
    "Makefile",
    "Dockerfile",
}

# ── Helpers ────────────────────────────────────────────────────────────────────

def should_include(filepath: str) -> bool:
    filename = os.path.basename(filepath)
    _, ext = os.path.splitext(filename)
    return ext.lower() in INCLUDE_EXTENSIONS or filename in INCLUDE_FILENAMES


def collect_files(root: str) -> list[str]:
    collected = []
    for dirpath, dirnames, filenames in os.walk(root):
        # Prune skip dirs in-place so os.walk doesn't descend into them
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for filename in sorted(filenames):
            full_path = os.path.join(dirpath, filename)
            if should_include(full_path):
                collected.append(full_path)
    return sorted(collected)


def dump(root: str, output_path: str) -> None:
    files = collect_files(root)
    total = len(files)

    with open(output_path, "w", encoding="utf-8") as out:
        out.write(f"# CODEBASE DUMP\n")
        out.write(f"# Root: {os.path.abspath(root)}\n")
        out.write(f"# Total files: {total}\n")
        out.write("=" * 80 + "\n\n")

        for i, filepath in enumerate(files, 1):
            rel = os.path.relpath(filepath, root)
            print(f"[{i}/{total}] {rel}")

            out.write(f"{'=' * 80}\n")
            out.write(f"FILE: {rel}\n")
            out.write(f"{'=' * 80}\n")

            try:
                with open(filepath, "r", encoding="utf-8", errors="replace") as f:
                    content = f.read()
                out.write(content)
            except Exception as e:
                out.write(f"[ERROR reading file: {e}]\n")

            out.write("\n\n")

    print(f"\n✓ Done — {total} files written to: {output_path}")


# ── Entry point ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    project_root = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(project_root, OUTPUT_FILE)
    dump(project_root, output_path)
