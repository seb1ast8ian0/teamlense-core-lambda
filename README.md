# tl-lambda-core 

## Beschreibung
Diese Lambda-Funktion ist verantwortlich für die Behandlung des SignIn von Benutzern, indem sie Registrierungsinformationen in einer Datenbank speichert.


## Bedienung:

### Voraussetzung:
Terraform eingerichtet und AWS Credentials hinterlegt:

````
export AWS_ACCESS_KEY_ID=???
export AWS_SECRET_ACCESS_KEY=???
````


Starten der Anwendung (lokal):
```npm start```

Packen der Anwendung:
```npm run package```

Deployen der Lambda: 
```npm run deploy```


Bei jedem Packen und Bereitstellen der Anwendung wird die Anwendungsversion automatisch um 1 auf der Patch-Ebene erhöht. Zum Beispiel wird die Version von **v1.0.0** auf **v1.0.1** aktualisiert. Dies stellt sicher, dass jede Bereitstellung eindeutig identifizierbar ist und Änderungen an der Anwendung nachvollziehbar sind. Über das **get_version.sh** Script wird die Version ausgelesen und automatisch über Terraform in AWS hinterlegt.

## Umgebungsvariablen:
## Umgebungsvariablen:

| Variable Name         | Beschreibung                           | Beispielwert                                     |
|-----------------------|----------------------------------------|--------------------------------------------------|
| BASIC_AUTH_USERNAME   | Benutzername für die Basisauthentifizierung des Service | `example_username`                                        |
| BASIC_AUTH_PASSWORD   | Passwort für die Basisauthentifizierung des Service   | `example_password`                                     |
| DB_HOST               | Hostname für die Datenbank             | `example-postgres-db.c12ccw34u5j6.eu-central-X.rds.amazonaws.com` |
| DB_PORT               | Portnummer für die Datenbank           | `5432`                                           |
| DB_NAME               | Name der Datenbank                     | `postgres`                                       |
| DB_USERNAME           | Benutzername für die Datenbank         | `example_db_username`                                     |
| DB_PASSWORD           | Passwort für die Datenbank             | `example_db_password`                                   |

