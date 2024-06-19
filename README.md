# Приложение Кинопоиск

## Описание

Это простое приложение для просмотра информации о фильмах, разработанное с использованием React, TypeScript, Material UI, Context API и API Кинопоиска. Оно позволяет пользователям:

*   Просматривать список фильмов с пагинацией.
*   Фильтровать фильмы по жанру, рейтингу и году выпуска.
*   Просматривать подробную информацию о каждом фильме.
*   Добавлять фильмы в избранное и просматривать их на отдельной странице.

## Установка

1.  **Клонирование репозитория:**
    ```bash
    git clone [https://github.com/](https://github.com/)<zulpukarovx>/movie_app.git 
    ```

2.  **Переход в директорию проекта:**
    ```bash
    cd movie-app
    ```

3.  **Установка зависимостей:**
    ```bash
    npm install
    ```

4.  **Создание файла .env:** Создайте файл `.env` в корневой директории проекта и добавьте туда ваш API ключ от Кинопоиска:
    ```
    VITE_API_KEY=your_api_key_here
    ```

## Запуск

1.  **Запуск сервера разработки:**
    ```bash
    npm run dev
    ```

2.  **Открытие в браузере:** Откройте веб-браузер и перейдите по адресу `http://localhost:5173` (или на другой порт, указанный в выводе команды `npm run dev`).

## Использование

*   **Главная страница:** Отображает список фильмов с возможностью пагинации и фильтрации.
*   **Фильтрация:** Используйте фильтры (жанр, рейтинг, год) для поиска нужных фильмов. Нажмите "Apply Filters" для применения фильтров.
*   **Детали фильма:** Нажмите на карточку фильма, чтобы перейти на страницу с подробной информацией о фильме.
*   **Избранное:** Нажмите на иконку закладки, чтобы добавить или удалить фильм из избранного. Перейдите на страницу "Избранное" для просмотра сохраненных фильмов.

## Технологии

*   **React:** Фреймворк JavaScript для создания пользовательских интерфейсов.
*   **TypeScript:** Расширение JavaScript с поддержкой статической типизации.
*   **Material UI:** Библиотека компонентов для быстрого создания красивых и функциональных интерфейсов.
*   **React Context API:** Для управления состоянием приложения и передачи данных между компонентами.
*   **Кинопоиск API:** Предоставляет данные о фильмах.

## Структура проекта

*   **`src/api/kinopoiskApi.ts`:** Функции для работы с API Кинопоиска.
*   **`src/components/`:** Компоненты пользовательского интерфейса (MovieCard, FilterPanel, MovieDetails, etc.).
*   **`src/context/movieContext.tsx`:** Контекст для хранения данных о фильмах и функциях.
*   **`src/pages/`:** Страницы приложения (HomePage, FavoritesPage).
*   **`src/services/movieService.ts`:** Сервисные функции для получения данных о фильмах и жанрах.

## Лицензия

Этот проект распространяется по лицензии MIT License.
