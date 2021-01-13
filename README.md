## How to set up for the first time

Requires Node.js & Composer

1. Pull the files, duh.

2. Open cmd and navigate to the directory.

3. Run the following commands in this order:

`npm i`

`composer i`

`php artisan config:clear`

`php artisan storage:link`

4. Import filozoika_portal.sql into a database.

5. Configure the `.env` as needed.

## How to start up

Open 2 cmd terminals and run:

`npm run watch`

`php artisan serve`

## Additional information

This is a Laravel + React project.

The default url is `http://localhost:8000/`, this can be changed in `resources/js/config.json`.
