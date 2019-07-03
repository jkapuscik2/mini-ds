const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp()
const db = admin.firestore()

exports.isUpdated = functions.https.onRequest(async (request, response) => {
    const deviceUid = request.query.uid;

    if (deviceUid) {
        const device = await getDevice(deviceUid);

        if (device) {
            return response.status(200).send(device.is_updated)
        }
    }
    response.status(404).send({error: "Device not found"})
});

exports.getFile = functions.https.onRequest(async (request, response) => {
    const deviceUid = request.query.uid;

    if (deviceUid) {
        const device = await getDevice(deviceUid);

        if (device) {
            await markAsUpdated(deviceUid)
            return response.status(200).send(device.file.url)
        }
    }
    response.status(404).send({error: "Device not found"})
});

const getDevice = async (uid) => {
    return await db.collection("devices").doc(uid).get().then((data) => {
        if (data.exists) {
            return data.data()
        } else {
            return null;
        }
    })
}

const markAsUpdated = async (uid) => {
    return await db.collection("devices").doc(uid).update(
        {
            is_updated: true
        });
}

