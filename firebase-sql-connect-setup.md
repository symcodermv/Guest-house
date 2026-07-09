# Firebase SQL Connect Setup

This project is a static XAMPP website, so `index.html` and `backend.html` currently use Firebase Realtime Database for live content/bookings and Firebase Storage for image uploads.

Firebase SQL Connect uses a Cloud SQL PostgreSQL database behind a generated Firebase SDK. The generated SDK must be created with Firebase CLI from a schema and operation files, then used in a bundled app or imported from generated files. Plain static HTML cannot directly use the SQL database safely without that generated connector layer.

## What I added

- `dataconnect/schema/schema.gql` - suggested SQL tables for site content, rooms, gallery images, bookings, and uploads.
- `dataconnect/connector/queries.gql` - suggested queries and mutations for a future SQL Connect admin.
- `dataconnect/dataconnect.yaml` - starter service/connector config using your visible service name.
- `dataconnect/connector/connector.yaml` - connector and generated JavaScript SDK output config.
- `firebase.json` - points Firebase CLI at the `dataconnect` folder.

## Firebase Console Setup

1. Finish provisioning SQL Connect in Firebase Console.
2. In the SQL Connect service, use service name `websiteclient-service` if that is the final service name.
3. Open `dataconnect/dataconnect.yaml` and replace:
   - `TODO_REPLACE_WITH_DATABASE_ID`
   - `TODO_REPLACE_WITH_CLOUD_SQL_INSTANCE_ID`
   
   You can find these values in Firebase Console > SQL Connect service settings.
4. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
5. Login:
   ```bash
   firebase login
   ```
6. From this project folder, initialize/generate SQL Connect SDK:
   ```bash
   firebase init dataconnect
   firebase init dataconnect:sdk
   firebase dataconnect:sdk:generate
   ```
7. Deploy schema and connector:
   ```bash
   firebase deploy --only dataconnect
   ```

## Current Working Admin

Use `backend.html` now for:

- Website content management
- Booking management
- Image upload to Firebase Storage

When SQL Connect generated SDK files are available, the database functions in `backend.html` can be swapped from Realtime Database calls to generated SQL Connect mutations.

## Required Firebase Rules For Current Static Admin

Realtime Database test rules:

```json
{
  "rules": {
    "feealiBuddiesInn": {
      ".read": true,
      ".write": true
    }
  }
}
```

Storage test rules:

```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /feeali-buddies-inn/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

These open rules are for testing only. For production, add Firebase Authentication and restrict writes to your admin account.
