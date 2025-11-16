# 🚀 Multi-Tenant E-Commerce Platform

A modern multi-tenant e-commerce platform built on **Next.js**, **Prisma**, and **Tailwind CSS** — designed to serve multiple storefronts from a **single codebase** and **single database**, with **automatic tenant detection via domain/sub-path**.

Each tenant represents a **`ProductClass`**, and has its own **unique storefront**, **categories**, and **product inventory**, while still sharing the same infrastructure. This makes it ideal for SaaS e-commerce, marketplace SaaS, or branded vendor deployments.

---

## 🧩 Key Features

- **Single deployment, unlimited tenants**
- **Isolated storefront catalog** (categories + products per tenant)
- **Dynamic routing based on domain/sub-path**
- **Automatic tenant resolution**
- **Fully typed with Prisma + TypeScript**
- **Shadcn + Radix UI component library**
- **Clean, scalable folder architecture**

---

## 🛠️ Tech Stack

| Category             | Technology                                 |
| -------------------- | ------------------------------------------ |
| Framework            | **Next.js (App Router)**               |
| ORM                  | **Prisma**                                 |
| Database             | **SQLite** (swap-ready for Postgres/MySQL) |
| Styling              | **Tailwind CSS**                           |
| UI Components        | **Radix UI**, **shadcn/ui**                |
| Linting & Formatting | **ESLint**, **Prettier**                   |

---

## 🚩 Getting Started

### **Prerequisites**

- Node.js **v18+**
- npm (or pnpm / yarn / bun)

---

### **Installation**

```bash
# Clone the repo
git clone https://github.com/mikelneonedwin/nextjs-multitenant.git

# Enter the project directory
cd nextjs-multitenant

# Install dependencies
npm install

# Seed initial tenants, categories & products
npx prisma db seed

# Start development server
npm run dev
```

Visit → **[http://localhost:3000](http://localhost:3000)**

---

## 🗂️ Project Structure

```
.
├── app/                # App Router pages, layouts & tenant routing
│   └── s/[domain]/     # Dynamic tenant storefront route
├── components/         # Shared UI components
├── actions/            # Server actions for data operations
├── hooks/              # Custom client logic & fetch hooks
├── lib/                # Utilities, helpers & constants
├── prisma/             # Schema, migrations & seed data
├── public/             # Static files (images, fonts, etc)
└── types/              # Global TypeScript definitions
```

---

## 🏪 Multi-Tenancy Model

Each storefront is driven by a **`ProductClass`** record.
The tenant is detected from the URL using `/s/[domain]`.

Example:

- `/s/electronics` → Electronics storefront
- `/s/fashion` → Fashion storefront

Each tenant has **isolated data**, including:

- Categories
- Products
- Display configurations

This ensures **scalability**, **clean separation**, and **zero code duplication**.

---

## 📄 License

MIT (free for commercial and private use)

---

## 🤝 Contributing

Pull requests and discussions are welcome!
If you’d like to propose improvements, open an issue.
