![C#](https://img.shields.io/badge/C%23-239120?style=flat&logo=c-sharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-8-512BD4?style=flat&logo=dotnet&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-512BD4?style=flat&logo=dotnet&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Database](https://img.shields.io/badge/Database-SQL%20Server-green)
![EF Core](https://img.shields.io/badge/Entity%20Framework-Core-purple)
![Architecture](https://img.shields.io/badge/Architecture-Layered-orange)

# Smart Watch E-Commerce Platform

Full-stack **Smart Watch E-Commerce Platform** designed to provide an online system for browsing and managing smart watches, customer accounts, authentication, and administrative operations.

The application combines a modern **Next.js frontend** with an **ASP.NET Core Web API backend**, providing a clear separation between the user interface, business logic, data access, and database layers.

This project demonstrates the implementation of a modern full-stack application using **.NET, Next.js, TypeScript, Entity Framework Core, JWT authentication, Repository Pattern, and Unit of Work**.

---

# Overview

The platform provides both customer-facing functionality and administrative management features.

Users can browse available watches and interact with the authentication system, while administrators can manage watches and customer information through dedicated dashboard pages.

The frontend communicates with the ASP.NET Core backend through REST API endpoints, while the backend handles application logic, authentication, data access, and database operations.

Main areas of the platform include:

- Smart watch browsing
- Customer registration and login
- Social authentication
- JWT-based authentication
- Watch management
- Customer management
- Administrative dashboard
- Image upload and management
- Search and pagination
- Role-based authorization

---

# Key Features

## Smart Watch Catalog

The platform provides a product catalog for displaying smart watches and their information.

Features include:

- Browse available watches
- Display watch information and images
- Retrieve watch data through REST APIs
- Search watches
- Paginated watch listings

---

## Customer Management

The backend provides customer management functionality integrated with ASP.NET Core Identity.

The system supports:

- Customer registration
- Customer information management
- Customer roles
- Customer listing
- Customer editing
- Customer deletion
- Customer search
- Paginated customer results

Administrative pages are provided on the frontend for managing registered users.

---

## Authentication & Authorization

The application includes multiple authentication mechanisms.

### JWT Authentication

The ASP.NET Core backend supports JWT-based authentication for securing API requests.

The authentication system includes:

- User login
- JWT token generation
- Token-based API authentication
- Role-based authorization
- ASP.NET Core Identity integration

### Social Authentication

The frontend also integrates **NextAuth** with social authentication providers.

The project contains support for:

- Google authentication
- Facebook authentication
- NextAuth integration
- Backend social authentication processing

---

# Admin Dashboard

The application contains a dedicated administration dashboard for managing the platform.

The dashboard provides functionality for:

- Customer management
- Watch management
- Creating watches
- Editing watches
- Deleting watches
- Searching records
- Pagination
- Administrative navigation

The dashboard separates administrative functionality from the public-facing pages of the application.

---

# Watch Management

Administrators can manage smart watches through the dashboard and backend API.

Supported operations include:

- Create new watches
- Retrieve watch information
- Update existing watches
- Delete watches
- Upload watch images
- Display watch images
- Search watches
- Paginate watch records

Uploaded images are handled by the ASP.NET Core backend and stored under the application's static files directory.

---

# Backend Architecture

The backend is organized into multiple projects to separate application responsibilities.

```text
WatchStoreBackend
│
├── WatchStoreBackend
│   │
│   ├── Controllers
│   ├── Configuration
│   ├── Authentication
│   ├── Static Files / Uploads
│   └── API Entry Point
│
├── ApplicationServices
│   │
│   ├── AppServices
│   ├── DTO
│   ├── Interfaces
│   ├── AutoMapper
│   └── Helper Classes
│
├── ApplicationDomain
│   │
│   ├── Models
│   ├── Repositories
│   ├── Migrations
│   └── Base Entities
│
└── App.Domain
    └── Domain Models
```

This structure separates API endpoints, application services, domain models, and data access responsibilities.

---

# Application Architecture

The application follows a layered architecture with separation between the frontend, API, business services, domain/data access, and database.

```text
┌─────────────────────────────┐
│       Next.js Frontend      │
│                             │
│  Pages / Components / UI    │
│  Dashboard / Authentication │
└──────────────┬──────────────┘
               │
               │ HTTP / REST API
               ▼
┌─────────────────────────────┐
│     ASP.NET Core Web API    │
│                             │
│        Controllers          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│    Application Services     │
│                             │
│ Services / DTOs / AutoMapper│
│      Business Logic         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Application Domain     │
│                             │
│ Entities / Repositories     │
│ Unit of Work / EF Core      │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         SQL Server          │
└─────────────────────────────┘
```

---

# Design Patterns

The backend applies several common .NET application design patterns.

## Repository Pattern

The Repository Pattern provides an abstraction between application services and Entity Framework Core data access.

This helps centralize database operations and separates data-access responsibilities from application logic.

## Unit of Work

The Unit of Work pattern coordinates repository operations and database transactions through a centralized abstraction.

## Dependency Injection

ASP.NET Core Dependency Injection is used to register and provide application services and repositories throughout the backend.

## DTO Pattern

Data Transfer Objects are used to transfer data between API/application layers without exposing domain models directly.

## AutoMapper

AutoMapper is used to simplify mapping between domain entities and DTO models.

---

# Backend API

The ASP.NET Core Web API exposes controllers responsible for the main application operations.

The project includes controllers for:

```text
Customers
Customers Roles
Login
Social Authentication
Watches
```

These controllers communicate with the application service layer instead of directly implementing all application logic inside API endpoints.

---

# Frontend Architecture

The frontend is built using **Next.js and TypeScript** with the App Router structure.

```text
watch-store
│
├── public
│   └── Images and static assets
│
├── src
│   └── app
│       │
│       ├── (Auth)
│       │   ├── Login
│       │   └── Register
│       │
│       ├── Dashboard
│       │   ├── Users
│       │   └── Watches
│       │
│       ├── api
│       │   └── Authentication
│       │
│       ├── components
│       │   ├── Header
│       │   ├── Footer
│       │   ├── HomePage
│       │   └── DashboardSidebar
│       │
│       ├── utils
│       ├── layout.tsx
│       └── page.tsx
│
├── package.json
├── tsconfig.json
└── next.config.mjs
```

The frontend uses reusable components and dedicated pages for authentication, administration, and public application functionality.

---

# Technology Stack

## Backend

- C#
- .NET
- ASP.NET Core Web API
- Entity Framework Core
- ASP.NET Core Identity
- JWT Authentication
- AutoMapper
- Swagger / OpenAPI

## Frontend

- Next.js
- React
- TypeScript
- HTML
- CSS
- NextAuth

## Database

- SQL Server
- Entity Framework Core Migrations

## Architecture & Patterns

- Layered Architecture
- Repository Pattern
- Unit of Work
- Dependency Injection
- DTO Pattern
- Service Layer

## Authentication

- ASP.NET Core Identity
- JWT Bearer Authentication
- NextAuth
- Google OAuth
- Facebook OAuth

---

# Database

The application uses **SQL Server** with **Entity Framework Core** for persistence.

Entity Framework Core is responsible for:

- Database access
- Entity mapping
- Database migrations
- Repository operations
- Identity-related data persistence

The domain contains entities for application data including customers, customer roles, and watches.

---

# API Documentation

The backend includes **Swagger / OpenAPI** support, allowing developers to explore and test available API endpoints during development.

Swagger provides an interactive interface for:

- Viewing API endpoints
- Inspecting request models
- Inspecting response models
- Testing API operations

---

# Search & Pagination

The application implements reusable pagination functionality for managing larger datasets.

Pagination is used within administrative areas such as:

- Customer management
- Watch management

Search functionality allows administrators to locate specific records more efficiently.

---

# Image Management

The watch management module supports product image uploads.

Uploaded watch images are handled by the ASP.NET Core backend and made available through static file hosting.

This allows administrators to associate images with watch records and display them throughout the frontend.

---

# Project Structure

The repository contains both the frontend and backend applications.

```text
smart-watch-ecommerce-platform
│
├── watch-store
│   │
│   ├── public
│   ├── src
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.mjs
│
├── WatchStoreBackend
│   │
│   ├── App.Domain
│   ├── ApplicationDomain
│   ├── ApplicationServices
│   ├── WatchStoreBackend
│   └── WatchStoreBackend.sln
│
└── .gitignore
```

---

# Main Application Modules

## Public Store

Provides the customer-facing interface for viewing smart watches and navigating the application.

## Authentication

Handles registration, login, JWT authentication, and social authentication.

## Customer Administration

Provides administrative functionality for viewing and managing application users.

## Watch Administration

Provides CRUD operations for maintaining the smart watch catalog.

## API Layer

Provides REST endpoints used by the Next.js frontend to communicate with backend application services.

## Data Access Layer

Uses Entity Framework Core together with Repository and Unit of Work patterns to manage database operations.

---

# Screenshots

## Home Page

The home page provides an overview of the Smart Watch Store, including the latest watches, product features, company information, contact section, and customer testimonials.

![Smart Watch Store Home Page](docs/home-page.jpg)

---

# Purpose

This project was developed as a **full-stack e-commerce application for smart watches** and demonstrates the integration of a modern JavaScript frontend with a .NET backend.

It showcases practical implementation of:

- Full-stack application development
- REST API development
- Frontend and backend integration
- Authentication and authorization
- Social authentication
- Entity Framework Core
- SQL Server database integration
- Repository and Unit of Work patterns
- Administrative dashboards
- CRUD operations
- Image uploads
- Search and pagination
- Layered application architecture

The project serves as a portfolio example demonstrating full-stack development using the **Microsoft .NET ecosystem together with Next.js and TypeScript**.

---

# Author

**Mohamed Soliman**  
.NET Developer | Full-Stack Developer
