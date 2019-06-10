## Simple React/Redux App to control Digital Signage devices

Features:
- register using Firebase API
- login using Firebase API
- CRUD of owned devices
- CRUD of files
- Assigning files to devices
- API for DS devices

Idea was to learn and use some Redux

Used Firebase validation rules:

Database:
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, update, delete: if request.auth.uid == resource.data.user_uid;
      allow create: if request.auth.uid != null;
    }
  }
}
```

Storage
```
service firebase.storage {
  match /b/{bucket}/o {
    match /user/{userId}/{allPaths=**} {
      allow read: if request.auth.uid == userId;
      allow write: if request.resource.size < 15 * 1024 * 1024
      	&& request.auth != null
      	&& request.resource.contentType.matches('image/jpg|image/jpeg|image/png|video/mp4|video/webm')
    }
  }
}
```


