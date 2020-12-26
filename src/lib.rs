use js_sys::Uint8Array;
use photon_rs::{monochrome, PhotonImage};
use wasm_bindgen::prelude::*;
use web_sys::ImageData;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

#[wasm_bindgen]
pub fn do_no_action(pixels: Vec<u8>, height: u32, width: u32) -> ImageData {
    console_error_panic_hook::set_once();
    let mut img: PhotonImage = PhotonImage::new(pixels, width, height);
    monochrome::sepia(&mut img);
    img.get_image_data()
    // unsafe { Uint8Array::view(img.get_raw_pixels().as_slice()) }
}
