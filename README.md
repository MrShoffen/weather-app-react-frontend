# Проект “Погода”

Проект “Погода” представляет собой простой сервис для отслеживания текущей погоды.

Возможно просто получать погоду по необходимым координатам без авторизации. Так же реализован функционал по регистрации пользователей и сохранению локаций в своем личном кабинете для остлеживания погоды.

Проект реализован в рамках работы над Роадмапом Серея Жукова - https://zhukovsd.github.io/java-backend-learning-course/projects/weather-viewer/

## Отхождения от ТЗ
В качестве фронтенда используется не Thymeleaf и MVC  - фронтенд написан отдельно на React, а данный бэкенд сервис предоставляет REST эндпоинты, с которыми работает фронтенд.

Фронт так же доступен на гитхабе - https://github.com/MrShoffen/weather-app-react-frontend

Формат обмена данными  между фронтом и бэком, а так же доступные эндпоинты, будут описаны ниже.





## Сборка и запуск проекта на локальном сервере

Есть несколько вариантов запуска - отдельно бэкенд сервис (далее можно осуществить тестирование через Postman (коллекцию так же прилагаю))
Для сборки проекта используется Gradle и GradleWrapper

База данных H2 создается и заполняется автоматически при инициализации приложения.

----
Для запуска в Intelij-Idea - в настройках Tomcat указать application-context: tennis-scoreboard

ИЛИ указать свой контекст (в этом случае в файле app.js необходимо поменять контекст на указанный в конфигурации Tomcat)
```
const context = "/tennis-scoreboard";
```

---
Запуск без IDE

1) Сборка war артефакта:
```
Windows: .\gradlew.bat build
Linux/MacOs: ./gradlew build
```
Собранный tennis-scoreboard.war появится в папке build/libs.

2) Для запуска сервера необходим Tomcat 10 версии - поместите собранный
   tennis-scoreboard.war артефакт в папку webapps вашего Tomcat.

3) Затем запустите Tomcat используя скрипт из папки bin
```
Windows:  TOMCAT_HOME\bin\startup.bat

Linux/MacOS: TOMCAT_HOME/bin/startup.sh
```
4) Проект запустится и будет доступен по ссылке:

http://localhost:8080/tennis-scoreboard/



## Описание методов REST API

JSON ответ со страницей матчей (эндпоинт GET /api/matches?page_number=1&page_size=10&player_name= )
```json
{
   "entities": [
      {
         "id": 1,
         "firstPlayer": "Ugo Humbert",
         "secondPlayer": "Sebastian Baez",
         "winner": "Sebastian Baez"
      },
      ...
      ...
      {
         "id": 10,
         "firstPlayer": "Ugo Humbert",
         "secondPlayer": "Karen Khachanov",
         "winner": "Ugo Humbert"
      }
   ],
   "pageNumber": 1,
   "pageSize": 10,
   "totalPages": 7
}
```
---
JSON ответ со страницей игроков (эндпоинт GET /api/players?page_number=1&page_size=10&player_name= :

```json
{
   "entities": [
      {
         "id": 1,
         "name": "Novak Djokovic",
         "matchesPlayed": 6,
         "matchesWon": 1
      }
      ...
      ...
      {
         "id": 10,
         "name": "Taylor Harry Fritz",
         "matchesPlayed": 3,
         "matchesWon": 0
      }
   ],
   "pageNumber": 1,
   "pageSize": 10,
   "totalPages": 4
}
```
---
JSON ответ со страницей завершенного матча (энпоинт GET /api/finished-match?id=1)
```json
{
    "id": 1,
    "firstPlayer": "Ugo Humbert",
    "secondPlayer": "Sebastian Baez",
    "winner": "Sebastian Baez"
}
```
---
JSON запрос на создание нового матча (эндпоинт POST /api/new-match)
```json
{
  "firstPlayer": "First Name",
  "secondPlayer": "Second Name"
}
```
---
JSON запрос при выигрывании очка (эндпоинт POST /api/match-score?uuid=321c75ce-e727-47b3-b7dc-97b9d7a503b5)
```json
{
  "pointWinner": "PointWinnerName"
}
```
JSON ответ после обновления счета в матче
```json
{
    "firstPlayer": "First Name",
    "secondPlayer": "Second Name",
    "winner": null,
    "ended": false,
    "inTiebreak": false,
    "sets": {
        "TWO": [
            0,
            0,
            0
        ],
        "ONE": [
            0,
            0,
            0
        ]
    },
    "currentPoints": {
        "TWO": 0,
        "ONE": 1
    }
}
```
