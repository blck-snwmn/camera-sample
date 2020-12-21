// const cs = import('./pkg/camera_sample')
// const bg = import('./pkg/camera_sample.wasm')

console.log("load-worker")

let canvas;
let context;
let canvas_other;
let context_other;
addEventListener('message', event => {
    if (event.data.offscreen) {
        console.log("loading-offscreen")
        canvas = event.data.offscreen;
        context = canvas.getContext('2d');
    }
    if (event.data.offscreen2) {
        console.log("loading-offscreen2")
        canvas_other = event.data.offscreen2;
        context_other = canvas_other.getContext('2d');
    }
});

Promise.all([
    import('./pkg/camera_sample'),
    import('./pkg/camera_sample_bg.wasm')]
).then(([{ do_no_action }, { memory }]) => {
    console.log("loading-worker")
    addEventListener('message', event => {
        if (event.data.imageBitmap && context && context_other) {
            const imageBitmap = event.data.imageBitmap
            // console.log(cs.nop(event.data.imageBitmap))
            // context.drawImage(cs.nop(event.data.imageBitmap), 0, 0);
            context.drawImage(imageBitmap, 0, 0);
            let frame = context.getImageData(0, 0, imageBitmap.width, imageBitmap.height)
            let wasmframe = do_no_action(frame.data)
            let u8ca = new Uint8ClampedArray(memory.buffer, wasmframe.pointer(), wasmframe.size())
            let image = new ImageData(u8ca, imageBitmap.width, imageBitmap.height)
            context_other.putImageData(image, 0, 0)
        }
    });
}).catch(reason => {
    console.log(reason)
})
