(async () => {
    console.log("load")
    const video = document.querySelector("#camera");
    const deviceInfos = await navigator.
        mediaDevices.
        enumerateDevices().then(function (devices) {
            return devices.filter(d => d.kind == "videoinput")
        });
    console.log(deviceInfos)

    /** カメラ設定 */
    const constraints = {
        audio: false,
        video: {
            width: 300,
            height: 200,
        }
    };


    /**
     * カメラを<video>と同期
     */
    await navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
                video.play();
            };
        })
        .catch((err) => {
            console.log(err.name + ": " + err.message);
        });

    const worker = new Worker('./worker.js');
    const stream = video.captureStream();
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    {
        const canvas = document.getElementById('canvas');
        const offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({ offscreen }, [offscreen]);
    }
    {
        const canvas = document.getElementById('canvas2');
        const offscreen2 = canvas.transferControlToOffscreen();
        worker.postMessage({ offscreen2 }, [offscreen2]);
    }

    const draw = async () => {
        await imageCapture.grabFrame().then(imageBitmap => {
            worker.postMessage({ imageBitmap }, [imageBitmap]);
        });

        requestAnimationFrame(draw);
    };

    video.onplay = () => {
        requestAnimationFrame(draw);
    };
})();

