# @mfr/core

## Запуск

- `npm start` - для локальной разработки
- `npm build` - собрать прод версию

---

Для локальной разработки можно линкануть

```sh
# link pkg
npm link # in lib folder
npm link @mfr/core # in project folder

# unlink pkg
npm unlink --no-save @mfr/core && npm install  # in project folder
npm unlink # in lib folder
```
