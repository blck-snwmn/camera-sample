use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

#[wasm_bindgen]
pub fn do_no_action(pixels: Vec<u8>) -> Uint8Array {
    unsafe { Uint8Array::view(pixels.as_slice()) }
}
