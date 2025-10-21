# Simple Products API

Простой бэкенд-сервис на Node.js + Express + TypeScript для работы с товарами (CRUD) и категориями.

## 📋 Функциональность

- `GET /api/products` — возвращает массив всех товаров  
- `GET /api/products/:id` — возвращает товар по его ID  
- `POST /api/products` — создаёт новый товар. Принимает JSON-тело с полями `title`, `price`, `description`, `image`, `category`. Поле `rating` не передаётся, генерируется автоматически (`rate: 0`, `count: 0`).  
- `PUT /api/products/:id` — обновляет существующий товар по ID. Поле `rating` нельзя изменить через этот эндпоинт.  
- `DELETE /api/products/:id` — удаляет товар по ID  
- `GET /api/categories` — возвращает массив строк (predefined категорий) из файла `/data/categories.json`

## 🛠 Требования

- Node.js (версия 16 и выше рекомендована)  
- npm  
- Проект написан на TypeScript  
- Данные хранятся в файле `/data/products.json` (в корне проекта) и файл `/data/categories.json` (список категорий)

## 🚀 Установка и запуск

1. Склонируйте репозиторий или скачайте код:  
   ```bash
   git clone https://github.com/mituttta051/test-case-as-backend
   cd test-case-as-backend

