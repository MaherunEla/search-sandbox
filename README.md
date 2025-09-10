# 🔍 Search Sandbox

A mini-project to experiment with **advanced search techniques** in web apps using PostgreSQL and frontend optimizations. The project showcases a learning journey from **custom fuzzy search** to **PostgreSQL `pg_trgm`**.

---

## 🛠️ Tech Stack

- **Frontend:** React / Next.js
- **Backend:** PostgreSQL (`pg_trgm`)
- **Other:** Debounce for input optimization, highlight matching text, paginated search results

---

## 🚀 Feature & Learning Progression

### 1️⃣ `feat(search): add fuzzy scoring across title, description, and author`

- Implemented a **custom fuzzy scoring algorithm** to search across multiple fields.
- Learned how to assign weights to title, description, and author for better relevance.

### 2️⃣ `feat(search): implement fuzzy search with Levenshtein distance`

- Added **Levenshtein distance algorithm** to handle minor typos in search queries.
- Tested frontend filtering before moving to backend optimization.

### 3️⃣ `feat(search): implement fuzzy search with pg_trgm, pagination, and type-safe API response`

- Optimized fuzzy search using **PostgreSQL `pg_trgm` extension**.
- Created **GIN indexes** for efficient search.
- Implemented **pagination** and **type-safe API responses**.

### 4️⃣ `feat(search): add keyword highlighting in search results`

- Highlighted matched keywords dynamically in frontend results for better UX.
- Combined with **debounce** to reduce API calls while typing.

---

## 💡 Purpose

- Experiment with **fuzzy search techniques** step by step.
- Learn frontend **performance optimizations** like debounce and keyword highlighting.
- Build a **robust, reusable search system** for future projects.

---
