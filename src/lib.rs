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
pub struct Frame {
    offset: *const u8,
    size: usize,
}
#[wasm_bindgen]
impl Frame {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Frame {
        Frame {
            offset: bytes.as_ptr(),
            size: bytes.len(),
        }
    }

    pub fn pointer(&self) -> *const u8 {
        self.offset
    }

    pub fn size(&self) -> usize {
        self.size
    }
}

#[wasm_bindgen]
pub fn do_no_action(pixels: Vec<u8>) -> Frame {
    Frame::new(pixels)
}
