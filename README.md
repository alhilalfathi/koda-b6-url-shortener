# Koda B6 URL Shortener

[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://go.dev/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

**Koda B6 URL Shortener** adalah aplikasi *full-stack* untuk mempersingkat tautan (URL) yang panjang menjadi alias yang ringkas dan mudah dibagikan. Proyek ini terdiri dari **Backend** berkinerja tinggi yang dibangun dengan **Go (Gin)** dan antarmuka **Frontend** interaktif menggunakan **React**.

---

## Fitur Utama

- **Generate Short Link**: Ubah URL panjang menjadi URL pendek secara instan.
- **Custom Alias**: Pengguna dapat memasukkan alias URL khusus sesuai keinginan.
- **Fast Redirection**: Pengalihan tautan yang cepat dan efisien di sisi backend.
- **Modern UI/UX**: Antarmuka responsif untuk manajemen tautan yang dibangun dengan React.
- **Database Persistence**: Penyimpanan data yang aman menggunakan PostgreSQL dengan migrasi terstruktur.
- **Containerized**: Siap dijalankan kapan saja menggunakan Docker Compose.

---

## Tech Stack

### Backend
- **Language**: Go (Golang)
- **Framework**: Gin Gonic
- **Database**: PostgreSQL
- **Migration**: golang-migrate
- **Architecture**: Clean Architecture (Repository, Service, Handler dengan Dependency Injection)

### Frontend
- **Library**: React.js
- **Routing**: React Router DOM

### DevOps
- **Container**: Docker & Docker Compose
- **CI/CD**: GitHub Actions (Opsional)

---

## Struktur Repositori

Proyek ini menggunakan pendekatan *monorepo* yang memisahkan aplikasi ke dalam dua direktori utama:

```text
koda-b6-url-shortener/
├── backend/                # Go API Server
│   ├── cmd/                # Entry point (main.go)
│   ├── internal/           # Clean Architecture layers (handler, service, repo)
│   ├── migrations/         # File SQL untuk migrasi DB
│   ├── .env.example        # Environment backend
│   └── Dockerfile          # Dockerfile backend
├── frontend/               # React Client
│   ├── src/                # Komponen React & Pages
│   ├── public/             # Static assets
│   ├── .env.example        # Environment frontend
│   └── Dockerfile          # Dockerfile frontend
├── docker-compose.yml      # Orkestrasi Full-stack (Backend, Frontend, DB)
└── README.md
```

## Cara Menjalankan Aplikasi

Anda dapat menjalankan proyek ini menggunakan Docker (cara termudah) atau menjalankannya secara manual untuk keperluan development.

## 1. Menggunakan Docker (Direkomendasikan)

Cara ini akan menjalankan Database, Backend, dan Frontend secara otomatis di dalam container.

### 1. Clone repositori:
```Bash
git clone https://github.com/alhilalfathi/koda-b6-url-shortener.git

cd koda-b6-url-shortener
```
### 2. Setup Environment:
Salin file .env.example ke .env di masing-masing folder (backend/ dan frontend/).

### 3. Build & Run:
```Bash
docker-compose up --build -d
```

### 4. Akses Aplikasi:

- Frontend (UI): http://localhost:5173 (atau port sesuai konfigurasi)

- Backend (API): http://localhost:8888

## 2. Menjalankan Secara Manual (Development)

Jika ingin melakukan debugging atau development lebih lanjut, Anda bisa menjalankannya terpisah. Pastikan PostgreSQL sudah berjalan di komputer Anda.

#### Menjalankan Backend:
```Bash
cd backend
cp .env.example .env # Sesuaikan kredensial database

# Jalankan migrasi database
migrate -path migrations/ -database "postgres://user:pass@localhost:5432/dbname?sslmode=disable" up

# Jalankan server
go run cmd/main.go
```

#### Menjalankan Frontend:
```Bash
cd frontend
cp .env.example .env # Pastikan API_URL mengarah ke localhost:8888

# Install dependencies & jalankan UI
npm install
npm start  # atau npm run dev (jika menggunakan Vite)
```