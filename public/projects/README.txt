PROJECT MEDIA — Creative Design Portfolio
=========================================

Place real project assets here. Do not commit large binaries unless intended.

Structure per project (mediaKey = folder name):

  public/projects/{mediaKey}/
  ├── cover.jpg                 Hero + portfolio card
  ├── gallery/
  │   ├── 01.jpg
  │   ├── 02.jpg
  │   └── ...
  └── videos/
      ├── walkthrough.mp4       MP4 with native browser controls
      └── walkthrough-poster.jpg   Optional video poster

Configured folders:
  - sudeep    → Sudeep Nutrition
  - nvidia    → NVIDIA
  - egyptair  → Egyptair
  - amana     → Amana Foods
  - illulian  → Illulian
  - alpa70    → ALPA70

After uploading files, gallery images are auto-discovered at build time
when autoDiscoverGallery is enabled in src/lib/projects.ts.
